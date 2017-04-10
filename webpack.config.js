var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './assets/Javascript',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
      { test: /\.sass$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
