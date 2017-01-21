module.exports = {
    watch: {
        default: {
            watchers: [
                {
                    patterns: ['./app/scss', './legacy/scss'],
                    tasks: ['css', 'autoprefixer']
                },
                {
                    patterns: ['\*\*/\*.php'],
                    tasks: ['browser:reload']
                }
            ]
        }
    },
    tasks: {
        css: {
            tasks: 'my-scss-module',
            options: {
                input: './app/scss/core.scss',
                output: './dist/css'
            }
        }
    }
};