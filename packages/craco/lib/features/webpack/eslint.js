const { getLoader, removeLoaders, loaderByName } = require("../../loaders");
const { log, logError } = require("../../logger");
const { isFunction, deepMergeWithArray } = require("../../utils");
const { getPlugin, removePlugins, pluginByName } = require("../../webpack-plugins");

const ESLINT_MODES = {
    extends: "extends",
    file: "file"
};

function extendsEslintConfig(webpackEslintConfig, eslintConfig, context) {
    const { configure } = eslintConfig;

    if (configure) {
        if (isFunction(configure)) {
            if (webpackEslintConfig.options) {
                webpackEslintConfig.options.baseConfig = configure(
                    webpackEslintConfig.options.baseConfig || {},
                    context
                );
            } else {
                webpackEslintConfig.options = {
                    baseConfig: configure({}, context)
                };
            }

            if (!webpackEslintConfig.options.baseConfig) {
                throw new Error("craco: 'eslint.configure' function didn't return a config object.");
            }
        } else {
            // TODO: ensure is otherwise a plain object, if not, log an error.
            if (webpackEslintConfig.options) {
                webpackEslintConfig.options.baseConfig = deepMergeWithArray(
                    {},
                    webpackEslintConfig.options.baseConfig || {},
                    configure
                );
            } else {
                webpackEslintConfig.options = {
                    baseConfig: configure
                };
            }
        }

        log("Merged ESLint config with 'eslint.configure'.");
    }
}

function useEslintConfigFile(webpackEslintConfig) {
    if (webpackEslintConfig.options) {
        webpackEslintConfig.options.useEslintrc = true;
        delete webpackEslintConfig.options.baseConfig;
    } else {
        webpackEslintConfig.options = {
            useEslintrc: true
        };
    }

    log("Overrided ESLint config to use a config file.");
}

function enableEslintIgnoreFile(webpackEslintConfig) {
    if (webpackEslintConfig.options) {
        webpackEslintConfig.options.ignore = true;
    } else {
        webpackEslintConfig.options = {
            ignore: true
        };
    }

    log("Overrided ESLint config to enable an ignore file.");
}

function applyLoaderOptions(webpackEslintConfig, loaderOptions, context) {
    if (isFunction(loaderOptions)) {
        webpackEslintConfig.options = loaderOptions(webpackEslintConfig.options || {}, context);

        if (!webpackEslintConfig.options) {
            throw new Error("craco: 'eslint.loaderOptions' function didn't return a loader config object.");
        }
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        webpackEslintConfig.options = deepMergeWithArray(webpackEslintConfig.options || {}, loaderOptions);
    }

    log("Applied ESLint loader options.");
}

function overrideEsLint(cracoConfig, webpackConfig, context) {
    if (cracoConfig.eslint) {
        const { isFound, webpackEslintConfig, disableEsLint } = loadWebpackEslintConfig(cracoConfig, webpackConfig);

        if (!isFound) {
            return webpackConfig;
        }

        const { enable, mode, loaderOptions } = cracoConfig.eslint;

        if (enable === false) {
            const { hasRemovedAny } = disableEsLint();

            if (hasRemovedAny) {
                log("Disabled ESLint.");
            } else {
                logError("Couldn't disabled ESLint.");
            }

            return webpackConfig;
        }

        enableEslintIgnoreFile(webpackEslintConfig);

        if (mode === ESLINT_MODES.file) {
            useEslintConfigFile(webpackEslintConfig);
        } else {
            extendsEslintConfig(webpackEslintConfig, cracoConfig.eslint, context);
        }

        if (loaderOptions) {
            applyLoaderOptions(webpackEslintConfig, loaderOptions);
        }
    }

    return webpackConfig;
}

function loadWebpackEslintConfig(cracoConfig, webpackConfig) {
    let disableEsLint = null;
    let webpackEslintConfig = {
        options: null
    };

    // The eslint-loader has been deleted from create-react-app in version 4.0. Now eslint is being delivered through eslint-webpack-plugin, not eslint-loader.
    // https://github.com/facebook/create-react-app/commit/d07b7d025f5933710fcb01718617dbdf4bc54c33
    const esLintPlugin = loadWebpackEslintConfigViaPlugin(webpackConfig);
    if (!esLintPlugin.isFound) {
        const esLintLoader = loadWebpackEslintConfigViaLoader(webpackConfig);

        if (!esLintLoader.isFound) {
            logError(
                "Cannot find ESLint plugin (ESLintWebpackPlugin) (react-scripts >= 4.0) nor ESLint loader (eslint-loader) (react-scripts < 4.0)."
            );

            return { isFound: false };
        }
        webpackEslintConfig = esLintLoader.webpackEslintConfig;
        disableEsLint = esLintLoader.disableEsLint;
    } else {
        webpackEslintConfig = esLintPlugin.webpackEslintConfig;
        disableEsLint = esLintPlugin.disableEsLint;
    }

    return {
        isFound: true,
        webpackEslintConfig,
        disableEsLint
    };
}

function loadWebpackEslintConfigViaPlugin(webpackConfig) {
    const { isFound, match } = getPlugin(webpackConfig, pluginByName("ESLintWebpackPlugin"));

    if (isFound) {
        return { isFound: false };
    }

    return {
        isFound: true,
        webpackEslintConfig: {
            options: match.options
        },
        disableEsLint: () => removePlugins(webpackConfig, pluginByName("ESLintWebpackPlugin"))
    };
}

function loadWebpackEslintConfigViaLoader(webpackConfig) {
    const { isFound, match } = getLoader(webpackConfig, loaderByName("eslint-loader"));

    if (isFound) {
        return { isFound: false };
    }

    return {
        isFound: true,
        webpackEslintConfig: {
            options: match.loader.options
        },
        disableEsLint: () => removeLoaders(webpackConfig, pluginByName("eslint-loader"))
    };
}

module.exports = {
    overrideEsLint,
    ESLINT_MODES
};
