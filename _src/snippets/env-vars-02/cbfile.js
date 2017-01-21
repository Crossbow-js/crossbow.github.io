const cb = require('crossbow');

cb.env({
    IMAGE: 'shakyshane/crossbow-web',
    PROD_FILE: 'docker-compose.prod.yaml'
});

cb.group('docker', {
    'push': '@sh docker push $IMAGE',
    'build': {
        tasks: '@sh docker build -t $IMAGE .',
        env: {
            IMAGE: 'oops'
        }
    }
});
