module.exports = {
  eslint: {
    configure: {
      extends: ['react-app', 'plugin:prettier/recommended'],
      rules: {
        'no-console': 'error',
        'no-debugger': 'error',
      },
    },
  },
};

