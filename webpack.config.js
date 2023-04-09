// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
'use strict'
module.exports = {
  module: {
    // entry: path.join(__dirname, "src", "index.js"),
    // output: {
    //   path: path.resolve(__dirname, "dist"),
    // },
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  },
  resolve: {
    alias: {
      "pg-native": "./dummy.js"

    }
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
  ],
  target: "node"
};