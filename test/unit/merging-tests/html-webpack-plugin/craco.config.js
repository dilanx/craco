module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const HtmlWebpackPlugin = require('html-webpack-plugin');

      // Find the HtmlWebpackPlugin in the plugins array
      const htmlWebpackPluginIndex = webpackConfig.plugins.findIndex(
        (plugin) => plugin instanceof HtmlWebpackPlugin
      );

      if (htmlWebpackPluginIndex >= 0) {
        // Create a new HtmlWebpackPlugin instance with the custom title
        const updatedHtmlWebpackPlugin = new HtmlWebpackPlugin({
          ...webpackConfig.plugins[htmlWebpackPluginIndex].userOptions,
          title: 'My Custom Title',
        });

        // Replace the original HtmlWebpackPlugin instance with the updated one
        webpackConfig.plugins.splice(
          htmlWebpackPluginIndex,
          1,
          updatedHtmlWebpackPlugin
        );
      }

      return webpackConfig;
    },
  },
};
