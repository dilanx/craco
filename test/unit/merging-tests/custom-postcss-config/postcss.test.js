const cracoConfig = require('./craco.config');
const postcssConfigMock = require('./postcss.config.mock');


//Checks if a custom PostCSS configuration is correctly applied
describe('CRACO PostCSS configuration', () => {
  it('correctly applies custom PostCSS plugins', () => {
    const postcssConfig = cracoConfig.style.postcss;

    // Test if the original PostCSS plugins are present
    expect(postcssConfig.plugins).toContainEqual(require('autoprefixer'));

    // Test if the custom PostCSS plugin is added
    expect(postcssConfig.plugins).toContainEqual(require('postcss-nested'));
  });

  it('does not remove existing PostCSS plugins', () => {
    const postcssConfig = cracoConfig.style.postcss;

    // Test if the number of plugins in the custom configuration is greater than or equal to the original configuration
    expect(postcssConfig.plugins.length).toBeGreaterThanOrEqual(postcssConfigMock.plugins.length);
  });
});
