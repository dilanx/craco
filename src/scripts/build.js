process.env.NODE_ENV = "production";

const { log } = require("../logger");
const { craPaths, loadWebpackProdConfig, overrideWebpackProdConfig, build } = require("../cra");
const { loadCracoConfig } = require("../config");
const { overrideWebpack } = require("../features/webpack");

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV,
    paths: craPaths
};

const cracoConfig = loadCracoConfig(context);
const craWebpackConfig = loadWebpackProdConfig();

overrideWebpack(cracoConfig, craWebpackConfig, overrideWebpackProdConfig, context);

build();
