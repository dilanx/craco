const merge = require("webpack-merge");

const { isFunction, isString } = require("../utils");
const { log } = require("../logger");
const { overrideDevServerConfigProvider, loadDevServerConfigProvider } = require("../cra");
const { applyDevServerConfigPlugins } = require("./plugins");

function createConfigProviderProxy(cracoConfig, craDevServerConfigProvider, context) {
    const proxy = (proxy, allowedHost) => {
        let devServerConfig = craDevServerConfigProvider(proxy, allowedHost);

        if (isFunction(cracoConfig.devServer)) {
            devServerConfig = cracoConfig.devServer(devServerConfig, {
                ...context,
                proxy,
                allowedHost
            });

            if (!devServerConfig) {
                throw new Error("craco: 'devServer' function didn't return a config object.");
            }
        } else {
            // TODO: ensure is otherwise a plain object, if not, log an error.
            devServerConfig = merge(devServerConfig, cracoConfig.devServer || {});
        }

        devServerConfig = applyDevServerConfigPlugins(cracoConfig, devServerConfig, {
            ...context,
            proxy,
            allowedHost
        });

        log("Overrided DevServer config.");

        return devServerConfig;
    };

    return proxy;
}

function setEnvironmentVariable(envProperty, value) {
    if (!isString(value)) {
        process.env[envProperty] = value.toString();
    } else {
        process.env[envProperty] = value;
    }
}

function setMatchingEnvironmentVariables({ open, https, host, port }) {
    if (open === false) {
        setEnvironmentVariable("BROWSER", "none");
    }

    if (https) {
        setEnvironmentVariable("HTTPS", "true");
    }

    if (host) {
        setEnvironmentVariable("HOST", host);
    }

    if (port) {
        setEnvironmentVariable("PORT", port);
    }
}

function overrideDevServer(cracoConfig, context) {
    if (cracoConfig.devServer) {
        setMatchingEnvironmentVariables(cracoConfig.devServer);
    }

    const craDevServerConfigProvider = loadDevServerConfigProvider(cracoConfig);
    const proxy = createConfigProviderProxy(cracoConfig, craDevServerConfigProvider, context);

    overrideDevServerConfigProvider(cracoConfig, proxy);
}

module.exports = {
    overrideDevServer
};
