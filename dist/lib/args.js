"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findArgsFromCli = exports.setArgs = exports.getArgs = void 0;
var args = {
    verbose: {
        arg: '--verbose',
        value: false,
    },
    config: {
        arg: '--config',
        value: true,
    },
};
var processedArgs = {};
function getArgs() {
    return processedArgs;
}
exports.getArgs = getArgs;
function setArgs(values) {
    processedArgs = __assign(__assign({}, processedArgs), values);
}
exports.setArgs = setArgs;
function findArgsFromCli() {
    var processed = {};
    var i = 0;
    while (i < process.argv.length) {
        var arg = process.argv[i];
        for (var a in args) {
            if (arg === args[a].arg) {
                processed[a] = args[a].value ? process.argv[i + 1] : true;
                i++;
            }
        }
        i++;
    }
    setArgs(processed);
}
exports.findArgsFromCli = findArgsFromCli;
