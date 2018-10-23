const path = require("path");

const { paths } = require("@craco/craco");

module.exports = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname, `${paths.appSrc}/components/`)
        }
    },
    jest: {
        configure: {
            moduleNameMapper: {
                "^@components(.*)$": "<rootDir>/src/components$1"
            }
        }
    }
};
