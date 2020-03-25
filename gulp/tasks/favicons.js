const gulp = require( 'gulp');
const path = require( './../config.json');
const plumber = require( 'gulp-plumber');
const favicons = require( 'gulp-favicons');

module.exports = function taskFavicon() {
    return gulp
    .src(path.src.favicon)
    .pipe(plumber())
    .pipe(
        // favicons({
        // icons: {
        //     appleIcon: true,
        //     favicons: true,
        //     online: false,
        //     appleStartup: false,
        //     android: false,
        //     firefox: false,
        //     yandex: false,
        //     windows: false,
        //     coast: false
        //     }
        // })
        favicons({
            // appName: 'Seminar.utsrus',
            // appShortName: 'Seminar.uts',
            // appDescription: 'Seminar.uts',
            // background: 'transparent',
            // path: 'favicons/',
            // display: 'standalone', //browser , standalone
            // scope: '/',
            // start_url: '/?homescreen=1',
            // version: 1.0,
            // logging: false,
            // html: 'index.html',
            // pipeHTML: true,
            // replace: true,
            icons: {
                appleIcon: true,
                favicons: true,
                appleStartup: false,
                android: true,
                firefox: true,
                yandex: true,
                windows: false,
                coast: true
            }
          })
    )
    .pipe(gulp.dest(path.dest.favicon))
}