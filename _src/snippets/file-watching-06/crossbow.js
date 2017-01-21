module.exports = {
    watch: {
        css: {
            options: {
                debounce: 500 // <-- this will affect all watchers
            },
            watchers: [
                {
                    patterns: ['./app/scss', './legacy/scss'],
                    tasks: ['css', 'autoprefixer']
                }
            ]
        },
        php: {
            '\*\*/\*.php': ['browser:reload']
        }
    }
}