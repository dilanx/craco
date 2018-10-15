module.exports = {
    extends: "eslint:recommended",
    env: {
        "commonjs": true,
        "node": true,
        "es6": true
    },
    parserOptions: {
        "ecmaVersion": 2018
    },
    rules: {
        "no-console": "off",
        "curly": "warn"
    }
};
