import type { RuleSetRule } from 'webpack';
export declare type AssetModuleType = 'javascript/auto' | 'javascript/dynamic' | 'javascript/esm' | 'json' | 'webassembly/sync' | 'webassembly/async' | 'asset' | 'asset/source' | 'asset/resource' | 'asset/inline';
export declare type AssetModuleMatcher = (rule: RuleSetRule) => boolean;
export interface AssetModule {
    rule: RuleSetRule;
    index: number;
}
