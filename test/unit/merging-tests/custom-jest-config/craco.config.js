module.exports = {
  jest: {
    configure: {
      transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
      },
      moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
      },
    },
  },
};
