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
exports.mergeJestConfig = void 0;
var path_1 = __importDefault(require("path"));
var logger_1 = require("../../logger");
var paths_1 = require("../../paths");
var utils_1 = require("../../utils");
var plugins_1 = require("../plugins");
var BABEL_TRANSFORM_ENTRY_KEY = '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$';
function overrideBabelTransform(jestConfig, cracoConfig, transformKey) {
    // The cracoConfig needs to be available within the jest-babel-transform in order to honor its settings.
    // This approach is based on https://github.com/facebook/jest/issues/1468#issuecomment-384825178
    jestConfig.globals = jestConfig.globals || {};
    jestConfig.globals._cracoConfig = cracoConfig;
    if (!jestConfig.transform) {
        jestConfig.transform = {};
    }
    jestConfig.transform[transformKey] = require.resolve('./jest-babel-transform');
    (0, logger_1.log)('Overrided Jest Babel transformer.');
}
function configureBabel(jestConfig, cracoConfig) {
    var _a, _b;
    var _c = (_b = (_a = cracoConfig.jest) === null || _a === void 0 ? void 0 : _a.babel) !== null && _b !== void 0 ? _b : {}, addPresets = _c.addPresets, addPlugins = _c.addPlugins;
    if (addPresets || addPlugins) {
        if (cracoConfig.babel) {
            var _d = cracoConfig.babel, presets = _d.presets, plugins = _d.plugins;
            if ((0, utils_1.isArray)(presets) || (0, utils_1.isArray)(plugins)) {
                if (!jestConfig.transform) {
                    jestConfig.transform = {};
                }
                if (jestConfig.transform[BABEL_TRANSFORM_ENTRY_KEY]) {
                    overrideBabelTransform(jestConfig, cracoConfig, BABEL_TRANSFORM_ENTRY_KEY);
                }
                else {
                    throw new Error("craco: Cannot find Jest transform entry for Babel ".concat(BABEL_TRANSFORM_ENTRY_KEY, "."));
                }
            }
        }
    }
}
function giveTotalControl(jestConfig, configureJest, context) {
    if ((0, utils_1.isFunction)(configureJest)) {
        jestConfig = configureJest(jestConfig, context);
        if (!jestConfig) {
            throw new Error("craco: 'jest.configure' function didn't returned a Jest config object.");
        }
    }
    else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        jestConfig = (0, utils_1.deepMergeWithArray)({}, jestConfig, configureJest);
    }
    (0, logger_1.log)("Merged Jest config with 'jest.configure'.");
    return jestConfig;
}
// TODO what is craJestConfigProvider?
function mergeJestConfig(cracoConfig, craJestConfigProvider, context) {
    var customResolve = function (relativePath) {
        var _a;
        return require.resolve(path_1.default.join((_a = cracoConfig.reactScriptsVersion) !== null && _a !== void 0 ? _a : 'react-scripts', relativePath), { paths: [paths_1.projectRoot] });
    };
    var jestConfig = craJestConfigProvider(customResolve, paths_1.projectRoot, false);
    if (cracoConfig.jest) {
        configureBabel(jestConfig, cracoConfig);
        var jestContext = __assign(__assign({}, context), { resolve: customResolve, rootDir: paths_1.projectRoot });
        if (cracoConfig.jest.configure) {
            jestConfig = giveTotalControl(jestConfig, cracoConfig.jest.configure, jestContext);
        }
        jestConfig = (0, plugins_1.applyJestConfigPlugins)(cracoConfig, jestConfig, jestContext);
        (0, logger_1.log)('Merged Jest config.');
    }
    return jestConfig;
}
exports.mergeJestConfig = mergeJestConfig;
