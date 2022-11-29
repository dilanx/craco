# Add PostCSS features

```js title="craco.config.js"
module.exports = {
  style: {
    postcss: {
      env: {
        stage: 3,
        features: {
          'nesting-rules': true,
        },
      },
    },
  },
};
```
