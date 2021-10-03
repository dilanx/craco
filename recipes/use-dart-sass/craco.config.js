/**
 * This example shows how to configure the sass-loader for Dart Sass.
 * Note: Only Dart Sass ('sass') currently supports @use.
 */
module.exports = {
  style: {
    sass: {
      loaderOptions: {
        // Prefer 'sass' (dart-sass) over 'node-sass' if both packages are installed.
        implementation: require("sass"),
        // Workaround for this bug: https://github.com/webpack-contrib/sass-loader/issues/804
        webpackImporter: false,
      },
    },
  },
}
