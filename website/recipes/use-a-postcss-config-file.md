# Use a PostCSS config file

```js title="craco.config.js"
const { POSTCSS_MODES } = require('@craco/craco');

module.exports = {
  style: {
    postcss: {
      mode: POSTCSS_MODES.file,
    },
  },
};
```

```js title="postcss.config.js"
module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
  ],
};
```
