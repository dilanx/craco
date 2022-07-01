"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whenTest = exports.whenProd = exports.whenDev = exports.when = void 0;
function when(condition, fn, unmetValue) {
    if (condition) {
        return fn();
    }
    return unmetValue;
}
exports.when = when;
function whenDev(fn, unmetValue) {
    return when(process.env.NODE_ENV === 'development', fn, unmetValue);
}
exports.whenDev = whenDev;
function whenProd(fn, unmetValue) {
    return when(process.env.NODE_ENV === 'production', fn, unmetValue);
}
exports.whenProd = whenProd;
function whenTest(fn, unmetValue) {
    return when(process.env.NODE_ENV === 'test', fn, unmetValue);
}
exports.whenTest = whenTest;
