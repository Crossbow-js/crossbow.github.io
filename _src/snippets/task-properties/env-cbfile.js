const cb = require('crossbow');

cb.task('docker-up', {
    tasks: '@sh docker-compose -f $FILE up -d',
    env: {
        FILE: 'docker-compose.prod.yml'
    }
});