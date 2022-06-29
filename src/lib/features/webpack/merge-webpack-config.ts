import type { Configuration as WebpackConfig } from 'webpack';
import type {
    AddWebpackPlugins,
    Configure,
    CracoConfig,
    WebpackAlias,
} from '../../../types/config';
import type { WebpackContext } from '../../../types/context';

import merge from 'webpack-merge';
import { log } from '../../logger';
import { isArray, isFunction } from '../../utils';
import {
    addPlugins as addWebpackPlugins,
    pluginByName,
    removePlugins as removeWebpackPlugins,
} from '../../webpack-plugins';
import { applyWebpackConfigPlugins } from '../plugins';
import { overrideBabel } from './babel';
import { overrideEsLint } from './eslint';
import { overrideStyle } from './style/style';
import { overrideTypeScript } from './typescript';

function addAlias(webpackConfig: WebpackConfig, webpackAlias: WebpackAlias) {
    if (webpackConfig.resolve) {
        // TODO: ensure is a plain object, if not, log an error.
        webpackConfig.resolve.alias = Object.assign(
            webpackConfig.resolve.alias || {},
            webpackAlias
        );
    }

    log('Added webpack alias.');
}

function addPlugins(
    webpackConfig: WebpackConfig,
    webpackPlugins: AddWebpackPlugins
) {
    if (isArray(webpackPlugins)) {
        addWebpackPlugins(webpackConfig, webpackPlugins);

        log('Added webpack plugins.');
    } else {
        throw new Error(
            `craco: 'webpack.plugins.add' needs to be a an array of plugins`
        );
    }
}

function removePluginsFromWebpackConfig(
    webpackConfig: WebpackConfig,
    remove: string[] | undefined
) {
    if (!remove) {
        return;
    }

    if (isArray(remove)) {
        for (const pluginName of remove) {
            const { hasRemovedAny } = removeWebpackPlugins(
                webpackConfig,
                pluginByName(pluginName)
            );

            if (hasRemovedAny) {
                log(`Removed webpack plugin ${pluginName}.`);
            } else {
                log(`Did not remove webpack plugin ${pluginName}.`);
            }
        }

        log('Removed webpack plugins.');
    } else {
        throw new Error(
            `craco: 'webpack.plugins.remove' needs to be a an array of plugin names`
        );
    }
}

function giveTotalControl(
    webpackConfig: WebpackConfig,
    configureWebpack: Configure<WebpackConfig, WebpackContext>,
    context: WebpackContext
) {
    if (isFunction(configureWebpack)) {
        webpackConfig = configureWebpack(webpackConfig, context);

        if (!webpackConfig) {
            throw new Error(
                "craco: 'webpack.configure' function didn't returned a webpack config object."
            );
        }
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        webpackConfig = merge(webpackConfig, configureWebpack);
    }

    log("Merged webpack config with 'webpack.configure'.");

    return webpackConfig;
}

export function mergeWebpackConfig(
    cracoConfig: CracoConfig,
    webpackConfig: WebpackConfig,
    context: WebpackContext
) {
    let resultingWebpackConfig = webpackConfig;

    resultingWebpackConfig = overrideBabel(
        cracoConfig,
        resultingWebpackConfig,
        context
    );
    resultingWebpackConfig = overrideEsLint(
        cracoConfig,
        resultingWebpackConfig,
        context
    );
    resultingWebpackConfig = overrideStyle(
        cracoConfig,
        resultingWebpackConfig,
        context
    );
    resultingWebpackConfig = overrideTypeScript(
        cracoConfig,
        resultingWebpackConfig
    );

    if (cracoConfig.webpack) {
        const { alias, plugins, configure } = cracoConfig.webpack;

        if (alias) {
            addAlias(resultingWebpackConfig, alias);
        }

        if (plugins) {
            // we still support the old format of plugin: [] where the array is a list of the plugins to add
            if (isArray(plugins)) {
                addPlugins(resultingWebpackConfig, plugins);
            } else {
                const { add, remove } = plugins;

                if (remove) {
                    removePluginsFromWebpackConfig(
                        resultingWebpackConfig,
                        remove
                    );
                }

                // Add after removing to preserve any plugins explicitely added via the Craco config
                if (add) {
                    addPlugins(resultingWebpackConfig, add);
                }
            }
        }

        if (configure) {
            resultingWebpackConfig = giveTotalControl(
                resultingWebpackConfig,
                configure,
                context
            );
        }
    }

    resultingWebpackConfig = applyWebpackConfigPlugins(
        cracoConfig,
        resultingWebpackConfig,
        context
    );

    return resultingWebpackConfig;
}
