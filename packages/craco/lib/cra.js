const { log } = require("./logger");
const { resolveReactScriptsPath } = require("./paths");

/************  Common  *******************/

function resolveConfigFilePath(cracoConfig, fileName) {
    const reactScriptsPath = resolveReactScriptsPath(cracoConfig);

    return require.resolve(`${reactScriptsPath}/config/${fileName}`);
}

function resolveScriptsFilePath(cracoConfig, fileName) {
    const reactScriptsPath = resolveReactScriptsPath(cracoConfig);

    return require.resolve(`${reactScriptsPath}/scripts/${fileName}`);
}

function overrideModule(modulePath, newModule) {
    require.cache[modulePath].exports = newModule;

    log(`Overrided require cache for module: ${modulePath}`);
}

/************  Paths  *******************/

let _resolvedCraPaths = null;

function getCraPaths(cracoConfig) {
    if (!_resolvedCraPaths) {
        // Environment variables must be loaded before the CRA paths, otherwise they will not be applied.
        require(resolveConfigFilePath(cracoConfig, "env.js"));
        _resolvedCraPaths = require(resolveConfigFilePath(cracoConfig, "paths.js"));
    }

    return _resolvedCraPaths;
}

/************  Webpack Dev Config  *******************/

function getWebpackDevConfigPath(cracoConfig) {
    return resolveConfigFilePath(cracoConfig, "webpack.config");
}

function loadWebpackDevConfig(cracoConfig) {
    const filepath = getWebpackDevConfigPath(cracoConfig);

    log("Found Webpack dev config at: ", filepath);

    return require(filepath)("development");
}

function overrideWebpackDevConfig(cracoConfig, newConfig) {
    const filepath = getWebpackDevConfigPath(cracoConfig);

    overrideModule(filepath, () => newConfig);
}

/************  Webpack Prod Config  *******************/

function getWebpackProdConfigPath(cracoConfig) {
    return resolveConfigFilePath(cracoConfig, "webpack.config");
}

function loadWebpackProdConfig(cracoConfig) {
    const filepath = getWebpackProdConfigPath(cracoConfig);

    log("Found Webpack prod config at: ", filepath);

    return require(filepath)("production");
}

function overrideWebpackProdConfig(cracoConfig, newConfig) {
    const filepath = getWebpackProdConfigPath(cracoConfig);

    overrideModule(filepath, () => newConfig);
}

/************  Dev Server  *******************/

function getDevServerConfigPath(cracoConfig) {
    return resolveConfigFilePath(cracoConfig, "webpackDevServer.config.js");
}

function loadDevServerConfigProvider(cracoConfig) {
    const filepath = getDevServerConfigPath(cracoConfig);

    log("Found dev server config at: ", filepath);

    return require(filepath);
}

function overrideDevServerConfigProvider(cracoConfig, configProvider) {
    const filepath = getDevServerConfigPath(cracoConfig);

    overrideModule(filepath, configProvider);
}

/************  Jest  *******************/

function getCreateJestConfigPath(cracoConfig) {
    return resolveScriptsFilePath(cracoConfig, "utils/createJestConfig.js");
}

function loadJestConfigProvider(cracoConfig) {
    const filepath = getCreateJestConfigPath(cracoConfig);

    log("Found jest config at: ", filepath);

    return require(filepath);
}

function overrideJestConfigProvider(cracoConfig, configProvider) {
    const filepath = getCreateJestConfigPath(cracoConfig);

    overrideModule(filepath, configProvider);
}

/************  Scripts  *******************/

function start(cracoConfig) {
    const filepath = resolveScriptsFilePath(cracoConfig, "start.js");

    log("Starting CRA at: ", filepath);

    require(filepath);
}

function build(cracoConfig) {
    const filepath = resolveScriptsFilePath(cracoConfig, "build.js");

    log("Building CRA at: ", filepath);

    require(filepath);
}

function test(cracoConfig) {
    const filepath = resolveScriptsFilePath(cracoConfig, "test.js");

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
    getCraPaths,
    start,
    build,
    test
};
