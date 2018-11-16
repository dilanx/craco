const path = require("path");
const fs = require("fs");

const args = require("./args");
const { log } = require("./logger");

const projectRoot = path.resolve(fs.realpathSync(process.cwd()));

let scriptsVersion = "react-scripts";
let nodeModulesPath = "node_modules";
let reactScriptsPath = "";

if (args.workspace.isProvided) {
    if (args.reactScripts.isProvided) {
        log(`${args.workspace.key} flag is ignored since ${args.reactScripts.key} value is provided`);
    } else {
        // We support the popular convention of setuping the mono repo with packages/*
        nodeModulesPath = "../../node_modules";
    }
}

if (args.scriptsVersion.isProvided) {
    if (args.reactScripts.isProvided) {
        log(`${args.scriptsVersion.key} value is ignored since ${args.reactScripts.key} value is provided`);
    } else {
        scriptsVersion = args.scriptsVersion.value;
    }
}

if (args.reactScripts.isProvided) {
    reactScriptsPath = path.resolve(projectRoot, args.reactScripts.value);
} else {
    reactScriptsPath = path.resolve(projectRoot, nodeModulesPath, scriptsVersion);
}

log("Project root path resolved to: ", projectRoot);
log("react-scripts folder resolved to: ", reactScriptsPath);

module.exports = {
    projectRoot,
    reactScriptsPath
};
