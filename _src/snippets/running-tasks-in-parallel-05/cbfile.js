const cb = require('crossbow');

cb.task('assets', {
    tasks: ['lint', 'html', 'scripts', 'images', 'copy'],
    runMode: 'parallel'
});

cb.task('default', [
    'clean',
    'styles',
    'assets', // <-- use alias name instead
    'generate-service-worker'
]);

