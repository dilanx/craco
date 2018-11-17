# craco [![Build Status](https://travis-ci.org/sharegate/craco.svg?branch=master)](https://travis-ci.org/sharegate/craco) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/sharegate/craco/pulls)

**C**reate **R**eact **A**pp **C**onfiguration **O**verride is an easy and comprehensible configuration layer for create-react-app v2.

Get all the benefits of create-react-app **and** customization without using 'eject' by adding a single `craco.config.js` file at the root of your application and customize your eslint, babel, postcss configurations and many more.

All you have to do is create your app using [create-react-app](https://github.com/facebook/create-react-app/) and customize the configuration with a `craco.config.js` file.

- [CLI Options](#cli-options) - Available CLI options.
- [Configuration Overview](#configuration-overview) - Quickly see how you can configure your CRA installation with this plugin.
- [Recipes](https://github.com/sharegate/craco/tree/master/recipes) – Short recipes for common use cases.
- [Available Plugins](https://github.com/sharegate/craco#community-maintained-plugins) - Plugins maintained by the community.
- [Develop a Plugin](#develop-a-plugin) - How to develop a plugin for `craco`.
- [Changelog](https://github.com/sharegate/craco/tree/master/changelog) - List of major changes

**Acknowledgements:**

We are grateful to [@timarney](https://github.com/timarney) the creator of [react-app-rewired](https://github.com/timarney/react-app-rewired) for his original idea.

Also, please note that the configuration style of this plugin has been greatly influenced by the way [Vue CLI](https://cli.vuejs.org/guide/) does it.

**Please Note:**

By doing this you're breaking the ["guarantees"](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710) that CRA provides. That is to say you now "own" the configs. **No support** will be provided. Proceed with caution.

## You updated craco and everything falls apart

Before logging an issue, please consult the [changelog](https://github.com/sharegate/craco/tree/master/changelog).

If you can't find a solution to your problem in the changelog, log an issue and someone should help you quickly!

## Installation

Install the plugin from **npm**:

```bash
$ yarn add @craco/craco

# OR

$ npm install @craco/craco --save
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
-   "test": "react-scripts test",
+   "test": "craco test"
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
    "start": "craco start --config config/craco-config-with-custom-name.js"
}
```

To use with a **yarn workspace** or any **monorepo setup** that follows the popular convention `packages/*`:

```javascript
"scripts": {
    "start": "craco start --workspace"
}
```

To use with a different version of `react-scripts`:

```javascript
"scripts": {
    "start": "craco start --scripts-version react-scripts-ts"
}
```

To provided a custom path for the `react-scripts` folder:

```javascript
"scripts": {
    "start": "craco start --react-scripts ../../react-scripts-with-custom-name"
}
```

_The provided `react-scripts` folder path must be relative to the current working directory._

_If `--react-scripts` is provided, `--workspace` and `--scripts-version` will be ignored._

To activate **verbose** logging:

```javascript
"scripts": {
    "start": "craco start --verbose"
}
```

## Configuration Overview

When the property **mode** is available there are 2 possible values:
- `extends`: the provided configuration will extends the CRA settings (**default mode**)
- `file`: the CRA settings will be reseted and you will provide an official configuration file for the plugin ([postcss](https://github.com/michael-ciniawsky/postcss-load-config#postcssrc), [eslint](https://eslint.org/docs/user-guide/configuring#configuration-file-formats)) that will supersede any settings.

```javascript
const { paths, when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");

module.exports = {
    style: {
        modules: {
            localIdentName: ""
        },
        css: {
            loaderOptions: { /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */ },
            loaderOptions: (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions; }
        },
        sass: {
            loaderOptions: { /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */ },
            loaderOptions: (sassLoaderOptions, { env, paths }) => { return sassLoaderOptions; }
        },
        postcss: {
            mode: "extends" /* (default value) */ || "file",
            plugins: [],
            env: {
                autoprefixer: { /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */ },
                stage: 3, /* Any valid stages: https://cssdb.org/#staging-process. */
                features: { /* Any CSS features: https://preset-env.cssdb.org/features. */ }
            },
            loaderOptions: { /* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */ },
            loaderOptions: (postcssLoaderOptions, { env, paths }) => { return postcssLoaderOptions; }
        }
    },
    eslint: {
        enable: true,
        mode: "extends" /* (default value) */ || "file",
        configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
        configure: (eslintConfig, { env, paths }) => { return eslintConfig; },
        loaderOptions: { /* Any eslint-loader configuration options: https://github.com/webpack-contrib/eslint-loader. */ },
        loaderOptions: (eslintOptions, { env, paths }) => { return eslintOptions; }
    },
    babel: {
        presets: [],
        plugins: [],
        loaderOptions: { /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */ },
        loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
    },
    webpack: {
        alias: {},
        plugins: [],
        configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */ },
        configure: (webpackConfig, { env, paths }) => { return webpackConfig; }
    },
    jest: {
        babel: {
            addPresets: true, // (default value)
            addPlugins: true  // (default value)
        },
        configure: { /* Any Jest configuration options: https://jestjs.io/docs/en/configuration. */ },
        configure: (jestConfig, { env, paths, resolve, rootDir }) => { return jestConfig; }
    },
    devServer: { /* Any devServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver. */ },
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => { return devServerConfig; },
    plugins: [
        {
            plugin: {
                overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => { return cracoConfig; },
                overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => { return webpackConfig; },
                overrideJestConfig: ({ jestConfig, cracoConfig, pluginOptions, context: { env, paths, resolve, rootDir } }) => { return jestConfig };
            },
            options: {}
        }
    ]
};
```

## Develop a plugin

There are 3 functions available to a plugin:
- `overrideCracoConfig`: Let a plugin customize the config object before it's process by `craco`.
- `overrideWebpackConfig`: Let a plugin customize the `webpack` config that will be used by CRA.
- `overrideJestConfig`: Let a plugin customize the `Jest` config that will be used by CRA.

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

The function `overrideWebpackConfig` let a plugin override the `webpack` config object **after** it's been customized by `craco`.

*The function must return a valid config object, otherwise `craco` will throw an error.*

The function will be called with a single object argument having the following structure:

```javascript
{
    webpackConfig: "The webpack config object already customized by craco",
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

### overrideJestConfig

The function `overrideJestConfig` let a plugin override the `Jest` config object **after** it's been customized by `craco`.

*The function must return a valid config object, otherwise `craco` will throw an error.*

The function will be called with a single object argument having the following structure:

```javascript
{
    jestConfig: "The Jest config object already customized by craco",
    cracoConfig: "The configuration object read from the craco.config.js file provided by the consumer",
    pluginOptions: "The plugin options provided by the consumer",
    context: {
        env: "The current NODE_ENV (development, production, etc..)",
        paths: "An object that contains all the paths used by CRA",
        resolve: "Provided by CRA",
        rootDir: "Provided by CRA"
    }
}
```

#### Example

Plugin:

```javascript
/* craco-plugin-log-jest-config.js */

module.exports = {
    overrideJestConfig: ({ jestConfig, cracoConfig, pluginOptions, context: { env, paths, resolve, rootDir } }) => {
        if (pluginOptions.preText) {
            console.log(pluginOptions.preText);
        }

        console.log(JSON.stringify(jestConfig, null, 4));

        // Always return the config object.
        return jestConfig;
    }
};
```

Registration (in a `craco.config.js` file):

```javascript
const logJestConfigPlugin = require("./craco-plugin-log-jest-config");

module.exports = {
    ...
    plugins: [
        { plugin: logJestConfigPlugin, options: { preText: "Will log the Jest config:" } }
    ]
};
```

### Utility functions

A few utility functions are provided by `craco` to develop a plugin:

```javascript
const { getLoader, getLoaders, removeLoader, loaderByName, throwUnexpectedConfigError } = require("@craco/craco");
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
const { getLoader, loaderByName } = require("@craco/craco");

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
const { getLoaders, loaderByName } = require("@craco/craco");

const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName("babel-loader"));

if (hasFoundAny) {
    matches.forEach(x => {
        // do stuff...
    });
}
```

#### removeLoaders

Remove **all** the loaders that match the specified criteria from the webpack config.

Returns:

```javascript
{
    hasRemovedAny:: true | false,
    removedCount:: int
}
```

Usage:

```javascript
const { removeLoaders, loaderByName } = require("@craco/craco");

removeLoaders(webpackConfig, loaderByName("eslint-loader"));
```

#### addBeforeLoader

Add a new *loader* **before** the loader that match specified criteria to the webpack config.

Returns:

```javascript
{
    isAdded: true | false
}
```

Usage:

```javascript
const { addBeforeLoader, loaderByName } = require("@craco/craco");

const myNewWebpackLoader = {
    loader: require.resolve("tslint-loader")
};

addBeforeLoader(webpackConfig, loaderByName("eslint-loader"), myNewWebpackLoader);
```

#### addBeforeLoaders

Add a new *loader* **before** all the loaders that match specified criteria to the webpack config.

Returns:

```javascript
{
    isAdded: true | false,
    addedCount: int
}
```

Usage:

```javascript
const { addBeforeLoaders, loaderByName } = require("@craco/craco");

const myNewWebpackLoader = {
    loader: require.resolve("tslint-loader")
};

addBeforeLoaders(webpackConfig, loaderByName("eslint-loader"), myNewWebpackLoader);
```

#### addAfterLoader

Add a new *loader* **after** the loader that match specified criteria to the webpack config.

Returns:

```javascript
{
    isAdded: true | false
}
```

Usage:

```javascript
const { addAfterLoader, loaderByName } = require("@craco/craco");

const myNewWebpackLoader = {
    loader: require.resolve("tslint-loader")
};

addAfterLoader(webpackConfig, loaderByName("eslint-loader"), myNewWebpackLoader);
```

#### addAfterLoaders

Add a new *loader* **after** all the loaders that match specified criteria to the webpack config.

Returns:

```javascript
{
    isAdded: true | false,
    addedCount: int
}
```

Usage:

```javascript
const { addAfterLoaders, loaderByName } = require("@craco/craco");

const myNewWebpackLoader = {
    loader: require.resolve("tslint-loader")
};

addAfterLoaders(webpackConfig, loaderByName("eslint-loader"), myNewWebpackLoader);
```

#### throwUnexpectedConfigError

Throw an error if the webpack configuration changes and does not match your expectations. (For example, `getLoader` cannot find a loader and `isFound` is `false`.) `create-react-app` might update the structure of their webpack config, so it is very important to show a helpful error message when something breaks.

Raises an error and crashes Node.js:

```bash
$ yarn start
yarn run v1.12.3
$ craco start
/path/to/your/app/craco.config.js:23
            throw new Error(
            ^

    Error: Can't find eslint-loader in the webpack config!

    This error probably occurred because you updated react-scripts or craco. Please try updating craco-less to the latest version:

       $ yarn upgrade craco-less

    Or:

       $ npm update craco-less

    If that doesn't work, craco-less needs to be fixed to support the latest version.
    Please check to see if there's already an issue in the ndbroadbent/craco-less repo:

       * https://github.com/ndbroadbent/craco-less/issues?q=is%3Aissue+webpack+eslint-loader

    If not, please open an issue and we'll take a look. (Or you can send a PR!)

    You might also want to look for related issues in the craco and create-react-app repos:

       * https://github.com/sharegate/craco/issues?q=is%3Aissue+webpack+eslint-loader
       * https://github.com/facebook/create-react-app/issues?q=is%3Aissue+webpack+eslint-loader

    at throwUnexpectedConfigError (/path/to/your/app/craco.config.js:23:19)
    ...
```

Usage:

```javascript
const { getLoader, loaderByName, throwUnexpectedConfigError } = require("@craco/craco");

// Create a helper function if you need to call this multiple times
const throwError = (message, githubIssueQuery) =>
    throwUnexpectedConfigError({
        packageName: "craco-less",
        githubRepo: "ndbroadbent/craco-less",
        message,
        githubIssueQuery,
    });

const { isFound, match } = getLoader(webpackConfig, loaderByName("eslint-loader"));

if (!isFound) {
    throwError("Can't find eslint-loader in the webpack config!", "webpack+eslint-loader")
}
```

Options:

```javascript
{
    message: "An error message explaining what went wrong",
    packageName: "NPM package name",
    githubRepo: "GitHub repo where people can open an issue. Format: username/repo",
    githubIssueQuery: "Search string to find related issues"
}
```

> Only `message` is required.

## Acknowledgements

[@timarney](https://github.com/timarney) for having created [react-app-rewired](https://github.com/timarney/react-app-rewired).

## License

Copyright © 2018, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/sharegate/craco/blob/master/LICENSE.
