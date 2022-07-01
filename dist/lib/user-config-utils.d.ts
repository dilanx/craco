export declare function when<T>(condition: boolean, fn: () => T, unmetValue: T): T;
export declare function whenDev<T>(fn: () => T, unmetValue: T): T;
export declare function whenProd<T>(fn: () => T, unmetValue: T): T;
export declare function whenTest<T>(fn: () => T, unmetValue: T): T;
