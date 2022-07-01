"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideTypeScript = void 0;
var logger_1 = require("../../logger");
function disableTypeChecking(webpackConfig) {
    var _a;
    webpackConfig.plugins = (_a = webpackConfig.plugins) === null || _a === void 0 ? void 0 : _a.filter(function (plugin) { return plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'; });
    (0, logger_1.log)('Disabled TypeScript type checking.');
    return webpackConfig;
}
function overrideTypeScript(cracoConfig, webpackConfig) {
    if (cracoConfig.typescript) {
        var enableTypeChecking = cracoConfig.typescript.enableTypeChecking;
        if (enableTypeChecking === false) {
            disableTypeChecking(webpackConfig);
        }
    }
    return webpackConfig;
}
exports.overrideTypeScript = overrideTypeScript;
