module.exports = {
    tasks: {
        'docker-up': {
            tasks: '@sh docker-compose -f $FILE up -d',
            env: {
                FILE: 'docker-compose.prod.yml'
            }
        }
    }
};