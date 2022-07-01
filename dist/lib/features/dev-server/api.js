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
exports.createDevServerConfigProviderProxy = void 0;
var args_1 = require("../../args");
var config_1 = require("../../config");
var cra_1 = require("../../cra");
var utils_1 = require("../../utils");
var create_config_provider_proxy_1 = require("./create-config-provider-proxy");
function createDevServerConfigProviderProxy(callerCracoConfig, callerContext, options) {
    if (!callerCracoConfig) {
        throw new Error("craco: 'cracoConfig' is required.");
    }
    if ((0, utils_1.isFunction)(callerCracoConfig)) {
        throw new Error("craco: 'cracoConfig' should be an object.");
    }
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
    }
    (0, args_1.setArgs)(options);
    var context = __assign({ env: process.env.NODE_ENV }, callerContext);
    var cracoConfig = (0, config_1.processCracoConfig)(callerCracoConfig, context);
    context.paths = (0, cra_1.getCraPaths)(cracoConfig);
    var proxy = (0, create_config_provider_proxy_1.createConfigProviderProxy)(cracoConfig, context);
    return proxy;
}
exports.createDevServerConfigProviderProxy = createDevServerConfigProviderProxy;
