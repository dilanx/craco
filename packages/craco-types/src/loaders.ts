import type { RuleSetRule, RuleSetUseItem } from 'webpack';

// TODO these typings need to be updated I'm pretty sure

export type LoaderMatcher = (rule: RuleSetRule | RuleSetUseItem) => boolean;

export interface Loader {
  loader?: RuleSetRule;
  parent?: RuleSetRule[];
  index: number;
}

export type CompleteLoader = Loader & {
  loader: RuleSetRule;
};
