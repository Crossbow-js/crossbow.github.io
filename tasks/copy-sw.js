module.exports = function copyFiles () {
    return vfs.src(['node_modules/sw-toolbox/sw-toolbox.js', 'public/js/runtime-caching.js'])
        .pipe(vfs.dest('public/js/sw'));
}