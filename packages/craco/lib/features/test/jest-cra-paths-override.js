const fs = require("fs");
const { getAppSrcName, getOriginAppSrcName } = require("../../cra");
function overrideJestAppSrcPath(cracoConfig, jestConfig, context) {

    const appSrcName = getAppSrcName(cracoConfig);
    const originAppSrcName = getOriginAppSrcName(cracoConfig);
    
    if (appSrcName !== originAppSrcName) {
        const { roots = [], collectCoverageFrom, setupFilesAfterEnv, testMatch } = jestConfig;

        const setupTestsFileExtension = context.paths.testsSetup.match(/\.([a-z]+$)/)[1] || 'js'

        const setupTestsFile = fs.existsSync(context.paths.testsSetup)
            ? `<rootDir>/${appSrcName}/setupTests.${setupTestsFileExtension}`
            : undefined;

        const srcDirExp = new RegExp(`<rootDir>/${originAppSrcName}`);
        const replaceSrc = `<rootDir>/${appSrcName}`;

        jestConfig.roots = roots.map(item => {
            return item.replace(srcDirExp, replaceSrc)
        });

        jestConfig.collectCoverageFrom = collectCoverageFrom.map(item => {
            return item.replace(originAppSrcName, appSrcName);
        });

        // jestConfig.setupFilesAfterEnv = setupFilesAfterEnv.map(item => {
        //     return item.replace(srcDirExp, replaceSrc);
        // });
        jestConfig.setupFilesAfterEnv = setupTestsFile ? [setupTestsFile] : [];

        jestConfig.testMatch = testMatch.map(item => {
            return item.replace(srcDirExp, replaceSrc);
        });
    }

    return jestConfig;
}

module.exports = {
    overrideJestAppSrcPath
}
