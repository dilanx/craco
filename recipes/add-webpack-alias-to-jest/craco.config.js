// You can also use craco-alias plugin: https://github.com/risenforces/craco-alias

const path = require("path")

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@components(.*)$": "<rootDir>/src/components$1",
      },
    },
  },
}
