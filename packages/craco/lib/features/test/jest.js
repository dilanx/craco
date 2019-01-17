const path = require("path");

const { overrideJestConfigProvider, loadJestConfigProvider } = require("../../cra");
const { isFunction, isArray, deepMergeWithArray } = require("../../utils");
const { log } = require("../../logger");
const { applyJestConfigPlugins } = require("../plugins");
const { reactScriptsPath } = require("../../paths");

const BABEL_TRANSFORM_ENTRY_KEY_BEFORE_2_1_0 = "^.+\\.(js|jsx)$";
const BABEL_TRANSFORM_ENTRY_KEY = "^.+\\.(js|jsx|ts|tsx)$";

function overrideBabelTransform(jestConfig, transformKey) {
    jestConfig.transform[transformKey] = require.resolve(path.resolve(__dirname, "jest-babel-transform.js"));

    log("Overrided Jest Babel transformer.");
}

function configureBabel(jestConfig, cracoConfig) {
    const { addPresets, addPlugins } = cracoConfig.jest.babel;

    if (addPresets || addPlugins) {
        if (cracoConfig.babel) {
            const { presets, plugins } = cracoConfig.babel;

            if (isArray(presets) || isArray(plugins)) {
                if (jestConfig.transform[BABEL_TRANSFORM_ENTRY_KEY]) {
                    overrideBabelTransform(jestConfig, BABEL_TRANSFORM_ENTRY_KEY);
                } else if (jestConfig.transform[BABEL_TRANSFORM_ENTRY_KEY_BEFORE_2_1_0]) {
                    overrideBabelTransform(jestConfig, BABEL_TRANSFORM_ENTRY_KEY_BEFORE_2_1_0);
                } else {
                    throw new Error(
                        `craco: Cannot find Jest transform entry for Babel ${BABEL_TRANSFORM_ENTRY_KEY} or ${BABEL_TRANSFORM_ENTRY_KEY_BEFORE_2_1_0}.`
                    );
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
        jestConfig = deepMergeWithArray({}, jestConfig, configureJest);
    }

    log("Merged Jest config with 'jest.configure'.");

    return jestConfig;
}

function createConfigProviderProxy(cracoConfig, craJestConfigProvider, context) {
    const proxy = (resolve, rootDir) => {
        const customResolve = relativePath => path.resolve(reactScriptsPath, relativePath);

        const jestContext = {
            ...context,
            resolve: customResolve,
            rootDir
        };

        let jestConfig = craJestConfigProvider(customResolve, rootDir, false);

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
