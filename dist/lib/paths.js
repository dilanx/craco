"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoot = void 0;
var fs_1 = __importDefault(require("fs"));
var logger_1 = require("./logger");
exports.projectRoot = fs_1.default.realpathSync(process.cwd());
(0, logger_1.log)('Project root path resolved to: ', exports.projectRoot);
