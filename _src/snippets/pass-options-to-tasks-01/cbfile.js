const cb = require('crossbow');

cb.task('build', [
    'my-npm-module --input ./app/global.scss',
    'my-npm-module --input ./app/home.scss',
    'my-npm-module --input ./app/product.scss'
]);
