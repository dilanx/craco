# Use a Jest config file

```js title="craco.config.js"
module.exports = {
  jest: {
    configure: {
      globals: {
        CONFIG: true,
      },
    },
  },
};
```

```js title="jest.config.js"
const { createJestConfig } = require('@craco/craco');

const cracoConfig = require('./craco.config.js');
const jestConfig = createJestConfig(cracoConfig);

module.exports = jestConfig;
```
