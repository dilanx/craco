process.env.NODE_ENV = process.env.NODE_ENV || "test";

const { log } = require("../lib/logger");
const { craPaths, test } = require("../lib/cra");
const { overrideJest } = require("../lib/features/test/jest");
const { loadCracoConfig } = require("../lib/config");
const { removeConflictingCustomArgs } = require("../lib/args");

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV,
    paths: craPaths
};

const cracoConfig = loadCracoConfig(context);

overrideJest(cracoConfig, context);
removeConflictingCustomArgs();
test();
