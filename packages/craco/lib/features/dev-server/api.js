const { setArgs } = require("../../args");
const { createConfigProviderProxy } = require("./create-config-provider-proxy");
const { processCracoConfig } = require("../../config");
const { getCraPaths } = require("../../cra");

function createDevServerConfigProviderProxy(callerCracoConfig, callerContext, options) {
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
    context.paths = getCraPaths(cracoConfig);

    const proxy = createConfigProviderProxy(cracoConfig, context);

    return proxy;
}

module.exports = {
    createDevServerConfigProviderProxy
};
