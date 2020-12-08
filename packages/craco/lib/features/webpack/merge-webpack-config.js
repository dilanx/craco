const merge = require("webpack-merge");

const { isFunction, isArray } = require("../../utils");
const { log } = require("../../logger");
const { overrideBabel } = require("./babel");
const { overrideEsLint } = require("./eslint");
const { overrideStyle } = require("./style/style");
const { overrideTypeScript } = require("./typescript");
const { applyWebpackConfigPlugins } = require("../plugins");
const {
    addPlugins: addWebpackPlugins,
    removePlugins: removeWebpackPlugins,
    pluginByName
} = require("../../webpack-plugins");

function addAlias(webpackConfig, webpackAlias) {
    // TODO: ensure is a plain object, if not, log an error.
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias || {}, webpackAlias);

    log("Added webpack alias.");
}

function addPlugins(webpackConfig, webpackPlugins) {
    if (isArray(webpackPlugins)) {
        addWebpackPlugins(webpackConfig, webpackPlugins);

        log("Added webpack plugins.");
    }
}

function removePluginsFromWebpackConfig(webpackConfig, removePlugins, context) {
    if (!removePlugins) {
        return;
    }

    if (isFunction(removePlugins)) {
        webpackConfig.plugins = removePlugins(webpackConfig.plugins, context);

        log("Removed webpack plugins.");
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        if (removePlugins.pluginNames && isArray(removePlugins.pluginNames)) {
            for (const pluginName of removePlugins.pluginNames) {
                removeWebpackPlugins(webpackConfig, pluginByName(pluginName));
                log(`Removed webpack plugin ${pluginName}.`);
            }

            log("Removed webpack plugins.");
        } else {
            throw new Error(
                `craco: 'webpack.removePlugins' needs to be a function or an object containing an array named pluginNames`
            );
        }
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
        const { alias, plugins, removePlugins, configure } = cracoConfig.webpack;

        if (alias) {
            addAlias(resultingWebpackConfig, alias);
        }

        if (removePlugins) {
            removePluginsFromWebpackConfig(resultingWebpackConfig, removePlugins, context);
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
