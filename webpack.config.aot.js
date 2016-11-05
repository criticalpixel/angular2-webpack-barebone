'use strict';

const webpack = require("webpack");
const helpers = require('./config/helpers');
//plugins
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

//When in Prod mode .. ( separate this later...)
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
module.exports = {
  entry: {
    main: "./src/main.aot.browser.ts",
    vendors: "./src/vendor.browser.ts",
    polyfills: "./src/polyfills.browser.ts",
  },
  output: {
    path: helpers.root('dist'),
    filename: "[name].bundle.js",
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
  	extensions: ['.js', '.ts'],
  	 modules: [helpers.root('src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader?loader=system&genDir=src/compiled/src/app&aot=true'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
  	new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js",
      minChunks: 2,
    }),
    new ForkCheckerPlugin(),
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    ),
    new HtmlWebpackPlugin({
    	template: 'src/index.html',
    	chunksSortMode: 'dependency',
    	inject:'head'
    }),
    new NamedModulesPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true, //debug


      beautify: false, //prod
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings:false,
        keep_fnames: false,
      }, //prod
      comments: false, //prod
    }),
  ],
  devServer: {
    contentBase: './src/compiled',
    port: 4200,
    historyApiFallback: {
      disableDotRule: true,
    }
  },
  node: {
    global: true,
    process: true,
    Buffer: false,
    crypto: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    clearTimeout: true,
    setTimeout: true
  }
};