---
description: Customize ESLint
---

# ESLint

<!-- prettier-ignore -->
```js title="craco.config.js"
module.exports = {
  // ...
  eslint: {
    enable: true /* (default value) */,
    mode: 'extends' /* (default value) */ || 'file',
    configure: { /* ... */ },
    configure: (eslintConfig, { env, paths }) => {
      /* ... */
      return eslintConfig;
    },
    pluginOptions: { /* ... */ },
    pluginOptions: (eslintPluginOptions, { env, paths }) => {
      /* ... */
      return eslintPluginOptions;
    },
  },
};
```

:::tip

Properties listed twice in the outline above (for example, `configure`) can be assigned an **object literal** or a **function**. See [configuration tips](./getting-started.md#object-literals-and-functions) for details.

:::

## eslint.enable

`boolean = true`

Whether or not ESLint is enabled.

## eslint.mode

`'extends' | 'file' = 'extends'`

See [override modes](./getting-started.md#override-modes).

## eslint.configure

`ESLintConfig` or `(config: ESLintConfig, { env, paths }) => ESLintConfig`

Any ESLint configuration options: https://eslint.org/docs/latest/user-guide/configuring/

## eslint.pluginOptions

`ESLintPluginOptions` or `(options: ESLintPluginOptions, { env, paths }) => ESLintPluginOptions`

Any ESLint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options
