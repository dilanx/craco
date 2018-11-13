const args = require("./args");

const { projectRoot } = require("./paths");
const { isFunction, isArray } = require("./utils");
const { log } = require("./logger");
const { applyCracoConfigPlugins } = require("./features/plugins");

function ensureConfigSanity(cracoConfig) {
    if (isArray(cracoConfig.plugins)) {
        cracoConfig.plugins.forEach((x, index) => {
            if (!x.plugin) {
                throw new Error(
                    `craco: Malformed plugin at index: ${index} of 'plugins'.`
                );
            }
        });
    }
}

function loadCracoConfig(context) {
    let configFilePath = "";

    if (args.config.isOverrided) {
        configFilePath = require.resolve(`${projectRoot}/${args.config.value}`);
    } else {
        configFilePath = require.resolve(`${projectRoot}/craco.config.js`);
    }

    log("Found craco config file at: ", configFilePath);

    const config = require(configFilePath);

    let resultingConfig = isFunction(config) ? config(context) : config;
    ensureConfigSanity(resultingConfig);
    resultingConfig = applyCracoConfigPlugins(resultingConfig, context);

    return resultingConfig;
}

module.exports = {
    loadCracoConfig
};
