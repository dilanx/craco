const { join } = require('path');
const { execSync } = require('child_process');

// Set up the environment for integration tests
beforeAll(() => {
  // Delete previous existing test-project
  execSync('rm -rf test-project', { cwd: __dirname});
  // Install the CRACO package
  execSync('npm install ../../packages/craco', { cwd: __dirname });

  // Create a test project using Create React App and CRACO
  execSync('npx create-react-app test-project --template=typescript', { cwd: __dirname });
  execSync('cd test-project && npm install', { cwd: __dirname });

  // Set up CRACO in the test project
  const cracoConfigPath = join(__dirname, 'test-project', 'craco.config.js');
  const packageJsonPath = join(__dirname, 'test-project', 'package.json');
  const cracoConfig = `module.exports = {
    webpack: {},
    jest: {},
    plugins: []
  }`;
  const packageJson = `{
    "name": "test-project",
    "version": "0.1.0",
    "private": true,
    "dependencies": {},
    "scripts": {
      "start": "craco start",
      "build": "craco build",
      "test": "craco test",
      "eject": "react-scripts eject"
    }
  }`;
  require('fs').writeFileSync(cracoConfigPath, cracoConfig);
  require('fs').writeFileSync(packageJsonPath, packageJson);
});

// Clean up the environment after integration tests
afterAll(() => {
  // Delete the test project
  execSync('rm -rf test-project', { cwd: __dirname });

  // Uninstall the CRACO package
  execSync('npm uninstall craco', { cwd: __dirname });
});

