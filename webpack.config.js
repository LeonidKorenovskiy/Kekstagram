const path = require('path'); //импорт path
const _ = require('lodash'); // импорт лодаш

module.exports = {
  entry: './source/js/main.js', //точка входа
  devtool: 'source-map', // построение карты кода

  output:{
    filename: 'main-bundle.js',
    path: path.resolve(__dirname, './build/js')
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
}
