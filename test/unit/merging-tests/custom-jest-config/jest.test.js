const cracoConfig = require('./craco.config');
const jestConfigMock = require('./jest.config.mock');

describe('CRACO Jest configuration', () => {
  it('correctly applies custom Jest configuration', () => {
    const jestConfig = cracoConfig.jest.configure;

    // Test if the original Jest transform configuration is present
    expect(jestConfig.transform['^.+\\.[t|j]sx?$']).toEqual('babel-jest');

    // Test if the custom Jest moduleNameMapper configuration is added
    expect(jestConfig.moduleNameMapper['^@components/(.*)$']).toEqual(
      '<rootDir>/src/components/$1'
    );
  });

  it('does not remove existing Jest configurations', () => {
    const jestConfig = cracoConfig.jest.configure;

    // Test if the number of configurations in the custom configuration is greater than or equal to the original configuration
    expect(Object.keys(jestConfig).length).toBeGreaterThanOrEqual(
      Object.keys(jestConfigMock).length
    );
  });
});
