module.exports = {
    env: {
        IMAGE: 'shakyshane/crossbow-web',
        PROD_FILE: 'docker-compose.prod.yaml'
    },
    tasks: {
        '(docker)': {
            'push': '@sh docker push $IMAGE',
            'build': {
                tasks: '@sh docker build -t $IMAGE .',
                env: {
                    IMAGE: 'oops'
                }
            }
        }
    }
};