import type { RuleSetRule, RuleSetUseItem } from 'webpack';

// TODO these typings need to be updated I'm pretty sure

export type Rule = RuleSetRule | undefined;
export type Rules = Rule[] | undefined;
export type LoaderMatcher = (rule: RuleSetRule | RuleSetUseItem) => boolean;

export interface Loader {
    loader: Rule;
    parent: Rules;
    index: number;
}

export type CompleteLoader = Loader & {
    loader: RuleSetRule;
};
