import type { RuleSetRule } from 'webpack';

export type AssetModuleType =
  | 'javascript/auto'
  | 'javascript/dynamic'
  | 'javascript/esm'
  | 'json'
  | 'webassembly/sync'
  | 'webassembly/async'
  | 'asset'
  | 'asset/source'
  | 'asset/resource'
  | 'asset/inline';

export type AssetModuleMatcher = (rule: RuleSetRule) => boolean;

export interface AssetModule {
  rule: RuleSetRule;
  index: number;
}
