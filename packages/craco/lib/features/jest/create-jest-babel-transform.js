const babelJest = require("babel-jest");

const { isArray } = require("../../utils");

function createJestBabelTransform(cracoConfig) {
    const craBabelTransformer = {
        presets: ["babel-preset-react-app"],
        babelrc: false,
        configFile: false
    };

    if (cracoConfig) {
        const { addPresets, addPlugins } = cracoConfig.jest.babel;

        if (cracoConfig.babel) {
            if (addPresets) {
                const { presets } = cracoConfig.babel;

                if (isArray(presets)) {
                    craBabelTransformer.presets = craBabelTransformer.presets.concat(presets);
                }
            }

            if (addPlugins) {
                const { plugins } = cracoConfig.babel;

                if (isArray(plugins)) {
                    craBabelTransformer.plugins = plugins;
                }
            }
        }
    }
    return babelJest.createTransformer(craBabelTransformer);
}

module.exports = {
    createJestBabelTransform
};
