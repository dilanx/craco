const path = require("path");
const fs = require("fs");

module.exports = {
    devServer: whenDev(() => ({
        https: true,
        pfx: fs.readFileSync(path.resolve("./localhost.pfx")),
        pfxPassphrase: "temp123!"
    }))
};
