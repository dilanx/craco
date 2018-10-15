process.env.NODE_ENV = process.env.NODE_ENV || "development";

const { log } = require("../logger");
const { craPaths, loadWebpackDevConfig, overrideWebpackDevConfig, start } = require("../cra");
const { loadCracoConfig } = require("../config");
const { overrideWebpack } = require("../features/webpack");
const { overrideDevServer } = require("../features/dev-server");

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV,
    paths: craPaths
};

const cracoConfig = loadCracoConfig(context);
const craWebpackConfig = loadWebpackDevConfig();

overrideWebpack(cracoConfig, craWebpackConfig, overrideWebpackDevConfig, context);
overrideDevServer(cracoConfig, context);

start();
