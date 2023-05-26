const webpack = require('webpack');
const isDevelopment = false;
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('autoprefixer')()
      ]
    }
  }
};
