module.exports = {
    tasks: {
        build: [
            'clean',
            'styles',
            ['lint', 'html', 'scripts', 'images', 'copy'],
            'generate-service-worker'
        ]
    }
};