import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './index.js'],
    common: ['babel-polyfill', 'react-dom', 'react'],
  },
  output: {
    path: path.join(__dirname, '_public'),
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].chunk.js',
    publicPath: '',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: [path.join(__dirname, '../../src'), path.join(__dirname)],
        exclude: path.join(__dirname, 'node_modules'),
        loader: 'babel',
      },
      {
        test: /\.css$/,
        include: [path.join(__dirname)],
        loader:
          'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
      },
    ],
  },
  postcss: () => [autoprefixer()],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  node: {
    fs: 'empty',
  },
};
