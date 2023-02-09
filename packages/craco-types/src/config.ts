import type { TransformOptions } from '@babel/core';
import type { Options as AutoprefixerOptions } from 'autoprefixer';
import type { Linter } from 'eslint';
import type { PluginOptions } from 'eslint-webpack-plugin/types/options';
import type {
  Configuration as WebpackConfig,
  WebpackPluginInstance,
} from 'webpack';
import type { Configuration as DevServerConfig } from 'webpack-dev-server';
import type {
  BaseContext,
  CraPaths,
  DevServerContext,
  JestContext,
  WebpackContext,
} from './context';
import type { CracoPlugin } from './plugins';
import type { Config as JestConfig } from '@jest/types';

export type Configure<Config, Context> =
  | Config
  | ((config: Config, context: Context) => Config);

export interface CracoStyleConfig {
  modules?: {
    localIdentName?: string;
  };
  css?: {
    loaderOptions?: Configure<any, BaseContext>;
  };
  sass?: {
    loaderOptions?: Configure<any, BaseContext>;
  };
  postcss?: {
    mode?: 'extends' | 'file';
    plugins?: any[] | ((plugins: any[]) => any[]);
    env?: {
      autoprefixer?: AutoprefixerOptions;
      stage?: 0 | 1 | 2 | 3 | 4 | false;
      features?: { [featureId: string]: any };
    };
    loaderOptions?: Configure<any, BaseContext>;
  };
}

export interface CracoBabelConfig {
  presets?: any[];
  plugins?: any[];
  assumptions?: { [assumption: string]: boolean };
  loaderOptions?: Configure<TransformOptions, BaseContext>;
}

export interface CracoEsLintConfig {
  enable?: boolean;
  mode?: 'extends' | 'file';
  configure?: Configure<Linter.Config, BaseContext>;
  pluginOptions?: Configure<PluginOptions, BaseContext>;
}

export type WebpackAlias = { [alias: string]: string };
export type AddWebpackPlugins = (
  | WebpackPluginInstance
  | [WebpackPluginInstance, 'append' | 'prepend']
)[];

export interface CracoWebpackConfig {
  alias?: WebpackAlias;
  plugins?: {
    add?: AddWebpackPlugins;
    remove?: string[];
  };
  configure?: Configure<WebpackConfig, WebpackContext>;
}

export type CracoDevServerConfig = Configure<DevServerConfig, DevServerContext>;

export interface CracoJestConfig {
  babel?: {
    addPresets?: boolean;
    addPlugins?: boolean;
  };

  configure?: Configure<JestConfig.InitialOptions, JestContext>;
}

export interface CracoTypeScriptConfig {
  enableTypeChecking?: boolean;
}

export interface CracoPluginDefinition<Options> {
  plugin: CracoPlugin;
  options?: Options;
}

export interface CracoConfig {
  reactScriptsVersion?: string;
  style?: CracoStyleConfig;
  eslint?: CracoEsLintConfig;
  babel?: CracoBabelConfig;
  jest?: CracoJestConfig;
  typescript?: CracoTypeScriptConfig;
  webpack?: CracoWebpackConfig;
  devServer?: CracoDevServerConfig;
  plugins?: CracoPluginDefinition<any>[];
  paths?: Configure<CraPaths | undefined, BaseContext>;
}
