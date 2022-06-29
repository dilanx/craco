import type { CracoConfig } from '../../../types/config';
import type { DevServerContext } from '../../../types/context';

import { overrideDevServerConfigProvider } from '../../cra';
import { createConfigProviderProxy } from './create-config-provider-proxy';
import { overrideDevServerUtils } from './override-utils';
import { setEnvironmentVariables } from './set-environment-variables';

export function overrideDevServer(
    cracoConfig: CracoConfig,
    context: DevServerContext
) {
    overrideDevServerUtils(cracoConfig);
    setEnvironmentVariables(cracoConfig);

    const proxy = createConfigProviderProxy(cracoConfig, context);
    overrideDevServerConfigProvider(cracoConfig, proxy);
}
