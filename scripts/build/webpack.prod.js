const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base')
const helpers = require('./helpers')

module.exports = webpackMerge(baseConfig, {
  
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js',
  },
  
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/angular/angular/issues/10618
    new webpack.optimize.UglifyJsPlugin({
      mangle: { keep_fnames: true },
      sourceMap: false,
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    
    new webpack.LoaderOptionsPlugin({
      htmlLoader: { minimize: true },
    }),
  ],
})
