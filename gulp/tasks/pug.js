const gulp = require( 'gulp');
const path = require( './../config.json');
const pug = require( 'gulp-pug');
const htmlValidator = require( 'gulp-w3c-html-validator');
const plumber = require( 'gulp-plumber');


module.exports = function taskPug() {
    return gulp
    .src(path.src.pug)
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(htmlValidator.reporter())
    .pipe(gulp.dest(path.dest.pug))
}