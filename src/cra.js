const path = require("path");
const args = require("./args");

const { log } = require("./logger");
const { projectRoot, nodeModulesPath } = require("./paths");

/************  Common  *******************/

function discoverScriptsFolderPath() {
    let filepath = "";

    if (args.reactScripts.isOverrided) {
        filepath = path.resolve(`${projectRoot}/${args.reactScripts.value}/`);
    } else {
        filepath = path.resolve(`${nodeModulesPath}/react-scripts/`);
    }

    log("Discovered react scripts folder at: ", filepath);

    return filepath;
}

function resolveConfigFilePath(scriptsFolderPath, fileName) {
    return require.resolve(`${scriptsFolderPath}/config/${fileName}`);
}

const scriptsFolderPath = discoverScriptsFolderPath();
const craPaths = require(resolveConfigFilePath(scriptsFolderPath, "paths.js"));

/************  Webpack Dev Config  *******************/

function getWebpackDevConfigPath() {
    return resolveConfigFilePath(scriptsFolderPath, "webpack.config.dev");
}

function loadWebpackDevConfig() {
    const filepath = getWebpackDevConfigPath();

    log("Found Webpack dev config at: ", filepath);

    return require(filepath);
}

function overrideWebpackDevConfig(newConfig) {
    const filepath = getWebpackDevConfigPath();

    require.cache[filepath].exports = newConfig;

    log(`Overrided require cache for module: ${filepath}`);
}

/************  Webpack Prod Config  *******************/

function getWebpackProdConfigPath() {
    return resolveConfigFilePath(scriptsFolderPath, "webpack.config.prod");
}

function loadWebpackProdConfig() {
    const filepath = getWebpackProdConfigPath();

    log("Found Webpack prod config at: ", filepath);

    return require(filepath);
}

function overrideWebpackProdConfig(newConfig) {
    const filepath = getWebpackProdConfigPath();

    require.cache[filepath].exports = newConfig;

    log(`Overrided require cache for module: ${filepath}`);
}

/************  Dev Server  *******************/

function getDevServerConfigPath() {
    return resolveConfigFilePath(scriptsFolderPath, "webpackDevServer.config.js");
}

function loadDevServerConfigProvider() {
    const filepath = getDevServerConfigPath();

    log("Found dev server config at: ", filepath);

    return require(filepath);
}

function overrideDevServerConfigProvider(configProvider) {
    const filepath = getDevServerConfigPath();

    require.cache[filepath].exports = configProvider;

    log(`Overrided cache for: ${filepath}`);
}

/************  Scripts  *******************/

function start() {
    const filepath = require.resolve(`${scriptsFolderPath}/scripts/start`);

    log("Starting CRA at: ", filepath);

    require(filepath);
}

function build() {
    const filepath = require.resolve(`${scriptsFolderPath}/scripts/build`);

    log("Building CRA at: ", filepath);

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
    craPaths,
    start,
    build
};
