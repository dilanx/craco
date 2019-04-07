const path = require("path");
const fs = require("fs");
const args = require("./args");

const { log } = require("./logger");

const projectRoot = fs.realpathSync(process.cwd());

log("Project root path resolved to: ", projectRoot);

let configFilePath = "";

if (args.config.isProvided) {
    configFilePath = path.resolve(projectRoot, args.config.value);
} else {
    configFilePath = path.resolve(projectRoot, "craco.config.js");
}

log("Config file path resolved to: ", configFilePath);

module.exports = {
    projectRoot,
    configFilePath
};
