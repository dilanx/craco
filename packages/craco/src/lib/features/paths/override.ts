import type { BaseContext, CracoConfig, CraPaths } from '@craco/types';

import { overrideCraPaths } from '../../cra';
import { isFunction } from '../../utils';

export function overridePaths(cracoConfig: CracoConfig, context: BaseContext) {
  let newConfig: CraPaths | undefined = context.paths;
  if (cracoConfig.paths) {
    if (isFunction(cracoConfig.paths)) {
      newConfig = cracoConfig.paths(newConfig, context);
    } else {
      newConfig = {
        ...newConfig,
        ...cracoConfig.paths,
      };
    }

    overrideCraPaths(cracoConfig, newConfig);
  }

  return newConfig;
}
