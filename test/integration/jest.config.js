'use strict';

module.exports = {
  // testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.js'],
  testPathIgnorePatterns: ['/src/', 'node_modules'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['firefox'],
      launchOptions: {
        headless: true,
        timeout: 500000,
      },
    },
  },
  globals: {
    PORT: 3009,
    URL: 'http://localhost:3009',
  },
  preset: 'jest-playwright-preset',
};
