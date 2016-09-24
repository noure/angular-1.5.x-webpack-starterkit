const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const path = require('path');
const fs = require('fs');

webpackConfig.plugins = [];
const bundleStart = null;
const compiler = Webpack(webpackConfig);

compiler.plugin('compile', function() {
  console.log('Bundling...');
  bundleStart = Date.now();
});

compiler.plugin('done', function() {
  console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
});

const bundler = new WebpackDevServer(compiler, {
  publicPath: '/',
  hot: true,
  quiet: false,
  noInfo: true,
  stats: {
    colors: true
  },
});

bundler.listen(8080, 'localhost', function () {
  console.log('Bundling project, please wait...');
});
