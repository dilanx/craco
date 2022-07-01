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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebpackProdConfig = exports.createWebpackDevConfig = void 0;
var args_1 = require("../../args");
var config_1 = require("../../config");
var cra_1 = require("../../cra");
var utils_1 = require("../../utils");
var merge_webpack_config_1 = require("./merge-webpack-config");
function createWebpackDevConfig(callerCracoConfig, callerContext, options) {
    return createWebpackConfig(callerCracoConfig, callerContext, cra_1.loadWebpackDevConfig, 'development', options);
}
exports.createWebpackDevConfig = createWebpackDevConfig;
function createWebpackProdConfig(callerCracoConfig, callerContext, options) {
    return createWebpackConfig(callerCracoConfig, callerContext, cra_1.loadWebpackProdConfig, 'production', options);
}
exports.createWebpackProdConfig = createWebpackProdConfig;
function createWebpackConfig(callerCracoConfig, callerContext, loadWebpackConfig, env, options) {
    if (callerContext === void 0) { callerContext = {}; }
    if (options === void 0) { options = {}; }
    if (!callerCracoConfig) {
        throw new Error("craco: 'cracoConfig' is required.");
    }
    if ((0, utils_1.isFunction)(callerCracoConfig)) {
        throw new Error("craco: 'cracoConfig' should be an object.");
    }
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = env;
    }
    (0, args_1.setArgs)(options);
    var context = __assign({ env: process.env.NODE_ENV }, callerContext);
    var cracoConfig = (0, config_1.processCracoConfig)(callerCracoConfig, context);
    context.paths = (0, cra_1.getCraPaths)(cracoConfig);
    var craWebpackConfig = loadWebpackConfig(cracoConfig);
    var resultingWebpackConfig = (0, merge_webpack_config_1.mergeWebpackConfig)(cracoConfig, craWebpackConfig, context);
    return resultingWebpackConfig;
}
