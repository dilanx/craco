const cracoConfig = require('./craco.config');
const eslintConfigMock = require('./eslint.config.mock');

describe('CRACO ESLint configuration', () => {
  it('correctly applies custom ESLint configuration', () => {
    const eslintConfig = cracoConfig.eslint.configure;

    // Test if the original ESLint extends are present
    expect(eslintConfig.extends).toContain('react-app');

    // Test if the custom ESLint extends are added
    expect(eslintConfig.extends).toContain('plugin:prettier/recommended');

    // Test if the custom ESLint rules are applied
    expect(eslintConfig.rules['no-console']).toEqual('error');
    expect(eslintConfig.rules['no-debugger']).toEqual('error');
  });

  it('does not remove existing ESLint rules', () => {
    const eslintConfig = cracoConfig.eslint.configure;

    // Test if the number of rules in the custom configuration is greater than or equal to the original configuration
    expect(Object.keys(eslintConfig.rules).length).toBeGreaterThanOrEqual(Object.keys(eslintConfigMock.rules).length);
  });
});
