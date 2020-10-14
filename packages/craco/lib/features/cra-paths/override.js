const {
    getCraPaths,
    overrideCraPathsConfig,
} = require("../../cra");
const { applyCraPathsConfigPlugins } = require('../plugins');

function overrideSrcPath(cracoConfig, craPathsConfig, context) {
    const { paths } = context;
    const { appIndexJs, testsSetup, proxySetup, appTypeDeclarations, appSrc } = craPathsConfig;
    if (appSrc && paths.appSrc !== appSrc) {
        const replaceExp = new RegExp(paths.appSrc);

        craPathsConfig.appIndexJs = appIndexJs.replace(replaceExp, appSrc);
        craPathsConfig.testsSetup = testsSetup.replace(replaceExp, appSrc);
        craPathsConfig.proxySetup = proxySetup.replace(replaceExp, appSrc);
        craPathsConfig.appTypeDeclarations = appTypeDeclarations.replace(replaceExp, appSrc);
    }
    context.oldPaths = Object.assign({}, paths);
    context.paths = Object.assign({}, paths, craPathsConfig);
    return craPathsConfig;
}

function overrideCraPaths(cracoConfig, context) {
    let { paths = {} } = cracoConfig;
    let craPathsConfig = getCraPaths(cracoConfig);

    let resultingCraPathsConfig = Object.assign({}, craPathsConfig, paths);

    resultingCraPathsConfig = applyCraPathsConfigPlugins(cracoConfig, resultingCraPathsConfig, context);

    resultingCraPathsConfig = overrideSrcPath(cracoConfig, resultingCraPathsConfig, context);

    overrideCraPathsConfig(cracoConfig, resultingCraPathsConfig);
}

module.exports = {
    overrideCraPaths
};
