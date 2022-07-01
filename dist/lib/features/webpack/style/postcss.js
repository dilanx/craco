"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overridePostcss = void 0;
var lodash_1 = require("lodash");
var loaders_1 = require("../../../loaders");
var logger_1 = require("../../../logger");
var paths_1 = require("../../../paths");
var utils_1 = require("../../../utils");
var CRA_PLUGINS = function (presetEnv) {
    // prettier-ignore
    return [
        require("postcss-flexbugs-fixes"),
        require("postcss-preset-env")(presetEnv),
        require(require.resolve("postcss-normalize", { paths: [paths_1.projectRoot] }))
    ];
};
var CRA_PRESET_ENV = {
    autoprefixer: {
        flexbox: 'no-2009',
    },
    stage: 3,
};
function usePostcssConfigFile(match) {
    var _a, _b, _c;
    if (!(0, lodash_1.isString)((_a = match.loader) === null || _a === void 0 ? void 0 : _a.options) &&
        ((_c = (_b = match.loader) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.postcssOptions)) {
        var ident = match.loader.options.postcssOptions.ident;
        var sourceMap = match.loader.options.postcssOptions.sourceMap;
        match.loader.options.postcssOptions = {
            ident: ident,
            sourceMap: sourceMap,
        };
        (0, logger_1.log)('Overwrited PostCSS config to use a config file.');
    }
}
function extendsPostcss(match, _a) {
    var _b;
    var postcssOptions = _a.postcss;
    var _c = postcssOptions !== null && postcssOptions !== void 0 ? postcssOptions : {}, plugins = _c.plugins, env = _c.env;
    if ((0, utils_1.isArray)(plugins) || env) {
        var postcssPlugins_1;
        if (env) {
            var mergedPreset = (0, utils_1.deepMergeWithArray)({}, CRA_PRESET_ENV, env);
            postcssPlugins_1 = CRA_PLUGINS(mergedPreset);
            (0, logger_1.log)('Merged PostCSS env preset.');
        }
        else {
            var craPlugins = [];
            if (!(0, lodash_1.isString)(match.loader.options)) {
                var options = (_b = match.loader.options) === null || _b === void 0 ? void 0 : _b.postcssOptions;
                if ((0, utils_1.isFunction)(options)) {
                    craPlugins = options().plugins;
                }
                else {
                    craPlugins = options === null || options === void 0 ? void 0 : options.plugins;
                }
            }
            postcssPlugins_1 = craPlugins || [];
        }
        if (plugins) {
            postcssPlugins_1 = (0, utils_1.isFunction)(plugins)
                ? plugins(postcssPlugins_1)
                : postcssPlugins_1.concat(plugins);
            (0, logger_1.log)('Added PostCSS plugins.');
        }
        if (match.loader.options && !(0, lodash_1.isString)(match.loader.options)) {
            if (match.loader.options.postcssOptions) {
                match.loader.options.postcssOptions.plugins = function () {
                    return postcssPlugins_1;
                };
            }
            else {
                match.loader.options.postcssOptions = {
                    plugins: function () { return postcssPlugins_1; },
                };
            }
        }
    }
}
function applyLoaderOptions(match, loaderOptions, context) {
    if ((0, utils_1.isFunction)(loaderOptions)) {
        match.loader.options = loaderOptions(match.loader.options || {}, context);
        if (!match.loader.options) {
            throw new Error("craco: 'style.postcss.loaderOptions' function didn't return a loader config object.");
        }
    }
    else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        match.loader.options = (0, utils_1.deepMergeWithArray)({}, match.loader.options || {}, loaderOptions);
    }
    (0, logger_1.log)('Applied PostCSS loaders options.');
}
function overrideLoader(match, styleConfig, context) {
    var _a;
    var _b = (_a = styleConfig.postcss) !== null && _a !== void 0 ? _a : {}, mode = _b.mode, loaderOptions = _b.loaderOptions;
    if (mode === 'file') {
        usePostcssConfigFile(match);
    }
    else {
        extendsPostcss(match, styleConfig);
    }
    if (loaderOptions) {
        applyLoaderOptions(match, loaderOptions, context);
    }
    (0, logger_1.log)('Overrided PostCSS loader.');
}
function overridePostcss(styleConfig, webpackConfig, context) {
    if (styleConfig.postcss) {
        var _a = (0, loaders_1.getLoaders)(webpackConfig, (0, loaders_1.loaderByName)('postcss-loader')), hasFoundAny = _a.hasFoundAny, matches = _a.matches;
        if (!hasFoundAny) {
            (0, logger_1.logError)('Cannot find any PostCSS loaders.');
            return webpackConfig;
        }
        matches.forEach(function (x) {
            overrideLoader(x, styleConfig, context);
        });
    }
    return webpackConfig;
}
exports.overridePostcss = overridePostcss;
