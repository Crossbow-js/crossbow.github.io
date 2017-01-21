const cb = require('crossbow');

cb.task('webpack-dev', '@npm webpack');
cb.task('webpack-dev', '@npm webpack --config webpack.prod.js');
