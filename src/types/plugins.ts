import type { Context, CracoConfig } from './config';
import type { Configuration as DevServerConfig } from 'webpack-dev-server';
import type { Config as JestConfig } from '@jest/types';
import type { Configuration as WebpackConfig } from 'webpack';

export type PluginOptions = object;

export interface CracoConfigOverride {
    cracoConfig: CracoConfig;
    pluginOptions: PluginOptions;
    context: Context;
}

export interface WebpackConfigOverride {
    webpackConfig: WebpackConfig;
    cracoConfig: CracoConfig;
    pluginOptions: PluginOptions;
    context: Context;
}

export interface DevServerConfigOverride {
    devServerConfig: DevServerConfig;
    cracoConfig: CracoConfig;
    pluginOptions: PluginOptions;
    context: Context;
}

export interface JestConfigOverride {
    jestConfig: JestConfig.InitialOptions;
    cracoConfig: CracoConfig;
    pluginOptions: PluginOptions;
    context: Context;
}

export interface CracoPlugin {
    overrideCracoConfig?: (
        cracoConfigOverride: CracoConfigOverride
    ) => CracoConfig;
    overrideWebpackConfig?: (
        webpackConfigOverride: WebpackConfigOverride
    ) => WebpackConfig;
    overrideDevServerConfig?: (
        devServerConfigOverride: DevServerConfigOverride
    ) => DevServerConfig;
    overrideJestConfig?: (
        jestConfigOverride: JestConfigOverride
    ) => JestConfig.InitialOptions;
}
