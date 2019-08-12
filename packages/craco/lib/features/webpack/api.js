const { mergeWebpackConfig } = require("./merge-webpack-config");
const { processCracoConfig } = require("../../config");
const { loadWebpackProdConfig, loadWebpackDevConfig, getCraPaths } = require("../../cra");

function createWebpackDevConfig(callerCracoConfig, callerContext = {}) {
    return createWebpackConfig(callerCracoConfig, callerContext, loadWebpackDevConfig, "development");
}

function createWebpackProdConfig(callerCracoConfig, callerContext = {}) {
    return createWebpackConfig(callerCracoConfig, callerContext, loadWebpackProdConfig, "production");
}

function createWebpackConfig(callerCracoConfig, callerContext = {}, loadWebpackConfig, env) {
    if (!callerCracoConfig) {
        throw new Error("craco: 'cracoConfig' is required.");
    }

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = env;
    }

    const context = {
        env: process.env.NODE_ENV,
        ...callerContext
    };

    const cracoConfig = processCracoConfig(callerCracoConfig, context);
    context.paths = getCraPaths(cracoConfig);

    const craWebpackConfig = loadWebpackConfig(cracoConfig);
    const resultingWebpackConfig = mergeWebpackConfig(cracoConfig, craWebpackConfig, context);

    return resultingWebpackConfig;
}

module.exports = {
    createWebpackDevConfig,
    createWebpackProdConfig
};
