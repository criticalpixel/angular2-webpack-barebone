const webpack = require('webpack');
const helpers = require('./helpers');

const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {
  isProd = options.env === 'production';
  return {
    entry: {

      'polyfills': './src/polyfills.browser.ts',
      'vendor': './src/vendor.browser.ts',
      'main': './src/main.browser.ts'

    },
    resolve: {

      extensions: ['.ts', '.js', '.json'],

      modules: [helpers.root('src'), 'node_modules'],

    },
    module: {

      rules: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        // {
        //   test: /\.css$/,
        //   loaders: ['to-string-loader', 'css-loader']
        // },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        },

      ],

    },

    plugins: [


      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      new HtmlWebpackPlugin(),

      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      )



    ],


    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}
