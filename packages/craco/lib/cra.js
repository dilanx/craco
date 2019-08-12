const path = require("path");

const { log } = require("./logger");
const { projectRoot } = require("./paths");

let envLoaded = false;

/************  Common  *******************/

function resolveConfigFilePath(cracoConfig, fileName) {
    if (!envLoaded) {
        // Environment variables must be loaded before the CRA paths, otherwise they will not be applied.
        require(resolveConfigFilePathInner(cracoConfig, "env.js"));

        envLoaded = true;
    }

    return resolveConfigFilePathInner(cracoConfig, fileName);
}

function resolveConfigFilePathInner(cracoConfig, fileName) {
    return require.resolve(path.join(cracoConfig.reactScriptsVersion, "config", fileName), { paths: [projectRoot] });
}

function resolveScriptsFilePath(cracoConfig, fileName) {
    console.log(cracoConfig);
    console.log(fileName);

    return require.resolve(path.join(cracoConfig.reactScriptsVersion, "scripts", fileName), { paths: [projectRoot] });
}

function overrideModule(modulePath, newModule) {
    require.cache[modulePath].exports = newModule;

    log(`Overrided require cache for module: ${modulePath}`);
}

/************  Paths  *******************/

let _resolvedCraPaths = null;

function getCraPaths(cracoConfig) {
    if (!_resolvedCraPaths) {
        _resolvedCraPaths = require(resolveConfigFilePath(cracoConfig, "paths.js"));
    }

    return _resolvedCraPaths;
}

/************  Webpack Dev Config  *******************/

function getWebpackDevConfigPath(cracoConfig) {
    try {
        return {
            filepath: resolveConfigFilePath(cracoConfig, "webpack.config.js"),
            isLegacy: false
        };
    } catch (e) {
        return {
            filepath: resolveConfigFilePath(cracoConfig, "webpack.config.dev.js"),
            isLegacy: true
        };
    }
}

function loadWebpackDevConfig(cracoConfig) {
    const result = getWebpackDevConfigPath(cracoConfig);

    log("Found Webpack dev config at: ", result.filepath);

    if (result.isLegacy) {
        return require(result.filepath);
    }

    return require(result.filepath)("development");
}

function overrideWebpackDevConfig(cracoConfig, newConfig) {
    const result = getWebpackDevConfigPath(cracoConfig);

    if (result.isLegacy) {
        overrideModule(result.filepath, newConfig);
    } else {
        overrideModule(result.filepath, () => newConfig);
    }
}

/************  Webpack Prod Config  *******************/

function getWebpackProdConfigPath(cracoConfig) {
    try {
        return {
            filepath: resolveConfigFilePath(cracoConfig, "webpack.config.js"),
            isLegacy: false
        };
    } catch (e) {
        return {
            filepath: resolveConfigFilePath(cracoConfig, "webpack.config.prod.js"),
            isLegacy: true
        };
    }
}

function loadWebpackProdConfig(cracoConfig) {
    const result = getWebpackProdConfigPath(cracoConfig);

    log("Found Webpack prod config at: ", result.filepath);

    if (result.isLegacy) {
        return require(result.filepath);
    }

    return require(result.filepath)("production");
}

function overrideWebpackProdConfig(cracoConfig, newConfig) {
    const result = getWebpackProdConfigPath(cracoConfig);

    if (result.isLegacy) {
        overrideModule(result.filepath, newConfig);
    } else {
        overrideModule(result.filepath, () => newConfig);
    }
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
