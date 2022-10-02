import type { Configuration as DevServerConfig } from 'webpack-dev-server';
import type { Config as JestConfig } from '@jest/types';

export type DevServerConfigProvider = (
  proxy: any,
  allowedHost: string
) => DevServerConfig;

export type JestConfigProvider = (
  customResolve: (relativePath: string) => string,
  projectRoot: string,
  isEjecting: boolean
) => JestConfig.InitialOptions;
