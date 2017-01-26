const cb = require('cb');

cb.task('css', {
    tasks: '@npm node-sass src/style.scss dest/style.css',
    ifChanged: ['src']
});