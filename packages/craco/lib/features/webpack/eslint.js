const { getLoader, removeLoaders, loaderByName } = require("../../loaders");
const { log, logError } = require("../../logger");
const { isFunction, deepMergeWithArray } = require("../../utils");

const ESLINT_MODES = {
    extends: "extends",
    file: "file"
};

function disableEslint(webpackConfig) {
    const { hasRemovedAny } = removeLoaders(webpackConfig, loaderByName("eslint-loader"));

    if (hasRemovedAny) {
        log("Disabled ESLint.");
    } else {
        logError("Couldn't disabled ESLint.");
    }
}

function extendsEslintConfig(loader, eslintConfig, context) {
    const { configure } = eslintConfig;

    if (configure) {
        if (isFunction(configure)) {
            if (loader.options) {
                loader.options.baseConfig = configure(loader.options.baseConfig || {}, context);
            } else {
                loader.options = {
                    baseConfig: configure({}, context)
                };
            }

            if (!loader.options.baseConfig) {
                throw new Error("craco: 'eslint.configure' function didn't return a config object.");
            }
        } else {
            // TODO: ensure is otherwise a plain object, if not, log an error.
            if (loader.options) {
                loader.options.baseConfig = deepMergeWithArray({}, loader.options.baseConfig || {}, configure);
            } else {
                loader.options = {
                    baseConfig: configure
                };
            }
        }

        log("Merged ESLint config with 'eslint.configure'.");
    }
}

function useEslintConfigFile(loader) {
    if (loader.options) {
        loader.options.useEslintrc = true;
        delete loader.options.baseConfig;
    } else {
        loader.options = {
            useEslintrc: true
        };
    }

    log("Overrided ESLint config to use a config file.");
}

function enableEslintIgnoreFile(loader) {
    if (loader.options) {
        loader.options.ignore = true;
    } else {
        loader.options = {
            ignore: true
        };
    }

    log("Overrided ESLint config to enable an ignore file.");
}

function applyLoaderOptions(loader, loaderOptions, context) {
    if (isFunction(loaderOptions)) {
        loader.options = loaderOptions(loader.options || {}, context);

        if (!loader.options) {
            throw new Error("craco: 'eslint.loaderOptions' function didn't return a loader config object.");
        }
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        loader.options = deepMergeWithArray(loader.options || {}, loaderOptions);
    }

    log("Applied ESLint loader options.");
}

function overrideEsLint(cracoConfig, webpackConfig, context) {
    if (cracoConfig.eslint) {
        const { isFound, match } = getLoader(webpackConfig, loaderByName("eslint-loader"));

        if (!isFound) {
            logError("Cannot find ESLint loader (eslint-loader).");

            return webpackConfig;
        }

        const { enable, mode, loaderOptions } = cracoConfig.eslint;

        if (enable === false) {
            disableEslint(webpackConfig);

            return webpackConfig;
        }

        enableEslintIgnoreFile(match.loader);

        if (mode === ESLINT_MODES.file) {
            useEslintConfigFile(match.loader);
        } else {
            extendsEslintConfig(match.loader, cracoConfig.eslint, context);
        }

        if (loaderOptions) {
            applyLoaderOptions(match.loader, loaderOptions);
        }
    }

    return webpackConfig;
}

module.exports = {
    overrideEsLint,
    ESLINT_MODES
};
