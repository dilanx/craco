const path = require("path");
const { log } = require("./logger");

const args = process.argv;

const VERBOSE_ARG = "--verbose";
const WORKSPACE_ARG = "--workspace";
const REACT_SCRIPTS_ARG = "--react-scripts";
const CONFIG_ARG = "--config";

function findArg(key) {
    const index = args.indexOf(key);

    return {
        index,
        isProvided: index !== -1
    };
}

function getArgWithValue(key) {
    const result = (isProvided = false, value, argIndex, valueIndex) => ({
        isProvided,
        value,
        argIndex,
        valueIndex
    });

    const arg = findArg(key);

    if (arg.isProvided) {
        const valueIndex = arg.index + 1;

        if (args[valueIndex]) {
            return result(true, args[valueIndex], arg.index, valueIndex);
        } else {
            log(`No value has been provided for CLI argument ${key}`);
        }
    }

    return result();
}

function toFlag({ isProvided }) {
    return isProvided;
}

function toValue({ isProvided, value }) {
    return {
        isProvided,
        value
    };
}

function removeConflictingCustomArgs() {
    if (workspaceArg.isProvided) {
        process.argv.splice(workspaceArg.index, 1);
    }

    if (reactScriptsArg.isProvided) {
        process.argv.splice(reactScriptsArg.argIndex, 2);
    }

    if (configArg.isProvided) {
        process.argv.splice(configArg.argIndex, 2);
    }
}

const verboseArg = findArg(VERBOSE_ARG);
const workspaceArg = findArg(WORKSPACE_ARG);
const reactScriptsArg = getArgWithValue(REACT_SCRIPTS_ARG);
const configArg = getArgWithValue(CONFIG_ARG);

const isVerbose = toFlag(verboseArg);
const isWorkspace = toFlag(workspaceArg);
const reactScripts = toValue(reactScriptsArg);
const config = toValue(configArg);

if (isWorkspace) {
    if (reactScripts.isProvided) {
        log("--workspace flag is ignored since --react-scripts value is provided");
    } else {
        reactScripts.isProvided = true;
        // Set reactScript to a relative path that match the react-scripts folder at the root of the monorepo if the popular convention is followed.
        // Popular convention means having the following folder structure:
        // root
        // ├── node_modules
        // ├── packages
        // ├──────repo-1
        // ├──────repo-2
        // └── package.json
        reactScripts.value = "../../../node_modules/react-scripts";
    }
}

module.exports = {
    isVerbose,
    isWorkspace,
    reactScripts,
    config,
    removeConflictingCustomArgs
};
