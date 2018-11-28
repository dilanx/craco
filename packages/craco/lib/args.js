const args = process.argv;

const VERBOSE_ARG = "--verbose";
const WORKSPACE_ARG = "--workspace";
const SCRIPTS_VERSION_ARG = "--scripts-version";
const REACT_SCRIPTS_ARG = "--react-scripts";
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
    jestConflictingArg(WORKSPACE_ARG),
    jestConflictingArg(SCRIPTS_VERSION_ARG, true),
    jestConflictingArg(REACT_SCRIPTS_ARG, true),
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

function patchIntelliJEnvironmentVariables() {
    const isIntelliJ = process.argv.find((argv) => argv.indexOf('jest-intellij-reporter.js') !== -1) !== undefined;

    if (isIntelliJ) {
        process.env.CI = 1;
    }
}

const verbose = findArg(VERBOSE_ARG);
const workspace = findArg(WORKSPACE_ARG);
const scriptsVersion = getArgWithValue(SCRIPTS_VERSION_ARG);
const reactScripts = getArgWithValue(REACT_SCRIPTS_ARG);
const config = getArgWithValue(CONFIG_ARG);

module.exports = {
    verbose,
    workspace,
    scriptsVersion,
    reactScripts,
    config,
    removeJestConflictingCustomArgs,
    patchIntelliJEnvironmentVariables
};
