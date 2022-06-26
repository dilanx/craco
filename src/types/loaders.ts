import type { RuleSetRule, RuleSetUseItem } from 'webpack';

export type Rule = RuleSetRule | undefined;
export type Rules = Rule[] | undefined;
export type Matcher = (rule: RuleSetRule | RuleSetUseItem) => boolean;

export interface Loader {
    loader: Rule;
    parent: Rules;
    index: number;
}

export type CompleteLoader = Loader & {
    loader: RuleSetRule;
};
