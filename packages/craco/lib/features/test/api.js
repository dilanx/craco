const { getCraPaths } = require("../../cra");
const { mergeJestConfig } = require("./merge-jest-config");
const { loadJestConfigProvider } = require("../../cra");
const { processCracoConfig } = require("../../config");

function getJestConfig(userCracoConfig, userContext = {}) {
    if (!userCracoConfig) {
        throw new Error("craco: 'cracoConfig' is required.");
    }

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = "development";
    }

    const context = {
        env: process.env.NODE_ENV,
        ...userContext
    };

    const cracoConfig = processCracoConfig(userCracoConfig, context);
    const craJestConfigProvider = loadJestConfigProvider(cracoConfig);

    if (!craJestConfigProvider) {
        throw new Error("craco: Cannot find Jest config factory.");
    }

    context.paths = getCraPaths(cracoConfig);

    return mergeJestConfig(cracoConfig, craJestConfigProvider, context);
}

module.exports = {
    getJestConfig
};
