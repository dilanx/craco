"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCracoConfigAsync = exports.loadCracoConfig = exports.processCracoConfig = void 0;
var cosmiconfig_1 = require("cosmiconfig");
var cosmiconfig_typescript_loader_1 = __importDefault(require("cosmiconfig-typescript-loader"));
var path_1 = __importDefault(require("path"));
var args_1 = require("./args");
var plugins_1 = require("./features/plugins");
var logger_1 = require("./logger");
var paths_1 = require("./paths");
var utils_1 = require("./utils");
var DEFAULT_CONFIG = {
    reactScriptsVersion: 'react-scripts',
    style: {
        postcss: {
            mode: 'extends',
        },
    },
    eslint: {
        mode: 'extends',
    },
    jest: {
        babel: {
            addPresets: true,
            addPlugins: true,
        },
    },
};
var moduleName = 'craco';
var explorer = (0, cosmiconfig_1.cosmiconfigSync)(moduleName, {
    searchPlaces: [
        'package.json',
        "".concat(moduleName, ".config.ts"),
        "".concat(moduleName, ".config.js"),
        "".concat(moduleName, ".config.cjs"),
        ".".concat(moduleName, "rc.ts"),
        ".".concat(moduleName, "rc.js"),
        ".".concat(moduleName, "rc"),
    ],
    loaders: {
        '.ts': (0, cosmiconfig_typescript_loader_1.default)(),
    },
});
function ensureConfigSanity(cracoConfig) {
    if (cracoConfig.plugins && (0, utils_1.isArray)(cracoConfig.plugins)) {
        cracoConfig.plugins.forEach(function (x, index) {
            if (!x.plugin) {
                throw new Error("craco: Malformed plugin at index: ".concat(index, " of 'plugins'."));
            }
        });
    }
}
function processCracoConfig(cracoConfig, context) {
    var resultingCracoConfig = (0, utils_1.deepMergeWithArray)({}, DEFAULT_CONFIG, cracoConfig);
    ensureConfigSanity(resultingCracoConfig);
    return (0, plugins_1.applyCracoConfigPlugins)(resultingCracoConfig, context);
}
exports.processCracoConfig = processCracoConfig;
function getConfigPath() {
    var args = (0, args_1.getArgs)();
    if (args.config && (0, utils_1.isString)(args.config)) {
        return path_1.default.resolve(paths_1.projectRoot, args.config);
    }
    else {
        var packageJsonPath = path_1.default.join(paths_1.projectRoot, 'package.json');
        var packageJson = require(packageJsonPath);
        if (packageJson.cracoConfig && (0, utils_1.isString)(packageJson.cracoConfig)) {
            // take it as the path to the config file if it's path-like, otherwise assume it contains the config content below
            return path_1.default.resolve(paths_1.projectRoot, packageJson.cracoConfig);
        }
        else {
            var result = explorer.search(paths_1.projectRoot);
            if (result === null) {
                throw new Error('craco: Config file not found. check if file exists at root (craco.config.ts, craco.config.js, .cracorc.js, .cracorc.json, .cracorc.yaml, .cracorc)');
            }
            return result.filepath;
        }
    }
}
function getConfigAsObject(context) {
    var configFilePath = getConfigPath();
    (0, logger_1.log)('Config file path resolved to: ', configFilePath);
    var result = explorer.load(configFilePath);
    var configAsObject = (0, utils_1.isFunction)(result === null || result === void 0 ? void 0 : result.config)
        ? result === null || result === void 0 ? void 0 : result.config(context)
        : result === null || result === void 0 ? void 0 : result.config;
    if (!configAsObject) {
        throw new Error("craco: Config function didn't return a config object.");
    }
    return configAsObject;
}
function loadCracoConfig(context) {
    var configAsObject = getConfigAsObject(context);
    if (configAsObject instanceof Promise) {
        throw new Error('craco: Config function returned a promise. Use `loadCracoConfigAsync` instead of `loadCracoConfig`.');
    }
    return processCracoConfig(configAsObject, context);
}
exports.loadCracoConfig = loadCracoConfig;
// The "build", "start", and "test" scripts use this to wait for any promises to resolve before they run.
function loadCracoConfigAsync(context) {
    return __awaiter(this, void 0, void 0, function () {
        var configAsObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getConfigAsObject(context)];
                case 1:
                    configAsObject = _a.sent();
                    if (!configAsObject) {
                        throw new Error("craco: Async config didn't return a config object.");
                    }
                    return [2 /*return*/, processCracoConfig(configAsObject, context)];
            }
        });
    });
}
exports.loadCracoConfigAsync = loadCracoConfigAsync;
