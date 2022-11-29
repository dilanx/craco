# Use html-loader

```js title="craco.config.js"
/**
 * To use this, ensure you have added `html-loader` as a dev dependency in your `package.json` first
 * Learn more: https://github.com/webpack-contrib/html-loader
 */
const { loaderByName, addBeforeLoader } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.extensions.push('.html');

      const htmlLoader = {
        loader: require.resolve('html-loader'),
        test: /\.html$/,
        exclude: /node_modules/,
      };

      addBeforeLoader(webpackConfig, loaderByName('file-loader'), htmlLoader);

      return webpackConfig;
    },
  },
};
```

```ts title="typings.d.ts"
/**
 * To resolve "Cannot find module error on importing html file in webpack" if you use Typescript
 * Usage: import foo from './foo.html';
 */
declare module '*.html' {
  const value: string;
  export default value;
}
```
