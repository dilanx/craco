const {
    getCraPaths,
    overrideCraPathsConfig,
    getAppSrcName,
    getOriginAppSrcName
} = require("../../cra");
const { applyCraPathsConfigPlugins } = require('../plugins');

const { resolveApp, resolveModule, setModuleFileExtensions } = require('./override-utils');

function overrideSrcPath(cracoConfig, craPathsConfig, context) {
    
    const { appIndexJs, testsSetup, proxySetup, appTypeDeclarations } = craPathsConfig;
    const appSrcName = getAppSrcName(cracoConfig);
    const originAppSrcName = getOriginAppSrcName(cracoConfig);

    if (appSrcName !== originAppSrcName) {
        const replaceExp = new RegExp(`/${originAppSrcName}`);
        const target = `/${appSrcName}`;

        craPathsConfig.appIndexJs = resolveModule(resolveApp, appIndexJs.replace(replaceExp, target));
        craPathsConfig.testsSetup = resolveModule(resolveApp, testsSetup.replace(replaceExp, target));
        craPathsConfig.proxySetup = resolveModule(resolveApp, proxySetup.replace(replaceExp, target));
        craPathsConfig.appTypeDeclarations = appTypeDeclarations.replace(replaceExp, target);
    }

    return craPathsConfig;
}

function overrideCraPaths(cracoConfig, context) {
    let { paths = {} } = cracoConfig;
    let craPathsConfig = getCraPaths(cracoConfig);

    let resultingCraPathsConfig = Object.assign(craPathsConfig, paths);
    
    setModuleFileExtensions(craPathsConfig.moduleFileExtensions);

    resultingCraPathsConfig = applyCraPathsConfigPlugins(cracoConfig, resultingCraPathsConfig, context);
    
    resultingCraPathsConfig = overrideSrcPath(cracoConfig, resultingCraPathsConfig, context);
    
    overrideCraPathsConfig(cracoConfig, resultingCraPathsConfig);
}

module.exports = {
    overrideCraPaths
};
