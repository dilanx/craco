const path = require("path");
const args = require("../../args");

const { overrideJestConfigProvider, loadJestConfigProvider } = require("../../cra");
const { isFunction, isArray, deepMergeWithArray } = require("../../utils");
const { log, logError } = require("../../logger");
const { getJestBabelConfig } = require("./jest-config-utils");
const { applyJestConfigPlugins } = require("../plugins");
const { nodeModulesPath } = require("../../paths");

const BABEL_TRANSFORM_ENTRY_KEY = "^.+\\.(js|jsx)$";

function configureBabel(jestConfig, cracoConfig) {
    const { addPresets, addPlugins } = getJestBabelConfig(cracoConfig.jest);

    if (addPresets || addPlugins) {
        if (cracoConfig.babel) {
            const { presets, plugins } = cracoConfig.babel;

            if (isArray(presets) || isArray(plugins)) {
                if (jestConfig.transform[BABEL_TRANSFORM_ENTRY_KEY]) {
                    jestConfig.transform[BABEL_TRANSFORM_ENTRY_KEY] = require.resolve(path.resolve(__dirname, "jest-babel-transform.js"));

                    log("Overrided Jest Babel transformer.");
                } else {
                    logError(`Cannot find Jest transform entry for Babel ${BABEL_TRANSFORM_ENTRY_KEY}).`);
                }
            }
        }
    }
}

function giveTotalControl(jestConfig, configureJest, context) {
    if (isFunction(configureJest)) {
        jestConfig = configureJest(jestConfig, context);

        if (!jestConfig) {
            throw new Error("craco: 'jest.configure' function didn't returned a Jest config object.");
        }
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        jestConfig = deepMergeWithArray(jestConfig, configureJest);
    }

    log("Merged Jest config with 'jest.configure'.");

    return jestConfig;
}

function createConfigProviderProxy(cracoConfig, craJestConfigProvider, context) {
    const proxy = (resolve, rootDir) => {
        const jestContext = {
            ...context,
            resolve,
            rootDir
        };

        if (args.reactScripts.isOverrided) {
            jestContext.resolve = relativePath => path.resolve(nodeModulesPath, args.reactScripts.value, relativePath);
        }

        let jestConfig = craJestConfigProvider(resolve, rootDir, false);

        configureBabel(jestConfig, cracoConfig);

        if (cracoConfig.jest.configure) {
            jestConfig = giveTotalControl(jestConfig, cracoConfig.jest.configure, jestContext);
        }

        jestConfig = applyJestConfigPlugins(cracoConfig, jestConfig, jestContext);

        log("Overrided Jest config.");

        return jestConfig;
    };

    return proxy;
}

function overrideJest(cracoConfig, context) {
    if (cracoConfig.jest) {
        const craJestConfigProvider = loadJestConfigProvider();
        const proxy = createConfigProviderProxy(cracoConfig, craJestConfigProvider, context);

        overrideJestConfigProvider(proxy);
    }
}

module.exports = {
    overrideJest
};
