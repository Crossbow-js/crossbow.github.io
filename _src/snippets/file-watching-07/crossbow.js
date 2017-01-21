module.exports = {
    watch: {
        html: {
            watchers: [
                {
                    patterns: ['./app/\*.md'],
                    tasks: ['markdown']
                }
            ]
        }
    },
    tasks: {
        markdown: {
            tasks: 'my-md-module',
            options: {
                input: 'app/\*\*/\*.md'
            }
        }
    }
};