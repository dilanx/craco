"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeWebpackConfig = void 0;
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var logger_1 = require("../../logger");
var utils_1 = require("../../utils");
var webpack_plugins_1 = require("../../webpack-plugins");
var plugins_1 = require("../plugins");
var babel_1 = require("./babel");
var eslint_1 = require("./eslint");
var style_1 = require("./style/style");
var typescript_1 = require("./typescript");
function addAlias(webpackConfig, webpackAlias) {
    if (webpackConfig.resolve) {
        // TODO: ensure is a plain object, if not, log an error.
        webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias || {}, webpackAlias);
    }
    (0, logger_1.log)('Added webpack alias.');
}
function addPlugins(webpackConfig, webpackPlugins) {
    if ((0, utils_1.isArray)(webpackPlugins)) {
        (0, webpack_plugins_1.addPlugins)(webpackConfig, webpackPlugins);
        (0, logger_1.log)('Added webpack plugins.');
    }
    else {
        throw new Error("craco: 'webpack.plugins.add' needs to be a an array of plugins");
    }
}
function removePluginsFromWebpackConfig(webpackConfig, remove) {
    var e_1, _a;
    if (!remove) {
        return;
    }
    if ((0, utils_1.isArray)(remove)) {
        try {
            for (var remove_1 = __values(remove), remove_1_1 = remove_1.next(); !remove_1_1.done; remove_1_1 = remove_1.next()) {
                var pluginName = remove_1_1.value;
                var hasRemovedAny = (0, webpack_plugins_1.removePlugins)(webpackConfig, (0, webpack_plugins_1.pluginByName)(pluginName)).hasRemovedAny;
                if (hasRemovedAny) {
                    (0, logger_1.log)("Removed webpack plugin ".concat(pluginName, "."));
                }
                else {
                    (0, logger_1.log)("Did not remove webpack plugin ".concat(pluginName, "."));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (remove_1_1 && !remove_1_1.done && (_a = remove_1.return)) _a.call(remove_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        (0, logger_1.log)('Removed webpack plugins.');
    }
    else {
        throw new Error("craco: 'webpack.plugins.remove' needs to be a an array of plugin names");
    }
}
function giveTotalControl(webpackConfig, configureWebpack, context) {
    if ((0, utils_1.isFunction)(configureWebpack)) {
        webpackConfig = configureWebpack(webpackConfig, context);
        if (!webpackConfig) {
            throw new Error("craco: 'webpack.configure' function didn't returned a webpack config object.");
        }
    }
    else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        webpackConfig = (0, webpack_merge_1.default)(webpackConfig, configureWebpack);
    }
    (0, logger_1.log)("Merged webpack config with 'webpack.configure'.");
    return webpackConfig;
}
function mergeWebpackConfig(cracoConfig, webpackConfig, context) {
    var resultingWebpackConfig = webpackConfig;
    resultingWebpackConfig = (0, babel_1.overrideBabel)(cracoConfig, resultingWebpackConfig, context);
    resultingWebpackConfig = (0, eslint_1.overrideEsLint)(cracoConfig, resultingWebpackConfig, context);
    resultingWebpackConfig = (0, style_1.overrideStyle)(cracoConfig, resultingWebpackConfig, context);
    resultingWebpackConfig = (0, typescript_1.overrideTypeScript)(cracoConfig, resultingWebpackConfig);
    if (cracoConfig.webpack) {
        var _a = cracoConfig.webpack, alias = _a.alias, plugins = _a.plugins, configure = _a.configure;
        if (alias) {
            addAlias(resultingWebpackConfig, alias);
        }
        if (plugins) {
            // we still support the old format of plugin: [] where the array is a list of the plugins to add
            if ((0, utils_1.isArray)(plugins)) {
                addPlugins(resultingWebpackConfig, plugins);
            }
            else {
                var add = plugins.add, remove = plugins.remove;
                if (remove) {
                    removePluginsFromWebpackConfig(resultingWebpackConfig, remove);
                }
                // Add after removing to preserve any plugins explicitely added via the Craco config
                if (add) {
                    addPlugins(resultingWebpackConfig, add);
                }
            }
        }
        if (configure) {
            resultingWebpackConfig = giveTotalControl(resultingWebpackConfig, configure, context);
        }
    }
    resultingWebpackConfig = (0, plugins_1.applyWebpackConfigPlugins)(cracoConfig, resultingWebpackConfig, context);
    return resultingWebpackConfig;
}
exports.mergeWebpackConfig = mergeWebpackConfig;
