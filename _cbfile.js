const cb      = require('crossbow');

function serveStatic() {
    const bs      = require('browser-sync').create();
    const html    = require('bs-html-injector');
    bs.init({
        server: ['public-html', 'public', 'node_modules'],
        logFileChanges: false,
        plugins: ['bs-html-injector']
    });
    cb.watch('scss', ['sass', () => bs.reload('core.css')], {debounce: 500});
    cb.watch(['_src', 'data'], ['html', () => {html()}], {
        debounce: 500
    });
    cb.watch('public/img/svg', ['icons', 'html', () => bs.reload()]);
}

cb.task('serve', {
    description: 'Build all HTML + assets and start Browsersync',
    tasks: ['build-all', serveStatic]
});

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
            '_src/docs/**/*.{md,html,hbs}',
        ],
        output: 'public-html'
    }
});

cb.task('icons', function svgIcons () {
    const vfs = require('vinyl-fs');
    return vfs.src('public/img/svg/*.svg')
        .pipe(require('easy-svg').stream())
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

cb.env({
    AUTH: 'root@178.62.56.143',
    DO_IP: '178.62.56.143',
    LIVE_URL: 'http://178.62.56.143',
    DO_USER: 'root',
    DOCKER_NAME: 'crossbow'
});

cb.task('ssh', '@sh ssh $AUTH');

cb.group('docker', {
    'prod': [
        'build-all',
        'docker:build'
    ],
    build: '@sh docker build -t crossbow-web .'
});

cb.task('docker-restart', [
    '@sh ssh $AUTH "docker exec crossbow rm -rf /var/ngx_pagespeed_cache"',
    '@sh ssh $AUTH "docker restart crossbow"',
]);

cb.task('open', ['@sh open $LIVE_URL']);
