const cb = require('crossbow');

// define the 'clean' task
cb.task('clean', [
    '@sh rm -rf ./js/dist',
    '@sh rm -rf ./css/dist'
]);

// define 'webpack' task
cb.task('webpack', '@sh rm -rf ./dist');

// now create an alias called 'build'
cb.task('build', ['clean', 'webpack']);
