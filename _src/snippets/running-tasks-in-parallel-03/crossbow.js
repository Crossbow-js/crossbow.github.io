module.exports = {
    tasks: {
        build: {
            tasks: [
                '@npm webpack',
                '@npm webpack --config webpack.prod.js'
            ],
            runMode: 'parallel'
        }
    }
};