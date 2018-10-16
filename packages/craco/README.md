# craco

**C**reate **R**eact **A**pp **C**onfiguration **O**verride is an easy and comprehensible configuration layer for create-react-app v2.

Get all the benefits of create-react-app **and** customization without using 'eject' by adding a single `craco.config.js` file at the root of your application and customize your eslint, babel, postcss configurations and many more.

All you have to do is create your app using [create-react-app](https://github.com/facebook/create-react-app/) and customize the configuration with a `craco.config.js` file.

- [Configuration Overview](#configuration-overview) - Quickly see how you can configure your CRA installation with this plugin.
- [Recipes](#creating-an-app) – Short and easy recipes for common use cases.
- [Develop a Plugin](#develop-a-plugin) - How to develop a plugin for `craco`.

**Acknowledgements:**

We are grateful to [@timarney](https://github.com/timarney) the creator of [react-app-rewired](https://github.com/timarney/react-app-rewired) for his original idea.

Also, please note that the configuration style of this plugin has been greatly influenced by the way [Vue CLI](https://cli.vuejs.org/guide/) does it.

**Please Note:**

By doing this you're breaking the ["guarantees"](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710) that CRA provides. That is to say you now "own" the configs. **No support** will be provided. Proceed with caution.

## Installation

Install the plugin from **npm**:

```bash
$ npm install @craco/craco --save-dev
```

Create a `craco.config.js` file in the root directory:

```
my-app
├── node_modules
├── craco.config.js
└── package.json
```

Export your configuration as an **object literal**:

```javascript
/* craco.config.js */

module.exports = {
    ...
}
```

or a **function**:

```javascript
/* craco.config.js */

module.exports = function({ env, paths }) {
    return {
        ...
    };
}
```

Update the existing calls to `react-scripts` in the `scripts` section of your `package.json` file to use the `craco` CLI:

```diff
/* package.json */

"scripts": {
-   "start": "react-scripts start",
+   "start": "craco start",
-   "build": "react-scripts build",
+   "build": "craco build"
}
```

Start your app for development:

```bash
$ npm start
```

Or build your app:

```bash
$ npm run build
```

## CLI Options

When you execute `craco start` or `craco build` a few options are available.

To change the location of the configuration file:

```bash
$ npm start craco --config config/my-cra-customized-config.js
```

To use a custom version of the `react-scripts` packages:

```bash
$ npm start craco --react-scripts react-scripts-ts
```

To activate **verbose** logging:

```bash
$ npm start craco --verbose
```

## Configuration Overview

When the property **mode** is available there are 2 possible values:
- `extends`: the provided configuration will extends the CRA settings
- `file`: the CRA settings will be reseted and you will provide an official configuration file for the plugin ([postcss](https://github.com/michael-ciniawsky/postcss-load-config#postcssrc), [eslint](https://eslint.org/docs/user-guide/configuring#configuration-file-formats)) that will supersede any settings.

```javascript
const { paths, when, whenDev, whenProd, ESLINT_MODES, POSTCSS_MODES } = require("craco");

module.exports = {
    style: {
        modules: {
            localIdentName: ""
        },
        css: {
            loaderOptions: {} || (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions; }
        },
        sass: {
            loaderOptions: {} || (sassLoaderOptions, { env, paths }) => { return sassLoaderOptions; }
        },
        postcss: {
            mode: "extends" || "file",
            plugins: [],
            loaderOptions: {} || (postcssLoaderOptions, { env, paths }) => { return postcssLoaderOptions; }
        }
    },
    eslint: {
        enable: true,
        mode: "extends" || "file",
        formatter: "",
        globals: [],
        plugins: [],
        extends: [],
        rules: {},
        loaderOptions: {} || (eslintOptions, { env, paths }) => { return eslintOptions; }
    },
    webpack: {
        alias: {},
        plugins: []
    },
    configureWebpack: {} || (webpackConfig, { env, paths }) => { return webpackConfig; },
    devServer: {},
    babel: {
        presets: [],
        plugins: [],
        loaderOptions: {} || (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
    },
    plugins: [
        {
            plugin: {
                overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => { return cracoConfig; },
                overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => { return webpackConfig; },
            },
            options: {}
        }
    ]
};
```

## Develop a plugin

## Acknowledgements

[@timarney](https://github.com/timarney) for having created [react-app-rewired](https://github.com/timarney/react-app-rewired).

## License

Copyright © 2018, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/sharegate/craco/blob/master/LICENSE.
