const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const css = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: {
    main: './examples/src/index.tsx',
  },
  mode: process.env.NODE_ENV === 'production'
    ? 'production'
    : 'development',
  resolve: {
    extensions: ['.jsx', '.tsx', '.ts', '.scss', '.css', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'examples/build'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples/build'),
    port: 8000,
    hot: true,
    inline: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.example.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg|.png/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/src/index.ejs',
    }),
    new css({
      filename: 'main.css',
    }),
  ]
}
