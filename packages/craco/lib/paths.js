const path = require("path");
const fs = require("fs");
const args = require("./args");

const { isString } = require("./utils");
const { log } = require("./logger");

const projectRoot = path.resolve(fs.realpathSync(process.cwd()));

log("Project root path resolved to: ", projectRoot);

let configFilePath = "";

if (args.config.isProvided) {
    configFilePath = path.resolve(projectRoot, args.config.value);
} else {
    configFilePath = path.resolve(projectRoot, "craco.config.js");
}

log("Config file path resolved to: ", configFilePath);

let _resolvedReactScriptsPath = null;

function resolveReactScriptsPath(cracoConfig) {
    if (!_resolvedReactScriptsPath) {
        let nodeModulesPath = "node_modules";

        if (cracoConfig.workspace) {
            if (isString(cracoConfig.reactScriptsPath)) {
                log(`workspace config is ignored since reactScriptsPath is provided`);
            } else {
                // We support the popular convention of setuping the mono repo with packages/*
                nodeModulesPath = "../../node_modules";
            }
        }

        if (isString(cracoConfig.reactScriptsVersion)) {
            if (isString(cracoConfig.reactScriptsPath)) {
                log(`reactScriptsVersion value is ignored since reactScriptsPath is provided`);
            }
        }

        if (isString(cracoConfig.reactScriptsPath)) {
            // TODO, add some logic for absolute path?
            _resolvedReactScriptsPath = path.resolve(projectRoot, cracoConfig.reactScriptsPath);
        } else {
            _resolvedReactScriptsPath = path.resolve(projectRoot, nodeModulesPath, cracoConfig.reactScriptsVersion);
        }

        log("react-scripts folder resolved to: ", _resolvedReactScriptsPath);
    }

    return _resolvedReactScriptsPath;
}

module.exports = {
    projectRoot,
    resolveReactScriptsPath,
    configFilePath
};
