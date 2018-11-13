process.env.NODE_ENV = process.env.NODE_ENV || "development";

const { log } = require("../lib/logger");
const {
    craPaths,
    loadWebpackDevConfig,
    overrideWebpackDevConfig,
    start
} = require("../lib/cra");
const { loadCracoConfig } = require("../lib/config");
const { overrideWebpack } = require("../lib/features/webpack");
const { overrideDevServer } = require("../lib/features/dev-server");

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV,
    paths: craPaths
};

const cracoConfig = loadCracoConfig(context);
const craWebpackConfig = loadWebpackDevConfig();

overrideWebpack(
    cracoConfig,
    craWebpackConfig,
    overrideWebpackDevConfig,
    context
);
overrideDevServer(cracoConfig, context);

start();
