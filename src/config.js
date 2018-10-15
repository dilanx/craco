const args = require("./args");

const { projectRoot } = require("./paths");
const { isFunction } = require("./utils");
const { log } = require("./logger");
const { applyCracoConfigPlugins } = require("./features/plugins");

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
    resultingConfig = applyCracoConfigPlugins(resultingConfig, context);

    return resultingConfig;
}

module.exports = {
    loadCracoConfig
};
