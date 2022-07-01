"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnvironmentVariables = void 0;
var utils_1 = require("../../utils");
function setEnvironmentVariable(envProperty, value) {
    if (!(0, utils_1.isString)(value)) {
        process.env[envProperty] = value.toString();
    }
    else {
        process.env[envProperty] = value;
    }
}
function setEnvironmentVariables(cracoConfig) {
    if (cracoConfig.devServer) {
        var devServer = void 0;
        if ((0, utils_1.isFunction)(cracoConfig.devServer)) {
            devServer = cracoConfig.devServer({}, {});
        }
        else {
            devServer = cracoConfig.devServer;
        }
        var open_1 = devServer.open, https = devServer.https, host = devServer.host, port = devServer.port;
        if (open_1 === false) {
            setEnvironmentVariable('BROWSER', 'none');
        }
        if (https) {
            setEnvironmentVariable('HTTPS', 'true');
        }
        if (host) {
            setEnvironmentVariable('HOST', host);
        }
        if (port) {
            setEnvironmentVariable('PORT', port);
        }
    }
}
exports.setEnvironmentVariables = setEnvironmentVariables;
