const cracoConfig = require('./craco.config');
const babelConfigMock = require('./babel.config.mock');

describe('CRACO Babel configuration', () => {
  it('correctly applies custom Babel presets', () => {
    const babelConfig = cracoConfig.babel.loaderOptions;

    // Test if the original Babel presets are present
    expect(babelConfig.presets).toContain('@babel/preset-env');
    expect(babelConfig.presets).toContain('@babel/preset-react');

    // Test if the custom Babel preset is added
    expect(babelConfig.presets).toContain('@babel/preset-typescript');
  });

  it('does not remove existing Babel presets', () => {
    const babelConfig = cracoConfig.babel.loaderOptions;

    // Test if the number of presets in the custom configuration is greater than or equal to the original configuration
    expect(babelConfig.presets.length).toBeGreaterThanOrEqual(
      babelConfigMock.presets.length
    );
  });
});
