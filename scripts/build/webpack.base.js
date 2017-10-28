const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const helpers = require('./helpers')
const tslintConfig = require('../../tslint.json')
const pkg = require('../../package.json')
const isDebug = process.env.DEBUG || 'false'

module.exports = {
  entry: {
    'polyfills': './client/polyfills.ts',
    'vendor': './client/vendor.ts',
    'app': './client/main.ts',
  },
  
  resolve: {
    extensions: ['.ts', '.js'],
  },
  
  module: {
    rules: [
      {
        test: /\.ts/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
        options: {
          configuration: tslintConfig,
        },
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('client', 'tsconfig.json') },
          },
          'angular2-template-loader',
          'angular-router-loader',
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'url-loader?name=assets/[name].[hash].[ext]',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.css$/,
        include: helpers.root('client', 'app'),
        loader: 'raw-loader',
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'raw-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(xmb|xlf)$/,
        loader: 'raw-loader',
      },
    ],
    // clear critical dependency warning
    exprContextCritical: false,
  },
  
  plugins: [
    // angular issues#11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./client'),
      {}
    ),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'],
    }),
    
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
  
    new webpack.DefinePlugin({
      __DEBUG__: isDebug,
      __CONFIG__: {
        version: JSON.stringify(pkg.version),
      },
    }),
  ],
}
