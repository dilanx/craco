import type { Configuration as WebpackConfig } from 'webpack';
import type { CracoConfig } from '../types/config';
export declare function getReactScriptVersion(cracoConfig: CracoConfig): {
    version: any;
    isSupported: boolean;
};
export declare function getCraPaths(cracoConfig: CracoConfig): any;
export declare function loadWebpackDevConfig(cracoConfig: CracoConfig): WebpackConfig;
export declare function overrideWebpackDevConfig(cracoConfig: CracoConfig, newConfig: WebpackConfig): void;
export declare function loadWebpackProdConfig(cracoConfig: CracoConfig): WebpackConfig;
export declare function overrideWebpackProdConfig(cracoConfig: CracoConfig, newConfig: WebpackConfig): void;
export declare function loadDevServerConfigProvider(cracoConfig: CracoConfig): any;
export declare function overrideDevServerConfigProvider(cracoConfig: CracoConfig, configProvider: any): void;
export declare function loadDevServerUtils(): any;
export declare function overrideDevServerUtils(newUtils: any): void;
export declare function loadJestConfigProvider(cracoConfig: CracoConfig): any;
export declare function overrideJestConfigProvider(cracoConfig: CracoConfig, configProvider: any): void;
/************  Scripts  *******************/
export declare function start(cracoConfig: CracoConfig): void;
export declare function build(cracoConfig: CracoConfig): void;
export declare function test(cracoConfig: CracoConfig): void;
