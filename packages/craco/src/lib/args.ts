export interface CliArgs {
  [key: string]: string | boolean;
}

export interface CliArgSpec {
  [key: string]: { arg: string; value: boolean };
}

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

let processedArgs: CliArgs = {};

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
  const processed: CliArgs = {};
  let i = 0;
  while (i < process.argv.length) {
    const arg = process.argv[i];
    for (const a in args) {
      if (arg === args[a].arg) {
        processed[a] = args[a].value ? process.argv[i + 1] : true;
        i++;
      }
    }
    i++;
  }
  setArgs(processed);
}
