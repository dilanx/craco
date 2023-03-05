# Use Ant Design

```js title="craco.config.js"
// Official documentation available at: https://github.com/FormAPI/craco-antd

module.exports = {
  plugins: [
    {
      plugin: require('craco-antd'),
      options: {
        customizeTheme: {
          '@primary-color': '#1DA57A',
        },
        lessLoaderOptions: {
          noIeCompat: true,
        },
      },
    },
  ],
};
```
