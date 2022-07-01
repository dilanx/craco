import type { CracoConfig } from './config';
import type { Configuration as DevServerConfig } from 'webpack-dev-server';
import type { Config as JestConfig } from '@jest/types';
import type { Configuration as WebpackConfig } from 'webpack';
import type { BaseContext, DevServerContext, JestContext, WebpackContext } from './context';
export declare type PluginOptions = any;
export interface CracoConfigOverride {
    cracoConfig: CracoConfig;
    pluginOptions: PluginOptions;
    context: BaseContext;
}
export interface WebpackConfigOverride {
    webpackConfig: WebpackConfig;
    cracoConfig: CracoConfig;
    pluginOptions: PluginOptions;
    context: WebpackContext;
}
export interface DevServerConfigOverride {
    devServerConfig: DevServerConfig;
    cracoConfig: CracoConfig;
    pluginOptions: PluginOptions;
    context: DevServerContext;
}
export interface JestConfigOverride {
    jestConfig: JestConfig.InitialOptions;
    cracoConfig: CracoConfig;
    pluginOptions: PluginOptions;
    context: JestContext;
}
export interface CracoPlugin {
    overrideCracoConfig?: (cracoConfigOverride: CracoConfigOverride) => CracoConfig;
    overrideWebpackConfig?: (webpackConfigOverride: WebpackConfigOverride) => WebpackConfig;
    overrideDevServerConfig?: (devServerConfigOverride: DevServerConfigOverride) => DevServerConfig;
    overrideJestConfig?: (jestConfigOverride: JestConfigOverride) => JestConfig.InitialOptions;
}
