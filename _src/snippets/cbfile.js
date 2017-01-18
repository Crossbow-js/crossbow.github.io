const cb  = require('crossbow');
const vfs = require('vinyl-fs');

// Reuse existing gulp-* plugins...
cb.task('sass', () =>
    vfs.src('app/scss')
        .pipe(sass())
        .pipe(vfs.dest('dist/css'))
);

// Combine with NPM scripts (minus the wrapppers)
cb.task('build', [
    '@npm rimraf ./dist',
    'sass',
    '@npm webpack'
]);

// NO special syntax for sequential execution
cb.task('html', ['clean', 'build-templates']);

// EASIER to compose series / parallel queues
cb.task('default', [
    'styles',
    ['lint', 'html', 'scripts', 'images', 'copy'],
    'generate-service-worker'
]);