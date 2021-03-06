'use strict'

let project = require('./package.json')

/* Подключение встроенных модулей к проекту */

let fs = require('fs')

/* Подключение Gulp к проекту */

let gulp = require('gulp')

/* Подключение сторонних плагинов Gulp к проекту */

let
	tube =        require('gulp-pipe'),
	bom =         require('gulp-bom'),
	rename =      require('gulp-rename'),
	watch =       require('gulp-watch'),
	clean =       require('gulp-clean'),
	plumber =     require('gulp-plumber'),
	cleanCSS =    require('gulp-clean-css'),
	pug =         require('gulp-pug')

/*  Подключение сторонних модулей к проекту */

let
	CLIargs =       require('yargs').argv,
	parseYAML =		require('js-yaml'),
	liveServer =	require('browser-sync')

let sass = {
	compile:  require('gulp-sass'),
	watch:    require('gulp-watch-sass'),
	vars:     require('gulp-sass-vars')
}

let uglify = {
	core:      require('terser'),
	composer:  require('gulp-uglify/composer')
}

let
	minifyJS = uglify.composer(uglify.core, console),
	reloadServer = () => liveServer.stream()

let parseYAMLfile = fileName => parseYAML.load(fs.readFileSync(`./${fileName}.yaml`, 'utf8'))

let config = parseYAMLfile('project-config')

let vendors = parseYAMLfile('project-vendors')

let dirs = config.dirs

const IS_PROD = 'prod' in CLIargs

const ASSETS_HOST = IS_PROD ? config.URLs.CDN : ''

let paths = {
	html: {
		dev: [`${dirs.dev}/pug/**/*.pug`, `!${dirs.dev}/pug/inc/**/*.pug`],
		prod: `${dirs.build}/`
	},

	js: {
		dev:    [`${dirs.dev}/js/**/*.js`, `!${dirs.dev}/js/service-worker.js`],
		prod:    `${dirs.build}/${dirs.assets}/js/`
	},

	css: {
		dev:   `${dirs.dev}/scss/**/*.scss`,
		prod:  `${dirs.build}/${dirs.assets}/css/`
	}
}

gulp.task('liveReload', () => liveServer({
	server: [dirs.build, dirs.dist_content],
	port: 8080,
	notify: false
}))

/* Сборка pug */

let pugTubes = [
	plumber(),
	pug({ locals: {
		VERSION:     project.version,

		title:       config.title,

		domain:      config.domain,

		primeColor:  config.prime_color,

		PATHS: {
			js:       `${ASSETS_HOST}/${dirs.assets}/js`,
			css:      `${ASSETS_HOST}/${dirs.assets}/css`,
			img:      `${ASSETS_HOST}/${dirs.assets}/img`,
		},

		LIBS: vendors,

		URLs: config.URLs,

		BBISWU: {
			google: config.trackers.google,
			yandex: config.trackers.yandex
		},
	}}),
	bom(),
	rename(file => {
		switch (file.basename) {
			case 'sitemap':
				file.extname = '.xml'; break
			case 'error':
				file.extname = '.htm'; break
		}
	}),
	gulp.dest(paths.html.prod)
]

gulp.task('pug:build', () => tube(
	[gulp.src(paths.html.dev)]
		.concat(pugTubes)
))

gulp.task('pug:dev', () => tube(
	[watch(paths.html.dev, { ignoreInitial: false })]
		.concat(pugTubes, [reloadServer()])
))

/* Сборка JS */

let jsTubes = (dest = paths.js.prod) => [
	plumber(),
	minifyJS({}),
	bom(),
	rename({ suffix: '.min' }),
	gulp.dest(dest)
]

gulp.task('js:assets:build', () => tube(
	[gulp.src(paths.js.dev)]
		.concat(jsTubes())
))

gulp.task('js:assets:dev', () => tube(
	[watch(paths.js.dev, { ignoreInitial: false })]
		.concat(jsTubes(), [reloadServer()])
))

gulp.task('js:get-kamina', () => tube([
	gulp.src('node_modules/kamina-js/dist/kamina.min.js'),
	bom(),
	gulp.dest(paths.js.prod)
]))

/* Сборка SCSS */

let scssTubes = [
	plumber(),
	sass.vars({
		VERSION:     project.version,
		primeColor:  config.prime_color,
		imgPath:     `${ASSETS_HOST}/${dirs.assets}/img`,
	}, { verbose: false }),
	sass.compile.sync({ outputStyle: 'compressed' }),
	cleanCSS(),
	bom(),
	rename({suffix: '.min'}),
	gulp.dest(paths.css.prod)
]

gulp.task('scss:build', () => tube(
	[gulp.src(paths.css.dev)]
		.concat(scssTubes)
))

gulp.task('scss:dev', () => tube(
	[sass.watch(paths.css.dev)]
		.concat(scssTubes, [reloadServer()])
))

/* Копирование файлов из dirs.build и dirs.dist_content в одну общую dirs.dist */

gulp.task('dist:copy', () => tube([
	gulp.src([
		`${dirs.build}/**/*`, `${dirs.build}/**/.*`,
		`${dirs.dist_content}/**/*`, `${dirs.dist_content}/**/.*`
	]),
	gulp.dest(dirs.dist)
]))

gulp.task('dist:clean', () => tube([
	gulp.src(dirs.dist, { read: false, allowEmpty: true }),
	clean()
]))

gulp.task('dist', gulp.series('dist:clean', 'dist:copy'))

/* Команды для сборки и разработки */

gulp.task('build', gulp.parallel('pug:build', 'js:assets:build', 'js:get-kamina', 'scss:build'))

gulp.task('build:clean', () => tube([
	gulp.src(dirs.build, { read: false, allowEmpty: true }),
	clean()
]))

gulp.task('dev', gulp.parallel('liveReload', 'pug:dev', 'js:assets:dev', 'js:get-kamina', 'scss:dev'))

gulp.task('default', gulp.series('build:clean', 'build', 'dist'))
