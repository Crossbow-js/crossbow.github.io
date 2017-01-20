module.exports = {
    tasks: {
        build: {
            tasks: 'my-npm-module',
            options: {
                input: [
                    './app/global.scss',
                    './app/home.scss',
                    './app/product.scss'
                ]
            }
        }
    }
};