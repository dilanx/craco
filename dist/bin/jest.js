#!/usr/bin/env node
"use strict";
/*
 * Copied (and converted to TS) from https://github.com/timarney/react-app-rewired/blob/master/packages/react-app-rewired/bin/jest.js

 * This file is necessary to allow usage of craco as a drop-in replacement
 * for react-scripts with WebStorms's test runner UI.
 *
 * For more information, see https://github.com/sharegate/craco/pull/41
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var args = process.argv.slice(2);
var setupScriptFileIndex = args.findIndex(function (x) { return x === '--setupTestFrameworkScriptFile'; }) + 1;
var isIntelliJ = setupScriptFileIndex !== -1
    ? false
    : args[setupScriptFileIndex].indexOf('jest-intellij') !== -1;
var result = cross_spawn_1.default.sync(process.argv[0], [].concat(require.resolve('../scripts/test'), args), {
    stdio: 'inherit',
    env: Object.assign({}, process.env, isIntelliJ ? { CI: 1 } : null),
});
process.exit(result.signal ? 1 : (_a = result.status) !== null && _a !== void 0 ? _a : undefined);
