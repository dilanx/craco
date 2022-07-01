"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideEsLint = void 0;
var logger_1 = require("../../logger");
var utils_1 = require("../../utils");
var webpack_plugins_1 = require("../../webpack-plugins");
function disableEslint(webpackConfig) {
    var hasRemovedAny = (0, webpack_plugins_1.removePlugins)(webpackConfig, (0, webpack_plugins_1.pluginByName)('ESLintWebpackPlugin')).hasRemovedAny;
    if (hasRemovedAny) {
        (0, logger_1.log)('Disabled ESLint.');
    }
    else {
        (0, logger_1.logError)("Couldn't disabled ESLint.");
    }
}
function extendsEslintConfig(plugin, eslintConfig, context) {
    var configure = eslintConfig.configure;
    if (configure) {
        if ((0, utils_1.isFunction)(configure)) {
            if (plugin.options) {
                plugin.options.baseConfig = configure(plugin.options.baseConfig || {}, context);
            }
            else {
                plugin.options = {
                    baseConfig: configure({}, context),
                };
            }
            if (!plugin.options.baseConfig) {
                throw new Error("craco: 'eslint.configure' function didn't return a config object.");
            }
        }
        else {
            // TODO: ensure is otherwise a plain object, if not, log an error.
            if (plugin.options) {
                plugin.options.baseConfig = (0, utils_1.deepMergeWithArray)({}, plugin.options.baseConfig || {}, configure);
            }
            else {
                plugin.options = {
                    baseConfig: configure,
                };
            }
        }
        (0, logger_1.log)("Merged ESLint config with 'eslint.configure'.");
    }
}
function useEslintConfigFile(plugin) {
    if (plugin.options) {
        plugin.options.useEslintrc = true;
        delete plugin.options.baseConfig;
    }
    else {
        plugin.options = {
            useEslintrc: true,
        };
    }
    (0, logger_1.log)('Overrided ESLint config to use a config file.');
}
function enableEslintIgnoreFile(plugin) {
    if (plugin.options) {
        plugin.options.ignore = true;
    }
    else {
        plugin.options = {
            ignore: true,
        };
    }
    (0, logger_1.log)('Overrided ESLint config to enable an ignore file.');
}
function applyPluginOptions(plugin, pluginOptions, context) {
    if ((0, utils_1.isFunction)(pluginOptions)) {
        plugin.options = pluginOptions(plugin.options || {}, context);
        if (!plugin.options) {
            throw new Error("craco: 'eslint.pluginOptions' function didn't return a config object.");
        }
    }
    else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        plugin.options = (0, utils_1.deepMergeWithArray)(plugin.options || {}, pluginOptions);
    }
    (0, logger_1.log)('Applied ESLint plugin options.');
}
function overrideEsLint(cracoConfig, webpackConfig, context) {
    if (cracoConfig.eslint) {
        var _a = (0, webpack_plugins_1.getPlugin)(webpackConfig, (0, webpack_plugins_1.pluginByName)('ESLintWebpackPlugin')), isFound = _a.isFound, match = _a.match;
        if (!isFound) {
            (0, logger_1.logError)('Cannot find ESLint plugin (ESLintWebpackPlugin).');
            return webpackConfig;
        }
        var _b = cracoConfig.eslint, enable = _b.enable, mode = _b.mode, pluginOptions = _b.pluginOptions;
        if (enable === false) {
            disableEslint(webpackConfig);
            return webpackConfig;
        }
        enableEslintIgnoreFile(match);
        if (mode === 'file') {
            useEslintConfigFile(match);
        }
        else {
            extendsEslintConfig(match, cracoConfig.eslint, context);
        }
        if (pluginOptions) {
            applyPluginOptions(match, pluginOptions, context);
        }
    }
    return webpackConfig;
}
exports.overrideEsLint = overrideEsLint;
