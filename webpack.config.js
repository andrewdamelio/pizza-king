const path = require('path');
const webpack = require('webpack');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-hot-middleware/client');
  }

  return sources;
}

const  magicGlobal = new webpack.DefinePlugin({
  __DEV__: process.env.NODE_ENV !== 'production',
});


module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : '',
  entry: {
    bundle: getEntrySources(['./src/app']),
  },
  output: {
    publicPath: '/dist/',
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: process.env.NODE_ENV !== 'production' ?
    [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      magicGlobal,
    ] :
    [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      magicGlobal,
    ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader!cssnext-loader',
      },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader?stage=0', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?prefix=img/&limit=5000',
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?prefix=font/&limit=5000',
      },
    ],
  },
};
