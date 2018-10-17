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

// Should remove ALL the matching loaders...
function removeLoaderRecursively(rules, matcher) {
    for (let i = 0, max = rules.length; i < max; i += 1) {
        const rule = rules[i];

        if (rule) {
            if (matcher(rule)) {
                rules.splice(i, 1);
                break;
            } else if (rule.use) {
                rule.use = removeLoaderRecursively(rule.use, matcher);
            } else if (rule.oneOf) {
                rule.oneOf = removeLoaderRecursively(rule.oneOf, matcher);
            }
        }
    }

    return rules;
}

function removeLoader(webpackConfig, matcher) {
    webpackConfig.module.rules = removeLoaderRecursively(webpackConfig.module.rules, matcher);
}

module.exports = {
    getLoader,
    getLoaders,
    removeLoader,
    loaderByName
};
