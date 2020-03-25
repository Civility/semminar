const gulp = require( 'gulp');
const path = require( './../config.json');

module.exports = function taskfonts() {
    return gulp.src(path.src.fonts)
	.pipe(gulp.dest(path.dest.fonts))
}