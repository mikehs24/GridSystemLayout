const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
// const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const clean = require('gulp-clean')

const paths = {
	dist: './dist',
	src: './src',
	sass: {
		src: 'src/scss/main.scss',
		dest: 'dist/css',
	},
	js: {
		src: './src/js/**/*.js',
		dest: './dist/js',
	},
	img: {
		src: './src/img/*',
		dest: './dist/img',
	},
}

function sassCompiler(done) {
	src(paths.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		// .pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sass.dest))
	done()
}

function javaScript(done) {
	src(paths.js.src)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		// .pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.js.dest))
	done()
}

function imagesMinify(done) {
	src(paths.img.src).pipe(imagemin()).pipe(dest(paths.img.dest))
	done()
}

function cleanStuff(done) {
	src(paths.dist, { read: false }).pipe(clean())
	done()
}

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})
	done()
}

function watchChanges(done) {
	watch('./*.html').on('change', reload)
	watch(['src/scss/**/*.scss', paths.js.src, ''], parallel(sassCompiler, javaScript)).on('change', reload).on('change', reload)
	watch(paths.img.src, imagesMinify).on('change', reload)
}

const mainFunctions = parallel(sassCompiler, javaScript, imagesMinify)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchChanges)
