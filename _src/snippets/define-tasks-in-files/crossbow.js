module.exports = {
    tasks: {
        build: [
            '@sh rm -rf ./dist',
            '@npm webpack'
        ]
    }
};