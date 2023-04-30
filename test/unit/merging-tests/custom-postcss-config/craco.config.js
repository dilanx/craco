module.exports = {
  style: {
    postcss: {
      plugins: [require('autoprefixer'), require('postcss-nested')],
    },
  },
};
