import type {
  AssetModule,
  AssetModuleMatcher,
  AssetModuleType,
} from '@craco/types';
import type { Configuration as WebpackConfig, RuleSetRule } from 'webpack';

export function assetModuleByName(assetModuleName: AssetModuleType) {
  return (rule: RuleSetRule) => rule.type === assetModuleName;
}

const toMatchingAssetModule = (
  rule: RuleSetRule,
  index: number
): AssetModule => ({
  rule,
  index,
});

export function getAssetModule(
  webpackConfig: WebpackConfig,
  matcher: AssetModuleMatcher
) {
  let matchingAssetModule: AssetModule | undefined;
  (webpackConfig.module?.rules as RuleSetRule[])?.some((rule, index) => {
    if (matcher(rule)) {
      matchingAssetModule = toMatchingAssetModule(rule, index);
    }
    return matchingAssetModule !== undefined;
  });
  return {
    isFound: matchingAssetModule !== undefined,
    match: matchingAssetModule,
  };
}

export function getAssetModules(
  webpackConfig: WebpackConfig,
  matcher: AssetModuleMatcher
) {
  const matchingAssetModules: AssetModule[] = [];
  (webpackConfig.module?.rules as RuleSetRule[])?.forEach((rule, index) => {
    if (matcher(rule)) {
      matchingAssetModules.push(toMatchingAssetModule(rule, index));
    }
  });

  return {
    hasFoundAny: matchingAssetModules.length !== 0,
    matches: matchingAssetModules,
  };
}

export function removeAssetModules(
  webpackConfig: WebpackConfig,
  matcher: AssetModuleMatcher
) {
  const toRemove: number[] = [];
  (webpackConfig.module?.rules as RuleSetRule[])?.forEach((rule, index) => {
    if (matcher(rule)) {
      toRemove.push(index);
    }
  });

  toRemove.forEach((index) => {
    webpackConfig.module?.rules?.splice(index, 1);
  });

  return {
    rules: webpackConfig.module?.rules,
    removedCount: toRemove.length,
  };
}

function addAssetModule(
  webpackConfig: WebpackConfig,
  matcher: AssetModuleMatcher,
  newAssetModule: RuleSetRule,
  positionAdapter: (index: number) => number
) {
  const { match } = getAssetModule(webpackConfig, matcher);

  if (match !== undefined) {
    webpackConfig.module?.rules?.splice(
      positionAdapter(match.index),
      0,
      newAssetModule
    );

    return { isAdded: true };
  }

  return { isAdded: false };
}

export const addBeforeAssetModule = (
  webpackConfig: WebpackConfig,
  matcher: AssetModuleMatcher,
  newAssetModule: RuleSetRule
) => addAssetModule(webpackConfig, matcher, newAssetModule, (x) => x);

export const addAfterAssetModule = (
  webpackConfig: WebpackConfig,
  matcher: AssetModuleMatcher,
  newAssetModule: RuleSetRule
) => addAssetModule(webpackConfig, matcher, newAssetModule, (x) => x + 1);

function addAssetModules(
  webpackConfig: WebpackConfig,
  matcher: AssetModuleMatcher,
  newAssetModule: RuleSetRule,
  positionAdapter: (index: number) => number
) {
  const { matches } = getAssetModules(webpackConfig, matcher);

  if (matches.length !== 0) {
    matches.forEach((match) => {
      webpackConfig.module?.rules?.splice(
        positionAdapter(match.index),
        0,
        newAssetModule
      );
    });

    return { isAdded: true, addedCount: matches.length };
  }

  return { isAdded: false, addedCount: 0 };
}

export const addBeforeAssetModules = (
  webpackConfig: WebpackConfig,
  matcher: AssetModuleMatcher,
  newAssetModule: RuleSetRule
) => addAssetModules(webpackConfig, matcher, newAssetModule, (x) => x);

export const addAfterAssetModules = (
  webpackConfig: WebpackConfig,
  matcher: AssetModuleMatcher,
  newAssetModule: RuleSetRule
) => addAssetModules(webpackConfig, matcher, newAssetModule, (x) => x + 1);
