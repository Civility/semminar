const gulp = require( 'gulp');
const path = require( './../config.json');

const taskImgmin = require( './image');
const taskPug = require( './pug');
const taskSass = require( './scss');
const taskScript = require( './script');


const server = require( 'browser-sync').create();

module.exports = function serve(cb) {
    server.init({
        server: 'dest',
        notify: false,
        open: true,
        cors: true
    })

    gulp.watch(path.watch.img, gulp.series(taskImgmin)).on('change', server.reload)
    gulp.watch(path.watch.pug, gulp.series(taskPug))
    gulp.watch(path.watch.scss, gulp.series(taskSass, cb => gulp.src(path.dest.scss).pipe(server.stream()).on('end', cb)))
    gulp.watch(path.watch.script, gulp.series(taskScript)).on('change', server.reload)
    gulp.watch(path.dest.pug + '*.html').on('change', server.reload)
    return cb()
}