import type { CracoConfig, DevServerContext } from '@craco/types';

import { overrideDevServerConfigProvider } from '../../cra';
import { createConfigProviderProxy } from './create-config-provider-proxy';
import { overrideDevServerUtils } from './override-utils';

export function overrideDevServer(
  cracoConfig: CracoConfig,
  context: DevServerContext
) {
  overrideDevServerUtils(cracoConfig);

  const proxy = createConfigProviderProxy(cracoConfig, context);
  overrideDevServerConfigProvider(cracoConfig, proxy);
}
