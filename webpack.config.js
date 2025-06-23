const path = require('path');

module.exports = {
  mode: 'production', // or 'production' for production builds
  entry: {
    connect: './src/connect.js',
    disconnect: './src/disconnect.js',
    sendMessage: './src/sendMessage.js'
  },
  target: 'node',
  output: {
    filename: '[name].js', // Output bundle name
    libraryTarget: 'commonjs2', // Important for AWS Lambda
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      },
    ],
  }
};