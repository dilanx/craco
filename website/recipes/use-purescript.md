# Use PureScript

```js title="craco.config.js"
// Use PureScript in React Application
// <https://www.purescript.org>

const { addBeforeLoader, loaderByName } = require('@craco/craco');
const path = require('path');

// Detect watch
// <https://github.com/purescript/spago#get-started-from-scratch-with-webpack-frontend-projects>
const isWatch = process.argv.some((a) => a === '--watch');
const isWebpackDevServer = process.argv.some(
  (a) => path.basename(a) === 'webpack-dev-server'
);

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const { resolve } = webpackConfig;

      // Resolve purescript extension
      resolve.extensions.push('.purs');

      // Allow imports outside of `src` folder for purescript dependencies
      webpackConfig.resolve.plugins = resolve.plugins.filter(
        ({ constructor: c }) => !c || c.name !== 'ModuleScopePlugin'
      );

      // PureScript loader
      const pursLoader = {
        loader: 'purs-loader',
        test: /\.purs$/,
        exclude: /node_modules/,
        query: {
          src: ['src/**/*.purs'],
          spago: true,
          pscIde: true,
          watch: isWebpackDevServer || isWatch,
        },
      };

      // Append purs-loader before file-loader
      addBeforeLoader(webpackConfig, loaderByName('file-loader'), pursLoader);

      return webpackConfig;
    },
  },
};
```
