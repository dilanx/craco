const { mergeWebpackConfig } = require("./merge-webpack-config");
const { processCracoConfig } = require("../../config");
const { loadWebpackProdConfig, loadWebpackDevConfig, getCraPaths } = require("../../cra");

function createWebpackDevConfig(callerCracoConfig, callerContext = {}) {
    if (!callerCracoConfig) {
        throw new Error("craco: 'cracoConfig' is required.");
    }

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = "development";
    }

    const context = {
        env: process.env.NODE_ENV,
        ...callerContext
    };

    const cracoConfig = processCracoConfig(callerCracoConfig, context);
    context.paths = getCraPaths(cracoConfig);

    const craWebpackConfig = loadWebpackDevConfig(cracoConfig);
    const resultingWebpackConfig = mergeWebpackConfig(cracoConfig, craWebpackConfig, context);

    return resultingWebpackConfig;
}

function createWebpackProdConfig(callerCracoConfig, callerContext = {}) {
    if (!callerCracoConfig) {
        throw new Error("craco: 'cracoConfig' is required.");
    }

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = "production";
    }

    const context = {
        env: process.env.NODE_ENV,
        ...callerContext
    };

    const cracoConfig = processCracoConfig(callerCracoConfig, context);
    context.paths = getCraPaths(cracoConfig);

    const craWebpackConfig = loadWebpackProdConfig(cracoConfig);
    const resultingWebpackConfig = mergeWebpackConfig(cracoConfig, craWebpackConfig, context);

    return resultingWebpackConfig;
}

module.exports = {
    createWebpackDevConfig,
    createWebpackProdConfig
};
