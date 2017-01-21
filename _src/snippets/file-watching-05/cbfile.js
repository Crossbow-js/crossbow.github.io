const cb = require('crossbow');

cb.task('serve', function () {
    cb.watch(
        ['./app/scss', './legacy/scss'],
        ['css', 'autoprefixer'],
        {debounce: 500}
    );
});