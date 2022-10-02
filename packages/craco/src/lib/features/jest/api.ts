import type { CracoConfig, JestContext } from '@craco/types';
import type { Config as JestConfig } from '@jest/types';
import type { CliArgs } from '../../args';

import { setArgs } from '../../args';
import { processCracoConfig } from '../../config';
import { getCraPaths, loadJestConfigProvider } from '../../cra';
import { isFunction } from '../../utils';
import { mergeJestConfig } from './merge-jest-config';

export function createJestConfig(
  callerCracoConfig: CracoConfig,
  callerContext: JestContext = {},
  options: CliArgs = {}
): JestConfig.InitialOptions {
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

  const context: JestContext = {
    env: process.env.NODE_ENV,
    ...callerContext,
  };

  const cracoConfig = processCracoConfig(callerCracoConfig, context);
  context.paths = getCraPaths(cracoConfig);

  const craJestConfigProvider = loadJestConfigProvider(cracoConfig);

  return mergeJestConfig(cracoConfig, craJestConfigProvider, context);
}
