# Add Stylelint

```js title="craco.config.js"
const path = require('path');

const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new StyleLintPlugin({
          configBasedir: __dirname,
          context: path.resolve(__dirname, 'src'),
          files: ['**/*.css'],
        }),
      ],
    },
  },
};
```
