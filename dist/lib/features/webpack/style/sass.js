"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideSass = void 0;
var loaders_1 = require("../../../loaders");
var logger_1 = require("../../../logger");
var utils_1 = require("../../../utils");
function setLoaderProperty(match, key, valueProviders) {
    var _a;
    if ((0, utils_1.isString)(match.loader)) {
        match.parent[match.index] = (_a = {
                loader: match.loader
            },
            _a[key] = valueProviders.whenString(),
            _a);
    }
    else {
        match.loader[key] = valueProviders.whenObject();
    }
}
function applyLoaderOptions(match, loaderOptions, context) {
    if ((0, utils_1.isFunction)(loaderOptions)) {
        setLoaderProperty(match, 'options', {
            whenString: function () { return loaderOptions({}, context); },
            whenObject: function () {
                return loaderOptions(match.loader.options || {}, context);
            },
        });
        if (!match.loader.options) {
            throw new Error("craco: 'style.sass.loaderOptions' function didn't return a loader config object.");
        }
    }
    else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        setLoaderProperty(match, 'options', {
            whenString: function () { return loaderOptions; },
            whenObject: function () {
                return (0, utils_1.deepMergeWithArray)({}, match.loader.options || {}, loaderOptions);
            },
        });
    }
    (0, logger_1.log)('Applied Sass loaders options.');
}
function overrideLoader(match, _a, context) {
    var sassOptions = _a.sass;
    var loaderOptions = (sassOptions !== null && sassOptions !== void 0 ? sassOptions : {}).loaderOptions;
    if (loaderOptions) {
        applyLoaderOptions(match, loaderOptions, context);
        (0, logger_1.log)('Overrided Sass loader.');
    }
}
function overrideSass(styleConfig, webpackConfig, context) {
    if (styleConfig.sass) {
        var _a = (0, loaders_1.getLoaders)(webpackConfig, (0, loaders_1.loaderByName)('sass-loader')), hasFoundAny = _a.hasFoundAny, matches = _a.matches;
        if (!hasFoundAny) {
            (0, logger_1.logError)('Cannot find any Sass loaders.');
            return webpackConfig;
        }
        matches.forEach(function (x) {
            overrideLoader(x, styleConfig, context);
        });
    }
    return webpackConfig;
}
exports.overrideSass = overrideSass;
