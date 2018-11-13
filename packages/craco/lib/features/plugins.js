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
            throw new Error(
                "craco: Plugin returned an undefined craco config."
            );
        }
    }

    log("Overrided craco config with plugin.");

    return cracoConfig;
}

function applyCracoConfigPlugins(cracoConfig, context) {
    if (isArray(cracoConfig.plugins)) {
        cracoConfig.plugins.forEach(x => {
            cracoConfig = overrideCracoConfig(x, cracoConfig, context);
        });
    }

    log("Applied craco config plugins.");

    return cracoConfig;
}

/************  Webpack Config  *******************/

function overrideWebpack(
    { plugin, options },
    cracoConfig,
    webpackConfig,
    context
) {
    if (isFunction(plugin.overrideWebpackConfig)) {
        const resultingConfig = plugin.overrideWebpackConfig({
            cracoConfig: cracoConfig,
            webpackConfig: webpackConfig,
            pluginOptions: options,
            context: context
        });

        if (!resultingConfig) {
            throw new Error(
                "craco: Plugin returned an undefined webpack config."
            );
        }
    }

    log("Overrided webpack config with plugin.");

    return webpackConfig;
}

function applyWebpackConfigPlugins(cracoConfig, webpackConfig, context) {
    if (isArray(cracoConfig.plugins)) {
        cracoConfig.plugins.forEach(x => {
            webpackConfig = overrideWebpack(
                x,
                cracoConfig,
                webpackConfig,
                context
            );
        });
    }

    log("Applied webpack config plugins.");

    return webpackConfig;
}

/************  Jest Config  *******************/

function overrideJest({ plugin, options }, cracoConfig, jestConfig, context) {
    if (isFunction(plugin.overrideJestConfig)) {
        const resultingConfig = plugin.overrideJestConfig({
            cracoConfig: cracoConfig,
            jestConfig: jestConfig,
            pluginOptions: options,
            context: context
        });

        if (!resultingConfig) {
            throw new Error("craco: Plugin returned an undefined Jest config.");
        }
    }

    log("Overrided Jest config with plugin.");

    return jestConfig;
}

function applyJestConfigPlugins(cracoConfig, jestConfig, context) {
    if (isArray(cracoConfig.plugins)) {
        cracoConfig.plugins.forEach(x => {
            jestConfig = overrideJest(x, cracoConfig, jestConfig, context);
        });
    }

    log("Applied Jest config plugins.");

    return jestConfig;
}

module.exports = {
    applyCracoConfigPlugins,
    applyWebpackConfigPlugins,
    applyJestConfigPlugins
};
