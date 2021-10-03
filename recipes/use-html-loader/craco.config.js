/**
 * To use this, ensure you have added `html-loader` as a dev dependency in your `package.json` first
 * Learn more: https://github.com/webpack-contrib/html-loader
 */
const { loaderByName, addBeforeLoader } = require("@craco/craco")

module.exports = {
  webpack: {
    configure: webpackConfig => {
      webpackConfig.resolve.extensions.push(".html")

      const htmlLoader = {
        loader: require.resolve("html-loader"),
        test: /\.html$/,
        exclude: /node_modules/,
      }

      addBeforeLoader(webpackConfig, loaderByName("file-loader"), htmlLoader)

      return webpackConfig
    },
  },
}
