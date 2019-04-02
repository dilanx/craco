const {
    getLoader,
    getLoaders,
    removeLoaders,
    addBeforeLoader,
    addBeforeLoaders,
    addAfterLoader,
    addAfterLoaders,
    loaderByName
} = require("./lib/loaders");
const { when, whenDev, whenProd, whenTest } = require("./lib/user-config-utils");
const { throwUnexpectedConfigError, gitHubIssueUrl } = require("./lib/plugin-utils");
const { ESLINT_MODES } = require("./lib/features/eslint");
const { POSTCSS_MODES } = require("./lib/features/style/postcss");

module.exports = {
    getLoader,
    getLoaders,
    removeLoaders,
    addBeforeLoader,
    addBeforeLoaders,
    addAfterLoader,
    addAfterLoaders,
    loaderByName,
    when,
    whenDev,
    whenProd,
    whenTest,
    throwUnexpectedConfigError,
    gitHubIssueUrl,
    ESLINT_MODES,
    POSTCSS_MODES
};
