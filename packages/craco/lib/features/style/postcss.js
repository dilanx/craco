const { getLoaders, loaderByName } = require("../../loaders");
const { log, error } = require("../../logger");
const { isArray, isFunction, deepMergeWithArray } = require("../../utils");

const POSTCSS_MODES = {
    extends: "extends",
    file: "file"
};

function usePostcssConfigFile(match) {
    if (match.loader.options) {
        const ident = match.loader.options.ident;

        match.loader.options = {
            ident: ident
        };
    }

    log("Overwrited PostCSS config to use a config file.");
}

function extendsPostcss(match, { plugins }) {
    if (plugins) {
        addPlugins(match, plugins);
    }
}

function addPlugins(match, postcssPlugins) {
    if (isArray(postcssPlugins)) {
        if (match.loader.options) {
            const craPlugins = match.loader.options.plugins();
            const mergedPlugins = postcssPlugins.concat(craPlugins || []);

            match.loader.options.plugins = () => mergedPlugins;
        } else {
            match.loader.options = {
                plugins: () => postcssPlugins
            };
        }

        log("Added PostCSS plugins.");
    }
}

function applyLoaderOptions(match, loaderOptions, context) {
    if (isFunction(loaderOptions)) {
        match.loader.options = loaderOptions(match.loader.options || {}, context);
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        match.loader.options = deepMergeWithArray(match.loader.options || {}, loaderOptions);
    }

    log("Applied PostCSS loaders options.");
}

function overrideLoader(match, postcssConfig) {
    const { mode, loaderOptions } = postcssConfig;

    if (mode === POSTCSS_MODES.file) {
        usePostcssConfigFile(match);
    } else {
        extendsPostcss(match, postcssConfig);
    }

    if (loaderOptions) {
        applyLoaderOptions(match, loaderOptions);
    }

    log("Overrided PostCSS loader.");
}

function overridePostcss(cracoConfig, webpackConfig) {
    if (cracoConfig.postcss) {
        const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName("postcss-loader"));

        if (!hasFoundAny) {
            error("Cannot find any PostCSS loaders.");

            return webpackConfig;
        }

        matches.forEach(x => {
            overrideLoader(x, cracoConfig.postcss);
        });
    }

    return webpackConfig;
}

module.exports = {
    overridePostcss,
    POSTCSS_MODES
};
