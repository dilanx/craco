const fs = require('fs');
const path = require('path');
const { projectRoot } = require("@craco/craco/lib/paths");

let _moduleFileExtensions = [];
const resolveApp = relativePath => path.resolve(projectRoot, relativePath);
// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    // Deleting file extension
    filePath = filePath.replace(/\.[a-z]+$/, '');
    
    const extension = _moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};
function setModuleFileExtensions(extensions) {
    _moduleFileExtensions = extensions;
}
module.exports = {
    resolveApp,
    resolveModule,
    setModuleFileExtensions
}