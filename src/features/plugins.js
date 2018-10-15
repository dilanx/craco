const { isArray, isFunction } = require("../utils");
const { log } = require("../logger");

/************  Craco Config  *******************/

function overrideCracoConfig({ plugin, options }, cracoConfig, context) {
    if (isFunction(plugin.overrideCracoConfig)) {
        const resultingConfig = plugin.overrideCracoConfig({
            cracoConfig: cracoConfig,
            pluginOptions: options,
            context: context
        });

        if (!resultingConfig) {
            throw new Error("craco: Plugin returned an undefined craco config.");
        }
    }

    log("Overrided Craco config with plugin.");

    return cracoConfig;
}

function applyCracoConfigPlugins(cracoConfig, context) {
    if (isArray(cracoConfig.plugins)) {
        cracoConfig.plugins.forEach(x => {
            cracoConfig = overrideCracoConfig(x, cracoConfig, context);
        });
    }

    log("Applied Craco config plugins.");

    return cracoConfig;
}

/************  Webpack Config  *******************/

function overrideWebpack({ plugin, options }, cracoConfig, webpackConfig, context) {
    if (isFunction(plugin.overrideWebpackConfig)) {
        const resultingConfig = plugin.overrideWebpackConfig({
            cracoConfig: cracoConfig,
            webpackConfig: webpackConfig,
            pluginOptions: options,
            context: context
        });

        if (!resultingConfig) {
            throw new Error("craco: Plugin returned an undefined Webpack config.");
        }
    }

    log("Overrided Webpack config with plugin.");

    return webpackConfig;
}

function applyWebpackConfigPlugins(cracoConfig, webpackConfig, context) {
    if (isArray(cracoConfig.plugins)) {
        cracoConfig.plugins.forEach(x => {
            webpackConfig = overrideWebpack(x, cracoConfig, webpackConfig, context);
        });
    }

    log("Applied Webpack config plugins.");

    return webpackConfig;
}

module.exports = {
    applyCracoConfigPlugins,
    applyWebpackConfigPlugins
};
