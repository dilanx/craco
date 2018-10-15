const { log } = require("./logger");

const args = process.argv;

function findArg(key) {
    const index = args.indexOf(key);

    return {
        index,
        isFound: index !== -1
    };
}

function isFlagSet(flag) {
    return findArg(flag).isFound;
}

function getValue(key) {
    const result = (isOverrided = false, value) => ({
        isOverrided,
        value
    });

    const arg = findArg(key);

    if (arg.isFound) {
        const value = findArg(key);

        if (value.isFound) {
            return result(true, args[value.index]);
        } else {
            log(`No value has been provided for cli argument ${key}`);
        }
    }

    return result();
}

const isVerbose = isFlagSet("--verbose");
const reactScripts = getValue("--react-scripts");
const config = getValue("--config");

module.exports = {
    isVerbose,
    reactScripts,
    config
};
