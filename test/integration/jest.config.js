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
 // setupFilesAfterEnv: ["./test-setup.js"],
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['firefox'],
      launchOptions: {
        headless: true
      },
    },
  },
  preset: 'jest-playwright-preset',
};
