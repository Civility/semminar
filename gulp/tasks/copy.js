const gulp = require( 'gulp');
const path = require( './../config.json');

module.exports = function taskCopy() {
    return gulp.src(path.src.copy)
	.pipe(gulp.dest(path.dest.copy))
}