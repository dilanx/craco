import type { Configuration as WebpackConfig } from 'webpack';
export declare function pluginByName(targetPluginName: string): (plugin: any) => boolean;
export declare function getPlugin(webpackConfig: WebpackConfig, matcher: (value: any, index?: number, obj?: any[]) => boolean): {
    isFound: boolean;
    match: import("webpack").WebpackPluginInstance | ((this: import("webpack").Compiler, compiler: import("webpack").Compiler) => void) | undefined;
};
export declare function addPlugins(webpackConfig: WebpackConfig, webpackPlugins: any[]): void;
export declare function removePlugins(webpackConfig: WebpackConfig, matcher: (value: any, index?: number, array?: any[]) => boolean): {
    hasRemovedAny: boolean;
    removedCount: number;
};
