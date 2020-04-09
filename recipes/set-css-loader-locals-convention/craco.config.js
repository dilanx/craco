/**
 * This example shows how to add the localsConvention option to the css-loader.
 * Useful if you like to write CSS/SASS classes using BEM notation in css modules.
 * https://github.com/webpack-contrib/css-loader#localsconvention
 */
module.exports = {
  style: {
    css: {
      loaderOptions: {
        localsConvention: "camelCase",
      }
    },
  }
}
