"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAfterLoaders = exports.addBeforeLoaders = exports.addAfterLoader = exports.addBeforeLoader = exports.removeLoaders = exports.getLoaders = exports.getLoader = exports.loaderByName = void 0;
var path_1 = __importDefault(require("path"));
var utils_1 = require("./utils");
function loaderByName(targetLoaderName) {
    return function (rule) {
        if (!(0, utils_1.isString)(rule) && 'loader' in rule && (0, utils_1.isString)(rule.loader)) {
            return (rule.loader.indexOf("".concat(path_1.default.sep).concat(targetLoaderName).concat(path_1.default.sep)) !== -1 ||
                rule.loader.indexOf("@".concat(targetLoaderName).concat(path_1.default.sep)) !== -1);
        }
        else if ((0, utils_1.isString)(rule)) {
            return (rule.indexOf("".concat(path_1.default.sep).concat(targetLoaderName).concat(path_1.default.sep)) !==
                -1 || rule.indexOf("@".concat(targetLoaderName).concat(path_1.default.sep)) !== -1);
        }
        return false;
    };
}
exports.loaderByName = loaderByName;
var toMatchingLoader = function (loader, parent, index) { return ({ loader: loader, parent: parent, index: index }); };
function getLoaderRecursively(rules, matcher) {
    var loader;
    rules === null || rules === void 0 ? void 0 : rules.some(function (rule, index) {
        if (rule) {
            if (matcher(rule)) {
                loader = toMatchingLoader(rule, rules, index);
            }
            else if (!(0, utils_1.isString)(rule)) {
                if (rule.use) {
                    if ((0, utils_1.isString)(rule.use) && matcher(rule.use)) {
                        loader = toMatchingLoader({ loader: rule.use }, rules, index);
                    }
                    else {
                        loader = getLoaderRecursively(rule.use, matcher);
                    }
                }
                else if (rule.oneOf) {
                    loader = getLoaderRecursively(rule.oneOf, matcher);
                }
                else if ((0, utils_1.isArray)(rule.loader)) {
                    loader = getLoaderRecursively(rule.loader, matcher);
                }
            }
        }
        return loader !== undefined;
    });
    return loader;
}
function getLoader(webpackConfig, matcher) {
    var _a;
    var matchingLoader = getLoaderRecursively((_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules, matcher);
    return { isFound: matchingLoader !== undefined, match: matchingLoader };
}
exports.getLoader = getLoader;
function getLoadersRecursively(rules, matcher, matchingLoaders) {
    rules === null || rules === void 0 ? void 0 : rules.forEach(function (rule, index) {
        if (rule) {
            if (matcher(rule)) {
                matchingLoaders.push(toMatchingLoader(rule, rules, index));
            }
            else if (!(0, utils_1.isString)(rule)) {
                if (rule.use) {
                    if ((0, utils_1.isString)(rule.use) && matcher(rule.use)) {
                        matchingLoaders.push(toMatchingLoader({ loader: rule.use }, rules, index));
                    }
                    else {
                        getLoadersRecursively(rule.use, matcher, matchingLoaders);
                    }
                }
                else if (rule.oneOf) {
                    getLoadersRecursively(rule.oneOf, matcher, matchingLoaders);
                }
                else if ((0, utils_1.isArray)(rule.loader)) {
                    getLoadersRecursively(rule.loader, matcher, matchingLoaders);
                }
            }
        }
    });
}
function getLoaders(webpackConfig, matcher) {
    var _a;
    var matchingLoaders = [];
    getLoadersRecursively((_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules, matcher, matchingLoaders);
    return {
        hasFoundAny: matchingLoaders.length !== 0,
        matches: matchingLoaders,
    };
}
exports.getLoaders = getLoaders;
function removeLoadersRecursively(rules, matcher) {
    var toRemove = [];
    var removedCount = 0;
    if (!rules) {
        return { rules: rules, removedCount: 0 };
    }
    for (var i = 0, max = rules.length; i < max; i += 1) {
        var rule = rules[i];
        if (rule) {
            if (matcher(rule)) {
                toRemove.push(i);
            }
            else if (!(0, utils_1.isString)(rule)) {
                if (rule.use) {
                    var result = void 0;
                    if ((0, utils_1.isString)(rule.use) && matcher(rule.use)) {
                        toRemove.push(i);
                        removedCount++;
                        rule.use = undefined;
                    }
                    else {
                        result = removeLoadersRecursively(rule.use, matcher);
                        removedCount += result.removedCount;
                        rule.use = result.rules;
                    }
                }
                else if (rule.oneOf) {
                    var result = removeLoadersRecursively(rule.oneOf, matcher);
                    removedCount += result.removedCount;
                    rule.oneOf = result.rules;
                }
            }
        }
    }
    toRemove.forEach(function (ruleIndex, i) {
        rules.splice(ruleIndex - i, 1);
    });
    return { rules: rules, removedCount: removedCount + toRemove.length };
}
function removeLoaders(webpackConfig, matcher) {
    var _a;
    var result = removeLoadersRecursively((_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules, matcher);
    return {
        hasRemovedAny: result.removedCount > 0,
        removedCount: result.removedCount,
    };
}
exports.removeLoaders = removeLoaders;
function addLoader(webpackConfig, matcher, newLoader, positionAdapter) {
    var _a;
    var _b = getLoader(webpackConfig, matcher), isFound = _b.isFound, match = _b.match;
    if (isFound) {
        (_a = match.parent) === null || _a === void 0 ? void 0 : _a.splice(positionAdapter(match.index), 0, newLoader);
        return { isAdded: true };
    }
    return { isAdded: false };
}
var addBeforeLoader = function (webpackConfig, matcher, newLoader) { return addLoader(webpackConfig, matcher, newLoader, function (x) { return x; }); };
exports.addBeforeLoader = addBeforeLoader;
var addAfterLoader = function (webpackConfig, matcher, newLoader) { return addLoader(webpackConfig, matcher, newLoader, function (x) { return x + 1; }); };
exports.addAfterLoader = addAfterLoader;
function addLoaders(webpackConfig, matcher, newLoader, positionAdapter) {
    var _a = getLoaders(webpackConfig, matcher), hasFoundAny = _a.hasFoundAny, matches = _a.matches;
    if (hasFoundAny) {
        matches.forEach(function (match) {
            var _a;
            (_a = match.parent) === null || _a === void 0 ? void 0 : _a.splice(positionAdapter(match.index), 0, newLoader);
        });
        return { isAdded: true, addedCount: matches.length };
    }
    return { isAdded: false, addedCount: 0 };
}
var addBeforeLoaders = function (webpackConfig, matcher, newLoader) { return addLoaders(webpackConfig, matcher, newLoader, function (x) { return x; }); };
exports.addBeforeLoaders = addBeforeLoaders;
var addAfterLoaders = function (webpackConfig, matcher, newLoader) { return addLoaders(webpackConfig, matcher, newLoader, function (x) { return x + 1; }); };
exports.addAfterLoaders = addAfterLoaders;
