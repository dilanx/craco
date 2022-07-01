import type { RuleSetRule, Configuration as WebpackConfig } from 'webpack';
import type { AssetModule, AssetModuleMatcher, AssetModuleType } from '../types/asset-modules';
export declare function assetModuleByName(assetModuleName: AssetModuleType): (rule: RuleSetRule) => boolean;
export declare function getAssetModule(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher): {
    isFound: boolean;
    match: AssetModule | undefined;
};
export declare function getAssetModules(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher): {
    hasFoundAny: boolean;
    matches: AssetModule[];
};
export declare function removeAssetModules(webpackConfig: WebpackConfig, matcher: AssetModuleMatcher): {
    rules: (RuleSetRule | "...")[] | undefined;
    removedCount: number;
};
export declare const addBeforeAssetModule: (webpackConfig: WebpackConfig, matcher: AssetModuleMatcher, newAssetModule: RuleSetRule) => {
    isAdded: boolean;
};
export declare const addAfterAssetModule: (webpackConfig: WebpackConfig, matcher: AssetModuleMatcher, newAssetModule: RuleSetRule) => {
    isAdded: boolean;
};
export declare const addBeforeAssetModules: (webpackConfig: WebpackConfig, matcher: AssetModuleMatcher, newAssetModule: RuleSetRule) => {
    isAdded: boolean;
    addedCount: number;
};
export declare const addAfterAssetModules: (webpackConfig: WebpackConfig, matcher: AssetModuleMatcher, newAssetModule: RuleSetRule) => {
    isAdded: boolean;
    addedCount: number;
};
