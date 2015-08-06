const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const config = require('config');
const sassLoaders = [
  'css-loader?sourceMap',
  'autoprefixer-loader?browsers=last 2 version',
  'sass-loader?sourceMap&outputStyle=expanded'
];

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:' + config.port,
      'webpack/hot/dev-server',
      path.resolve(__dirname, 'app', 'app.js')
    ],
    vendor: ['jquery', 'underscore']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [path.resolve(__dirname, 'node_modules')]
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
    },
    {
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('[name].css'),
    new TransferWebpackPlugin([
      { from: 'fonts', to: 'fonts' },
      { from: 'images', to: 'images' }
    ], path.resolve(__dirname, 'assets')),
    new webpack.HotModuleReplacementPlugin(),
    new CleanPlugin(['build'])
  ],
  resolve: {
    extensions: ['', '.js', '.scss', '.hbs'],
    modulesDirectories: ['assets', 'node_modules']
  },
};