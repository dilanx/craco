import type { CliArgs } from '../../../types/args';
import type { Context, CracoConfig } from '../../../types/config';

import { setArgs } from '../../args';
import { processCracoConfig } from '../../config';
import { getCraPaths, loadJestConfigProvider } from '../../cra';
import { isFunction } from '../../utils';
import { mergeJestConfig } from './merge-jest-config';

export function createJestConfig(
    callerCracoConfig: CracoConfig,
    callerContext: Context = {},
    options: CliArgs = {}
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

    const context: CliArgs = {
        env: process.env.NODE_ENV,
        ...callerContext,
    };

    const cracoConfig = processCracoConfig(callerCracoConfig, context);
    context.paths = getCraPaths(cracoConfig);

    const craJestConfigProvider = loadJestConfigProvider(cracoConfig);

    return mergeJestConfig(cracoConfig, craJestConfigProvider, context);
}
