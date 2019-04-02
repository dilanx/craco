process.env.NODE_ENV = "production";

const { log } = require("../lib/logger");
const { getCraPaths, loadWebpackProdConfig, overrideWebpackProdConfig, build } = require("../lib/cra");
const { loadCracoConfig } = require("../lib/config");
const { overrideWebpack } = require("../lib/features/webpack");

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV
};

const cracoConfig = loadCracoConfig(context);
const craWebpackConfig = loadWebpackProdConfig(cracoConfig);

context.paths = getCraPaths(cracoConfig);

overrideWebpack(cracoConfig, craWebpackConfig, overrideWebpackProdConfig, context);

build(cracoConfig);
