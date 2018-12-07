const babelJest = require("babel-jest");

const { loadCracoConfig } = require("../../config");
const { craPaths } = require("../../cra");
const { isArray } = require("../../utils");

const craBabelTransformer = {
    presets: ["babel-preset-react-app"],
    babelrc: false,
    configFile: false
};

const context = {
    env: process.env.NODE_ENV,
    paths: craPaths
};

const cracoConfig = loadCracoConfig(context);
const { addPresets, addPlugins } = cracoConfig.jest.babel;

if (cracoConfig.babel) {
    if (addPresets) {
        const { presets } = cracoConfig.babel;

        if (isArray(presets)) {
            craBabelTransformer.presets = presets.concat(craBabelTransformer.presets);
        }
    }

    if (addPlugins) {
        const { plugins } = cracoConfig.babel;

        if (isArray(plugins)) {
            craBabelTransformer.plugins = plugins;
        }
    }
}

module.exports = babelJest.createTransformer(craBabelTransformer);
