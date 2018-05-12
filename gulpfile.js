'use strict'

let
	project =     require('./package.json'),
	fs =          require('fs'),
	gulp =        require('gulp'),
	tube =        require('gulp-pipe'),
	bom =         require('gulp-bom'),
	rename =      require('gulp-rename'),
	watch =       require('gulp-watch'),
	plumber =     require('gulp-plumber'),
	cleanCSS =    require('gulp-clean-css'),
	pug =         require('gulp-pug'),
	parseYAML =   require('js-yaml'),
	liveServer =  require('browser-sync')

let sass = {
	compile:  require('gulp-sass'),
	watch:    require('gulp-watch-sass'),
	vars:     require('gulp-sass-vars')
}

let uglify = {
	core:      require('uglify-es'),
	composer:  require('gulp-uglify/composer')
}

let
	minifyJS = uglify.composer(uglify.core, console),
	reloadServer = () => liveServer.stream()

let parseYAMLfile = fileName => parseYAML.load(fs.readFileSync(`./${fileName}.yaml`, 'utf8'))

let config = parseYAMLfile('project-config')

let vendors = parseYAMLfile('project-vendors')

let dirs = config.dirs

let paths = {
	html: {
		dev: [`${dirs.dev}/pug/**/*.pug`, `!${dirs.dev}/pug/inc/**/*.pug`],
		prod: `${dirs.prod.build}/`
	},

	js: {
		dev:  [`${dirs.dev}/js/**/*.js`, `!${dirs.dev}/js/service-worker.js`],
		prod:  `${dirs.prod.build}/${dirs.prod.main}/js/`,

		kamina: 'node_modules/kamina-js/dist/kamina.min.js'
	},

	css: {
		dev:   `${dirs.dev}/scss/**/*.scss`,
		prod:  `${dirs.prod.build}/${dirs.prod.main}/css/`
	}
}

gulp.task('liveReload', () => liveServer({
	server: [dirs.prod.build, dirs.prod.content],
	port: 8080,
	notify: false
}))

gulp.task('pug', () => tube([
	watch(paths.html.dev, { ignoreInitial: false }),
	plumber(),
	pug({ locals: {
		VERSION: project.version,
		PATHS: {
			js:       `/${dirs.prod.main}/js`,
			css:      `/${dirs.prod.main}/css`,
			img:      `/${dirs.prod.main}/img`
		},
		LIBS: vendors,
		BBISWU: {
			google: config.trackers.google,
			yandex: config.trackers.yandex
		},
		title:       config.title,
		domain:      config.domain,
		primeColor:  config.prime_color
	}}),
	bom(),
	gulp.dest(paths.html.prod),
	reloadServer()
]))

gulp.task('get-kamina', () => tube([
	gulp.src(paths.js.kamina),
	bom(),
	gulp.dest(paths.js.prod)
]))

let jsTubes = (_src, _dest) => tube([
	watch(_src, { ignoreInitial: false }),
	plumber(),
	minifyJS({}),
	bom(),
	rename({suffix: '.min'}),
	gulp.dest(_dest),
	reloadServer()
])

gulp.task('js:assets', () => jsTubes(paths.js.dev, paths.js.prod))

let scssTubes = [
	plumber(),
	sass.vars({
		VERSION:     project.version,
		primeColor:  config.prime_color,
		imgPath:     `/${dirs.prod.main}/img`
	}),
	sass.compile({outputStyle: 'compressed'}),
	cleanCSS(),
	bom(),
	rename({suffix: '.min'}),
	gulp.dest(paths.css.prod)
]

gulp.task('scss:only-compile', () => tube(
	[gulp.src(paths.css.dev)].concat(scssTubes)
))

gulp.task('scss:dev', () => tube(
	[sass.watch(paths.css.dev)].concat(scssTubes, [reloadServer()])
))

gulp.task('default', ['pug', 'get-kamina', 'js:assets', 'scss:dev'])
gulp.task('dev', ['liveReload', 'default'])
