const path = require("path");

const { isString, isArray } = require("./utils");

function loaderByName(targetLoaderName) {
    return rule => {
        if (isString(rule.loader)) {
            return rule.loader.indexOf(`${path.sep}${targetLoaderName}${path.sep}`) !== -1 || rule.loader.indexOf(`@${targetLoaderName}${path.sep}`) !== -1;
        } else if (isString(rule)) {
            return rule.indexOf(`${path.sep}${targetLoaderName}${path.sep}`) !== -1 || rule.indexOf(`@${targetLoaderName}${path.sep}`) !== -1;
        }

        return false;
    };
}

function toMatchingLoader(loader, parent, index) {
    return {
        loader,
        parent,
        index
    };
}

function getLoaderRecursively(rules, matcher) {
    let loader;

    rules.some((rule, index) => {
        if (rule) {
            if (matcher(rule)) {
                loader = toMatchingLoader(rule, rules, index);
            } else if (rule.use) {
                loader = getLoaderRecursively(rule.use, matcher);
            } else if (rule.oneOf) {
                loader = getLoaderRecursively(rule.oneOf, matcher);
            } else if (isArray(rule.loader)) {
                loader = getLoaderRecursively(rule.loader, matcher);
            }
        }

        return loader !== undefined;
    });

    return loader;
}

function getLoader(webpackConfig, matcher) {
    const matchingLoader = getLoaderRecursively(webpackConfig.module.rules, matcher);

    return {
        isFound: matchingLoader !== undefined,
        match: matchingLoader
    };
}

function getLoadersRecursively(rules, matcher, matchingLoaders) {
    rules.forEach((rule, index) => {
        if (rule) {
            if (matcher(rule)) {
                matchingLoaders.push(toMatchingLoader(rule, rules, index));
            } else if (rule.use) {
                getLoadersRecursively(rule.use, matcher, matchingLoaders);
            } else if (rule.oneOf) {
                getLoadersRecursively(rule.oneOf, matcher, matchingLoaders);
            } else if (isArray(rule.loader)) {
                getLoadersRecursively(rule.loader, matcher, matchingLoaders);
            }
        }
    });
}

function getLoaders(webpackConfig, matcher) {
    const matchingLoaders = [];

    getLoadersRecursively(webpackConfig.module.rules, matcher, matchingLoaders);

    return {
        hasFoundAny: matchingLoaders.length !== 0,
        matches: matchingLoaders
    };
}

function removeLoadersRecursively(rules, matcher) {
    const toRemove = [];
    let removedCount = 0;

    for (let i = 0, max = rules.length; i < max; i += 1) {
        const rule = rules[i];

        if (rule) {
            if (matcher(rule)) {
                toRemove.push(i);
            } else if (rule.use) {
                const result = removeLoadersRecursively(rule.use, matcher);

                removedCount += result.removedCount;
                rule.use = result.rules;
            } else if (rule.oneOf) {
                const result = removeLoadersRecursively(rule.oneOf, matcher);

                removedCount += result.removedCount;
                rule.oneOf = result.rules;
            }
        }
    }

    toRemove.forEach((ruleIndex, i) => {
        rules.splice(ruleIndex - i, 1);
    });

    return {
        rules,
        removedCount: removedCount + toRemove.length
    };
}

function removeLoaders(webpackConfig, matcher) {
    const result = removeLoadersRecursively(webpackConfig.module.rules, matcher);

    return {
        hasRemovedAny: result.removedCount > 0,
        removedCount: result.removedCount
    };
}

function addLoader(webpackConfig, targetMatcher, newLoader, positionAdapter) {
    const result = isAdded => ({
        isAdded
    });

    const { isFound, match } = getLoader(webpackConfig, targetMatcher);

    if (isFound) {
        match.parent.splice(positionAdapter(match.index), 0, newLoader);

        return result(true);
    }

    return result(false);
}

const addBeforeLoader = (webpackConfig, targetMatcher, newLoader) => addLoader(webpackConfig, targetMatcher, newLoader, x => x);
const addAfterLoader = (webpackConfig, targetMatcher, newLoader) => addLoader(webpackConfig, targetMatcher, newLoader, x => x + 1);

function addLoaders(webpackConfig, targetMatcher, newLoader, positionAdapter) {
    const result = (isAdded, addedCount = 0) => ({
        isAdded,
        addedCount
    });

    const { hasFoundAny, matches } = getLoaders(webpackConfig, targetMatcher);

    if (hasFoundAny) {
        matches.forEach(match => {
            match.parent.splice(positionAdapter(match.index), 0, newLoader);
        });

        return result(true, matches.length);
    }

    return result(false);
}

const addBeforeLoaders = (webpackConfig, targetMatcher, newLoader) => addLoaders(webpackConfig, targetMatcher, newLoader, x => x);
const addAfterLoaders = (webpackConfig, targetMatcher, newLoader) => addLoaders(webpackConfig, targetMatcher, newLoader, x => x + 1);

module.exports = {
    getLoader,
    getLoaders,
    removeLoaders,
    addBeforeLoader,
    addAfterLoader,
    addBeforeLoaders,
    addAfterLoaders,
    loaderByName
};
