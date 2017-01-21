module.exports = {
    watch: {
        options: {
            debounce: 500 // <-- this will affect all watchers
        },
        css: {
            './app/scss:./legacy/scss': ['css', 'autoprefixer']
        },
        php: {
            '\*\*/\*.php': ['browser:reload']
        }
    }
}