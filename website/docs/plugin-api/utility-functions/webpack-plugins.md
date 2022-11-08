# Webpack Plugins

Utility functions for [Webpack plugins](https://webpack.js.org/plugins/)

```js
const {
  pluginByName,
  getPlugin,
  addPlugins,
  removePlugins,
} = require('@craco/craco');
```

## Functions

### pluginByName

`pluginByName(targetPluginName: string): PluginMatcher`

Returns a [plugin matcher](#pluginmatcher) function to be used with other plugin utility functions to match a name to an existing plugin. This name is the plugin's constructor (`plugin.constructor.name`).

### getPlugin

`getPlugin(webpackConfig: WebpackConfig, matcher: PluginMatcher)`

Retrieve the **first** plugin for which the matcher returns true from the Webpack config.

#### Return Type

```
{
  isFound: boolean;
  match: WebpackPlugin;
}
```

#### Usage

```js
const { getPlugin, pluginByName } = require('@craco/craco');

const { isFound, match } = getPlugin(
  webpackConfig,
  pluginByName('ESLintWebpackPlugin')
);

if (isFound) {
  // do stuff...
}
```

### addPlugins

`addPlugins(webpackConfig: WebpackConfig, plugins: [WebpackPlugin | [WebpackPlugin, 'append' | 'prepend']]): void`

Add new plugins to the Webpack config. Plugins are added with the [same syntax used within the CRACO config](../../configuration/webpack.md#webpackpluginsadd).

#### Usage

```js
const { addPlugins } = require('@craco/craco');

const myNewWebpackPlugin = require.resolve('ESLintWebpackPlugin');

addPlugins(webpackConfig, [myNewWebpackPlugin]);
addPlugins(webpackConfig, [[myNewWebpackPlugin, 'append']]);
addPlugins(webpackConfig, [[myNewWebpackPlugin, 'prepend']]);
```

### removePlugins

`removePlugins(webpackConfig: WebpackConfig, matcher: PluginMatcher)`

Remove **all** of the plugins for which the matcher returns true from the Webpack config.

#### Return Type

```
{
  hasRemovedAny: boolean;
  removedCount: number;
}
```

#### Usage

```js
const { removePlugins, pluginByName } = require('@craco/craco');

removePlugins(webpackConfig, pluginByName('ESLintWebpackPlugin'));
```

## Reference

### WebpackConfig

See https://webpack.js.org/configuration/.

### PluginMatcher

A loader matcher should return true if the provided plugin matches the specified criteria. The function is of the following type:

```
(plugin: WebpackPlugin) => boolean;
```

### WebpackPlugin

See https://webpack.js.org/plugins/.
