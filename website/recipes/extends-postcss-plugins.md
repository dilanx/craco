# Extends PostCSS plugins

```js title="craco.config.js"
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('cssnano')({
          preset: 'default',
        }),
      ],
    },
  },
};
```
