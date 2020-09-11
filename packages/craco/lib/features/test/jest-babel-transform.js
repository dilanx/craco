const { loadCracoConfig } = require("../../config");
const { createJestBabelTransform } = require("./create-jest-babel-transform");

const cracoConfig = loadCracoConfig(context);

module.exports = createJestBabelTransform(cracoConfig);
