const cb = require('crossbow');

cb.task('release', {
    description: 'Create a production release of CSS/JS/HTML assets',
    tasks: [
        'build:\*',
        'templates'
    ]
});

cb.task('templates', {
    description: 'Generate HTML from the the Markdown in the `docs` folder',
    tasks: [
        '@sh jekyl build'
    ]
});

cb.group('build', {
    css: '@npm node-sass src/style.scss dest/style.css',
    js:  '@npm tsc ./app/ts/scripts.ts --outFile ./app/js/scripts.js'
});