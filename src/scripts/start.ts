import type { CracoConfig } from '../types/config';
import type { BaseContext } from '../types/context';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import { findArgsFromCli } from '../lib/args';

// Make sure this is called before "paths" is imported.
findArgsFromCli();

import { loadCracoConfigAsync } from '../lib/config';
import { getCraPaths, start } from '../lib/cra';
import { overrideDevServer } from '../lib/features/dev-server/override';
import { overrideWebpackDev } from '../lib/features/webpack/override';
import { log } from '../lib/logger';
import { validateCraVersion } from '../lib/validate-cra-version';

log('Override started with arguments: ', process.argv);
log('For environment: ', process.env.NODE_ENV);

const context: BaseContext = {
    env: process.env.NODE_ENV,
};

loadCracoConfigAsync(context).then((cracoConfig: CracoConfig) => {
    validateCraVersion(cracoConfig);

    context.paths = getCraPaths(cracoConfig);

    overrideWebpackDev(cracoConfig, context);
    overrideDevServer(cracoConfig, context);

    start(cracoConfig);
});
