const path = require('path');
// const webpack = require('webpack');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react'],
        },        
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }      
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
