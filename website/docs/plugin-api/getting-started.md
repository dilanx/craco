---
description: Get started with CRACO plugin development
---

# Getting Started

CRACO has a nice plugin API. You can view a list of [community maintained plugins](/plugins) or develop your own.

## Develop a plugin

CRACO provides a bunch of [hooks](./hooks.md) and [utility functions](../../category/utility-functions) to make plugin development easy. A plugin is structured using the four hooks (all are optional):

```js title="craco-example-plugin.js"
module.exports = {
  overrideCracoConfig: ({ cracoConfig, pluginOptions, context }) => {
    /* ... */
    return cracoConfig;
  },

  overrideWebpackConfig: ({
    webpackConfig,
    cracoConfig,
    pluginOptions,
    context,
  }) => {
    /* ... */
    return webpackConfig;
  },

  overrideDevServerConfig: ({
    devServerConfig,
    cracoConfig,
    pluginOptions,
    context,
  }) => {
    /* ... */
    return devServerConfig;
  },

  overrideJestConfig: ({ jestConfig, cracoConfig, pluginOptions, context }) => {
    /* ... */
    return jestConfig;
  },
};
```

:::note

Notice how all hooks only accept a single object as an argument. The outline above destructures each object.

:::

:::caution important

All functions must return the updated configuration object.

:::

Get started by checking out the documentation for [hooks](./hooks.md).
