const path = require('path');

module.exports = {
  entry: ['babel-polyfill','./src/index.ts'],
  devtool: 'inline-source-map',
  resolve: {
    extentions: ['.ts','.js','.json']
  },
  output: {
    path:  __dirname + '/dist',
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.m?.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      // {
      //   test: /\.ts$, loader: "ts-loader"
      // }
    ]
  },
  devServer: {
         contentBase: './dist',
         hot:true,
       },
};