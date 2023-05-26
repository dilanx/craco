'use strict';
const path = require('path');
const fs = require('fs');

test('Should have the expected styles', async () => {
  const expectedStyles = "::-webkit-input-placeholder{color:gray}::placeholder{color:gray}.image{background-image:url(https://google.com)}@media (-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx){.image{background-image:url(http://nxetflix.com)}}";
  
  //we check if the compiled css is what we expect for autoprefixer
  const prom = new Promise((resolve, reject) => {
    fs.readdir('./test/integration/fixtures/autoprefixer-test/test-project/build/static/css', (err, files) => {
      if (err) reject();
      //we don't know what the bundle name will be beforehand
      const cssFile = files.find(file => path.extname(file) === '.css');
      expect(cssFile).not.toBe(0);

      fs.readFile(`./test/integration/fixtures/autoprefixer-test/test-project/build/static/css/${cssFile}`, 'utf8', (err, data) => {
        if (err) reject();
        data = data.substring(0, data.indexOf("/*")-1);
        expect(data).toBe(expectedStyles);
        resolve();
      });
    });
  });
  await prom;
});
