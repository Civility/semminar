const gulp = require( 'gulp');
const path = require( './../config.json');
const plumber = require( 'gulp-plumber'); //перехватывать ошибки
const sass = require( 'gulp-sass');
const concat = require ( 'gulp-concat');
const autoprefixer = require( 'gulp-autoprefixer');
const cleanCSS = require( 'gulp-clean-css'); //минификация стилей
const csso = require( 'gulp-csso'); //сокращает стили
const uncss  = require('gulp-uncss'); // удаление не нужных стилей

module.exports = function taskSass() {
    return gulp
    .src(path.src.scss)
    .pipe(plumber())
    .pipe(concat('main.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(uncss({
      html: [path.baseDir+'*.html']
    }))
    .pipe(csso({ debug: true }))
    .pipe(cleanCSS({
        debug: true,
        compatibility: '*'
      }))

    .pipe(gulp.dest(path.dest.scss))
}