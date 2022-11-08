# Webpack Asset Modules

Utility functions for [Webpack asset modules](https://webpack.js.org/guides/asset-modules/)

```js
const {
  assetModuleByName,
  getAssetModule,
  getAssetModules,
  addBeforeAssetModule,
  addBeforeAssetModules,
  addAfterAssetModule,
  addAfterAssetModules,
  removeAssetModules,
} = require('@craco/craco');
```

## Functions

### assetModuleByName

`assetModuleByName(targetAssetModuleName: string): AssetModuleMatcher`

Returns an [asset module matcher](#assetmodulematcher) function to be used with other asset module utility functions to match a name to an existing asset module.

### getAssetModule

`getAssetModule(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher)`

Retrieve the **first** asset module for which the matcher returns true from the Webpack config.

#### Return Type

```
{
  isFound: boolean;
  match: {
    rule: Rule;
    index: number;
  }
}
```

#### Usage

```js
const { getAssetModule, assetModuleByName } = require('@craco/craco');

const { isFound, match } = getAssetModule(
  webpackConfig,
  assetModuleByName('asset/source')
);

if (isFound) {
  // do stuff...
}
```

### getAssetModules

`getAssetModules(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher)`

Retrieve **all** of the asset modules for which the matcher returns true from the Webpack config.

#### Return Type

```
{
  hasFoundAny: boolean;
  matches: [
    {
      rule: Rule;
      index: number;
    }
  ]
}
```

#### Usage

```js
const { getAssetModules, assetModuleByName } = require('@craco/craco');

const { hasFoundAny, matches } = getAssetModules(
  webpackConfig,
  assetModuleByName('asset/inline')
);

if (hasFoundAny) {
  matches.forEach((x) => {
    // do stuff...
  });
}
```

### addBeforeAssetModule

`addBeforeAssetModule(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher, newAssetModule: Rule)`

Add a new asset module **before** the asset module for which the matcher returns true in the Webpack config.

#### Return Type

```
{
  isAdded: boolean;
}
```

#### Usage

```js
const { addBeforeAssetModule, assetModuleByName } = require('@craco/craco');

const myNewWebpackAssetModule = {
  test: /\.png/,
  type: 'asset/resource',
};

addBeforeAssetModule(
  webpackConfig,
  assetModuleByName('asset/source'),
  myNewWebpackAssetModule
);
```

### addBeforeAssetModules

`addBeforeAssetModules(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher, newAssetModule: Rule)`

Add a new asset module **before all** of the asset modules for which the matcher returns true in the Webpack config.

#### Return Type

```
{
  isAdded: boolean;
  addedCount: number;
}
```

#### Usage

```js
const { addBeforeAssetModules, assetModuleByName } = require('@craco/craco');

const myNewWebpackAssetModule = {
  test: /\.png/,
  type: 'asset/resource',
};

addBeforeAssetModules(
  webpackConfig,
  assetModuleByName('asset/source'),
  myNewWebpackAssetModule
);
```

### addAfterAssetModule

`addAfterAssetModule(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher, newAssetModule: Rule)`

Add a new asset module **after** the asset module for which the matcher returns true in the Webpack config.

#### Return Type

```
{
  isAdded: boolean;
}
```

#### Usage

```js
const { addAfterAssetModule, assetModuleByName } = require('@craco/craco');

const myNewWebpackAssetModule = {
  test: /\.png/,
  type: 'asset/resource',
};

addAfterAssetModule(
  webpackConfig,
  assetModuleByName('asset/source'),
  myNewWebpackAssetModule
);
```

### addAfterAssetModules

`addAfterAssetModules(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher, newAssetModule: Rule)`

Add a new asset module **after all** of the asset modules for which the matcher returns true in the Webpack config.

#### Return Type

```
{
  isAdded: boolean;
  addedCount: number;
}
```

#### Usage

```js
const { addAfterAssetModules, assetModuleByName } = require('@craco/craco');

const myNewWebpackAssetModule = {
  test: /\.png/,
  type: 'asset/resource',
};

addAfterAssetModules(
  webpackConfig,
  assetModuleByName('asset/source'),
  myNewWebpackAssetModule
);
```

### removeAssetModules

`removeAssetModules(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher)`

Remove **all** of the asset modules for which the matcher returns true from the Webpack config.

#### Return Type

```
{
  hasRemovedAny: boolean;
  removedCount: number;
}
```

#### Usage

```js
const { removeAssetModules, assetModuleByName } = require('@craco/craco');

removeAssetModules(webpackConfig, assetModuleByName('asset/source'));
```

## Reference

### WebpackConfig

See https://webpack.js.org/configuration/.

### AssetModuleMatcher

An asset module matcher should return true if the provided asset module (within a rule) matches the specified criteria. The function is of the following type:

```
(rule: Rule) => boolean;
```

### Rule

See https://webpack.js.org/configuration/module/#rule.

###
