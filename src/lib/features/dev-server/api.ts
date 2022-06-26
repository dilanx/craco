import type { Context, CracoConfig } from '../../../types/config';
import type { CliArgs } from '../../../types/args';

import { isFunction } from '../../utils';
import { setArgs } from '../../args';
import { createConfigProviderProxy } from './create-config-provider-proxy';
import { processCracoConfig } from '../../config';
import { getCraPaths } from '../../cra';

export function createDevServerConfigProviderProxy(
    callerCracoConfig: CracoConfig,
    callerContext: Context,
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

    const context: Context = {
        env: process.env.NODE_ENV,
        ...callerContext,
    };

    const cracoConfig = processCracoConfig(callerCracoConfig, context);
    context.paths = getCraPaths(cracoConfig);

    const proxy = createConfigProviderProxy(cracoConfig, context);

    return proxy;
}
