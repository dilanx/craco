const merge = require("webpack-merge");

const { isFunction, isString } = require("../utils");
const { log } = require("../logger");
const { overrideDevServerConfigProvider, loadDevServerConfigProvider } = require("../cra");

function createConfigProviderProxy(cracoConfig, craDevServerConfigProvider, context) {
    const proxy = (...rest) => {
        const craDevServerConfig = craDevServerConfigProvider(...rest);
        let mergedConfig;

        if (isFunction(cracoConfig.devServer)) {
            // DOC: The function can either mutate the config and return nothing, OR return a cloned or merged version of the config.
            const resultingConfig = cracoConfig.devServer(craDevServerConfig, {
                ...context,
                ...rest
            });

            mergedConfig = resultingConfig || craDevServerConfig;
        } else {
            // TODO: ensure is otherwise a plain object, if not, log an error.
            mergedConfig = merge(craDevServerConfig, cracoConfig.devServer);
        }

        log("Merged dev server config");

        return mergedConfig;
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

function setMatchingEnvironmentVariables({ browser, https, host, port, publicUrl }) {
    if (browser) {
        setEnvironmentVariable("BROWSER", browser);
    }

    if (https) {
        setEnvironmentVariable("HTTPS", https);
    }

    if (host) {
        setEnvironmentVariable("HOST", host);
    }

    if (port) {
        setEnvironmentVariable("PORT", port);
    }

    if (publicUrl) {
        setEnvironmentVariable("PUBLIC_URL", publicUrl);
    }
}

function overrideDevServer(cracoConfig, context) {
    if (cracoConfig.devServer) {
        setMatchingEnvironmentVariables(cracoConfig.devServer);

        const craDevServerConfigProvider = loadDevServerConfigProvider();
        const proxy = createConfigProviderProxy(cracoConfig, craDevServerConfigProvider, context);

        overrideDevServerConfigProvider(proxy);
    }
}

module.exports = {
    overrideDevServer
};
