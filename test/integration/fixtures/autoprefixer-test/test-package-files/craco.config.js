const webpack = require('webpack');
const isDevelopment = false;
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (!isDevelopment) {
        const reactRefreshPluginIndex = webpackConfig.plugins.findIndex(
          (plugin) => plugin.constructor.name === 'ReactRefreshPlugin'
        );

        if (reactRefreshPluginIndex !== -1) {
          webpackConfig.plugins.splice(reactRefreshPluginIndex, 1);
        }

        const babelLoader = webpackConfig.module.rules
          .find(
            (rule) =>
              rule.oneOf &&
              rule.oneOf.find(
                (r) => r.loader && r.loader.includes('babel-loader')
              )
          )
          .oneOf.find((r) => r.loader && r.loader.includes('babel-loader'));

        const reactRefreshBabelIndex = babelLoader.options.plugins.findIndex(
          (plugin) =>
            plugin && plugin.includes && plugin.includes('react-refresh/babel')
        );

        if (reactRefreshBabelIndex !== -1) {
          babelLoader.options.plugins.splice(reactRefreshBabelIndex, 1);
        }
      }
      return webpackConfig;
    },
  },
  style: {
    postcss: {
      plugins: [
        require('autoprefixer')()
      ]
    }
  }
};
