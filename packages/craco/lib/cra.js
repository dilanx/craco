const path = require("path");
const args = require("./args");

const { log } = require("./logger");
const { nodeModulesPath } = require("./paths");

/************  Common  *******************/

function getReactScriptsFolderPath() {
    let filepath = "";

    if (args.reactScripts.isProvided) {
        filepath = path.resolve(`${nodeModulesPath}/${args.reactScripts.value}/`);
    } else {
        filepath = path.resolve(`${nodeModulesPath}/react-scripts/`);
    }

    log("Found react scripts folder at: ", filepath);

    return filepath;
}

function resolveConfigFilePath(scriptsFolderPath, fileName) {
    return require.resolve(`${scriptsFolderPath}/config/${fileName}`);
}

function resolveScriptsFilePath(scriptsFolderPath, fileName) {
    return require.resolve(`${scriptsFolderPath}/scripts/${fileName}`);
}

function overrideModule(modulePath, newModule) {
    require.cache[modulePath].exports = newModule;

    log(`Overrided require cache for module: ${modulePath}`);
}

const reactScriptsFolderPath = getReactScriptsFolderPath();
const craPaths = require(resolveConfigFilePath(reactScriptsFolderPath, "paths.js"));

/************  Webpack Dev Config  *******************/

function getWebpackDevConfigPath() {
    return resolveConfigFilePath(reactScriptsFolderPath, "webpack.config.dev");
}

function loadWebpackDevConfig() {
    const filepath = getWebpackDevConfigPath();

    log("Found Webpack dev config at: ", filepath);

    return require(filepath);
}

function overrideWebpackDevConfig(newConfig) {
    const filepath = getWebpackDevConfigPath();

    overrideModule(filepath, newConfig);
}

/************  Webpack Prod Config  *******************/

function getWebpackProdConfigPath() {
    return resolveConfigFilePath(reactScriptsFolderPath, "webpack.config.prod");
}

function loadWebpackProdConfig() {
    const filepath = getWebpackProdConfigPath();

    log("Found Webpack prod config at: ", filepath);

    return require(filepath);
}

function overrideWebpackProdConfig(newConfig) {
    const filepath = getWebpackProdConfigPath();

    overrideModule(filepath, newConfig);
}

/************  Dev Server  *******************/

function getDevServerConfigPath() {
    return resolveConfigFilePath(reactScriptsFolderPath, "webpackDevServer.config.js");
}

function loadDevServerConfigProvider() {
    const filepath = getDevServerConfigPath();

    log("Found dev server config at: ", filepath);

    return require(filepath);
}

function overrideDevServerConfigProvider(configProvider) {
    const filepath = getDevServerConfigPath();

    overrideModule(filepath, configProvider);
}

/************  Jest  *******************/

function getCreateJestConfigPath() {
    return resolveScriptsFilePath(reactScriptsFolderPath, "utils/createJestConfig.js");
}

function loadJestConfigProvider() {
    const filepath = getCreateJestConfigPath();

    log("Found jest config at: ", filepath);

    return require(filepath);
}

function overrideJestConfigProvider(configProvider) {
    const filepath = getCreateJestConfigPath();

    overrideModule(filepath, configProvider);
}

/************  Scripts  *******************/

function start() {
    const filepath = resolveScriptsFilePath(reactScriptsFolderPath, "start.js");

    log("Starting CRA at: ", filepath);

    require(filepath);
}

function build() {
    const filepath = resolveScriptsFilePath(reactScriptsFolderPath, "build.js");

    log("Building CRA at: ", filepath);

    require(filepath);
}

function test() {
    const filepath = resolveScriptsFilePath(reactScriptsFolderPath, "test.js");

    log("Testing CRA at: ", filepath);

    require(filepath);
}

/************  Exports  *******************/

module.exports = {
    loadWebpackDevConfig,
    overrideWebpackDevConfig,
    loadWebpackProdConfig,
    overrideWebpackProdConfig,
    loadDevServerConfigProvider,
    overrideDevServerConfigProvider,
    loadJestConfigProvider,
    overrideJestConfigProvider,
    getReactScriptsFolderPath,
    craPaths,
    start,
    build,
    test
};
