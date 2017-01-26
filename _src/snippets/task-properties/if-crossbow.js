module.exports = {
    tasks: {
        css: {
            tasks: '@npm node-sass src/style.scss dest/style.css',
            ifChanged: ['src']
        }
    }
};