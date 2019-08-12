const merge = require("webpack-merge");

const { isFunction, isArray } = require("../../utils");
const { log } = require("../../logger");
const { overrideBabel } = require("./babel");
const { overrideEsLint } = require("./eslint");
const { overrideStyle } = require("./style/style");
const { overrideTypeScript } = require("./typescript");
const { applyWebpackConfigPlugins } = require("../plugins");

function addAlias(webpackConfig, webpackAlias) {
    // TODO: ensure is a plain object, if not, log an error.
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias || {}, webpackAlias);

    log("Added webpack alias.");
}

function addPlugins(webpackConfig, webpackPlugins) {
    if (isArray(webpackPlugins)) {
        webpackConfig.plugins = webpackPlugins.concat(webpackConfig.plugins || []);

        log("Added webpack plugins.");
    }
}

function giveTotalControl(webpackConfig, configureWebpack, context) {
    if (isFunction(configureWebpack)) {
        webpackConfig = configureWebpack(webpackConfig, context);

        if (!webpackConfig) {
            throw new Error("craco: 'webpack.configure' function didn't returned a webpack config object.");
        }
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        webpackConfig = merge(webpackConfig, configureWebpack);
    }

    log("Merged webpack config with 'webpack.configure'.");

    return webpackConfig;
}

function mergeWebpackConfig(cracoConfig, webpackConfig, context) {
    let resultingWebpackConfig = webpackConfig;

    resultingWebpackConfig = overrideBabel(cracoConfig, resultingWebpackConfig, context);
    resultingWebpackConfig = overrideEsLint(cracoConfig, resultingWebpackConfig, context);
    resultingWebpackConfig = overrideStyle(cracoConfig, resultingWebpackConfig, context);
    resultingWebpackConfig = overrideTypeScript(cracoConfig, resultingWebpackConfig, context);

    if (cracoConfig.webpack) {
        const { alias, plugins, configure } = cracoConfig.webpack;

        if (alias) {
            addAlias(resultingWebpackConfig, alias);
        }

        if (plugins) {
            addPlugins(resultingWebpackConfig, plugins);
        }

        if (configure) {
            resultingWebpackConfig = giveTotalControl(resultingWebpackConfig, configure, context);
        }
    }

    resultingWebpackConfig = applyWebpackConfigPlugins(cracoConfig, resultingWebpackConfig, context);

    return resultingWebpackConfig;
}

module.exports = {
    mergeWebpackConfig
};
