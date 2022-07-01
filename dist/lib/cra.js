"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.build = exports.start = exports.overrideJestConfigProvider = exports.loadJestConfigProvider = exports.overrideDevServerUtils = exports.loadDevServerUtils = exports.overrideDevServerConfigProvider = exports.loadDevServerConfigProvider = exports.overrideWebpackProdConfig = exports.loadWebpackProdConfig = exports.overrideWebpackDevConfig = exports.loadWebpackDevConfig = exports.getCraPaths = exports.getReactScriptVersion = void 0;
var path_1 = __importDefault(require("path"));
var semver_1 = __importDefault(require("semver"));
var logger_1 = require("./logger");
var paths_1 = require("./paths");
var envLoaded = false;
var CRA_LATEST_SUPPORTED_MAJOR_VERSION = '5.0.0';
/************  Common  ************/
// TODO here
function resolveConfigFilePath(cracoConfig, fileName) {
    if (!envLoaded) {
        // Environment variables must be loaded before the CRA paths, otherwise they will not be applied.
        require(resolveConfigFilePathInner(cracoConfig, 'env.js'));
        envLoaded = true;
    }
    return resolveConfigFilePathInner(cracoConfig, fileName);
}
function resolveConfigFilePathInner(cracoConfig, fileName) {
    var _a;
    return require.resolve(path_1.default.join((_a = cracoConfig.reactScriptsVersion) !== null && _a !== void 0 ? _a : 'react-scripts', 'config', fileName), { paths: [paths_1.projectRoot] });
}
function resolveScriptsFilePath(cracoConfig, fileName) {
    var _a;
    return require.resolve(path_1.default.join((_a = cracoConfig.reactScriptsVersion) !== null && _a !== void 0 ? _a : 'react-scripts', 'scripts', fileName), { paths: [paths_1.projectRoot] });
}
function resolveReactDevUtilsPath(fileName) {
    return require.resolve(path_1.default.join('react-dev-utils', fileName), {
        paths: [paths_1.projectRoot],
    });
}
function overrideModule(modulePath, newModule) {
    if (!require.cache[modulePath]) {
        throw new Error("Module not found: ".concat(modulePath));
    }
    require.cache[modulePath].exports = newModule;
    (0, logger_1.log)("Overrided require cache for module: ".concat(modulePath));
}
function resolvePackageJson(cracoConfig) {
    var _a;
    return require.resolve(path_1.default.join((_a = cracoConfig.reactScriptsVersion) !== null && _a !== void 0 ? _a : 'react-scripts', 'package.json'), { paths: [paths_1.projectRoot] });
}
function getReactScriptVersion(cracoConfig) {
    var reactScriptPackageJsonPath = resolvePackageJson(cracoConfig);
    var version = require(reactScriptPackageJsonPath).version;
    return {
        version: version,
        isSupported: semver_1.default.gte(version, CRA_LATEST_SUPPORTED_MAJOR_VERSION),
    };
}
exports.getReactScriptVersion = getReactScriptVersion;
/************  Paths  ************/
var _resolvedCraPaths = null;
function getCraPaths(cracoConfig) {
    if (!_resolvedCraPaths) {
        _resolvedCraPaths = require(resolveConfigFilePath(cracoConfig, 'paths.js'));
    }
    return _resolvedCraPaths;
}
exports.getCraPaths = getCraPaths;
/************  Webpack Dev Config  ************/
function getWebpackDevConfigPath(cracoConfig) {
    try {
        return {
            filepath: resolveConfigFilePath(cracoConfig, 'webpack.config.js'),
            isLegacy: false,
        };
    }
    catch (e) {
        return {
            filepath: resolveConfigFilePath(cracoConfig, 'webpack.config.dev.js'),
            isLegacy: true,
        };
    }
}
function loadWebpackDevConfig(cracoConfig) {
    var result = getWebpackDevConfigPath(cracoConfig);
    (0, logger_1.log)('Found Webpack dev config at: ', result.filepath);
    if (result.isLegacy) {
        return require(result.filepath);
    }
    return require(result.filepath)('development');
}
exports.loadWebpackDevConfig = loadWebpackDevConfig;
function overrideWebpackDevConfig(cracoConfig, newConfig) {
    var result = getWebpackDevConfigPath(cracoConfig);
    if (result.isLegacy) {
        overrideModule(result.filepath, newConfig);
    }
    else {
        overrideModule(result.filepath, function () { return newConfig; });
    }
    (0, logger_1.log)('Overrided Webpack dev config.');
}
exports.overrideWebpackDevConfig = overrideWebpackDevConfig;
/************  Webpack Prod Config  ************/
function getWebpackProdConfigPath(cracoConfig) {
    try {
        return {
            filepath: resolveConfigFilePath(cracoConfig, 'webpack.config.js'),
            isLegacy: false,
        };
    }
    catch (e) {
        return {
            filepath: resolveConfigFilePath(cracoConfig, 'webpack.config.prod.js'),
            isLegacy: true,
        };
    }
}
function loadWebpackProdConfig(cracoConfig) {
    var result = getWebpackProdConfigPath(cracoConfig);
    (0, logger_1.log)('Found Webpack prod config at: ', result.filepath);
    if (result.isLegacy) {
        return require(result.filepath);
    }
    return require(result.filepath)('production');
}
exports.loadWebpackProdConfig = loadWebpackProdConfig;
function overrideWebpackProdConfig(cracoConfig, newConfig) {
    var result = getWebpackProdConfigPath(cracoConfig);
    if (result.isLegacy) {
        overrideModule(result.filepath, newConfig);
    }
    else {
        overrideModule(result.filepath, function () { return newConfig; });
    }
    (0, logger_1.log)('Overrided Webpack prod config.');
}
exports.overrideWebpackProdConfig = overrideWebpackProdConfig;
/************  Dev Server Config  ************/
function getDevServerConfigPath(cracoConfig) {
    return resolveConfigFilePath(cracoConfig, 'webpackDevServer.config.js');
}
function getDevServerUtilsPath() {
    return resolveReactDevUtilsPath('WebpackDevServerUtils.js');
}
function loadDevServerConfigProvider(cracoConfig) {
    var filepath = getDevServerConfigPath(cracoConfig);
    (0, logger_1.log)('Found dev server config at: ', filepath);
    return require(filepath);
}
exports.loadDevServerConfigProvider = loadDevServerConfigProvider;
function overrideDevServerConfigProvider(cracoConfig, configProvider) {
    var filepath = getDevServerConfigPath(cracoConfig);
    overrideModule(filepath, configProvider);
    (0, logger_1.log)('Overrided dev server config provider.');
}
exports.overrideDevServerConfigProvider = overrideDevServerConfigProvider;
function loadDevServerUtils() {
    var filepath = getDevServerUtilsPath();
    (0, logger_1.log)('Found dev server utils at: ', filepath);
    return require(filepath);
}
exports.loadDevServerUtils = loadDevServerUtils;
function overrideDevServerUtils(newUtils) {
    var filepath = getDevServerUtilsPath();
    overrideModule(filepath, newUtils);
    (0, logger_1.log)('Overrided dev server utils.');
}
exports.overrideDevServerUtils = overrideDevServerUtils;
/************  Jest Config  ************/
function getCreateJestConfigPath(cracoConfig) {
    return resolveScriptsFilePath(cracoConfig, 'utils/createJestConfig.js');
}
function loadJestConfigProvider(cracoConfig) {
    var filepath = getCreateJestConfigPath(cracoConfig);
    (0, logger_1.log)('Found jest config at: ', filepath);
    return require(filepath);
}
exports.loadJestConfigProvider = loadJestConfigProvider;
function overrideJestConfigProvider(cracoConfig, configProvider) {
    var filepath = getCreateJestConfigPath(cracoConfig);
    overrideModule(filepath, configProvider);
    (0, logger_1.log)('Overrided Jest config provider.');
}
exports.overrideJestConfigProvider = overrideJestConfigProvider;
/************  Scripts  *******************/
function start(cracoConfig) {
    var filepath = resolveScriptsFilePath(cracoConfig, 'start.js');
    (0, logger_1.log)('Starting CRA at: ', filepath);
    require(filepath);
}
exports.start = start;
function build(cracoConfig) {
    var filepath = resolveScriptsFilePath(cracoConfig, 'build.js');
    (0, logger_1.log)('Building CRA at: ', filepath);
    require(filepath);
}
exports.build = build;
function test(cracoConfig) {
    var filepath = resolveScriptsFilePath(cracoConfig, 'test.js');
    (0, logger_1.log)('Testing CRA at: ', filepath);
    require(filepath);
}
exports.test = test;
