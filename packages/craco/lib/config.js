const { configFilePath } = require("./paths");
const { isFunction, isArray, deepMergeWithArray } = require("./utils");
const { log } = require("./logger");
const { applyCracoConfigPlugins } = require("./features/plugins");
const { POSTCSS_MODES } = require("./features/webpack/style/postcss");
const { ESLINT_MODES } = require("./features/webpack/eslint");

const DEFAULT_CONFIG = {
    reactScriptsVersion: "react-scripts",
    style: {
        postcss: {
            mode: POSTCSS_MODES.extends
        }
    },
    eslint: {
        mode: ESLINT_MODES.extends
    },
    jest: {
        babel: {
            addPresets: true,
            addPlugins: true
        }
    }
};

function ensureConfigSanity(cracoConfig) {
    if (isArray(cracoConfig.plugins)) {
        cracoConfig.plugins.forEach((x, index) => {
            if (!x.plugin) {
                throw new Error(`craco: Malformed plugin at index: ${index} of 'plugins'.`);
            }
        });
    }
}

function processCracoConfig(cracoConfig, context) {
    let resultingCracoConfig = deepMergeWithArray({}, DEFAULT_CONFIG, cracoConfig);
    ensureConfigSanity(resultingCracoConfig);

    return applyCracoConfigPlugins(resultingCracoConfig, context);
}

function getConfigAsObject(context) {
    if (configFilePath == undefined || configFilePath.length == 0) {
        throw new Error("craco: Config file not found. check if file exists at root (craco.config.js, .cracorc.js, .cracorc)");
    }
    
    log("Found craco config file at: ", configFilePath);

    const config = require(configFilePath);
    const configAsObject = isFunction(config) ? config(context) : config;

    if (!configAsObject) {
        throw new Error("craco: Config function didn't return a config object.");
    }
    return configAsObject;
}

function loadCracoConfig(context) {
    const configAsObject = getConfigAsObject(context);

    if (configAsObject instanceof Promise) {
        throw new Error(
            "craco: Config function returned a promise. Use `loadCracoConfigAsync` instead of `loadCracoConfig`."
        );
    }

    return processCracoConfig(configAsObject, context);
}

// The "build", "start", and "test" scripts use this to wait for any promises to resolve before they run.
async function loadCracoConfigAsync(context) {
    const configAsObject = await getConfigAsObject(context);

    if (!configAsObject) {
        throw new Error("craco: Async config didn't return a config object.");
    }

    return processCracoConfig(configAsObject, context);
}

module.exports = {
    loadCracoConfig,
    loadCracoConfigAsync,
    processCracoConfig
};
