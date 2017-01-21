const cb = require('crossbow');

cb.task('watch', ['markdown', function() {
    cb.watch('./app/\*.md', ['markdown']);
}]);

cb.task('markdown', {
    tasks: 'my-md-module',
    options: {
        input: 'app/\*\*/\*.md'
    }
});