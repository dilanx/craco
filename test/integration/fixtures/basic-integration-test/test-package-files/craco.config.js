const webpack = require('webpack');
const isDevelopment = false;
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          __CUSTOM_GLOBAL_CONSTANT__: JSON.stringify('CRACO is working!'),
        })
      );

      return webpackConfig;
    },
  },
};
