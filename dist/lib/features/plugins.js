"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyJestConfigPlugins = exports.applyDevServerConfigPlugins = exports.applyWebpackConfigPlugins = exports.applyCracoConfigPlugins = void 0;
var logger_1 = require("../logger");
/************  Craco Config  ************/
function overrideCraco(_a, cracoConfig, context) {
    var plugin = _a.plugin, options = _a.options;
    if (plugin.overrideCracoConfig) {
        var resultingConfig = plugin.overrideCracoConfig({
            cracoConfig: cracoConfig,
            pluginOptions: options,
            context: context,
        });
        if (!resultingConfig) {
            throw new Error('craco: Plugin returned an undefined craco config.');
        }
        return resultingConfig;
    }
    (0, logger_1.log)('Overrided craco config with plugin.');
    return cracoConfig;
}
function applyCracoConfigPlugins(cracoConfig, context) {
    if (cracoConfig.plugins) {
        cracoConfig.plugins.forEach(function (plugin) {
            cracoConfig = overrideCraco(plugin, cracoConfig, context);
        });
    }
    (0, logger_1.log)('Applied craco config plugins.');
    return cracoConfig;
}
exports.applyCracoConfigPlugins = applyCracoConfigPlugins;
/************  Webpack Config  ************/
function overrideWebpack(_a, cracoConfig, webpackConfig, context) {
    var plugin = _a.plugin, options = _a.options;
    if (plugin.overrideWebpackConfig) {
        var resultingConfig = plugin.overrideWebpackConfig({
            cracoConfig: cracoConfig,
            webpackConfig: webpackConfig,
            pluginOptions: options,
            context: context,
        });
        if (!resultingConfig) {
            throw new Error('craco: Plugin returned an undefined webpack config.');
        }
        return resultingConfig;
    }
    (0, logger_1.log)('Overrided webpack config with plugin.');
    return webpackConfig;
}
function applyWebpackConfigPlugins(cracoConfig, webpackConfig, context) {
    if (cracoConfig.plugins) {
        cracoConfig.plugins.forEach(function (plugin) {
            webpackConfig = overrideWebpack(plugin, cracoConfig, webpackConfig, context);
        });
    }
    (0, logger_1.log)('Applied webpack config plugins.');
    return webpackConfig;
}
exports.applyWebpackConfigPlugins = applyWebpackConfigPlugins;
/************  DevServer Config  ************/
function overrideDevServer(_a, cracoConfig, devServerConfig, context) {
    var plugin = _a.plugin, options = _a.options;
    if (plugin.overrideDevServerConfig) {
        var resultingConfig = plugin.overrideDevServerConfig({
            cracoConfig: cracoConfig,
            devServerConfig: devServerConfig,
            pluginOptions: options,
            context: context,
        });
        if (!resultingConfig) {
            throw new Error('craco: Plugin returned an undefined devServer config.');
        }
        return resultingConfig;
    }
    (0, logger_1.log)('Overrided devServer config with plugin.');
    return devServerConfig;
}
function applyDevServerConfigPlugins(cracoConfig, devServerConfig, context) {
    if (cracoConfig.plugins) {
        cracoConfig.plugins.forEach(function (plugin) {
            devServerConfig = overrideDevServer(plugin, cracoConfig, devServerConfig, context);
        });
    }
    (0, logger_1.log)('Applied devServer config plugins.');
    return devServerConfig;
}
exports.applyDevServerConfigPlugins = applyDevServerConfigPlugins;
/************  Jest Config  *******************/
function overrideJest(_a, cracoConfig, jestConfig, context) {
    var plugin = _a.plugin, options = _a.options;
    if (plugin.overrideJestConfig) {
        var resultingConfig = plugin.overrideJestConfig({
            cracoConfig: cracoConfig,
            jestConfig: jestConfig,
            pluginOptions: options,
            context: context,
        });
        if (!resultingConfig) {
            throw new Error('craco: Plugin returned an undefined Jest config.');
        }
        return resultingConfig;
    }
    (0, logger_1.log)('Overrided Jest config with plugin.');
    return jestConfig;
}
function applyJestConfigPlugins(cracoConfig, jestConfig, context) {
    if (cracoConfig.plugins) {
        cracoConfig.plugins.forEach(function (plugin) {
            jestConfig = overrideJest(plugin, cracoConfig, jestConfig, context);
        });
    }
    (0, logger_1.log)('Applied Jest config plugins.');
    return jestConfig;
}
exports.applyJestConfigPlugins = applyJestConfigPlugins;
