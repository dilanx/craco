# Use an ESLint config file

```js title="craco.config.js"
const { ESLINT_MODES } = require('@craco/craco');

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file,
  },
};
```

```js title=".eslintrc.js"
module.exports = {
  extends: ['eslint-config-react-app'],
};
```
