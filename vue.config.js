const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
    configureWebpack: {
      plugins: [
        // new BundleAnalyzerPlugin()
      ]
      // resolve: {
      //   alias: {
      //     "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      //   }
      // }
    }
  }