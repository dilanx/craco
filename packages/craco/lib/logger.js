const args = require("./args");

function log(...rest) {
    if (args.isVerbose) {
        console.log("craco: ", ...rest);
    }
}

function lazyLog(fct) {
    if (args.isVerbose) {
        fct();
    }
}

function error(...rest) {
    console.error("craco:  ***", ...rest, "***");
}

module.exports = {
    log,
    lazyLog,
    error
};
