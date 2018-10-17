const { craPaths } = require("./lib/cra");
const { getLoader, getLoaders, removeLoader, loaderByName } = require("./lib/loaders");
const { when, whenDev, whenProd } = require("./lib/user-config-utils");
const { ESLINT_MODES } = require("./lib/features/eslint");
const { POSTCSS_MODES } = require("./lib/features/style/postcss");

module.exports = {
    paths: craPaths,
    getLoader,
    getLoaders,
    removeLoader,
    loaderByName,
    when,
    whenDev,
    whenProd,
    ESLINT_MODES,
    POSTCSS_MODES
};
