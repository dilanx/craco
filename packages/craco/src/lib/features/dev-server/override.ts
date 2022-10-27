import type { CracoConfig, DevServerContext } from '@craco/types';

import { overrideDevServerConfigProvider } from '../../cra';
import { isFunction } from '../../utils';
import { createConfigProviderProxy } from './create-config-provider-proxy';
import { overrideDevServerUtils } from './override-utils';
import { setEnvironmentVariables } from './set-environment-variables';

export function overrideDevServer(
  cracoConfig: CracoConfig,
  context: DevServerContext
) {
  overrideDevServerUtils(cracoConfig);

  if (cracoConfig.devServer && !isFunction(cracoConfig.devServer)) {
    setEnvironmentVariables(cracoConfig.devServer);
  }

  const proxy = createConfigProviderProxy(cracoConfig, context);
  overrideDevServerConfigProvider(cracoConfig, proxy);
}
