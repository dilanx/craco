import type { CracoConfig, WebpackContext } from '@craco/types';
import type { Configuration as WebpackConfig } from 'webpack';
import type { CliArgs } from '../../args';

import { setArgs } from '../../args';
import { processCracoConfig } from '../../config';
import {
  getCraPaths,
  loadWebpackDevConfig,
  loadWebpackProdConfig,
} from '../../cra';
import { isFunction } from '../../utils';
import { mergeWebpackConfig } from './merge-webpack-config';

export function createWebpackDevConfig(
  callerCracoConfig: CracoConfig,
  callerContext?: WebpackContext,
  options?: CliArgs
) {
  return createWebpackConfig(
    callerCracoConfig,
    callerContext,
    loadWebpackDevConfig,
    'development',
    options
  );
}

export function createWebpackProdConfig(
  callerCracoConfig: CracoConfig,
  callerContext?: WebpackContext,
  options?: CliArgs
) {
  return createWebpackConfig(
    callerCracoConfig,
    callerContext,
    loadWebpackProdConfig,
    'production',
    options
  );
}

function createWebpackConfig(
  callerCracoConfig: CracoConfig,
  callerContext: WebpackContext = {},
  loadWebpackConfig: (cracoConfig: CracoConfig) => WebpackConfig,
  env: string,
  options: CliArgs = {}
) {
  if (!callerCracoConfig) {
    throw new Error("craco: 'cracoConfig' is required.");
  }
  if (isFunction(callerCracoConfig)) {
    throw new Error("craco: 'cracoConfig' should be an object.");
  }

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = env;
  }

  setArgs(options);

  const context: WebpackContext = {
    env: process.env.NODE_ENV,
    ...callerContext,
  };

  const cracoConfig = processCracoConfig(callerCracoConfig, context);
  context.paths = getCraPaths(cracoConfig);

  const craWebpackConfig = loadWebpackConfig(cracoConfig);
  const resultingWebpackConfig = mergeWebpackConfig(
    cracoConfig,
    craWebpackConfig,
    context
  );

  return resultingWebpackConfig;
}
