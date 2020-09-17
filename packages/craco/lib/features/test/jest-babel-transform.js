const { loadCracoConfig } = require("../../config");
const { createJestBabelTransform } = require("./create-jest-babel-transform");

let jestBabelTransform;

// cracoConfig is only available inside the transform, but the transform needs to include whatever options cracoConfig
// specifies. So, the first time this transform is run, it generates a new transform -- using cracoConfig -- and
// uses that to process files.
module.exports = {
    ...createJestBabelTransform(),
    process(src, filename, config, transformOptions) {
        if (!jestBabelTransform) {
            let cracoConfig = config.globals && config.globals._cracoConfig;
            if (!cracoConfig) {
                const context = {
                    env: process.env.NODE_ENV
                };
                cracoConfig = loadCracoConfig(context);
            }

            jestBabelTransform = createJestBabelTransform(cracoConfig);
        }

        return jestBabelTransform.process(src, filename, config, transformOptions);
    }
};
