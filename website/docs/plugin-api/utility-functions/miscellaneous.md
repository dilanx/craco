# Miscellaneous

Other useful utility functions

```js
const { throwUnexpectedConfigError } = require('@craco/craco');
```

## Functions

### throwUnexpectedConfigError

`throwUnexpectedConfigError(options)`

Raises an error and crashes Node.js.

`options` should be an object with the following structure:

| Property           | Description                                 | Type / Format         | Required |
| ------------------ | ------------------------------------------- | --------------------- | -------- |
| `message`          | An error message explaining what went wrong | string                | Yes      |
| `packageName`      | npm package name                            | string                | No       |
| `githubRepo`       | GitHub repo where people can open an issue  | string: username/repo | No       |
| `githubIssueQuery` | Search string to find related issues        | string                | No       |

:::tip

Throw an error if the configuration changes and does not match your expectations. (For example, `getLoader` cannot find a loader and `isFound` is false.) Create React App might update the structure of their webpack config, so it is very important to show a helpful error message when something breaks.

:::

#### Example

```
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

       * https://github.com/DocSpring/craco-less/issues?q=is%3Aissue+webpack+eslint-loader

    If not, please open an issue and we'll take a look. (Or you can send a PR!)

    You might also want to look for related issues in the craco and create-react-app repos:

       * https://github.com/dilanx/craco/issues?q=is%3Aissue+webpack+eslint-loader
       * https://github.com/facebook/create-react-app/issues?q=is%3Aissue+webpack+eslint-loader

    at throwUnexpectedConfigError (/path/to/your/app/craco.config.js:23:19)
    ...
```

#### Usage

```js
const {
  getLoader,
  loaderByName,
  throwUnexpectedConfigError,
} = require('@craco/craco');

// Create a helper function if you need to call this multiple times
const throwError = (message, githubIssueQuery) =>
  throwUnexpectedConfigError({
    packageName: 'craco-less',
    githubRepo: 'ndbroadbent/craco-less',
    message,
    githubIssueQuery,
  });

const { isFound, match } = getLoader(
  webpackConfig,
  loaderByName('eslint-loader')
);

if (!isFound) {
  throwError(
    "Can't find eslint-loader in the webpack config!",
    'webpack+eslint-loader'
  );
}
```
