'use strict';
const { join } = require('path');
const { readdirSync, readFileSync } = require('fs');
const { execSync, spawn } = require('child_process');

const PORT = 3009;
const URL = `http://localhost:${PORT}/`;

beforeAll(async () => {
  process.env.NODE_ENV = 'production';
  // Create a test project using Create React App and CRACO
  execSync('npx create-react-app test-project',  {
    cwd: __dirname,
  });
  execSync('cd test-project && npm install', { cwd: __dirname });
  // Copy the necessary files to the test project directory
  const cracoConfigPath = join(__dirname, 'craco.config.js');
  const indexPath = join(__dirname, 'index.js');
  const htmlPath = join(__dirname, 'index.html');
  const packageJsonPath = join(__dirname, 'package.json');
  const cracoConfigDestPath = join(__dirname, 'test-project', 'craco.config.js');
  const indexDestPath = join(__dirname, 'test-project', 'src', 'index.js');
  const htmlDestPath = join(__dirname, 'test-project', 'public', 'index.html');
  const packageJsonDestPath = join(__dirname, 'test-project', 'package.json');
  execSync(`cp ${cracoConfigPath} ${cracoConfigDestPath}`, { cwd: __dirname });
  execSync(`cp ${indexPath} ${indexDestPath}`, { cwd: __dirname });
  execSync(`cp ${htmlPath} ${htmlDestPath}`, { cwd: __dirname });
  execSync(`cp ${packageJsonPath} ${packageJsonDestPath}`, { cwd: __dirname });

  await new Promise(resolve => {setTimeout(resolve, 1000)});

  execSync('npm install ../../../../../packages/craco', { cwd: join(__dirname, 'test-project') });

  // Build the test project
  execSync('npm run build', { cwd: join(__dirname, 'test-project'), stdio: 'inherit' });

  // Start a local server to serve the test project
  const server = spawn('npx', ['serve', '-s', 'build', '-l', PORT], {
    cwd: join(__dirname, 'test-project'),
  });

  // Log any server errors to the console
  server.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Leave time for the server to initialize
  await new Promise(resolve => {setTimeout(resolve, 3000)}); 

  // Go to the locally hosted site
  await page.goto(URL);
}, 60000);

afterAll(() => {
  // Stop the local server
  execSync(`kill $(lsof -t -i:${PORT})`, { cwd: __dirname, stdio: 'ignore' });

  // Delete the test project
  execSync('rm -rf test-project', { cwd: __dirname });
});

test("Should have the expected styles", async () => {
  await page.goto(URL, {'waitUntil':'domcontentloaded'});

  const cracoTestText = await page.$eval('#craco-test', (element) => element.textContent);
    expect(cracoTestText).toBe("CRACO is working!");

});
