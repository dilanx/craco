'use strict';
const cracoConfig = require('./craco.config');
const craConfigMock = require('./cra.mock.config');

//Create a simple mock of the CRA configuration and a custom CRACO configuration
//Then ensure that the final configuration produced by CRACO correctly merges both configurations
describe('CRACO configuration merging', () => {
  it('correctly merges CRA and CRACO configurations', () => {
    const webpackConfig = cracoConfig.webpack.configure(craConfigMock, {});

    // Test if the original CRA rules are present
    const jsRule = webpackConfig.module.rules.find(
      (rule) => rule.test.toString() === /\.(js|jsx)$/.toString()
    );
    expect(jsRule).toBeDefined();
    expect(jsRule.exclude).toEqual(/node_modules/);
    expect(jsRule.use).toEqual('babel-loader');

    // Test if the custom SVG loader is added
    const svgRule = webpackConfig.module.rules.find(
      (rule) => rule.test.toString() === /\.svg$/.toString()
    );
    expect(svgRule).toBeDefined();
    expect(svgRule.use).toEqual(['@svgr/webpack']);

    // Test if the alias is added
    expect(webpackConfig.resolve.alias['@components']).toEqual(
      './src/components'
    );

    // Test if the output path is updated
    expect(webpackConfig.output.path).toEqual('/dist/custom');
  });

  it('correctly adds the additional Babel plugin', () => {
    const babelConfig = cracoConfig.babel;

    // Test if the Babel plugin is added
    expect(babelConfig.plugins).toContain(
      'babel-plugin-transform-class-properties'
    );
  });
});
