const path = require("path");
const fs = require("fs");

const { whenDev } = require("@craco/craco");

module.exports = {
    devServer: whenDev(() => ({
        https: true,
        pfx: fs.readFileSync(path.resolve("./localhost.pfx")),
        pfxPassphrase: "temp123!"
    }))
};
