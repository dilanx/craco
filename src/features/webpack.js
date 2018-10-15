const merge = require("webpack-merge");

const { isFunction, isArray } = require("../utils");
const { log } = require("../logger");
const { overrideBabel } = require("./babel");
const { overrideEsLint } = require("./eslint");
const { overrideStyle } = require("./style/style");
const { applyWebpackConfigPlugins } = require("./plugins");

function addAlias(webpackConfig, webpackAlias) {
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias || {}, webpackAlias);

    log("Added Webpack alias.");
}

function addPlugins(webpackConfig, webpackPlugins) {
    if (isArray(webpackPlugins)) {
        webpackConfig.plugins = webpackPlugins.concat(webpackConfig.plugins || []);

        log("Added Webpack plugins.");
    }
}

function giveTotalControl(webpackConfig, configureWebpack, context) {
    let mergedConfig;

    if (isFunction(configureWebpack)) {
        mergedConfig = configureWebpack(webpackConfig, context);
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        mergedConfig = merge(webpackConfig, configureWebpack);
    }

    log("Merged Webpack config with configureWebpack.");

    return mergedConfig;
}

function overrideWebpack(cracoConfig, webpackConfig, overrideConfig, context) {
    if (cracoConfig.webpack) {
        const { alias, plugins } = cracoConfig.webpack;

        if (alias) {
            addAlias(webpackConfig, alias);
        }

        if (plugins) {
            addPlugins(webpackConfig, plugins);
        }
    }

    webpackConfig = overrideBabel(cracoConfig, webpackConfig, context);
    webpackConfig = overrideEsLint(cracoConfig, webpackConfig, context);
    webpackConfig = overrideStyle(cracoConfig, webpackConfig, context);

    if (cracoConfig.configureWebpack) {
        webpackConfig = giveTotalControl(webpackConfig, cracoConfig.configureWebpack, context);
    }

    webpackConfig = applyWebpackConfigPlugins(cracoConfig, webpackConfig, context);

    overrideConfig(webpackConfig);
}

module.exports = {
    overrideWebpack
};
