const path = require("path");
const fs = require("fs");

const projectRoot = path.resolve(fs.realpathSync(process.cwd()));
const nodeModulesPath = path.resolve(projectRoot, "node_modules");

module.exports = {
    projectRoot,
    nodeModulesPath
};
