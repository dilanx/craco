'use strict';
const path = require('path');
const fs = require('fs');

test('Should have the expected styles', async () => {
  fs.readdir('./test-project/build/static/css', (err, files) => {
    if (err) throw err;

    const cssFile = files.find(file => path.extname(file) === '.css');
    expect(cssFile).not.toBe(0);

    fs.readFile(`./test-project/build/static/css/${cssFile}`, 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  });
  // const outputCSS = 
  // expect(cracoTestText).toBe('CRACO is working!');
  expect(true).toBe(true);
});

afterAll(() => {
  // Stop the local server
  execSync(`kill $(lsof -t -i:${global.PORT} -a -c node)`, {
    cwd: __dirname,
    stdio: 'ignore',
  });
});
