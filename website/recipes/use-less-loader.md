# Use less-loader

```js title="craco.config.js"
// Official documentation available at: https://github.com/FormAPI/craco-less

module.exports = {
  plugins: [
    {
      plugin: require('craco-less'),
      options: {
        noIeCompat: true,
      },
    },
  ],
};
```
