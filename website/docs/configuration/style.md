---
description: Customize CSS preprocessors
---

# Style

<!-- prettier-ignore -->
```js title="craco.config.js"
module.exports = {
  // ...
  style: {
    modules: {
      localIdentName: '',
    },
    css: {
      loaderOptions: { /* ... */ },
      loaderOptions: (cssLoaderOptions, { env, paths }) => {
        /* ... */
        return cssLoaderOptions;
      },
    },
    sass: {
      loaderOptions: { /* ... */ },
      loaderOptions: (sassLoaderOptions, { env, paths }) => {
        /* ... */
        return sassLoaderOptions;
      },
    },
    postcss: {
      mode: 'extends' /* (default value) */ || 'file',
      plugins: [require('plugin-to-append')],
      plugins: (plugins) => [require('plugin-to-prepend')].concat(plugins),
      env: {
        autoprefixer: { /* ... */ },
        stage: 3,
        features: { /* ... */ },
      },
      loaderOptions: { /* ... */ },
      loaderOptions: (postcssLoaderOptions, { env, paths }) => {
        /* ... */
        return postcssLoaderOptions;
      },
    },
  },
};
```

:::tip

Properties listed twice in the outline above (for example, `loaderOptions`) can be assigned an **object literal** or a **function**. See [configuration tips](./getting-started.md#object-literals-and-functions) for details.

:::

## style.modules

### style.modules.localIdentName

`string`

https://github.com/webpack-contrib/css-loader#localidentname

## style.css

### style.css.loaderOptions

`CSSLoaderOptions` or `(options: CSSLoaderOptions, { env, paths }) => CSSLoaderOptions`

Any css-loader configuration options: https://github.com/webpack-contrib/css-loader#options

## style.sass

### style.sass.loaderOptions

`SASSLoaderOptions` or `(options: SASSLoaderOptions, { env, paths }) => SASSLoaderOptions`

Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader#options

## style.postcss

### style.postcss.mode

`'extends' | 'file' = 'extends'`

See [override modes](./getting-started.md#override-modes).

### style.postcss.plugins

`[PostCSSPlugin]` or `(plugins: [PostCSSPlugin]) => [PostCSSPlugin]`

Any PostCSS plugins: https://github.com/postcss/postcss#plugins

### style.postcss.env

#### style.postcss.env.autoprefixer

`AutoprefixerOptions`

Any autoprefixer options: https://github.com/postcss/autoprefixer#options

#### style.postcss.env.stage

`0 | 1 | 2 | 3 | 4`

Any valid CSS stage: https://cssdb.org/#the-staging-process

#### style.postcss.env.features

Any CSS features: https://preset-env.cssdb.org/features/

### style.postcss.loaderOptions

`PostCSSLoaderOptions` or `(options: PostCSSLoaderOptions, { env, paths }) => PostCSSLoaderOptions`

Any postcss-loader options: https://github.com/webpack-contrib/postcss-loader#options
