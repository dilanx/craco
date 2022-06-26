import { mergeWith } from 'lodash';

export function isFunction(value: any): value is Function {
    return typeof value === 'function';
}

export function isArray(value: any): value is Array<any> {
    return Array.isArray(value);
}

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
}

export function deepMergeWithArray(dest: any, ...src: any) {
    return mergeWith(dest, ...src, (x: any, y: any) => {
        if (isArray(x)) {
            return x.concat(y);
        }
    });
}
