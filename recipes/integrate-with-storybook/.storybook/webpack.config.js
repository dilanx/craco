const { createWebpackDevConfig } = require("@craco/craco");

const cracoConfig = require("../craco.config.js");

module.exports = async () => {
    const webpackConfig = createWebpackDevConfig(cracoConfig);

    return webpackConfig;
}
