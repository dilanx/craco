import type { Loader, LoaderMatcher } from '@craco/types';
import type {
  Configuration as WebpackConfig,
  RuleSetRule,
  RuleSetUseItem,
} from 'webpack';

import path from 'path';
import { isArray, isString } from './utils';

type Ul<T> = T[] | undefined;

export function loaderByName(targetLoaderName: string) {
  return (rule: RuleSetRule | RuleSetUseItem) => {
    if (!isString(rule) && 'loader' in rule && isString(rule.loader)) {
      return (
        rule.loader.indexOf(`${path.sep}${targetLoaderName}${path.sep}`) !==
          -1 || rule.loader.indexOf(`@${targetLoaderName}${path.sep}`) !== -1
      );
    } else if (isString(rule)) {
      return (
        rule.indexOf(`${path.sep}${targetLoaderName}${path.sep}`) !== -1 ||
        rule.indexOf(`@${targetLoaderName}${path.sep}`) !== -1
      );
    }

    return false;
  };
}

const toMatchingLoader = (
  loader: RuleSetRule,
  parent: Ul<RuleSetRule>,
  index: number
): Loader => ({ loader, parent, index });

function getLoaderRecursively(rules: Ul<RuleSetRule>, matcher: LoaderMatcher) {
  let loader: Loader | undefined;

  rules?.some((rule, index) => {
    if (rule) {
      if (matcher(rule)) {
        loader = toMatchingLoader(rule, rules, index);
      } else if (!isString(rule)) {
        if (rule.use) {
          if (isString(rule.use) && matcher(rule.use)) {
            loader = toMatchingLoader({ loader: rule.use }, rules, index);
          } else {
            loader = getLoaderRecursively(rule.use as RuleSetRule[], matcher);
          }
        } else if (rule.oneOf) {
          loader = getLoaderRecursively(rule.oneOf, matcher);
        } else if (isArray(rule.loader)) {
          loader = getLoaderRecursively(rule.loader, matcher);
        }
      }
    }

    return loader !== undefined;
  });

  return loader;
}

export function getLoader(
  webpackConfig: WebpackConfig,
  matcher: LoaderMatcher
) {
  const matchingLoader = getLoaderRecursively(
    webpackConfig.module?.rules as RuleSetRule[],
    matcher
  );

  return { isFound: matchingLoader !== undefined, match: matchingLoader };
}

function getLoadersRecursively(
  rules: Ul<RuleSetRule>,
  matcher: LoaderMatcher,
  matchingLoaders: Loader[]
) {
  rules?.forEach((rule, index) => {
    if (rule) {
      if (matcher(rule)) {
        matchingLoaders.push(toMatchingLoader(rule, rules, index));
      } else if (!isString(rule)) {
        if (rule.use) {
          if (isString(rule.use) && matcher(rule.use)) {
            matchingLoaders.push(
              toMatchingLoader({ loader: rule.use }, rules, index)
            );
          } else {
            getLoadersRecursively(
              rule.use as RuleSetRule[],
              matcher,
              matchingLoaders
            );
          }
        } else if (rule.oneOf) {
          getLoadersRecursively(rule.oneOf, matcher, matchingLoaders);
        } else if (isArray(rule.loader)) {
          getLoadersRecursively(rule.loader, matcher, matchingLoaders);
        }
      }
    }
  });
}

export function getLoaders(
  webpackConfig: WebpackConfig,
  matcher: LoaderMatcher
) {
  const matchingLoaders: Loader[] = [];

  getLoadersRecursively(
    webpackConfig.module?.rules as Ul<RuleSetRule>,
    matcher,
    matchingLoaders
  );

  return {
    hasFoundAny: matchingLoaders.length !== 0,
    matches: matchingLoaders,
  };
}

function removeLoadersRecursively(
  rules: Ul<RuleSetRule>,
  matcher: LoaderMatcher
): {
  rules: Ul<RuleSetRule>;
  removedCount: number;
} {
  const toRemove = [];
  let removedCount = 0;

  if (!rules) {
    return { rules, removedCount: 0 };
  }

  for (let i = 0, max = rules.length; i < max; i += 1) {
    const rule = rules[i];

    if (rule) {
      if (matcher(rule)) {
        toRemove.push(i);
      } else if (!isString(rule)) {
        if (rule.use) {
          let result;
          if (isString(rule.use) && matcher(rule.use)) {
            toRemove.push(i);
            removedCount++;
            rule.use = undefined;
          } else {
            result = removeLoadersRecursively(
              rule.use as RuleSetRule[],
              matcher
            );
            removedCount += result.removedCount;
            (rule.use as Ul<RuleSetRule>) = result.rules;
          }
        } else if (rule.oneOf) {
          const result = removeLoadersRecursively(rule.oneOf, matcher);

          removedCount += result.removedCount;
          (rule.oneOf as Ul<RuleSetRule>) = result.rules;
        }
      }
    }
  }

  toRemove.forEach((ruleIndex, i) => {
    rules.splice(ruleIndex - i, 1);
  });

  return { rules, removedCount: removedCount + toRemove.length };
}

export function removeLoaders(
  webpackConfig: WebpackConfig,
  matcher: LoaderMatcher
) {
  const result = removeLoadersRecursively(
    webpackConfig.module?.rules as Ul<RuleSetRule>,
    matcher
  );

  return {
    hasRemovedAny: result.removedCount > 0,
    removedCount: result.removedCount,
  };
}

function addLoader(
  webpackConfig: WebpackConfig,
  matcher: LoaderMatcher,
  newLoader: RuleSetRule,
  positionAdapter: (index: number) => number
) {
  const { isFound, match } = getLoader(webpackConfig, matcher);

  if (isFound) {
    match!.parent?.splice(positionAdapter(match!.index), 0, newLoader);

    return { isAdded: true };
  }

  return { isAdded: false };
}

export const addBeforeLoader = (
  webpackConfig: WebpackConfig,
  matcher: LoaderMatcher,
  newLoader: RuleSetRule
) => addLoader(webpackConfig, matcher, newLoader, (x) => x);

export const addAfterLoader = (
  webpackConfig: WebpackConfig,
  matcher: LoaderMatcher,
  newLoader: RuleSetRule
) => addLoader(webpackConfig, matcher, newLoader, (x) => x + 1);

function addLoaders(
  webpackConfig: WebpackConfig,
  matcher: LoaderMatcher,
  newLoader: RuleSetRule,
  positionAdapter: (index: number) => number
) {
  const { hasFoundAny, matches } = getLoaders(webpackConfig, matcher);

  if (hasFoundAny) {
    matches.forEach((match) => {
      match!.parent?.splice(positionAdapter(match.index), 0, newLoader);
    });

    return { isAdded: true, addedCount: matches.length };
  }

  return { isAdded: false, addedCount: 0 };
}

export const addBeforeLoaders = (
  webpackConfig: WebpackConfig,
  matcher: LoaderMatcher,
  newLoader: RuleSetRule
) => addLoaders(webpackConfig, matcher, newLoader, (x) => x);

export const addAfterLoaders = (
  webpackConfig: WebpackConfig,
  matcher: LoaderMatcher,
  newLoader: RuleSetRule
) => addLoaders(webpackConfig, matcher, newLoader, (x) => x + 1);
