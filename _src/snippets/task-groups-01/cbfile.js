const cb = require('crossbow');

cb.group('build', {
    css: [
        '@sh rm -rf ./dist/css',
        'sass'
    ],
    js: [
        '@sh webpack',
        '@sh webpack --config webpack.prod.config.js'
    ]
});