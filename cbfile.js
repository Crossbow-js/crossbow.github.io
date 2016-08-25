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
        input: [
            '_src/*.hbs',
            '_src/docs/**/*.md',
            '_src/docs/**/*.hbs',
        ],
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

cb.task('deploy', [
    'build-all',
    'rsync',
    'docker-restart',
    '@sh open $LIVE_URL'
]);

cb.task('rsync', {
    description: 'Copy files from local to remote server',
    tasks: [
        '@sh rsync -rav public public-html docker-compose.yaml nginx.conf $AUTH:~/$DOCKER_NAME --delete'
    ]
});

cb.env({
    AUTH: 'root@178.62.56.143',
    DO_IP: '178.62.56.143',
    LIVE_URL: 'http://178.62.56.143',
    DO_USER: 'root',
    DOCKER_NAME: 'crossbow'
});

cb.task('docker-start', [
    '@sh ssh $AUTH "docker run -d --name crossbow -p 80:80 -v $(pwd):/usr/share/nginx/html -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf donbeave/nginx-pagespeed:1.8.0-1"'
]);

cb.task('docker-restart', [
    '@sh ssh $AUTH "docker restart crossbow"'
]);
