const { log, logError } = require("../../logger");
const { isFunction, deepMergeWithArray } = require("../../utils");
const { getPlugin, removePlugins, pluginByName } = require("../../webpack-plugins");

const ESLINT_MODES = {
    extends: "extends",
    file: "file"
};

function disableEslint(webpackConfig) {
    const { hasRemovedAny } = removePlugins(webpackConfig, pluginByName("ESLintWebpackPlugin"));

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

function applyOptionsConfiguration(webpackEslintConfig, pluginOptions, context) {
    if (isFunction(pluginOptions)) {
        webpackEslintConfig.options = pluginOptions(webpackEslintConfig.options || {}, context);

        if (!webpackEslintConfig.options) {
            throw new Error("craco: 'eslint.pluginOptions' function didn't return a config object.");
        }
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        webpackEslintConfig.options = deepMergeWithArray(webpackEslintConfig.options || {}, pluginOptions);
    }

    log("Applied ESLint plugin options.");
}

function overrideEsLint(cracoConfig, webpackConfig, context) {
    if (cracoConfig.eslint) {
        const { isFound, match } = getPlugin(webpackConfig, pluginByName("ESLintWebpackPlugin"));
        if (!isFound) {
            logError("Cannot find ESLint plugin (ESLintWebpackPlugin).");
            return webpackConfig;
        }

        const webpackEslintConfig = {
            options: match.options
        };

        const { enable, mode, pluginOptions } = cracoConfig.eslint;

        if (enable === false) {
            disableEslint(webpackConfig);

            return webpackConfig;
        }

        enableEslintIgnoreFile(webpackEslintConfig);

        if (mode === ESLINT_MODES.file) {
            useEslintConfigFile(webpackEslintConfig);
        } else {
            extendsEslintConfig(webpackEslintConfig, cracoConfig.eslint, context);
        }

        if (pluginOptions) {
            applyOptionsConfiguration(webpackEslintConfig, pluginOptions);
        }
    }

    return webpackConfig;
}

module.exports = {
    overrideEsLint,
    ESLINT_MODES
};
