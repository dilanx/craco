import { getArgs } from './args';

export function log(...rest: any[]) {
    if (getArgs().verbose) {
        console.log(...rest);
    }
}

export function logError(...rest: any[]) {
    console.error(...rest);
}
