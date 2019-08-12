process.env.NODE_ENV = "production";

const { log } = require("../lib/logger");
const { getCraPaths, build } = require("../lib/cra");
const { loadCracoConfig } = require("../lib/config");
const { overrideWebpackProd } = require("../lib/features/webpack/override");

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV
};

const cracoConfig = loadCracoConfig(context);
context.paths = getCraPaths(cracoConfig);

overrideWebpackProd(cracoConfig, context);
build(cracoConfig);
