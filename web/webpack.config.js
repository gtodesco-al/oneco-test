/* eslint-disable */
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 9000,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  optimization: {
    usedExports: true,
  },
}
