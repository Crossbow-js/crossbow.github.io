const cb = require('crossbow');

cb.task('serve', function () {
    cb.watch(['./app/scss', './legacy/scss'], ['css', 'autoprefixer']);
    cb.watch(['\*\*/\*.php'], ['browser:reload']);
    cb.watch(['\*\*/\*.php'], ['browser:reload']);
});

cb.task('css', {
    tasks: 'my-scss-module',
    options: {
        input: './app/scss/core.scss',
        output: './dist/css'
    }
});
