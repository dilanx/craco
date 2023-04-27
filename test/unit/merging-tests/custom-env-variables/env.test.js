const cracoConfig = require('./craco.config');

describe('CRACO environment variables', () => {
  it('correctly sets custom environment variables', () => {
    const originalProcessEnv = { ...process.env };

    // Apply the custom environment variables from the CRACO configuration
    process.env = {
      ...process.env,
      ...cracoConfig.env,
    };

    // Test if the custom environment variable is set
    expect(process.env.MY_CUSTOM_ENV_VAR).toEqual('custom-env-value');

    // Restore the original process.env to avoid side effects
    process.env = originalProcessEnv;
  });

  it('does not remove existing environment variables', () => {
    const originalProcessEnv = { ...process.env };

    // Apply the custom environment variables from the CRACO configuration
    process.env = {
      ...process.env,
      ...cracoConfig.env,
    };

    // Test if the existing environment variables are not removed
    const originalEnvVarCount = Object.keys(originalProcessEnv).length;
    const newEnvVarCount = Object.keys(process.env).length;

    expect(newEnvVarCount).toBeGreaterThanOrEqual(originalEnvVarCount);

    // Restore the original process.env to avoid side effects
    process.env = originalProcessEnv;
  });
});

