const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const PUBLIC_PATH = '/';

module.exports = {
  entry: {
    popup: './src/index.ts',
    background: './src/scripts/background/background.ts',
    content: './src/scripts/content/hotReload.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: PUBLIC_PATH,
  },
  watch: true,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /public\/icons\/.*\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: PUBLIC_PATH,
              outputPath: 'icons',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'silent-friday-music',
      template: './index.html',
    }),
    new CopyPlugin([
      {
        from: './manifest.json',
        dest: PUBLIC_PATH,
      },
    ]),
  ],
};
