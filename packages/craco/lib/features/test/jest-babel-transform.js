const babelJest = require("babel-jest");

const { loadCracoConfig } = require("../../config");
const { craPaths } = require("../../cra");
const { isArray } = require("../../utils");
const { getJestBabelConfig } = require("./jest-config-utils");

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

const { addPresets, addPlugins } = getJestBabelConfig(cracoConfig.jest);
const { presets, plugins } = cracoConfig.babel;

if (addPresets && isArray(presets)) {
    craBabelTransformer.presets = presets.concat(craBabelTransformer.presets);
}

if (addPlugins && isArray(plugins)) {
    craBabelTransformer.plugins = plugins;
}

module.exports = babelJest.createTransformer(craBabelTransformer);
