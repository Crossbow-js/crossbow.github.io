const cb = require('crossbow');

cb.task('clean', [
  '@sh rm -rf ./js/dist',
  '@sh rm -rf ./css/dist',
  'my-task.js' // <--- just provide the path here
]);

cb.task('webpack', '@sh rm -rf ./dist');
cb.task('build', ['clean', 'webpack']);
