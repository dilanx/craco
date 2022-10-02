import type { Configuration as DevServerConfig } from 'webpack-dev-server';

import { isString } from '../../utils';

function setEnvironmentVariable(envProperty: string, value: any) {
  if (!isString(value)) {
    process.env[envProperty] = value.toString();
  } else {
    process.env[envProperty] = value;
  }
}

export function setEnvironmentVariables(devServerConfig: DevServerConfig) {
  const { open, https, host, port } = devServerConfig;

  if (open === false) {
    setEnvironmentVariable('BROWSER', 'none');
  }

  if (https) {
    setEnvironmentVariable('HTTPS', 'true');
  }

  if (host) {
    setEnvironmentVariable('HOST', host);
  }

  if (port) {
    setEnvironmentVariable('PORT', port);
  }
}
