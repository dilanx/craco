---
description: Hooks available to CRACO plugins
---

# Hooks

There are four hooks available to a plugin:

- [`overrideCracoConfig`](#overridecracoconfig) - customize the CRACO config object **before** it is processed by CRACO
- [`overrideWebpackConfig`](#overridewebpackconfig) - customize the Webpack config **after** it is processed by CRACO
- [`overrideDevServerConfig`](#overridedevserverconfig) - customize the DevServer config **after** it is processed by CRACO
- [`overrideJestConfig`](#overridejestconfig) - customize the Jest config **after** it is processed by CRACO

:::caution important

Every function **must** return the updated configuration object.

:::

## overrideCracoConfig

`overrideCracoConfig(data): CracoConfig`

`data` is an object with the following structure:

| Property        | Description                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| `cracoConfig`   | The config object read from the [CRACO config](../configuration/getting-started.md) provided by the consumer    |
| `pluginOptions` | The plugin options provided by the consumer                                                                     |
| `context`       | A [context object](../configuration/getting-started.md#context-object--env-paths-) containing `env` and `paths` |

This function must return a valid [CRACO config](../configuration/getting-started.md).

<details>
  <summary>Example</summary>

```js title="craco-log-plugin.js"
module.exports = {
  overrideCracoConfig: ({
    cracoConfig,
    pluginOptions,
    context: { env, paths },
  }) => {
    if (pluginOptions.preText) {
      console.log(pluginOptions.preText);
    }

    console.log(JSON.stringify(cracoConfig, null, 4));

    return cracoConfig;
  },
};
```

```js title="craco.config.js"
const logPlugin = require('./craco-log-plugin');

module.exports = {
  // ...
  plugins: [
    {
      plugin: logPlugin,
      options: { preText: 'CRACO CONFIG' },
    },
  ],
};
```

</details>

## overrideWebpackConfig

`overrideWebpackConfig(data): WebpackConfig`

`data` is an object with the following structure:

| Property        | Description                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| `webpackConfig` | The [Webpack config](https://webpack.js.org/configuration/) object already customized by CRACO                  |
| `cracoConfig`   | The config object read from the [CRACO config](../configuration/getting-started.md) provided by the consumer    |
| `pluginOptions` | The plugin options provided by the consumer                                                                     |
| `context`       | A [context object](../configuration/getting-started.md#context-object--env-paths-) containing `env` and `paths` |

This function must return a valid [Webpack config](https://webpack.js.org/configuration/).

<details>
  <summary>Example</summary>

```js title="craco-log-plugin.js"
module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    cracoConfig,
    pluginOptions,
    context: { env, paths },
  }) => {
    if (pluginOptions.preText) {
      console.log(pluginOptions.preText);
    }

    console.log(JSON.stringify(webpackConfig, null, 4));

    return webpackConfig;
  },
};
```

```js title="craco.config.js"
const logPlugin = require('./craco-log-plugin');

module.exports = {
  // ...
  plugins: [
    {
      plugin: logPlugin,
      options: { preText: 'WEBPACK CONFIG' },
    },
  ],
};
```

</details>

## overrideDevServerConfig

`overrideDevServerConfig(data): DevServerConfig`

`data` is an object with the following structure:

| Property          | Description                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `devServerConfig` | The [DevServer config](https://webpack.js.org/configuration/dev-server/#devserver) object already customized by CRACO                                                                             |
| `cracoConfig`     | The config object read from the [CRACO config](../configuration/getting-started.md) provided by the consumer                                                                                      |
| `pluginOptions`   | The plugin options provided by the consumer                                                                                                                                                       |
| `context`         | A [context object](../configuration/getting-started.md#context-object--env-paths-) ([DevServer-specific](../configuration/devserver.md#devserver-1)) containing `env`, `paths`, and `allowedHost` |

This function must return a valid [DevServer config](https://webpack.js.org/configuration/dev-server/#devserver).

<details>
  <summary>Example</summary>

```js title="craco-log-plugin.js"
module.exports = {
  overrideDevServerConfig: ({
    devServerConfig,
    cracoConfig,
    pluginOptions,
    context: { env, paths, allowedHost },
  }) => {
    if (pluginOptions.preText) {
      console.log(pluginOptions.preText);
    }

    console.log(JSON.stringify(devServerConfig, null, 4));

    return devServerConfig;
  },
};
```

```js title="craco.config.js"
const logPlugin = require('./craco-log-plugin');

module.exports = {
  // ...
  plugins: [
    {
      plugin: logPlugin,
      options: { preText: 'DEVSERVER CONFIG' },
    },
  ],
};
```

</details>

## overrideJestConfig

`overrideJestConfig(data): JestConfig`

`data` is an object with the following structure:

| Property        | Description                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `jestConfig`    | The [Jest config](https://jestjs.io/docs/configuration) object already customized by CRACO                                                                                                       |
| `cracoConfig`   | The config object read from the [CRACO config](../configuration/getting-started.md) provided by the consumer                                                                                     |
| `pluginOptions` | The plugin options provided by the consumer                                                                                                                                                      |
| `context`       | A [context object](../configuration/getting-started.md#context-object--env-paths-) ([Jest-specific](../configuration/jest.md#jestconfigure)) containing `env`, `paths`, `resolve`, and `rootDir` |

This function must return a valid [Jest config](https://jestjs.io/docs/configuration).

<details>
  <summary>Example</summary>

```js title="craco-log-plugin.js"
module.exports = {
  overrideJestConfig: ({
    jestConfig,
    cracoConfig,
    pluginOptions,
    context: { env, paths, resolve, rootDir },
  }) => {
    if (pluginOptions.preText) {
      console.log(pluginOptions.preText);
    }

    console.log(JSON.stringify(jestConfig, null, 4));

    return jestConfig;
  },
};
```

```js title="craco.config.js"
const logPlugin = require('./craco-log-plugin');

module.exports = {
  // ...
  plugins: [
    {
      plugin: logPlugin,
      options: { preText: 'JEST CONFIG' },
    },
  ],
};
```

</details>
