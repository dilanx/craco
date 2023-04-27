const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cracoConfig = require('./craco.config');

describe('CRACO HtmlWebpackPlugin configuration', () => {
  it('correctly applies custom HtmlWebpackPlugin configuration', async () => {
    const webpackConfig = {
      mode: 'development',
      plugins: [new HtmlWebpackPlugin()],
    };

    // Apply custom configuration to the webpack config
    const newWebpackConfig = cracoConfig.webpack.configure(webpackConfig, {});

    // Find the HtmlWebpackPlugin in the newWebpackConfig
    const htmlWebpackPlugin = newWebpackConfig.plugins.find(
      (plugin) => plugin instanceof HtmlWebpackPlugin
    );

    // Test if the custom title is set
    expect(htmlWebpackPlugin.userOptions.title).toEqual('My Custom Title');
  });
});
