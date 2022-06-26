import type { Options as AutoprefixerOptions } from 'autoprefixer';
import type { Linter } from 'eslint';
import type { PluginOptions } from 'eslint-webpack-plugin/types/options';
import type { Configuration as WebpackConfig } from 'webpack';
import type { Configuration as DevServerConfig } from 'webpack-dev-server';
import type { CracoPlugin } from './plugins';

export interface Context {
    [key: string]: any;
}

export interface CssLoaderOptions {
    [key: string]: any;
}

export interface SassLoaderOptions {
    [key: string]: any;
}

export interface PostCssLoaderOptions {
    [key: string]: any;
}

export interface CssOptions {
    loaderOptions?:
        | CssLoaderOptions
        | ((
              cssLoaderOptions: CssLoaderOptions,
              context: Context
          ) => CssLoaderOptions);
}

export interface SassOptions {
    loaderOptions?:
        | SassLoaderOptions
        | ((
              sassLoaderOptions: SassLoaderOptions,
              context: Context
          ) => SassLoaderOptions);
}

export type PostCssModes = {
    extends: 'extends';
    file: 'file';
};

export interface PostCssOptions {
    mode: 'extends' | 'file';
    plugins?: any[] | ((postcssPlugins: any[]) => any[]);
    env?: {
        autoprefixer?: AutoprefixerOptions;
        stage?: 0 | 1 | 2 | 3 | 4 | false;
        features?: object;
    };
    loaderOptions?:
        | PostCssLoaderOptions
        | ((
              postCssLoaderOptions: PostCssLoaderOptions,
              context: Context
          ) => PostCssLoaderOptions);
}

export interface CracoStyleConfig {
    modules?: { [key: string]: any };
    css?: CssOptions;
    sass?: SassOptions;
    postcss?: PostCssOptions;
}

export type BabelPresets = any[];
export type BabelPlugins = any[];
export type BabelLoaderOptions = any;

export interface CracoBabelConfig {
    presets?: BabelPresets;
    plugins?: BabelPlugins;
    loaderOptions?:
        | BabelLoaderOptions
        | ((
              babelLoaderOptions: BabelLoaderOptions,
              context: Context
          ) => BabelLoaderOptions);
}

export type EsLintModes = {
    extends: 'extends';
    file: 'file';
};

export interface CracoEsLintConfig {
    enable?: boolean;
    mode: 'extends' | 'file';
    configure?:
        | Linter.Config
        | ((eslintConfig: Linter.Config, context: Context) => Linter.Config);
    pluginOptions?: PluginOptions;
}

export type WebpackAlias = any;
export type WebpackPlugins = any[];

export interface CracoWebpackConfig {
    alias?: WebpackAlias;
    plugins?: {
        add?: WebpackPlugins;
        remove?: string[];
    };
    configure?:
        | WebpackConfig
        | ((webpackConfig: WebpackConfig, context: Context) => WebpackConfig);
}

export interface CracoPluginDefinition {
    plugin: CracoPlugin;
    options: object;
}

export interface CracoConfig {
    reactScriptsVersion: string;
    style?: CracoStyleConfig;
    eslint?: CracoEsLintConfig;
    babel?: CracoBabelConfig;
    jest?: any; // TODO change type
    typescript?: any;
    webpack?: CracoWebpackConfig;
    devServer?:
        | DevServerConfig
        | ((
              devServerConfig: DevServerConfig,
              context: Context
          ) => DevServerConfig);
    plugins?: CracoPluginDefinition[];
}
