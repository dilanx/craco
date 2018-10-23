process.env.NODE_ENV = process.env.NODE_ENV || "test";

const { log } = require("../lib/logger");
const { craPaths, test } = require("../lib/cra");
const { overrideJest } = require("../lib/features/test/jest");
const { loadCracoConfig } = require("../lib/config");

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV,
    paths: craPaths
};

const cracoConfig = loadCracoConfig(context);

overrideJest(cracoConfig, context);

// TODO: Remove craco arguments.
// TODO: Expose a functions in args.js to do that.
// Passing the --scripts-version on to the original test script can result
// in the test script rejecting it as an invalid option. So strip it out of
// the command line arguments before invoking the test script.

test();
