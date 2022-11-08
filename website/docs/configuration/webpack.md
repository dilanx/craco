---
description: Customize Webpack
---

# Webpack

<!-- prettier-ignore -->
```js title="craco.config.js"
module.exports = {
  // ...
  webpack: {
    alias: { /* ... */ },
    plugins: {
      add: [ /* ... */ ],
      remove: [ /* ... */ ],
    },
    configure: { /* ... */},
    configure: (webpackConfig, { env, paths }) => {
      /* ... */
      return webpackConfig;
    },
  },
};
```

:::tip

Properties listed twice in the outline above (for example, `configure`) can be assigned an **object literal** or a **function**. See [configuration tips](./getting-started.md#object-literals-and-functions) for details.

:::

## webpack.alias

`object`

See https://webpack.js.org/configuration/resolve/#resolvealias.

## webpack.plugins

### webpack.plugins.add

`[WebpackPlugin | [WebpackPlugin, 'append' | 'prepend']]`

An array of Webpack plugins to add: https://webpack.js.org/plugins/

You can specify whether or not each plugin is appended or prepended to the existing list of Webpack plugins. If not specified, the default is to prepend. Check out the following example:

```js title="craco.config.js"
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new CopyWebpackPlugin() /* this plugin will be prepended */,
        [new ESLintPlugin(), 'prepend'] /* this one, too */,
        [new HtmlPlugin(), 'append'] /* not this one though */,
      ],
    },
  },
};
```

### webpack.plugins.remove

`[string]`

An array of plugin constructor names to remove.

## webpack.configure

`WebpackConfig` or `(config: WebpackConfig, { env, paths }) => WebpackConfig`

Any Webpack configuration options: https://webpack.js.org/configuration/
