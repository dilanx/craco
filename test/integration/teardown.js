// Clean up the environment after integration tests
const { execSync } = require('child_process');
const { join } = require('path');
const fs = require('fs');

const rootPath = 'test/integration/fixtures';

const cwd = process.cwd();

module.exports = async () => {
  fs.readdir(rootPath, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error(`Error reading directory: ${err.message}`);
      return;
    }

    const directoryNames = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    directoryNames.forEach((directoryName) => {
      //clean up test-project
      execSync(`rm -rf ${join(rootPath, directoryName, 'test-project')}`, {
        cwd: cwd,
      });
    });
  });
};
