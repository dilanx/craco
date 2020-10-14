const fs = require("fs");
const { getAppSrcName } = require("../../cra");
function overrideJestAppSrcPath(cracoConfig, jestConfig, context) {
    const { paths, oldPaths } = context;
    const appSrcName = getAppSrcName(paths.appSrc);
    const oldAppSrcName = getAppSrcName(oldPaths.appSrc);
    if (appSrcName !== oldAppSrcName) {
        const { roots = [], collectCoverageFrom, testMatch } = jestConfig;

        const setupTestsFile = fs.existsSync(paths.testsSetup)
            ? `<rootDir>${paths.testsSetup.replace(paths.appPath, '')}`
            : undefined;

        const srcDirExp = new RegExp(`<rootDir>${oldPaths.appSrc.replace(paths.appPath, '')}`);
        const replaceSrc = `<rootDir>${paths.appSrc.replace(paths.appPath, '')}`;

        jestConfig.roots = roots.map(item => {
            return item.replace(srcDirExp, replaceSrc)
        });

        jestConfig.collectCoverageFrom = collectCoverageFrom.map(item => {
            return item.replace(oldAppSrcName, appSrcName);
        });

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
