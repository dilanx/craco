"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var args_1 = require("../lib/args");
// Make sure this is called before "paths" is imported.
(0, args_1.findArgsFromCli)();
var config_1 = require("../lib/config");
var cra_1 = require("../lib/cra");
var override_1 = require("../lib/features/dev-server/override");
var override_2 = require("../lib/features/webpack/override");
var logger_1 = require("../lib/logger");
var validate_cra_version_1 = require("../lib/validate-cra-version");
(0, logger_1.log)('Override started with arguments: ', process.argv);
(0, logger_1.log)('For environment: ', process.env.NODE_ENV);
var context = {
    env: process.env.NODE_ENV,
};
(0, config_1.loadCracoConfigAsync)(context).then(function (cracoConfig) {
    (0, validate_cra_version_1.validateCraVersion)(cracoConfig);
    context.paths = (0, cra_1.getCraPaths)(cracoConfig);
    (0, override_2.overrideWebpackDev)(cracoConfig, context);
    (0, override_1.overrideDevServer)(cracoConfig, context);
    (0, cra_1.start)(cracoConfig);
});
