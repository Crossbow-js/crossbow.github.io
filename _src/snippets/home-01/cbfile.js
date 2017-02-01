const cb = require('crossbow');
const vfs = require('vinyl-fs');

cb.task('build', ['scripts', 'styles']);

cb.task('scripts', [
    '@sh rm -rf ./dist',
    '@npm webpack'
]);

cb.task('styles', function () {
    return vfs.src('./app/scss/core.scss')
        .pipe(sass())
        .pipe(vfs.dest('./dist/css'));
});
