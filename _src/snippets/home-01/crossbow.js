module.exports = {
    tasks: {
        build: [
            'styles',
            'scripts'
        ],
        scripts: [
            '@sh rm -rf ./dist',
            '@npm webpack'
        ],
        styles: {
            tasks: 'tasks/sass-task.js',
            options: {
                input: 'app/scss',
                output: 'dist/css'
            }
        }
    }
};
