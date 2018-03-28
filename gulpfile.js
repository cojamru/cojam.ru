'use strict'

let
	project =     require('./package.json'),
	gulp =        require('gulp'),
	tube =        require('gulp-pipe'),
	bom =         require('gulp-bom'),
	rename =      require('gulp-rename'),
	watch =       require('gulp-watch'),
	plumber =     require('gulp-plumber'),
	csso =        require('gulp-csso'),
	pug =         require('gulp-pug'),
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

let dirs = project._config.dirs

let paths = {
	html: {
		dev: [`${dirs.dev}/pug/**/*.pug`, `!${dirs.dev}/pug/inc/**/*.pug`],
		prod: `${dirs.prod.build}/`
	},
	js: {
		dev: `${dirs.dev}/js/**/*.js`,
		prod: `${dirs.prod.build}/${dirs.prod.main}/js/`,
		kamina: 'node_modules/kamina-js/dist/kamina.min.js',
	},
	css: {
		dev: `${dirs.dev}/scss/**/*.scss`,
		prod: `${dirs.prod.build}/${dirs.prod.main}/css/`
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
			js:      `/${dirs.prod.main}/js`,
			css:     `/${dirs.prod.main}/css`,
			img:     `/${dirs.prod.main}/img`
		},
		primeColor:  project._config.prime_color,
		domain:  project._config.domain
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

gulp.task('minify-js', () => tube([
	watch(paths.js.dev, { ignoreInitial: false }),
	plumber(),
	minifyJS({}),
	bom(),
	rename({suffix: '.min'}),
	gulp.dest(paths.js.prod),
	reloadServer()
]))

let scssTubes = [
	plumber(),
	sass.vars({
		VERSION:     project.version,
		primeColor:  project._config.prime_color,
		imgPath:     `/${dirs.prod.main}/img`
	}),
	sass.compile({outputStyle: 'compressed'}),
	csso(),
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

gulp.task('default', ['pug', 'get-kamina', 'minify-js', 'scss:dev'])
gulp.task('dev', ['liveReload', 'default'])
