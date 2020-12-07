const path = require("path");
const fs = require("fs");
const { getArgs } = require("./args");
const { log } = require("./logger");
const { isString } = require("./utils");

const projectRoot = fs.realpathSync(process.cwd());
const packageJsonPath = path.join(projectRoot, "package.json");

log("Project root path resolved to: ", projectRoot);

let configFilePath = "";

const configFilenames = ["craco.config.js", ".cracorc.js", ".cracorc"];

const args = getArgs();

if (args.config.isProvided) {
    configFilePath = path.resolve(projectRoot, args.config.value);
} else {
    const package = require(packageJsonPath);

    if (package.cracoConfig) {
        if (!isString(package.cracoConfig)) {
            throw new Error("craco: 'cracoConfig' value must be a string.");
        }

        configFilePath = path.resolve(projectRoot, package.cracoConfig);
    } else {
        for (const filename of configFilenames) {
            const filePath = path.join(projectRoot, filename);

            if (fs.existsSync(filePath)) {
                configFilePath = filePath;
                break;
            }
        }
    }
}

log("Config file path resolved to: ", configFilePath);

module.exports = {
    projectRoot,
    packageJsonPath,
    configFilePath
};
