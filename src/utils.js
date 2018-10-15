const mergeWith = require("lodash.mergewith");

function isFunction(value) {
    return typeof value === "function";
}

function isArray(value) {
    return Array.isArray(value);
}

function isString(value) {
    return typeof value === "string";
}

function deepMergeWithArray(...rest) {
    return mergeWith(...rest, (x, y) => {
        if (isArray(x)) {
            return x.concat(y);
        }
    });
}

module.exports = {
    isFunction,
    isArray,
    isString,
    deepMergeWithArray
};
