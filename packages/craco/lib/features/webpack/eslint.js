const { getReactScriptVersion } = require("../../cra");
const { getLoader, removeLoaders, loaderByName } = require("../../loaders");
const { log, logError } = require("../../logger");
const { isFunction, deepMergeWithArray } = require("../../utils");
const semver = require("semver");
const { getPlugin, removePlugins, pluginByName } = require("../../plugins");

const ESLINT_MODES = {
    extends: "extends",
    file: "file"
};

function disableEslint(webpackConfig) {
    // todo remove this plugin for cra 4.0
    const { hasRemovedAny } = removeLoaders(webpackConfig, loaderByName("eslint-loader"));

    if (hasRemovedAny) {
        log("Disabled ESLint.");
    } else {
        logError("Couldn't disabled ESLint.");
    }
}

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
        console.log("CONFIG: ", webpackEslintConfig.options);

        const { enable, mode, loaderOptions } = cracoConfig.eslint;

        if (enable === false) {
            disableEslint(webpackConfig);

            return webpackConfig;
        }

        enableEslintIgnoreFile(webpackEslintConfig); // update

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

function TODO_FIND_NAME_STRATEGY(cracoConfig, webpackConfig) {
    let webpackEslintConfig = {
        options: null,
        disable: null
    };

    if (semver.gte(getReactScriptVersion(cracoConfig), "4.0.0")) {
        const { isFound, match } = getPlugin(webpackConfig, pluginByName("ESLintWebpackPlugin"));

        if (!isFound) {
            logError("Cannot find ESLint plugin (ESLintWebpackPlugin).");

            return webpackConfig;
        }

        webpackEslintConfig = {
            options: match.options,
            disable: () => removePlugins(webpackConfig, pluginByName("ESLintWebpackPlugin"))
        };
    } else {
        const { isFound, match } = getLoader(webpackConfig, loaderByName("eslint-loader"));

        if (!isFound) {
            logError("Cannot find ESLint loader (eslint-loader).");

            return webpackConfig;
        }

        webpackEslintConfig = {
            options: match.loader.options,
            disable: () => removeLoaders(webpackConfig, loaderByName("eslint-loader"))
        };
    }

    function updateEsLint(config, deleteBaseConfig = false) {
        webpackEslintConfig.options = {
            ...webpackEslintConfig.options,
            ...config
        };

        if (deleteBaseConfig) {
            delete webpackEslintConfig.options.baseConfig;
        }
    }

    return {
        getEsLintOptions: () => webpackEslintConfig.options,
        updateEsLint,
        disableEsLint: () => webpackEslintConfig.disable()
    };
}

module.exports = {
    overrideEsLint,
    ESLINT_MODES
};
