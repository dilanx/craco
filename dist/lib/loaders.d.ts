import type { Configuration as WebpackConfig, RuleSetRule, RuleSetUseItem } from 'webpack';
import type { Loader, LoaderMatcher, Rule } from '../types/loaders';
export declare function loaderByName(targetLoaderName: string): (rule: RuleSetRule | RuleSetUseItem) => boolean;
export declare function getLoader(webpackConfig: WebpackConfig, matcher: LoaderMatcher): {
    isFound: boolean;
    match: Loader | undefined;
};
export declare function getLoaders(webpackConfig: WebpackConfig, matcher: LoaderMatcher): {
    hasFoundAny: boolean;
    matches: Loader[];
};
export declare function removeLoaders(webpackConfig: WebpackConfig, matcher: LoaderMatcher): {
    hasRemovedAny: boolean;
    removedCount: number;
};
export declare const addBeforeLoader: (webpackConfig: WebpackConfig, matcher: LoaderMatcher, newLoader: Rule) => {
    isAdded: boolean;
};
export declare const addAfterLoader: (webpackConfig: WebpackConfig, matcher: LoaderMatcher, newLoader: Rule) => {
    isAdded: boolean;
};
export declare const addBeforeLoaders: (webpackConfig: WebpackConfig, matcher: LoaderMatcher, newLoader: Rule) => {
    isAdded: boolean;
    addedCount: number;
};
export declare const addAfterLoaders: (webpackConfig: WebpackConfig, matcher: LoaderMatcher, newLoader: Rule) => {
    isAdded: boolean;
    addedCount: number;
};
