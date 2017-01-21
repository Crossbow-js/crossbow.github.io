const cb = require('crossbow');

cb.task('serve', function () {
    cb.watch('./app/scss', ['css']);
});

cb.task('css', {
    tasks: 'my-scss-module',
    options: {
        input: './app/scss/core.scss',
        output: './dist/css'
    }
});
