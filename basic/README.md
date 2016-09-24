

### NPM Commands
```
npm start
npm build
```

### Starterkit setup

*Install NPM Modules*
```bash
npm install --save angular@1.5.8
npm install --save-dev babel-loader
npm install --save-dev babel-core
npm install --save-dev babel-preset-es2015
npm install --save-dev clean-webpack-plugin
npm install --save-dev file-loader
npm install --save-dev webpack-dev-server
```

*create new file `.babelrc`*
```json
{
  "presets": ["es2015"]
}
```

*create new file `webpack.server.js`*
```js
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
```

*create new file `webpack.config.js`*
```js
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

```

*create `src/app/bootstrap.js`*
*create `src/bootstrap/index.html`*

*append to package.json*
```
//**
"scripts": {
  "start": "npm run build && node webpack.server.js",
  "build": "node ./node_modules/webpack/bin/webpack"
},
//**
```
