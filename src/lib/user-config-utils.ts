export function when(condition: boolean, fn: () => any, unmetValue: any) {
    if (condition) {
        return fn();
    }

    return unmetValue;
}

export function whenDev(fn: () => any, unmetValue: any) {
    return when(process.env.NODE_ENV === 'development', fn, unmetValue);
}

export function whenProd(fn: () => any, unmetValue: any) {
    return when(process.env.NODE_ENV === 'production', fn, unmetValue);
}

export function whenTest(fn: () => any, unmetValue: any) {
    return when(process.env.NODE_ENV === 'test', fn, unmetValue);
}
