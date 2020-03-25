const del = require( 'del');
const path = require( './../config.json');

module.exports = function taskClean(cb) {
    return del(path.baseDir).then(() => {
        cb()
    })
}