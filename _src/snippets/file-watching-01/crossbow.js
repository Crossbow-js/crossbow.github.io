module.exports = {
    watch: {
        default: {
            watchers: [
                {
                    patterns: './app/scss',
                    tasks: 'css'
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