"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideJest = void 0;
var cra_1 = require("../../cra");
var logger_1 = require("../../logger");
var merge_jest_config_1 = require("./merge-jest-config");
function overrideJest(cracoConfig, context) {
    if (cracoConfig.jest) {
        var craJestConfigProvider_1 = (0, cra_1.loadJestConfigProvider)(cracoConfig);
        var proxy = function () {
            return (0, merge_jest_config_1.mergeJestConfig)(cracoConfig, craJestConfigProvider_1, context);
        };
        (0, cra_1.overrideJestConfigProvider)(cracoConfig, proxy);
        (0, logger_1.log)('Overrided Jest config.');
    }
}
exports.overrideJest = overrideJest;
