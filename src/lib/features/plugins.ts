import type { Config as JestConfig } from '@jest/types';
import type { Configuration as WebpackConfig } from 'webpack';
import type { Configuration as DevServerConfig } from 'webpack-dev-server';
import type {
    Context,
    CracoConfig,
    CracoPluginDefinition,
} from '../../types/config';

import { log } from '../logger';

/************  Craco Config  ************/

function overrideCraco(
    { plugin, options }: CracoPluginDefinition,
    cracoConfig: CracoConfig,
    context: Context
) {
    if (plugin.overrideCracoConfig) {
        const resultingConfig = plugin.overrideCracoConfig({
            cracoConfig: cracoConfig,
            pluginOptions: options,
            context: context,
        });

        if (!resultingConfig) {
            throw new Error(
                'craco: Plugin returned an undefined craco config.'
            );
        }

        return resultingConfig;
    }

    log('Overrided craco config with plugin.');

    return cracoConfig;
}

export function applyCracoConfigPlugins(
    cracoConfig: CracoConfig,
    context: Context
) {
    if (cracoConfig.plugins) {
        cracoConfig.plugins.forEach((plugin) => {
            cracoConfig = overrideCraco(plugin, cracoConfig, context);
        });
    }

    log('Applied craco config plugins.');

    return cracoConfig;
}

/************  Webpack Config  ************/

function overrideWebpack(
    { plugin, options }: CracoPluginDefinition,
    cracoConfig: CracoConfig,
    webpackConfig: WebpackConfig,
    context: Context
) {
    if (plugin.overrideWebpackConfig) {
        const resultingConfig = plugin.overrideWebpackConfig({
            cracoConfig: cracoConfig,
            webpackConfig: webpackConfig,
            pluginOptions: options,
            context: context,
        });

        if (!resultingConfig) {
            throw new Error(
                'craco: Plugin returned an undefined webpack config.'
            );
        }

        return resultingConfig;
    }

    log('Overrided webpack config with plugin.');

    return webpackConfig;
}

export function applyWebpackConfigPlugins(
    cracoConfig: CracoConfig,
    webpackConfig: WebpackConfig,
    context: Context
) {
    if (cracoConfig.plugins) {
        cracoConfig.plugins.forEach((plugin) => {
            webpackConfig = overrideWebpack(
                plugin,
                cracoConfig,
                webpackConfig,
                context
            );
        });
    }

    log('Applied webpack config plugins.');

    return webpackConfig;
}

/************  DevServer Config  ************/

function overrideDevServer(
    { plugin, options }: CracoPluginDefinition,
    cracoConfig: CracoConfig,
    devServerConfig: DevServerConfig,
    context: Context
) {
    if (plugin.overrideDevServerConfig) {
        const resultingConfig = plugin.overrideDevServerConfig({
            cracoConfig: cracoConfig,
            devServerConfig: devServerConfig,
            pluginOptions: options,
            context: context,
        });

        if (!resultingConfig) {
            throw new Error(
                'craco: Plugin returned an undefined devServer config.'
            );
        }

        return resultingConfig;
    }

    log('Overrided devServer config with plugin.');

    return devServerConfig;
}

export function applyDevServerConfigPlugins(
    cracoConfig: CracoConfig,
    devServerConfig: DevServerConfig,
    context: Context
) {
    if (cracoConfig.plugins) {
        cracoConfig.plugins.forEach((plugin) => {
            devServerConfig = overrideDevServer(
                plugin,
                cracoConfig,
                devServerConfig,
                context
            );
        });
    }

    log('Applied devServer config plugins.');

    return devServerConfig;
}

/************  Jest Config  *******************/

function overrideJest(
    { plugin, options }: CracoPluginDefinition,
    cracoConfig: CracoConfig,
    jestConfig: JestConfig.InitialOptions,
    context: Context
) {
    if (plugin.overrideJestConfig) {
        const resultingConfig = plugin.overrideJestConfig({
            cracoConfig: cracoConfig,
            jestConfig: jestConfig,
            pluginOptions: options,
            context: context,
        });

        if (!resultingConfig) {
            throw new Error('craco: Plugin returned an undefined Jest config.');
        }

        return resultingConfig;
    }

    log('Overrided Jest config with plugin.');

    return jestConfig;
}

export function applyJestConfigPlugins(
    cracoConfig: CracoConfig,
    jestConfig: JestConfig.InitialOptions,
    context: Context
) {
    if (cracoConfig.plugins) {
        cracoConfig.plugins.forEach((plugin) => {
            jestConfig = overrideJest(plugin, cracoConfig, jestConfig, context);
        });
    }

    log('Applied Jest config plugins.');

    return jestConfig;
}
