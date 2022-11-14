# Use markdown-loader

```js title="craco.config.js"
// Import Markdown files as HTML into your React Application
// <https://github.com/peerigon/markdown-loader>

const { addBeforeLoader, loaderByName } = require('@craco/craco');

// Additional configuration for Typescript users: add `declare module '*.md'` to your `index.d.ts` file.

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.extensions.push('.md');

      const markdownLoader = {
        test: /\.md$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('html-loader'),
          },
          {
            loader: require.resolve('markdown-loader'),
            options: {
              // see <https://marked.js.org/using_advanced#options>
            },
          },
        ],
      };

      addBeforeLoader(
        webpackConfig,
        loaderByName('file-loader'),
        markdownLoader
      );

      return webpackConfig;
    },
  },
};
```
