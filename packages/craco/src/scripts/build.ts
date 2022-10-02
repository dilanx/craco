import type { BaseContext } from '@craco/types';

process.env.NODE_ENV = 'production';

import { findArgsFromCli } from '../lib/args';

// Make sure this is called before "paths" is imported.
findArgsFromCli();

import { loadCracoConfigAsync } from '../lib/config';
import { build, getCraPaths } from '../lib/cra';
import { overrideWebpackProd } from '../lib/features/webpack/override';
import { log } from '../lib/logger';
import { validateCraVersion } from '../lib/validate-cra-version';

log('Override started with arguments: ', process.argv);
log('For environment: ', process.env.NODE_ENV);

const context: BaseContext = {
  env: process.env.NODE_ENV,
};

loadCracoConfigAsync(context).then((cracoConfig) => {
  validateCraVersion(cracoConfig);

  context.paths = getCraPaths(cracoConfig);

  overrideWebpackProd(cracoConfig, context);
  build(cracoConfig);
});
