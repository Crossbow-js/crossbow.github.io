const cb = require('crossbow');

// define 'clean' task
cb.task('clean', '@sh rm -rf ./dist');

// define 'webpack' task
cb.task('webpack', '@sh rm -rf ./dist');

// call 2 tasks via an alias 'build'
cb.task('build', ['clean', 'webpack']);
