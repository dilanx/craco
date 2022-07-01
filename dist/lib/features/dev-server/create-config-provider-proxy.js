"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigProviderProxy = void 0;
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var cra_1 = require("../../cra");
var logger_1 = require("../../logger");
var utils_1 = require("../../utils");
var plugins_1 = require("../plugins");
function createProxy(cracoConfig, craDevServerConfigProvider, context) {
    var proxy = function (proxy, allowedHost) {
        var devServerConfig = craDevServerConfigProvider(proxy, allowedHost);
        if ((0, utils_1.isFunction)(cracoConfig.devServer)) {
            devServerConfig = cracoConfig.devServer(devServerConfig, __assign(__assign({}, context), { proxy: proxy, allowedHost: allowedHost }));
            if (!devServerConfig) {
                throw new Error("craco: 'devServer' function didn't return a config object.");
            }
        }
        else {
            // TODO: ensure is otherwise a plain object, if not, log an error.
            devServerConfig = (0, webpack_merge_1.default)(devServerConfig, cracoConfig.devServer || {});
        }
        devServerConfig = (0, plugins_1.applyDevServerConfigPlugins)(cracoConfig, devServerConfig, __assign(__assign({}, context), { proxy: proxy, allowedHost: allowedHost }));
        (0, logger_1.log)('Merged DevServer config.');
        return devServerConfig;
    };
    return proxy;
}
function createConfigProviderProxy(cracoConfig, context) {
    var craDevServerConfigProvider = (0, cra_1.loadDevServerConfigProvider)(cracoConfig);
    var proxy = createProxy(cracoConfig, craDevServerConfigProvider, context);
    return proxy;
}
exports.createConfigProviderProxy = createConfigProviderProxy;
