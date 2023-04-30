const { join } = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
const rootPath = 'test/integration/fixtures';

const cwd = process.cwd();

// Set up the environment for integration tests
module.exports = async function (globalConfig, projectConfig) {
  fs.readdir(rootPath, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error(`Error reading directory: ${err.message}`);
      return;
    }

    const directoryNames = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    directoryNames.forEach((directoryName) => {
      //copy files in directory/test-package-files to directory/test-project
      const testPackageFilesPath = join(
        rootPath,
        directoryName,
        'test-package-files'
      );
      const testProjectPath = join(rootPath, directoryName, 'test-project');
      execSync(
        `cd ${join(
          rootPath,
          directoryName
        )}&& npx create-react-app test-project`,
        { cwd: cwd }
      );
      execSync(`cp -r ${testPackageFilesPath}/* ${testProjectPath}`, {
        cwd: cwd,
      });
      //install craco
      execSync(`npm install ../../../../../packages/craco`, {
        cwd: testProjectPath,
      });
      //install other necessary files
      execSync(`npm install`, { cwd: testProjectPath });
      //build project
      execSync('npm run build', { cwd: testProjectPath, stdio: 'inherit' });
    });
  });
};
