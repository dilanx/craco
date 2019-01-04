const buildEnv = process.env.NODE_ENV;
process.env.NODE_ENV = "production";

const { log } = require("../lib/logger");
const { craPaths, loadWebpackProdConfig, overrideWebpackProdConfig, build } = require("../lib/cra");
const { loadCracoConfig } = require("../lib/config");
const { overrideWebpack } = require("../lib/features/webpack");

log("Override started with arguments: ", process.argv);
log("For environment: ", buildEnv);

const context = {
    env: buildEnv,
    paths: craPaths
};

const cracoConfig = loadCracoConfig(context);
const craWebpackConfig = loadWebpackProdConfig();

overrideWebpack(cracoConfig, craWebpackConfig, overrideWebpackProdConfig, context);

build();
