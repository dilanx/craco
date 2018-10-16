const { getLoaders, loaderByName } = require("../../loaders");
const { log, error } = require("../../logger");
const { isFunction, deepMergeWithArray } = require("../../utils");

function setModuleLocalIdentName(match, localIdentName) {
    if (match.loader.options) {
        delete match.loader.options.getLocalIdent;
        match.loader.options.localIdentName = localIdentName;
    } else {
        match.loader.options = {
            localIdentName: localIdentName
        };
    }

    log("Overrided CSS modules local ident name.");
}

function applyLoaderOptions(match, loaderOptions, context) {
    if (isFunction(loaderOptions)) {
        match.loader.options = loaderOptions(match.loader.options || {}, context);
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        match.loader.options = deepMergeWithArray(match.loader.options || {}, loaderOptions);
    }

    log("Applied CSS loaders options.");
}

function overrideCssLoader(match, cssOptions, context) {
    if (cssOptions.loaderOptions) {
        applyLoaderOptions(match, cssOptions.loaderOptions, context);
    }

    log("Overrided CSS loader.");
}

function overrideModuleLoader(match, modulesOptions) {
    if (modulesOptions.localIdentName) {
        setModuleLocalIdentName(match, modulesOptions.localIdentName);
    }

    log("Overrided CSS module loader.");
}

function overrideCss(styleConfig, webpackConfig, context) {
    if (styleConfig.modules || styleConfig.css) {
        const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName("css-loader"));

        // console.log(JSON.stringify(webpackConfig, null, 2));

        if (!hasFoundAny) {
            error("Cannot find any CSS loaders.");

            return webpackConfig;
        }

        if (styleConfig.modules) {
            const cssModuleLoaders = matches.filter(x => x.loader.options && x.loader.options.modules === true);

            cssModuleLoaders.forEach(x => {
                overrideModuleLoader(x, styleConfig.modules);
            });
        }

        if (styleConfig.css) {
            matches.forEach(x => {
                overrideCssLoader(x, styleConfig.css, context);
            });
        }
    }

    return webpackConfig;
}

module.exports = {
    overrideCss
};
