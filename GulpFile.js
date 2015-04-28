'use strict';
var browserify = require('browserify')
	, source = require('vinyl-source-stream')
	, buffer = require('vinyl-buffer')
	, gulp = require('gulp')
	, clean = require('gulp-clean')
	, concat = require('gulp-concat')
	, sass = require('gulp-sass')
	, uglify = require('gulp-uglify')
	, sourcemaps = require('gulp-sourcemaps')
	, replaceHtml = require('gulp-html-replace')
	;


gulp.task('clean', function () {
	return gulp.src(
		[
			'./dist/'
		],
		{
			read: false
		}
	).pipe(
		clean()
	);
});

gulp.task('concat:dev', function () {
	gulp.src([
		'./src/vendor/angular/angular.js'
	]).pipe(
		concat('lib.bundler.js')
	).pipe(
		gulp.dest('./src/js/')
	);
});

gulp.task('browserify', function () {
	browserify(
		'./src/app.js'
	).bundle(
		{debug: true}
	).on(
		'error',
		function (err) {
			console.log(err.message);
		}
	).pipe(
		source('app.bundler.js')
	).pipe(
		buffer()
	).pipe(
		sourcemaps.init({loadMaps: true})
	).pipe(
		sourcemaps.write('./')
	).pipe(
		gulp.dest('./src/js/')
	);
});

gulp.task('browserify:dist', function () {
	browserify(
		'./src/app.js'
	).bundle(
		{debug: true}
	).pipe(
		source('app.min.js')
	).pipe(
		buffer()
	).pipe(
		uglify()
	).pipe(
		gulp.dest('./dist/js/')
	);
});

gulp.task('concat:dist', function () {
	gulp.src([
		'./src/vendor/angular/angular.min.js'
	]).pipe(
		concat('lib.min.js')
	).pipe(
		gulp.dest('./dist/js/')
	);
	gulp.src([
		'./src/css/*.css'/*including 3rd party css libs*/
	]).pipe(
		concat('app.min.css')
	).pipe(
		gulp.dest('./src/css/')
	);
});

gulp.task('copy:dist', function () {
	//css
	gulp.src(
		'./src/css/app.min.css'
	).pipe(
		gulp.dest('./dist/css/')
	);
	//assets
	gulp.src(
		'./src/assets/**/*'
	).pipe(
		gulp.dest('./dist/assets/')
	);
	//manifest.json
	gulp.src(
		'src/manifest.json'
	).pipe(
		gulp.dest('./dist/')
	);
	//content.js
	gulp.src(
		'src/js/content.js'
	).pipe(
		gulp.dest('./dist/js/')
	);
	//popup
	gulp.src(
		'src/popup.html'
	).pipe(
		gulp.dest('./dist/')
	);
	gulp.src(
		'src/popup.js'
	).pipe(
		gulp.dest('./dist/')
	);


});

gulp.task('scss', function () {
	gulp.src(
		'./src/scss/app.scss'
	).pipe(
		sass({errLogToConsole: true})
	).pipe(
		gulp.dest('./src/css/')
	);
});

gulp.task('watch', function () {
	gulp.watch(
		[
			'src/*.js',
			'src/module/**/**/*'
		],
		['browserify']
	);
	gulp.watch(
		[
			'src/scss/*.scss'
		],
		['scss']
	);
});

gulp.task('replace-html', function () {
	gulp.src(
		'./src/index.html'
	).pipe(
		replaceHtml({
			'css': 'css/app.min.css',
			'js': [
				'js/lib.min.js',
				'js/app.min.js'
			]
		})
	).pipe(
		gulp.dest('./dist/')
	);
});

gulp.task('default', ['clean'], function () {
	gulp.start('common');
});

gulp.task('common', ['concat:dev', 'browserify', 'scss']);

gulp.task('dev', ['common', 'watch'], function () {});

gulp.task('dist', ['clean'], function () {
	gulp.start('scss', 'browserify:dist', 'concat:dist', 'copy:dist', 'replace-html');
});

