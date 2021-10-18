const { default: tsLoader } = require("@endemolshinegroup/cosmiconfig-typescript-loader");
const { cosmiconfigSync } = require("cosmiconfig");
const path = require("path");
const fs = require("fs");
const { getArgs } = require("./args");
const { log } = require("./logger");
const { isString } = require("./utils");

const projectRoot = fs.realpathSync(process.cwd());
const packageJsonPath = path.join(projectRoot, "package.json");

log("Project root path resolved to: ", projectRoot);

let configFilePath = "";

const args = getArgs();

if (args.config.isProvided) {
    configFilePath = path.resolve(projectRoot, args.config.value);
} else {
    const package = require(packageJsonPath);

    if (package.cracoConfig && isString(package.cracoConfig)) {
        // take it as the path to the config file if it's path-like, otherwise assume it contains the config content below
        configFilePath = path.resolve(projectRoot, package.cracoConfig);
    } else {
        const moduleName = "craco";
        const explorer = cosmiconfigSync(moduleName, {
            searchPlaces: [
                "package.json",
                `.${moduleName}rc`,
                `.${moduleName}rc.json`,
                `.${moduleName}rc.yaml`,
                `.${moduleName}rc.yml`,
                `.${moduleName}rc.ts`,
                `.${moduleName}rc.js`,
                `${moduleName}.config.ts`,
                `${moduleName}.config.js`
            ],
            loaders: {
                ".ts": tsLoader
            }
        });

        const result = explorer.search(projectRoot);

        if (result === null) {
            throw new Error(
                "craco: Config file not found. check if file exists at root (craco.config.ts, craco.config.js, .cracorc.js, .cracorc.json, .cracorc.yaml, .cracorc)"
            );
        }

        log("Found craco config file at: ", result.filepath);

        configFilePath = result.filepath;
    }
}

log("Config file path resolved to: ", configFilePath);

module.exports = {
    projectRoot,
    packageJsonPath,
    configFilePath
};
