"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAfterAssetModules = exports.addBeforeAssetModules = exports.addAfterAssetModule = exports.addBeforeAssetModule = exports.removeAssetModules = exports.getAssetModules = exports.getAssetModule = exports.assetModuleByName = void 0;
function assetModuleByName(assetModuleName) {
    return function (rule) { return rule.type === assetModuleName; };
}
exports.assetModuleByName = assetModuleByName;
var toMatchingAssetModule = function (rule, index) { return ({
    rule: rule,
    index: index,
}); };
function getAssetModule(webpackConfig, matcher) {
    var _a, _b;
    var matchingAssetModule;
    (_b = (_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.some(function (rule, index) {
        if (matcher(rule)) {
            matchingAssetModule = toMatchingAssetModule(rule, index);
        }
        return matchingAssetModule !== undefined;
    });
    return {
        isFound: matchingAssetModule !== undefined,
        match: matchingAssetModule,
    };
}
exports.getAssetModule = getAssetModule;
function getAssetModules(webpackConfig, matcher) {
    var _a, _b;
    var matchingAssetModules = [];
    (_b = (_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.forEach(function (rule, index) {
        if (matcher(rule)) {
            matchingAssetModules.push(toMatchingAssetModule(rule, index));
        }
    });
    return {
        hasFoundAny: matchingAssetModules.length !== 0,
        matches: matchingAssetModules,
    };
}
exports.getAssetModules = getAssetModules;
function removeAssetModules(webpackConfig, matcher) {
    var _a, _b, _c;
    var toRemove = [];
    (_b = (_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.forEach(function (rule, index) {
        if (matcher(rule)) {
            toRemove.push(index);
        }
    });
    toRemove.forEach(function (index) {
        var _a, _b;
        (_b = (_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.splice(index, 1);
    });
    return {
        rules: (_c = webpackConfig.module) === null || _c === void 0 ? void 0 : _c.rules,
        removedCount: toRemove.length,
    };
}
exports.removeAssetModules = removeAssetModules;
function addAssetModule(webpackConfig, matcher, newAssetModule, positionAdapter) {
    var _a, _b;
    var match = getAssetModule(webpackConfig, matcher).match;
    if (match !== undefined) {
        (_b = (_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.splice(positionAdapter(match.index), 0, newAssetModule);
        return { isAdded: true };
    }
    return { isAdded: false };
}
var addBeforeAssetModule = function (webpackConfig, matcher, newAssetModule) { return addAssetModule(webpackConfig, matcher, newAssetModule, function (x) { return x; }); };
exports.addBeforeAssetModule = addBeforeAssetModule;
var addAfterAssetModule = function (webpackConfig, matcher, newAssetModule) { return addAssetModule(webpackConfig, matcher, newAssetModule, function (x) { return x + 1; }); };
exports.addAfterAssetModule = addAfterAssetModule;
function addAssetModules(webpackConfig, matcher, newLoader, positionAdapter) {
    var matches = getAssetModules(webpackConfig, matcher).matches;
    if (matches.length !== 0) {
        matches.forEach(function (match) {
            var _a, _b;
            (_b = (_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.splice(positionAdapter(match.index), 0, newLoader);
        });
        return { isAdded: true, addedCount: matches.length };
    }
    return { isAdded: false, addedCount: 0 };
}
var addBeforeAssetModules = function (webpackConfig, matcher, newAssetModule) { return addAssetModules(webpackConfig, matcher, newAssetModule, function (x) { return x; }); };
exports.addBeforeAssetModules = addBeforeAssetModules;
var addAfterAssetModules = function (webpackConfig, matcher, newAssetModule) { return addAssetModules(webpackConfig, matcher, newAssetModule, function (x) { return x + 1; }); };
exports.addAfterAssetModules = addAfterAssetModules;
