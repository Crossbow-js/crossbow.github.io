const cb = require('crossbow');

cb.task('build', [
    '@sh rm -rf ./dist',
    '@npm webpack'
]);