const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
console.log(slsw.lib.entries);
module.exports = {
  entry: slsw.lib.entries,
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  devtool: 'nosources-source-map',
  // externals: [nodeExternals()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  },
  target: 'node',
};
