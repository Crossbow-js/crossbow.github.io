const cb = require('crossbow');

cb.task('build', 'my-npm-module')
  .options({
      input: [
          './app/global.scss',
          './app/home.scss',
          './app/product.scss'
      ]
  });
