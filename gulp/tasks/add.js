const gulp = require( 'gulp');
const path = require( './../config.json');

module.exports = function taskAdd() {
    return gulp.src(path.src.add,{ dot: true })
	.pipe(gulp.dest(path.baseDir))
}