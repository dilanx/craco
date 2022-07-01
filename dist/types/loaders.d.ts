import type { RuleSetRule, RuleSetUseItem } from 'webpack';
export declare type Rule = RuleSetRule | undefined;
export declare type Rules = Rule[] | undefined;
export declare type LoaderMatcher = (rule: RuleSetRule | RuleSetUseItem) => boolean;
export interface Loader {
    loader: Rule;
    parent: Rules;
    index: number;
}
export declare type CompleteLoader = Loader & {
    loader: RuleSetRule;
};
