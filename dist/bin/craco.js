#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var args = process.argv.slice(2);
var scriptIndex = args.findIndex(function (x) { return x === 'build' || x === 'start' || x === 'test'; });
var script = scriptIndex === -1 ? args[0] : args[scriptIndex];
switch (script) {
    case 'build':
    case 'start':
    case 'test': {
        var nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];
        var scriptPath = require.resolve("../scripts/".concat(script));
        var scriptArgs = args.slice(scriptIndex + 1);
        var processArgs = nodeArgs.concat(scriptPath).concat(scriptArgs);
        var child = cross_spawn_1.default.sync('node', processArgs, { stdio: 'inherit' });
        if (child.signal) {
            if (child.signal === 'SIGKILL') {
                console.log("\n                    The build failed because the process exited too early.\n                    This probably means the system ran out of memory or someone called\n                    `kill -9` on the process.\n                ");
            }
            else if (child.signal === 'SIGTERM') {
                console.log("\n                    The build failed because the process exited too early.\n                    Someone might have called  `kill` or `killall`, or the system could\n                    be shutting down.\n                ");
            }
            process.exit(1);
        }
        process.exit((_a = child.status) !== null && _a !== void 0 ? _a : undefined);
        break;
    }
    default:
        console.log("Unknown script \"".concat(script, "\"."));
        console.log('Perhaps you need to update craco?');
        break;
}
