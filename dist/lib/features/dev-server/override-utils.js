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
exports.overrideDevServerUtils = void 0;
var cra_1 = require("../../cra");
var logger_1 = require("../../logger");
function overrideWebpackCompilerToDisableTypeScriptTypeChecking(craDevServersUtils) {
    if (craDevServersUtils.createCompiler) {
        var craCreateCompiler_1 = craDevServersUtils.createCompiler;
        craDevServersUtils.createCompiler = function (args) {
            var newArgs = __assign(__assign({}, args), { useTypeScript: false });
            return craCreateCompiler_1(newArgs);
        };
        (0, logger_1.log)('Overrided Webpack compiler to disable TypeScript type checking.');
    }
    return craDevServersUtils;
}
function overrideUtils(cracoConfig) {
    if (cracoConfig.typescript) {
        var enableTypeChecking = cracoConfig.typescript.enableTypeChecking;
        if (enableTypeChecking === false) {
            var craDevServersUtils = (0, cra_1.loadDevServerUtils)();
            var resultingDevServersUtils = overrideWebpackCompilerToDisableTypeScriptTypeChecking(craDevServersUtils);
            (0, cra_1.overrideDevServerUtils)(resultingDevServersUtils);
        }
    }
}
exports.overrideDevServerUtils = overrideUtils;
