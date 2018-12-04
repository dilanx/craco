const path = require("path");

const { paths } = require("@craco/craco");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
    webpack: {
        plugins: [
            new StyleLintPlugin(
                configBasedir: __dirname,
                context: path.resolve(__dirname, paths.appSrc),
                files: ["**/*.css"]
            )
        ]
    }
};
