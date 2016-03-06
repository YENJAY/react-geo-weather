'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

// App files location
const DIRS = {
  scripts: path.join(__dirname, 'src/js'),
  styles: path.join(__dirname, 'src/css'),
  images: path.join(__dirname, 'src/img'),
  html: path.join(__dirname, 'src/index.html'),
  build: path.join(__dirname, 'build')
};

var plugins = [
  new CopyWebpackPlugin([
    { from: DIRS.html },
    { from: DIRS.styles },
    { from: DIRS.images }
  ]),
  new webpack.DefinePlugin({
    DEBUG: isDevelopment
  }),
  new webpack.NoErrorsPlugin()
];

if (!isDevelopment) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }));
}

module.exports = {
  entry: path.join(DIRS.scripts, 'main.js'),
  output: {
    path: DIRS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    noParse: [
      /\.min\.js/
    ],
    loaders: [
      {
        test: DIRS.scripts,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: DIRS.build,
    historyApiFallback: true
  },
  stats: {
    colors: true,
    reasons: isDevelopment
  },
  devtool: 'source-map'
};
