const { verbose } = require("./args");

function log(...rest) {
    if (verbose.isProvided) {
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
