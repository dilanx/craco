import type { Context, CracoConfig } from '../../../types/config';

import { overrideDevServerConfigProvider } from '../../cra';
import { createConfigProviderProxy } from './create-config-provider-proxy';
import { setEnvironmentVariables } from './set-environment-variables';
import { overrideDevServerUtils } from './override-utils';

export function overrideDevServer(cracoConfig: CracoConfig, context: Context) {
    overrideDevServerUtils(cracoConfig);
    setEnvironmentVariables(cracoConfig);

    const proxy = createConfigProviderProxy(cracoConfig, context);
    overrideDevServerConfigProvider(cracoConfig, proxy);
}
