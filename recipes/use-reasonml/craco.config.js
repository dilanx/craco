// Offical documentation available at: https://github.com/FormAPI/craco-preact
const { ESLINT_MODES } = require("@craco/craco");

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file,
    // Add `"eslintIgnore":["./src/**/*.js"],` to your `package.json`
    loaderOptions: eslintOptions => {
      return { ...eslintOptions, ignore: true };
    }
  }
};
