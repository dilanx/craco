export interface CliArgs {
    [key: string]: string | boolean;
}
export interface CliArgSpec {
    [key: string]: {
        arg: string;
        value: boolean;
    };
}
