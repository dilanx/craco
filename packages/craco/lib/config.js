const { configFilePath } = require("./paths");
const { isFunction, isArray, deepMergeWithArray } = require("./utils");
const { log } = require("./logger");
const { applyCracoConfigPlugins } = require("./features/plugins");
const { POSTCSS_MODES } = require("./features/style/postcss");
const { ESLINT_MODES } = require("./features/eslint");

const DEFAULT_CONFIG = {
    workspace: false,
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

function loadCracoConfig(context) {
    log("Found craco config file at: ", configFilePath);

    const config = require(configFilePath);
    const configAsObject = isFunction(config) ? config(context) : config;

    if (!configAsObject) {
        throw new Error("craco: Config function didn't returned a config object.");
    }

    let resultingCracoConfig = deepMergeWithArray({}, DEFAULT_CONFIG, configAsObject);
    ensureConfigSanity(resultingCracoConfig);

    return applyCracoConfigPlugins(resultingCracoConfig, context);
}

module.exports = {
    loadCracoConfig
};
