process.env.NODE_ENV = process.env.NODE_ENV || "development";

const { findArgsFromCli } = require("../lib/args");
const { log } = require("../lib/logger");
const { getCraPaths, start } = require("../lib/cra");
const { loadCracoConfig } = require("../lib/config");
const { overrideWebpackDev } = require("../lib/features/webpack/override");
const { overrideDevServer } = require("../lib/features/dev-server");
const { overrideDevServerUtils } = require("../lib/features/dev-server-utils");

findArgsFromCli();

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV
};

const cracoConfig = loadCracoConfig(context);
context.paths = getCraPaths(cracoConfig);

overrideWebpackDev(cracoConfig, context);
overrideDevServerUtils(cracoConfig, context);
overrideDevServer(cracoConfig, context);

start(cracoConfig);
