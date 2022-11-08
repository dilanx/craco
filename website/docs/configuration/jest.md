---
description: Customize Jest
---

# Jest

<!-- prettier-ignore -->
```js title="craco.config.js"
module.exports = {
  // ...
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */,
    },
    configure: { /* ... */ },
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      /* ... */
      return jestConfig;
    },
  },
};
```

:::tip

Properties listed twice in the outline above (for example, `configure`) can be assigned an **object literal** or a **function**. See [configuration tips](./getting-started.md#object-literals-and-functions) for details.

:::

## jest.babel

Configuration options for the `babel-jest` transformer: https://jestjs.io/docs/code-transformation

### jest.babel.addPresets

`boolean = true`

Whether or not Babel presets should be added.

### jest.babel.addPlugins

`boolean = true`

Whether or not Babel plugins should be added.

## jest.configure

`JestConfig` or `(config: JestConfig, { env, paths, resolve, rootDir }) => JestConfig`

Any Jest configuration options: https://jestjs.io/docs/configuration

The function version of `configure` provides two extra properties within the [context object](./getting-started.md#context-object--env-paths-):

- `resolve` - provided by CRA
- `rootDir` - provided by CRA
