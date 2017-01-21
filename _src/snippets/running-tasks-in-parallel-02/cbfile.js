const cb = require('crossbow');

cb.task('build-js', {
    tasks: [
        '@npm webpack',
        '@npm webpack --config webpack.prod.js'
    ],
    runMode: 'parallel'
});
