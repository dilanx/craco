import type { CliArgs } from '../../../types/args';
import type { CracoConfig } from '../../../types/config';
import type { DevServerContext } from '../../../types/context';

import { setArgs } from '../../args';
import { processCracoConfig } from '../../config';
import { getCraPaths } from '../../cra';
import { isFunction } from '../../utils';
import { createConfigProviderProxy } from './create-config-provider-proxy';

export function createDevServerConfigProviderProxy(
    callerCracoConfig: CracoConfig,
    callerContext: DevServerContext,
    options: CliArgs
) {
    if (!callerCracoConfig) {
        throw new Error("craco: 'cracoConfig' is required.");
    }
    if (isFunction(callerCracoConfig)) {
        throw new Error("craco: 'cracoConfig' should be an object.");
    }

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
    }

    setArgs(options);

    const context: DevServerContext = {
        env: process.env.NODE_ENV,
        ...callerContext,
    };

    const cracoConfig = processCracoConfig(callerCracoConfig, context);
    context.paths = getCraPaths(cracoConfig);

    const proxy = createConfigProviderProxy(cracoConfig, context);

    return proxy;
}
