"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJestBabelTransform = void 0;
var babel_jest_1 = __importDefault(require("babel-jest"));
var config_1 = require("../../config");
var utils_1 = require("../../utils");
/**
 * To check if support jsx-runtime
 * Copy from https://github.com/facebook/create-react-app/blob/2b1161b34641bb4d2f269661cd636bbcd4888406/packages/react-scripts/config/jest/babelTransform.js#L12
 */
var hasJsxRuntime = (function () {
    if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
        return false;
    }
    try {
        require.resolve('react/jsx-runtime');
        return true;
    }
    catch (e) {
        return false;
    }
})();
// TODO shouldn't have to type this as any, maybe dependencies are messed up?
function createJestBabelTransform(cracoConfig) {
    var _a, _b, _c;
    if (!cracoConfig) {
        var context = { env: process.env.NODE_ENV };
        cracoConfig = (0, config_1.loadCracoConfig)(context);
    }
    var craBabelTransformer = {
        presets: [
            [
                'babel-preset-react-app',
                {
                    runtime: hasJsxRuntime ? 'automatic' : 'classic',
                },
            ],
        ],
        babelrc: false,
        configFile: false,
    };
    if (cracoConfig) {
        var _d = (_b = (_a = cracoConfig.jest) === null || _a === void 0 ? void 0 : _a.babel) !== null && _b !== void 0 ? _b : {}, addPresets = _d.addPresets, addPlugins = _d.addPlugins;
        if (cracoConfig.babel) {
            if (addPresets) {
                var presets = cracoConfig.babel.presets;
                if ((0, utils_1.isArray)(presets)) {
                    craBabelTransformer.presets =
                        (_c = craBabelTransformer.presets) === null || _c === void 0 ? void 0 : _c.concat(presets);
                }
            }
            if (addPlugins) {
                var plugins = cracoConfig.babel.plugins;
                if ((0, utils_1.isArray)(plugins)) {
                    craBabelTransformer.plugins = plugins;
                }
            }
        }
    }
    return babel_jest_1.default.createTransformer
        ? babel_jest_1.default.createTransformer(craBabelTransformer)
        : undefined;
}
exports.createJestBabelTransform = createJestBabelTransform;
