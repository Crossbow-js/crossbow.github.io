module.exports = {
    build: ['styles', 'scripts'],
    scripts: [
        '@sh rm -rf ./dist',
        '@npm webpack --optimize'
    ],
    styles: {
        tasks: 'sass-task.js',
        options: {
            input: 'app/scss',
            output: 'dist/css'
        }
    }
};