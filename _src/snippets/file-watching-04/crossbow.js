module.exports = {
    watch: {
        css: {
            './app/scss:./legacy/scss': ['css', 'autoprefixer']
        },
        php: {
            '\*\*/\*.php': ['browser:reload']
        }
    }
}