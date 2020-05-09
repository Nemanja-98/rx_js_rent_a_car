const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.ts?$/, loader: "awesome-typescript-loader" },
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			inject: 'body'
    })
  ],
  devServer: {
        hot: true,
        historyApiFallback: true,
	}
};