---
description: Setting up the configuration file
---

# Getting Started

## Creating the file

CRACO can be configured in a file with any of the following names:

1. `craco.config.ts`
2. `craco.config.js`
3. `craco.config.cjs`
4. `cracorc.ts`
5. `cracorc.js`
6. `.cracorc`

If multiple configuration files are found, CRACO will use the one highest on the list above. You can also [specify a file path in your `package.json` file], which will take priority over all files listed above.

### Setting a custom location

#### Option 1: package.json (recommended)

You can change the location of your config file by specifying a value for `cracoConfig` in your `package.json` file.

```json title="package.json"
{
  "cracoConfig": "config/craco-config-with-custom-name.js"
}
```

#### Option 2: CLI (for backward compatibility)

You can change the location of your config file by specifying a file path with the `--config` CLI option.

```json title="package.json"
{
  "scripts": {
    "start": "craco start --config config/craco-config-with-custom-name.js"
  }
}
```

:::caution

The CLI option doesn't support Babel with Jest.

:::

## Configuration tips

### Object literals and functions

Many config override properties in the CRACO config can be assigned either one of two things:

- an **object literal**, which will be merged with the original config

  ```js title="craco.config.js (example)"
  module.exports = {
    webpack: {
      configure: {
        entry: './path/to/my/entry/file.js',
      },
    },
  };
  ```

- a **function** that takes in the original config as the first argument (and optionally a [context object](#context-object--env-paths-)) and returns the new config

  ```js title="craco.config.js (example)"
  module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        webpackConfig.entry = './path/to/my/entry/file.js';
        return webpackConfig;
      },
    },
  };
  ```

Configuration outlines within this documentation will show both of these options as two properties with the same name (for example, two properties named `configure` where one is an object literal and the other is a function).

### Context object (`{ env, paths }`)

The function version of config override properties accepts an optional second argument, which is a single object containing the following properties:

- `env` - the current NODE_ENV (development, production, etc.)
- `paths` - an object that contains all the paths used by CRA

Some configuration sections, like [`jest.configure`](./jest.md#jestconfigure) and [`devServer`](./devserver.md#devserver-1), include extra properties in their context object.

### Override modes

Some sections have a `mode` property, which can be assigned one of two values:

- `extends` - the provided configuration will extend the CRA settings (**default**)
- `file` - the CRA settings will be reset and you'll need to provide an official configuration file for the plugin that will supersede any settings

## Configuration helpers

### when

```js title="craco.config.js (example)"
module.exports = {
  eslint: {
    mode: ESLINT_MODES.file,
    configure: {
      formatter: when(
        process.env.NODE_ENV === 'CI',
        require('eslint-formatter-vso')
      ),
    },
  },
  webpack: {
    plugins: [
      new ConfigWebpackPlugin(),
      ...whenDev(() => [new CircularDependencyPlugin()], []),
    ],
  },
};
```

#### `when(condition, fn, [unmetValue])`

`when<T>(condition: boolean, fn: () => T, unmetValue?: T): T | undefined`

If `condition` evaluates to true, `fn` is called and the helper will return what that function returns. If false, `unmetValue` will be returned (or `undefined` if not provided).

#### `whenDev(condition, fn, [unmetValue])`

`whenDev<T>(fn: () => T, unmetValue?: T): T | undefined`

Equivalent to `when(process.env.NODE_ENV === 'development', fn, unmetValue)`.

#### `whenProd(condition, fn, [unmetValue])`

`whenProd<T>(fn: () => T, unmetValue?: T): T | undefined`

Equivalent to `when(process.env.NODE_ENV === 'production', fn, unmetValue)`.

#### `whenTest(condition, fn, [unmetValue])`

`whenTest<T>(fn: () => T, unmetValue?: T): T | undefined`

Equivalent to `when(process.env.NODE_ENV === 'test', fn, unmetValue)`.

## Exporting your configuration

You can export your configuration in a variety of ways.

:::tip

The function options will be called with an object containing the current environment variables (for example, `NODE_ENV`).

:::

### Object literal

```js title="craco.config.js"
module.exports = {
  ...
};
```

### Function

```js title="craco.config.js"
module.exports = function ({ env }) {
  return {
    ...
  };
};
```

### Promise or Async Function

```js title="craco.config.js"
module.exports = async function ({ env }) {
  await ...;

  return {
    ...
  };
};
```

## Using a custom `react-scripts` package

If you're using a fork of Create React App's `react-scripts` package, you can specify the name in your configuration so CRACO knows where the scripts are. If this property is omitted, CRACO defaults to `react-scripts`.

```js title="craco.config.js"
module.exports = {
  // ...
  reactScriptsVersion: 'custom-react-scripts-package',
};
```
