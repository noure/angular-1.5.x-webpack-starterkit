'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Webpack = require('webpack');

const webpackConfig = {
  appRoot: 'src/app/',
  publicPath: 'dist',
  entry: {
    bootstrap: ['./src/app/bootstrap.js'],
    vendors: ['angular']
	}
};

module.exports = {
  entry: webpackConfig.entry,
	output: {
    publicPath: webpackConfig.publicPath,
		path: path.join(__dirname, webpackConfig.publicPath),
		filename: 'www/js/[name].bundle.js',
		chunkFilename: 'www/js/[id].chunk.js'
	},
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([
      path.join(__dirname, webpackConfig.publicPath)
    ], {
      root: path.join(__dirname),
      verbose: true,
      dry: false,
      exclude: []
    })
  ],
	resolve: {
		extensions: ['', '.js', '.es6']
	}
}
