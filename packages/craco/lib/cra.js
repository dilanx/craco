const { log } = require("./logger");
const { reactScriptsPath } = require("./paths");

/************  Common  *******************/

function resolveConfigFilePath(fileName) {
    return require.resolve(`${reactScriptsPath}/config/${fileName}`);
}

function resolveScriptsFilePath(fileName) {
    return require.resolve(`${reactScriptsPath}/scripts/${fileName}`);
}

function overrideModule(modulePath, newModule) {
    require.cache[modulePath].exports = () => newModule;

    log(`Overrided require cache for module: ${modulePath}`);
}

const craPaths = require(resolveConfigFilePath("paths.js"));

/************  Webpack Dev Config  *******************/

function getWebpackDevConfigPath() {
    return resolveConfigFilePath("webpack.config");
}

function loadWebpackDevConfig() {
    const filepath = getWebpackDevConfigPath();

    log("Found Webpack dev config at: ", filepath);

    return require(filepath)("development");
}

function overrideWebpackDevConfig(newConfig) {
    const filepath = getWebpackDevConfigPath();

    overrideModule(filepath, newConfig);
}

/************  Webpack Prod Config  *******************/

function getWebpackProdConfigPath() {
    return resolveConfigFilePath("webpack.config");
}

function loadWebpackProdConfig() {
    const filepath = getWebpackProdConfigPath();

    log("Found Webpack prod config at: ", filepath);

    return require(filepath)("production");
}

function overrideWebpackProdConfig(newConfig) {
    const filepath = getWebpackProdConfigPath();

    overrideModule(filepath, newConfig);
}

/************  Dev Server  *******************/

function getDevServerConfigPath() {
    return resolveConfigFilePath("webpackDevServer.config.js");
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
    return resolveScriptsFilePath("utils/createJestConfig.js");
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
    const filepath = resolveScriptsFilePath("start.js");

    log("Starting CRA at: ", filepath);

    require(filepath);
}

function build() {
    const filepath = resolveScriptsFilePath("build.js");

    log("Building CRA at: ", filepath);

    require(filepath);
}

function test() {
    const filepath = resolveScriptsFilePath("test.js");

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
    craPaths,
    start,
    build,
    test
};
