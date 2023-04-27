module.exports = {
  style: {
    postcss: {
      plugins: [
        {
          plugin: require('autoprefixer'),
          options: {
            grid: 'autoplace',
            overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 11'],
          },
        },
      ],
    },
  },
};
