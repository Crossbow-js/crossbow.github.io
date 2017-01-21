module.exports = {
    tasks: {
        build: [
            'clean',
            'styles',
            'assets',
            'generate-service-worker'
        ],
        assets: {
            tasks: ['lint', 'html', 'scripts', 'images', 'copy'],
            runMode: parallel
        }
    }
};