const args = process.argv;

const VERBOSE_ARG = "--verbose";
const CONFIG_ARG = "--config";

function findArg(key) {
    const index = args.indexOf(key);

    return {
        key,
        index,
        isProvided: index !== -1
    };
}

function getArgWithValue(key) {
    const result = (isProvided = false, value, index) => ({
        key,
        isProvided,
        value,
        index
    });

    const arg = findArg(key);

    if (arg.isProvided) {
        const valueIndex = arg.index + 1;

        if (args[valueIndex]) {
            return result(true, args[valueIndex], arg.index);
        }
    }

    return result();
}

const jestConflictingArg = (key, hasValue = false) => ({
    key,
    hasValue
});

// prettier-ignore
const jestConflictingArgs = [
    jestConflictingArg(CONFIG_ARG, true),
];

function removeJestConflictingCustomArgs() {
    jestConflictingArgs.forEach(x => {
        const arg = findArg(x.key);

        if (arg.isProvided) {
            process.argv.splice(arg.index, x.hasValue ? 2 : 1);
        }
    });
}

const verbose = findArg(VERBOSE_ARG);
const config = getArgWithValue(CONFIG_ARG);

module.exports = {
    verbose,
    config,
    removeJestConflictingCustomArgs
};
