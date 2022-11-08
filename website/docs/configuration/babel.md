---
description: Customize Babel
---

# Babel

<!-- prettier-ignore -->
```js title="craco.config.js"
module.exports = {
  // ...
  babel: {
    presets: [ /* ... */ ],
    plugins: [ /* ... */ ],
    loaderOptions: { /* ... */ },
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      /* ... */
      return babelLoaderOptions;
    },
  },
};
```

:::tip

Properties listed twice in the outline above (for example, `loaderOptions`) can be assigned an **object literal** or a **function**. See [configuration tips](./getting-started.md#object-literals-and-functions) for details.

:::

## babel.presets

`[string | [string, object]]`

Any Babel presets: https://babeljs.io/docs/en/presets/

## babel.plugins

`[string | [string, object]]`

Any Babel plugins: https://babeljs.io/docs/en/plugins

## babel.loaderOptions

`BabelLoaderOptions` or `(options: BabelLoaderOptions, { env, paths }) => BabelLoaderOptions`

Any babel-loader options: https://github.com/babel/babel-loader#options
