const args = require("./args");

function log(...rest) {
    if (args.isVerbose) {
        console.log("craco: ", ...rest);
    }
}

function logError(...rest) {
    console.error("craco:  ***", ...rest, "***");
}

module.exports = {
    log,
    logError
};
