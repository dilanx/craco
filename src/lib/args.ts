import type { CliArgs, CliArgSpec } from '../types/args';

const args: CliArgSpec = {
    verbose: {
        arg: '--verbose',
        value: false,
    },
    config: {
        arg: '--config',
        value: true,
    },
};

var processedArgs: CliArgs = {};

export function getArgs() {
    return processedArgs;
}

export function setArgs(values?: CliArgs) {
    processedArgs = {
        ...processedArgs,
        ...values,
    };
}

export function findArgsFromCli() {
    let processed: CliArgs = {};
    let i = 0;
    while (i < process.argv.length) {
        const arg = process.argv[i];
        for (let a in args) {
            if (arg === args[a].arg) {
                processed[a] = args[a].value ? process.argv[i + 1] : true;
                i++;
            }
        }
        i++;
    }
    setArgs(processed);
}
