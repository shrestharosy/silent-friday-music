const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src", "index.ts"),
    background: path.join(__dirname, "src", "scripts", "background", "background.ts"),
    content: path.join(__dirname, "src", "scripts", "content", "hotReload.js")
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].js"
  },
  watch: true,
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "demo"
    })
  ]
};
