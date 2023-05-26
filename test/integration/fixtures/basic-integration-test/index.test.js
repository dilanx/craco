'use strict';
const { join } = require('path');
const { execSync, spawn } = require('child_process');

beforeAll(async () => {
  // Start a local server to serve the test project
  // We cached serve by installing it locally
  const server = spawn('npx', ['serve@14.2.0', '-s', 'build', '-l', global.PORT], {
    cwd: join(__dirname, 'test-project'),
  });

  // Log any server errors to the console
  server.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Leave time for the server to initialize
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
});

test('Should have the expected custom craco variable name', async () => {
  await page.goto(global.URL, { waitUntil: 'domcontentloaded' }); //todo: make the url changeble

  const cracoTestText = await page.$eval(
    '#craco-test',
    (element) => element.textContent
  );
  expect(cracoTestText).toBe('CRACO is working!');
});

afterAll(() => {
  // Stop the local server
  execSync(`kill $(lsof -t -i:${global.PORT} -a -c node)`, {
    cwd: __dirname,
    stdio: 'ignore',
  });
});
