---
description: Configure DevServer
---

# DevServer

<!-- prettier-ignore -->
```js title="craco.config.js"
module.exports = {
  // ...
  devServer: { /* ... */ },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    /* ... */
    return devServerConfig;
  },
};
```

:::tip

Properties listed twice in the outline above (for example, `devServer`) can be assigned an **object literal** or a **function**. See [configuration tips](./getting-started.md#object-literals-and-functions) for details.

:::

## devServer

`DevServerConfig` or `(config: DevServerConfig, { env, paths, proxy, allowedHost }) => DevServerConfig`

Any DevServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver

The function version of `configure` provides two extra properties within the [context object](./getting-started.md#context-object--env-paths-):

- `proxy` - DevServer proxy config array
- `allowedHost` - the allowed host
