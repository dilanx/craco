const { log } = require("./logger");

const args = process.argv;

const VERBOSE_ARG = "--verbose";
const REACT_SCRIPTS_ARG = "--react-scripts";
const CONFIG_ARG = "--config";

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
    const result = (isOverrided = false, value, argIndex, valueIndex) => ({
        isOverrided,
        value,
        argIndex,
        valueIndex
    });

    const arg = findArg(key);

    if (arg.isFound) {
        const valueIndex = arg.index + 1;

        if (args[valueIndex]) {
            return result(true, args[valueIndex], arg.index, valueIndex);
        } else {
            log(`No value has been provided for CLI argument ${key}`);
        }
    }

    return result();
}

function removeConflictingCustomArgs() {
    if (reactScripts.isOverrided) {
        process.argv.splice(reactScripts.argIndex, 2);
    }

    if (config.isOverrided) {
        process.argv.splice(config.argIndex, 2);
    }
}

const isVerbose = isFlagSet(VERBOSE_ARG);
const reactScripts = getValue(REACT_SCRIPTS_ARG);
const config = getValue(CONFIG_ARG);

module.exports = {
    isVerbose,
    reactScripts,
    config,
    removeConflictingCustomArgs
};
