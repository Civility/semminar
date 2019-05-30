'use strict'
const gulp 			= require('gulp'); // Подключаем gulp
const sass 			= require('gulp-sass'); // sass делает css
const autoprefixer 	= require('gulp-autoprefixer'); // модуль для автоматической установки автопрефиксов
const plumber 		= require('gulp-plumber'); // поиск ошибок 
const csso 			= require('gulp-csso'); // минфикатор css
const uglify 		= require('gulp-uglify'); // минфикатор js
const concat 		= require('gulp-concat'); // объеденить фаилы
const del 			= require('del'); // удаление каталогов и фаилов
const notify 		= require('gulp-notify'); // отображение ошибок в cmd
const pug 			= require('gulp-pug');
const imagemin		= require('gulp-imagemin');
const remember 		= require('gulp-remember');
// const sourcemaps 	= require('gulp-sourcemaps');
const newer			= require('gulp-newer'); // проходит по новым 
var browserSync 	= require('browser-sync').create(); //локальный сервер (смотрит за стилями)

//пути gulp.src
var path = {
	src: {
		// jq: './node_modules/jquery/dist/jquery.min.js',
		js:'./src/js/main.js',
		appjs: 
		[
			'./node_modules/jquery/dist/jquery.min.js',
			'./src/js/validator.min.js'
			// './node_modules/popper.js/dist/umd/popper.min.js',
			// './node_modules/bootstrap/dist/js/bootstrap.min.js',
		],
		// appcss: './src/scss/libs.scss',
		bcss: './src/scss/bootstrap.scss',
		css: './src/scss/main.scss',
		images: './src/images/**/*',
		html: './src/pug/index.pug',
		font: './src/fonts/**/*.*'	
	},
	dest: {
		js: 	'./dist/js/',
		css: 	'./dist/css/',
		images: './dist/img/',
		font: 	'./dist/fonts/',
		html: './dist/'
	},
	clean:
		['./dist/js/main.js', './dist/**/*.html',  './dist/css/style.css']
}
// Clean assets
function clean() {
	return del(path.clean);
}

//свои css
function css(){
	return gulp.src(path.src.css)
	// .pipe(sourcemaps.init())
	.pipe(plumber({ // обработчик потоков pipe отслеживает ошибки с notify
		errorHandler: notify.onError(function (error){
		return {
			title  : "Sass function css!",
			message: "<%= error.message %>"	
		}
		})
	}))
	.pipe(sass.sync({outputStyle: 'nested'})) // nested expanded compact compressed

	.pipe(autoprefixer({
		browsers: ['last 2 versions'], 
		cascade: false 
	}))
	// .pipe(sourcemaps.write())
	.pipe(concat('style.css'))
	// .pipe(csso({
	// 	restructure: false,
	// 	// sourceMap: false,
	// 	debug: true
	// }))
	.pipe(gulp.dest(path.dest.css))
	.pipe(browserSync.stream());
}

// копируем фаилы css
function appcss(){
	return gulp.src(path.src.bcss)
	.pipe(plumber())
	.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError)
		.on('error', notify.onError({
			title  : "Sass function appcss",
			message: "<%= error.message %>"
			}))
		)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'], 
			cascade: false
		}))
	// .pipe(concat('libs.css'))
	.pipe(csso({
		restructure: true,
		sourceMap: false,
		debug: true
	}))
	.pipe(remember('css'))
	.pipe(gulp.dest(path.dest.css))
	.pipe(browserSync.stream());
}
// копируем фаилы js
function js(){
	return gulp.src(path.src.js)
	.pipe(concat('main.js'))
	// .pipe(uglify({toplevel: false})) // {toplevel: true}
	.pipe(plumber())
	.pipe(remember('js'))
	.pipe(gulp.dest(path.dest.js))
	.pipe(browserSync.stream());
}

function appjs(){
	return gulp.src(path.src.appjs)
	// .pipe(concat('jq.js'))
	.pipe(uglify())
	.pipe(plumber())
	// .pipe(remember('appjs'))
	.pipe(gulp.dest(path.dest.js))
	.pipe(browserSync.stream());
}

// fonts	
function fonts() {
	return gulp.src(path.src.font)
	.pipe(newer(path.dest.font))
	.pipe(plumber())
	.pipe(gulp.dest(path.dest.font));
}
//img
function img() {
	return gulp
	  .src(path.src.images)
		.pipe(plumber())
		.pipe(newer(path.dest.images))
	  .pipe(
		imagemin([
		  imagemin.gifsicle({ interlaced: true }), // gif
		  imagemin.jpegtran({ progressive: true }), // jpg
		  imagemin.optipng({ optimizationLevel: 5 }), // pmg
		  imagemin.svgo({ // svg
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		  })
		])
		)
		.pipe(remember('img'))
	  .pipe(gulp.dest(path.dest.images));
}
//pug
function html() {
		return gulp.src(path.src.html)
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe(remember('html'))
		.pipe(gulp.dest(path.dest.html))
		.pipe(browserSync.stream());
}	
//добавление функции к команде
// gulp.task('appcss', appcss);
gulp.task('fonts', fonts);
gulp.task('img', img);
gulp.task('html', html);
gulp.task('css', css);
gulp.task('js', js);
gulp.task('appjs', appjs);
gulp.task('clean', clean);

gulp.task('build', gulp.series('clean', 
	gulp.parallel( 'css', 'js', 'appjs', 'fonts', 'img', 'html' ))
);

gulp.task('watch', watch);
gulp.task('serve', serve);


function watch(){
	gulp.watch(path.src.js, js);
	gulp.watch('./src/js/**/*.js', appjs);
	gulp.watch('./src/pug/**/*.pug', html);
	gulp.watch('./src/scss/**/*.scss', css);
	gulp.watch('./src/images/**/*.*', img);
	gulp.watch('./src/scss/**/*.scss', css);
}



function serve(){
	browserSync.init({
		server: {
			baseDir: './dist'
	  	}
	})
	browserSync.watch([
		'./src/scss/**/*.scss',
		'./src/pug/**/*.pug',
		'./src/images/**/*.*',
		'./src/js/**/*.js'
	]).on('change', browserSync.reload);
}

gulp.task('go', gulp.series('build' , gulp.parallel('watch', 'serve')));