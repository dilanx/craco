module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Add a custom loader for SVG files
      webpackConfig.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      // Ensure webpackConfig.resolve exists
      if (!webpackConfig.resolve) {
        webpackConfig.resolve = {};
      }

      // Add an alias
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@components': './src/components',
      };

      // Update output folder
      webpackConfig.output.path = '/dist/custom';

      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      // Add an additional Babel plugin
      'babel-plugin-transform-class-properties',
    ],
  },
};
