'use strict'
const gulp = require( 'gulp');

const serve = require( './gulp/tasks/serve');

const taskImgmin = require( './gulp/tasks/image');
const taskPug = require( './gulp/tasks/pug');
const taskSass = require( './gulp/tasks/scss');
const taskScript = require( './gulp/tasks/script');

const taskfonts = require( './gulp/tasks/fonts');
const taskFavicon = require( './gulp/tasks/favicons');
const taskCopy = require( './gulp/tasks/copy');
const taskAdd = require( './gulp/tasks/add');

const taskClean = require( './gulp/tasks/clean');

const dev = gulp.parallel(taskImgmin, taskPug, taskSass, taskScript, taskfonts, taskFavicon, taskCopy, taskAdd)

const build = gulp.series(taskClean, dev)

module.exports.start = gulp.series(build, serve)
module.exports.build = build

module.exports.css = taskSass

// gulp.task('go', gulp.series('build', gulp.parallel('serve')));