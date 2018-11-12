// Install the craco-less plugin:
//
// Yarn:   yarn add craco-less
// NPM:    npm i -S craco-less
//
// craco-less documentation: https://github.com/ndbroadbent/craco-less

const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // less-loader options
        // See: https://webpack.js.org/loaders/less-loader/
      }
    },
  ],
};
