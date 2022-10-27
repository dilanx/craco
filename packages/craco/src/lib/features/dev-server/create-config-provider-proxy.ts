import type {
  CracoConfig,
  DevServerContext,
  DevServerConfigProvider,
} from '@craco/types';
import type { Configuration as DevServerConfig } from 'webpack-dev-server';

import merge from 'webpack-merge';
import { loadDevServerConfigProvider } from '../../cra';
import { log } from '../../logger';
import { isFunction } from '../../utils';
import { applyDevServerConfigPlugins } from '../plugins';
import { setEnvironmentVariables } from './set-environment-variables';

function createProxy(
  cracoConfig: CracoConfig,
  craDevServerConfigProvider: DevServerConfigProvider,
  context: DevServerContext
) {
  const proxy = (proxy: any, allowedHost: string) => {
    let devServerConfig = craDevServerConfigProvider(proxy, allowedHost);

    if (isFunction(cracoConfig.devServer)) {
      devServerConfig = cracoConfig.devServer(devServerConfig, {
        ...context,
        proxy,
        allowedHost,
      });

      if (!devServerConfig) {
        throw new Error(
          "craco: 'devServer' function didn't return a config object."
        );
      }
    } else {
      // TODO: ensure is otherwise a plain object, if not, log an error.
      devServerConfig = merge<DevServerConfig>(
        devServerConfig,
        cracoConfig.devServer || {}
      );
    }

    devServerConfig = applyDevServerConfigPlugins(
      cracoConfig,
      devServerConfig,
      {
        ...context,
        proxy,
        allowedHost,
      }
    );

    log('Merged DevServer config.');

    return devServerConfig;
  };

  return proxy;
}

export function createConfigProviderProxy(
  cracoConfig: CracoConfig,
  context: DevServerContext
) {
  const craDevServerConfigProvider = loadDevServerConfigProvider(cracoConfig);
  const proxy = createProxy(cracoConfig, craDevServerConfigProvider, context);

  return proxy;
}
