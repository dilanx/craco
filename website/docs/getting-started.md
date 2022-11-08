# Getting Started

:::info

The current **CRACO** version requires **Create React App 5** (`react-scripts 5.x.x`). If using an older version of CRA, [use the appropriate version of CRACO](#backward-compatibility).

:::

## Set up CRACO

1. Install the latest version of the package from npm as a dev dependency:

   ```
   npm i -D @craco/craco
   ```

2. Create a CRACO configuration file in your project's root directory and [configure](./configuration/getting-started.md):

   ```diff
     my-app
     ├── node_modules
   + ├── craco.config.js
     └── package.json
   ```

3. Update the existing calls to `react-scripts` in the `scripts` section of your `package.json` to use the `craco` CLI:

   ```diff title="package.json"
   "scripts": {
   -  "start": "react-scripts start"
   +  "start": "craco start"
   -  "build": "react-scripts build"
   +  "build": "craco build"
   -  "test": "react-scripts test"
   +  "test": "craco test"
   }
   ```

You can now start or build your app like normal:

```
npm start
```

```
npm run build
```

## Start configuring

Check out the [configuration documentation](./configuration/getting-started.md).

## TypeScript support

CRACO provides official typings that you can use if you'd like type checking and IDE autocompletion in your configuration file:

```
npm i -D @craco/types
```

## Backward compatibility

CRACO is not meant to be backward compatible with older versions of Create React App and will only support the latest version. If your project uses an old version (which can be determined by the version of the `react-scripts` dependency in your project), refer to the following table to select the appropriate CRACO version.

| react-scripts version | CRACO version |
| --------------------- | ------------- |
| 5.x.x (latest)        | 7.0.0         |
| 4.x.x                 | 6.4.5         |
| < 4.0.0               | 5.8.0         |

## Debugging

### Verbose logging

To activate verbose logging, specify the CLI option `--verbose`

```json title="package.json"
{
  "scripts": {
    "start": "craco start --verbose"
  }
}
```
