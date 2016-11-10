"use strict";

let path              = require('path');
let webpack           = require('webpack');
let autoprefixer      = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './index.js',
    common: [
      'babel-polyfill',
      'react-dom',
      'react'
    ]
  },
  output: {
    path: path.join(__dirname, '_public'),
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].chunk.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: ['common', 'manifest']}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({template: './index.html'})
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      include: [
        path.join(__dirname, '../src'),
        path.join(__dirname, './index.js')
      ],
      loader: 'babel-loader',
      options: {
        presets: [
          require.resolve('babel-preset-react-hmre'),
          ['es2015', {'modules': false}],
          'react',
          'stage-3'
        ]
      }
    }, {
      test: /\.css$/,
      include: [
        path.join(__dirname, './')
      ],
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')
            ]
          }
        },
      ]
    }]
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: [".js", ".json", ".jsx", ".css"]
  }
};
