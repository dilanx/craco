# CRACO End-to-End Tests

## Usage

These tests ensure various functionality contracts are upheld across dependency upgrades.

To get started locally, run `npm run test:unit` or `npm run test:integration`.

## How do these work?

### `unit/`

These tests are non-integration and do not involve the building of any individual packages.

### `integration/fixtures/`

Each `fixture/` gets spun up in a temporary directory and has its dependencies installed with npm.<br>

### `integration/setup.js`

This script runs before any integration tests are executed. It creates a temporary directory for each fixture, installs the local version of CRACO, any other required packages, and builds the package. You can then use an individual <test>.test.js within the fixture to start a server or check for properties of the build files.

### `integration/teardown.js`

This removes all temporary directories generated during integration tests.

## How can I make my own tests?

### Unit tests

To create your own unit test, you can simply setup a directory within `unit/`, make a <test>.test.js, import necessary craco files, then test specific features. This test can be run with `npm run test:unit`.

### Integration tests

To create your own integration test, create a new directory under `integration/fixtures/`. You can then create a directory within called `test-package-files`, which should contain all necessary files for your package (public/index.html, craco.config.js, src/index.js, etc). These will be copied over to the temporary directory on test execution.

You can then create a index.test.js in `integration/fixtures/<testname>` to interface with the built package. It's recommended run a local server, then use playwright to test individual features of the live website. View `integration/fixtures/basic-integration-test` for an example.

This integration test will be run with `npm run test:integration`.
