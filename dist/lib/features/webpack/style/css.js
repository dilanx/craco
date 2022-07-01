"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideCss = void 0;
var loaders_1 = require("../../../loaders");
var logger_1 = require("../../../logger");
var utils_1 = require("../../../utils");
function setModuleLocalIdentName(match, localIdentName) {
    var _a, _b;
    // The css-loader version of create-react-app has changed from 2.1.1 to 3.2.0
    // https://github.com/facebook/create-react-app/commit/f79f30
    if ((0, utils_1.isBoolean)(match.loader.options.modules)) {
        (_b = (_a = match.loader) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? true : delete _b.getLocalIdent;
        match.loader.options.localIdentName = localIdentName;
    }
    else {
        // This setting applies to create-react-app@3.3.0
        delete match.loader.options.modules.getLocalIdent;
        match.loader.options.modules.localIdentName = localIdentName;
    }
    (0, logger_1.log)('Overrided CSS modules local ident name.');
}
function applyLoaderOptions(match, loaderOptions, context) {
    if ((0, utils_1.isFunction)(loaderOptions)) {
        match.loader.options = loaderOptions(match.loader.options || {}, context);
        if (!match.loader.options) {
            throw new Error("craco: 'style.css.loaderOptions' function didn't return a loader config object.");
        }
    }
    else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        match.loader.options = (0, utils_1.deepMergeWithArray)({}, match.loader.options || {}, loaderOptions);
    }
    (0, logger_1.log)('Applied CSS loaders options.');
}
function overrideCssLoader(match, _a, context) {
    var cssOptions = _a.css;
    if (cssOptions === null || cssOptions === void 0 ? void 0 : cssOptions.loaderOptions) {
        applyLoaderOptions(match, cssOptions.loaderOptions, context);
        (0, logger_1.log)('Overrided CSS loader.');
    }
}
function overrideModuleLoader(match, modulesOptions) {
    if (modulesOptions === null || modulesOptions === void 0 ? void 0 : modulesOptions.localIdentName) {
        setModuleLocalIdentName(match, modulesOptions.localIdentName);
        (0, logger_1.log)('Overrided CSS module loader.');
    }
}
function overrideCss(styleConfig, webpackConfig, context) {
    if (styleConfig.modules || styleConfig.css) {
        var _a = (0, loaders_1.getLoaders)(webpackConfig, (0, loaders_1.loaderByName)('css-loader')), hasFoundAny = _a.hasFoundAny, matches = _a.matches;
        if (!hasFoundAny) {
            (0, logger_1.logError)('Cannot find any CSS loaders.');
            return webpackConfig;
        }
        if (styleConfig.modules) {
            var cssModuleLoaders = matches.filter(function (x) {
                var _a, _b;
                return !(0, utils_1.isString)(x.loader) &&
                    ((_a = x.loader) === null || _a === void 0 ? void 0 : _a.options) &&
                    !(0, utils_1.isString)((_b = x.loader) === null || _b === void 0 ? void 0 : _b.options) &&
                    x.loader.options.modules;
            });
            cssModuleLoaders.forEach(function (x) {
                overrideModuleLoader(x, styleConfig.modules);
            });
        }
        if (styleConfig.css) {
            matches.forEach(function (x) {
                overrideCssLoader(x, styleConfig, context);
            });
        }
    }
    return webpackConfig;
}
exports.overrideCss = overrideCss;
