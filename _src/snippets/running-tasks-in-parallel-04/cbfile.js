const cb = require('crossbow');

cb.task('default', [
    'clean',
    'styles',
    ['lint', 'html', 'scripts', 'images', 'copy'],
    'generate-service-worker'
]);
