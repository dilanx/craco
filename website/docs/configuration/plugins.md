---
description: Include third-party CRACO plugins
---

# CRACO Plugins

View a list of [community maintained plugins](/plugins) or [develop your own](../plugin-api/getting-started.md).

<!-- prettier-ignore -->
```js title="craco.config.js"
module.exports = {
  // ...
  plugins: [
    {
      plugin: require('some-craco-plugin'),
      options: { /* ... */ },
    },
    // ...
  ],
};
```
