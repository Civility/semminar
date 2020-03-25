const gulp = require('gulp');
const path = require ('./../config.json');
const babel = require ( 'gulp-babel');
// const uglify = require('gulp-uglify'); //минификация и оптимизация javascript
const terser = require ( 'gulp-terser'); //минификация и оптимизация javascript

const concat = require ( 'gulp-concat'); // делает из путей 1 фаил, по порядку
const plumber = require ( 'gulp-plumber'); //перехватывать ошибки

module.exports = function taskScript() {
    return gulp
    .src(path.src.script)
    .pipe(plumber())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(terser())
    // .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(path.dest.script))
}