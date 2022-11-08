# Webpack Loaders

Utility functions for [Webpack loaders](https://webpack.js.org/loaders/)

```js
const {
  loaderByName,
  getLoader,
  getLoaders,
  addBeforeLoader,
  addBeforeLoaders,
  addAfterLoader,
  addAfterLoaders,
  removeLoaders,
} = require('@craco/craco');
```

## Functions

### loaderByName

`loaderByName(targetLoaderName: string): LoaderMatcher`

Returns a [loader matcher](#loadermatcher) function to be used with other loader utility functions to match a name to an existing loader.

### getLoader

`getLoader(webpackConfig: WebpackConfig, matcher: LoaderMatcher)`

Retrieve the **first** loader for which the matcher returns true from the Webpack config.

#### Return Type

```
{
  isFound: boolean;
  match: {
    loader: Rule;
    parent: Rule[];
    index: number;
  }
}
```

#### Usage

```js
const { getLoader, loaderByName } = require('@craco/craco');

const { isFound, match } = getLoader(
  webpackConfig,
  loaderByName('eslint-loader')
);

if (isFound) {
  // do stuff...
}
```

### getLoaders

`getLoaders(webpackConfig: WebpackConfig, matcher: LoaderMatcher)`

Retrieve **all** of the loaders for which the matcher returns true from the Webpack config.

#### Return Type

```
{
  hasFoundAny: boolean;
  matches: [
    {
      loader: Rule;
      parent: Rule[];
      index: number;
    }
  ]
}
```

#### Usage

```js
const { getLoaders, loaderByName } = require('@craco/craco');

const { hasFoundAny, matches } = getLoaders(
  webpackConfig,
  loaderByName('babel-loader')
);

if (hasFoundAny) {
  matches.forEach((x) => {
    // do stuff...
  });
}
```

### addBeforeLoader

`addBeforeLoader(webpackConfig: WebpackConfig, matcher: LoaderMatcher, newLoader: Rule)`

Add a new loader **before** the loader for which the matcher returns true in the Webpack config.

#### Return Type

```
{
  isAdded: boolean;
}
```

#### Usage

```js
const { addBeforeLoader, loaderByName } = require('@craco/craco');

const myNewWebpackLoader = {
  loader: require.resolve('tslint-loader'),
};

addBeforeLoader(
  webpackConfig,
  loaderByName('eslint-loader'),
  myNewWebpackLoader
);
```

### addBeforeLoaders

`addBeforeLoaders(webpackConfig: WebpackConfig, matcher: LoaderMatcher, newLoader: Rule)`

Add a new loader **before all** of the loaders for which the matcher returns true in the Webpack config.

#### Return Type

```
{
  isAdded: boolean;
  addedCount: number;
}
```

#### Usage

```js
const { addBeforeLoaders, loaderByName } = require('@craco/craco');

const myNewWebpackLoader = {
  loader: require.resolve('tslint-loader'),
};

addBeforeLoaders(
  webpackConfig,
  loaderByName('eslint-loader'),
  myNewWebpackLoader
);
```

### addAfterLoader

`addAfterLoader(webpackConfig: WebpackConfig, matcher: LoaderMatcher, newLoader: Rule)`

Add a new loader **after** the loader for which the matcher returns true in the Webpack config.

#### Return Type

```
{
  isAdded: boolean;
}
```

#### Usage

```js
const { addAfterLoader, loaderByName } = require('@craco/craco');

const myNewWebpackLoader = {
  loader: require.resolve('tslint-loader'),
};

addAfterLoader(
  webpackConfig,
  loaderByName('eslint-loader'),
  myNewWebpackLoader
);
```

### addAfterLoaders

`addAfterLoaders(webpackConfig: WebpackConfig, matcher: LoaderMatcher, newLoader: Rule)`

Add a new loader **after all** of the loaders for which the matcher returns true in the Webpack config.

#### Return Type

```
{
  isAdded: boolean;
  addedCount: number;
}
```

#### Usage

```js
const { addAfterLoaders, loaderByName } = require('@craco/craco');

const myNewWebpackLoader = {
  loader: require.resolve('tslint-loader'),
};

addAfterLoaders(
  webpackConfig,
  loaderByName('eslint-loader'),
  myNewWebpackLoader
);
```

### removeLoaders

`removeLoaders(webpackConfig: WebpackConfig, matcher: LoaderMatcher)`

Remove **all** of the loaders for which the matcher returns true from the Webpack config.

#### Return Type

```
{
  hasRemovedAny: boolean;
  removedCount: number;
}
```

#### Usage

```js
const { removeLoaders, loaderByName } = require('@craco/craco');

removeLoaders(webpackConfig, loaderByName('eslint-loader'));
```

## Reference

### WebpackConfig

See https://webpack.js.org/configuration/.

### LoaderMatcher

A loader matcher should return true if the provided loader (within a rule) matches the specified criteria. The function is of the following type:

```
(rule: Rule) => boolean;
```

### Rule

See https://webpack.js.org/configuration/module/#rule.

###
