const cb      = require('crossbow');
const vfs     = require('vinyl-fs');
const easysvg = require('easy-svg');
const bs      = require('browser-sync').create();

cb.task('serve', ['build-all', function () {
    bs.init({
        server: ['public-html', 'public'],
        logFileChanges: false
    });
    cb.watch('scss', ['sass', () => bs.reload('core.css')]);
    cb.watch('_src', ['html', () => bs.reload()]);
    cb.watch('public/img/svg', ['icons', 'html', () => bs.reload()]);
}]);

cb.task('build-all', ['html', 'icons', 'sass']);

cb.task('html', {
    tasks: ['tasks/templates'],
    options: {
        config: {
            base: '_src',
            prettyUrls: true,
            defaultLayout: 'default.hbs'
        },
        data: {
            $$: 'all:data'
        },
        input: '_src/*.hbs',
        output: 'public-html'
    }
});

cb.task('icons', function svgIcons () {
    return vfs.src('public/img/svg/*.svg')
        .pipe(easysvg.stream())
        .pipe(vfs.dest('public/svg'));
});

cb.task('sass', {
    tasks: 'crossbow-sass',
    ifChanged: 'scss',
    description: 'Compile sass -> css',
    options: {
        input: 'scss/core.scss',
        output: 'public/css'
    }
});

cb.task('commit', [
    'build-all',
    '@sh git add .',
    '@sh git commit -m "$CB_CLI_TRAILING"',
    '@sh git push origin master'
]);
