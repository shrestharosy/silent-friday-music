const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotEnv = require('./env/dot-env');

const PUBLIC_PATH = '/';

module.exports = {
  entry: {
    popup: './src/index.tsx',
    background: './src/scripts/background/index.tsx',
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
        test: /public\/assets\/images\/.*\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/public/assets/images',
              outputPath: '/public/assets/images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'silent-friday-music',
      chunks: ['popup'],
      template: './index.html',
    }),
    new CopyPlugin([
      {
        from: './manifest.json',
        dest: PUBLIC_PATH,
      },
    ]),
    new webpack.DefinePlugin({
      environment: JSON.stringify('development'),
      envConfig: JSON.stringify(dotEnv.getEnvConfig('development')),
    }),
  ],
};
