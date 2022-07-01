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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlugins = exports.addPlugins = exports.getPlugin = exports.pluginByName = void 0;
function pluginByName(targetPluginName) {
    return function (plugin) {
        return plugin.constructor.name === targetPluginName;
    };
}
exports.pluginByName = pluginByName;
function getPlugin(webpackConfig, matcher) {
    var _a;
    var matchingPlugin = (_a = webpackConfig.plugins) === null || _a === void 0 ? void 0 : _a.find(matcher);
    return {
        isFound: matchingPlugin !== undefined,
        match: matchingPlugin,
    };
}
exports.getPlugin = getPlugin;
function addPlugins(webpackConfig, webpackPlugins) {
    var e_1, _a;
    var prependPlugins = [];
    var appendPlugins = [];
    try {
        for (var webpackPlugins_1 = __values(webpackPlugins), webpackPlugins_1_1 = webpackPlugins_1.next(); !webpackPlugins_1_1.done; webpackPlugins_1_1 = webpackPlugins_1.next()) {
            var webpackPlugin = webpackPlugins_1_1.value;
            if (Array.isArray(webpackPlugin)) {
                var _b = __read(webpackPlugin, 2), plugin = _b[0], order = _b[1];
                if (order === 'append') {
                    appendPlugins.push(plugin);
                }
                else {
                    // Existing behaviour is to prepend
                    prependPlugins.push(plugin);
                }
                continue;
            }
            prependPlugins.push(webpackPlugin);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (webpackPlugins_1_1 && !webpackPlugins_1_1.done && (_a = webpackPlugins_1.return)) _a.call(webpackPlugins_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    webpackConfig.plugins = __spreadArray(__spreadArray(__spreadArray([], __read(prependPlugins), false), __read(webpackConfig.plugins), false), __read(appendPlugins), false);
}
exports.addPlugins = addPlugins;
function removePlugins(webpackConfig, matcher) {
    var _a, _b, _c, _d, _e;
    var prevCount = (_b = (_a = webpackConfig.plugins) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    webpackConfig.plugins = (_c = webpackConfig.plugins) === null || _c === void 0 ? void 0 : _c.filter(function (x, i, a) { return !matcher(x, i, a); });
    var removedPluginsCount = prevCount - ((_e = (_d = webpackConfig.plugins) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0);
    return {
        hasRemovedAny: removedPluginsCount > 0,
        removedCount: removedPluginsCount,
    };
}
exports.removePlugins = removePlugins;
