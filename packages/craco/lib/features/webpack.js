const merge = require("webpack-merge");
const { isFunction, isArray, isString } = require("../utils");
const { log } = require("../logger");
const { overrideBabel } = require("./babel");
const { overrideEsLint } = require("./eslint");
const { overrideStyle } = require("./style/style");
const { overrideTypeScript } = require("./typescript");
const { applyWebpackConfigPlugins } = require("./plugins");

const devToolModeList = [
  'false',
  'eval',
  'cheap-eval-source-map',
  'cheap-module-eval-source-map',
  'eval-source-map',
  'cheap-source-map',
  'cheap-module-source-map',
  'inline-cheap-source-map',
  'inline-cheap-module-source-map',
  'source-map',
  'inline-source-map',
  'hidden-source-map',
  'nosources-source-map'
];

function addAlias(webpackConfig, webpackAlias) {
    // TODO: ensure is a plain object, if not, log an error.
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias || {}, webpackAlias);

    log("Added webpack alias.");
}

function addPlugins(webpackConfig, webpackPlugins) {
    if (isArray(webpackPlugins)) {
        webpackConfig.plugins = webpackPlugins.concat(webpackConfig.plugins || []);

        log("Added webpack plugins.");
    }
}

function addDevtool(webpackConfig, webpackDevtool) {

    if (isString(webpackDevtool) && devToolModeList.includes(webpackDevtool)) {
        webpackConfig.devtool = webpackDevtool;

        log("Added webpack devtool.");
    }
}

function giveTotalControl(webpackConfig, configureWebpack, context) {
    if (isFunction(configureWebpack)) {
        webpackConfig = configureWebpack(webpackConfig, context);

        if (!webpackConfig) {
            throw new Error("craco: 'webpack.configure' function didn't returned a webpack config object.");
        }
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        webpackConfig = merge(webpackConfig, configureWebpack);
    }

    log("Merged webpack config with 'webpack.configure'.");

    return webpackConfig;
}

function overrideWebpack(cracoConfig, webpackConfig, overrideConfig, context) {
    webpackConfig = overrideBabel(cracoConfig, webpackConfig, context);
    webpackConfig = overrideEsLint(cracoConfig, webpackConfig, context);
    webpackConfig = overrideStyle(cracoConfig, webpackConfig, context);
    webpackConfig = overrideTypeScript(cracoConfig, webpackConfig, context);

    if (cracoConfig.webpack) {
        const { alias, plugins, configure, devtool } = cracoConfig.webpack;

        if (alias) {
            addAlias(webpackConfig, alias);
        }

        if (plugins) {
            addPlugins(webpackConfig, plugins);
        }

        if (configure) {
            webpackConfig = giveTotalControl(webpackConfig, configure, context);
        }

        if (devtool) {
          addDevtool(webpackConfig, devtool);
        }
    }

    webpackConfig = applyWebpackConfigPlugins(cracoConfig, webpackConfig, context);

    overrideConfig(cracoConfig, webpackConfig);
}

module.exports = {
    overrideWebpack
};
