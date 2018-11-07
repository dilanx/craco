const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
    webpack: {
        plugins: [
            new StyleLintPlugin()
        ]
    }
};
