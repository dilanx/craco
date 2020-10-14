const fs = require("fs");
const path = require('path');
const { getAppSrcName } = require("../../cra");
function overrideJestAppSrcPath(cracoConfig, jestConfig, context) {
    const { paths, oldPaths } = context;
    const appSrcName = getAppSrcName(paths.appSrc);
    const oldAppSrcName = getAppSrcName(oldPaths.appSrc);
    if (appSrcName !== oldAppSrcName) {
        const { roots = [], collectCoverageFrom, testMatch } = jestConfig;
        const pathArr = paths.testsSetup.split(path.sep)
        const setupTestsFile = fs.existsSync(paths.testsSetup)
            ? `<rootDir>/${appSrcName}/${pathArr[pathArr.length-1]}`
            : undefined;

        const srcDirExp = new RegExp(`<rootDir>/${oldAppSrcName}`);
        const replaceSrc = `<rootDir>/${appSrcName}`;

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
