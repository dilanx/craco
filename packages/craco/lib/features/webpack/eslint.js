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
            if (webpackEslintConfig.pluginOptions) {
                webpackEslintConfig.pluginOptions.baseConfig = configure(
                    webpackEslintConfig.pluginOptions.baseConfig || {},
                    context
                );
            } else {
                webpackEslintConfig.pluginOptions = {
                    baseConfig: configure({}, context)
                };
            }

            if (!webpackEslintConfig.pluginOptions.baseConfig) {
                throw new Error("craco: 'eslint.configure' function didn't return a config object.");
            }
        } else {
            // TODO: ensure is otherwise a plain object, if not, log an error.
            if (webpackEslintConfig.pluginOptions) {
                webpackEslintConfig.pluginOptions.baseConfig = deepMergeWithArray(
                    {},
                    webpackEslintConfig.pluginOptions.baseConfig || {},
                    configure
                );
            } else {
                webpackEslintConfig.pluginOptions = {
                    baseConfig: configure
                };
            }
        }

        log("Merged ESLint config with 'eslint.configure'.");
    }
}

function useEslintConfigFile(webpackEslintConfig) {
    if (webpackEslintConfig.pluginOptions) {
        webpackEslintConfig.pluginOptions.useEslintrc = true;
        delete webpackEslintConfig.pluginOptions.baseConfig;
    } else {
        webpackEslintConfig.pluginOptions = {
            useEslintrc: true
        };
    }

    log("Overrided ESLint config to use a config file.");
}

function enableEslintIgnoreFile(webpackEslintConfig) {
    if (webpackEslintConfig.pluginOptions) {
        webpackEslintConfig.pluginOptions.ignore = true;
    } else {
        webpackEslintConfig.pluginOptions = {
            ignore: true
        };
    }

    log("Overrided ESLint config to enable an ignore file.");
}

function applyOptionsConfiguration(webpackEslintConfig, configureOptions, context) {
    if (isFunction(configureOptions)) {
        webpackEslintConfig.pluginOptions = configureOptions(webpackEslintConfig.pluginOptions || {}, context);

        if (!webpackEslintConfig.pluginOptions) {
            throw new Error("craco: 'eslint.configureOptions' function didn't return a loader config object.");
        }
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        webpackEslintConfig.pluginOptions = deepMergeWithArray(
            webpackEslintConfig.pluginOptions || {},
            configureOptions
        );
    }

    log("Applied ESLint plugin options.");
}

function overrideEsLint(cracoConfig, webpackConfig, context) {
    if (cracoConfig.eslint) {
        const { isFound, webpackEslintConfig, disableEsLint } = loadWebpackEslintPlugin(cracoConfig, webpackConfig);

        if (!isFound) {
            return webpackConfig;
        }

        const { enable, mode, configureOptions } = cracoConfig.eslint;

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

        if (configureOptions) {
            applyOptionsConfiguration(webpackEslintConfig, configureOptions);
        }
    }

    return webpackConfig;
}

function loadWebpackEslintPlugin(cracoConfig, webpackConfig) {
    let disableEsLint = null;
    let webpackEslintConfig = {
        options: null
    };

    const esLintPlugin = loadWebpackEslintPlugin(webpackConfig);
    if (!esLintPlugin.isFound) {
        logError("Cannot find ESLint plugin (ESLintWebpackPlugin).");
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

function loadWebpackEslintPlugin(webpackConfig) {
    const matcher = pluginByName("ESLintWebpackPlugin");
    const { isFound, match } = getPlugin(webpackConfig, matcher);

    if (isFound) {
        return { isFound: false };
    }

    return {
        isFound: true,
        webpackEslintConfig: {
            options: match.options
        },
        disableEsLint: () => removePlugins(webpackConfig, matcher)
    };
}

module.exports = {
    overrideEsLint,
    ESLINT_MODES
};
