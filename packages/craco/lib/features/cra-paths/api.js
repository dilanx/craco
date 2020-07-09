const { mergeWebpackConfig } = require("./merge-webpack-config");
const { setArgs } = require("../../args");
const { processCracoConfig } = require("../../config");
const { getCraPaths } = require("../../cra");

function createCraPathsConfig(callerCracoConfig, callerContext, options) {
    if (!callerCracoConfig) {
        throw new Error("craco: 'cracoConfig' is required.");
    }

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = "development";
    }

    setArgs(options);

    const context = {
        env: process.env.NODE_ENV,
        ...callerContext
    };

    const cracoConfig = processCracoConfig(callerCracoConfig, context);
    const craPathsConfig = getCraPaths(cracoConfig);
    const { paths = {} } = cracoConfig;
    context.paths = craPathsConfig;

    const resultingPathsConfig = Object.assign(craPathsConfig, paths);

    return resultingPathsConfig;
}

module.exports = {
    createCraPathsConfig
}
