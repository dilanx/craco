# CRACO End-to-End Tests

## Usage

These tests ensure various functionality contracts are upheld across dependency upgrades.

To get started locally, run `npm run test:unit` or `npm run test:integration`.

## How do these work?

### `unit/`

These tests are non-integration and do not involve the building of any individual packages.

### `fixtures/`

Each `fixture/` gets spun up in a temporary directory and has its dependencies installed with npm.<br>

### `setup.js`

This script runs before any integration tests are executed. It creates a temporary directory for each fixture, installs the local version of CRACO, any other required packages, and builds the package. You can then use an individual <test>.test.js within the fixture to start a server or check for properties of the build files.

### `teardown.js`

This removes all temporary directories generated during integration tests.
