const { craPaths } = require("./cra");
const { getLoader, removeLoader, loaderByName } = require("./loaders");
const { ESLINT_MODES } = require("./features/eslint");
const { POSTCSS_MODES } = require("./features/style/postcss");

function when(condition, fct) {
    if (condition) {
        return fct();
    }

    return undefined;
}

function whenDev(fct) {
    return when(process.env.NODE_ENV === "development", fct);
}

function whenProd(fct) {
    return when(process.env.NODE_ENV === "production", fct);
}

module.exports = {
    paths: craPaths,
    getLoader,
    removeLoader,
    loaderByName,
    when,
    whenDev,
    whenProd,
    ESLINT_MODES,
    POSTCSS_MODES
};
