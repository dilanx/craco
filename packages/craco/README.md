# craco

**C**reate **R**eact **A**pp **C**onfiguration **O**verride is an easy and comprehensible configuration layer for create-react-app v2.

Get all the benefits of create-react-app **and** customization without using 'eject' by adding a single `craco.config.js` file at the root of your application and customize your eslint, babel, postcss configurations and many more.

All you have to do is create your app using [create-react-app](https://github.com/facebook/create-react-app/) and customize the configuration with a `craco.config.js` file.

- [CLI Options](#cli-options) - Available CLI options.
- [Configuration Overview](#configuration-overview) - Quickly see how you can configure your CRA installation with this plugin.
- [Recipes](https://github.com/sharegate/craco/tree/master/recipes) – Short recipes for common use cases.
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

```javascript
"scripts": {
    "start": "craco --config config/craco-config-with-custom-name.js"
}
```

To use a custom version of the `react-scripts` packages:

```javascript
"scripts": {
    "start": "craco --react-scripts react-scripts-ts"
}
```

To activate **verbose** logging:

```javascript
"scripts": {
    "start": "craco --verbose"
}
```

## Configuration Overview

When the property **mode** is available there are 2 possible values:
- `extends`: the provided configuration will extends the CRA settings (**this is the default mode**)
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
        parserOptions: {},
        env: {},
        globals: [],
        plugins: [],
        extends: [],
        rules: {},
        formatter: "",
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

There are 2 functions available to a plugin:
- `overrideCracoConfig`: Let a plugin customize the config object before it's process by `craco`.
- `overrideWebpackConfig`: Let a plugin customize the `webpack` config that will be used by CRA. 

**Important:**

Every functions must return the updated config object.

### overrideCracoConfig

The function `overrideCracoConfig` let a plugin override the config object **before** it's process by `craco`.

If a plugin define the function, it will be called with the config object read from the `craco.config.js` file provided by the consumer.

*The function must return a valid config object, otherwise `craco` will throw an error.*

The function will be called with a single object argument having the following structure:

```javascript
{
    cracoConfig: "The config object read from the craco.config.js file provided by the consumer",
    pluginOptions: "The plugin options provided by the consumer",
    context: {
        env: "The current NODE_ENV (development, production, etc..)",
        paths: "An object that contains all the paths used by CRA"
    }
}
```

#### Example

Plugin:

```javascript
/* craco-plugin-log-craco-config.js */

module.exports = {
    overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => {
        if (pluginOptions.preText) {
            console.log(pluginOptions.preText);
        }

        console.log(JSON.stringify(craconfig, null, 4));

        // Always return the config object.
        return cracoConfig; 
    }
};
```

Registration (in a `craco.config.js` file):

```javascript
const logCracoConfigPlugin = require("./craco-plugin-log-craco-config");

module.exports = {
    ...
    plugins: [
        { plugin: logCracoConfigPlugin, options: { preText: "Will log the craco config:" } }
    ]
};
```

### overrideWebpackConfig

The function `overrideWebpackConfig` let a plugin override the webpack config object **after** it's been customized by `craco`.

*The function must return a valid config object, otherwise `craco` will throw an error.*

The function will be called with a single object argument having the following structure:

```javascript
{
    webpackConfig: "The webpack config object customized by craco",
    cracoConfig: "The configuration object read from the craco.config.js file provided by the consumer",
    pluginOptions: "The plugin options provided by the consumer",
    context: {
        env: "The current NODE_ENV (development, production, etc..)",
        paths: "An object that contains all the paths used by CRA"
    }
}
```

#### Example

Plugin:

```javascript
/* craco-plugin-log-webpack-config.js */

module.exports = {
    overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
        if (pluginOptions.preText) {
            console.log(pluginOptions.preText);
        }

        console.log(JSON.stringify(webpackConfig, null, 4));

        // Always return the config object.
        return webpackConfig; 
    }
};
```

Registration (in a `craco.config.js` file):

```javascript
const logWebpackConfigPlugin = require("./craco-plugin-log-webpack-config");

module.exports = {
    ...
    plugins: [
        { plugin: logWebpackConfigPlugin, options: { preText: "Will log the webpack config:" } }
    ]
};
```

### Utility functions

A few utility functions are provided by `craco` to develop a plugin:

```javascript
const { getLoader, getLoaders, removeLoader, loaderByName } = require("craco");
```

#### getLoader

Retrieve the **first** loader that match the specified criteria from the webpack config.

Returns:

```javascript
{
    isFound: true | false,
    match: {
        loader,
        parent,
        index
    }
}
```

Usage:

```javascript
const { getLoader, loaderByName } = require("craco");

const { isFound, match } = getLoader(webpackConfig, loaderByName("eslint-loader"));

if (isFound) {
    // do stuff...
}
```

#### getLoaders

Retrieve **all** the loaders that match the specified criteria from the webpack config.

Returns:

```javascript
{
    hasFoundAny: true | false,
    matches: [
        {
            loader,
            parent,
            index
        }
    ]
}
```

Usage:

```javascript
const { getLoaders, loaderByName } = require("craco");

const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName("babel-loader"));

if (hasFoundAny) {
    matches.forEach(x => {
        // do stuff...
    });
}
```

#### removeLoader

Remove the **first** loader that match the specified criteria from the webpack config.

Usage: 

```javascript
const { removeLoader, loaderByName } = require("craco");

removeLoader(webpackConfig, loaderByName("eslint-loader"));
```

## Acknowledgements

[@timarney](https://github.com/timarney) for having created [react-app-rewired](https://github.com/timarney/react-app-rewired).

## License

Copyright © 2018, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/sharegate/craco/blob/master/LICENSE.
