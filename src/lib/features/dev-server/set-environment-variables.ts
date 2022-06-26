import type { CracoConfig } from '../../../types/config';
import type { Configuration as DevServerConfig } from 'webpack-dev-server';

import { isString, isFunction } from '../../utils';

function setEnvironmentVariable(envProperty: string, value: any) {
    if (!isString(value)) {
        process.env[envProperty] = value.toString();
    } else {
        process.env[envProperty] = value;
    }
}

export function setEnvironmentVariables(cracoConfig: CracoConfig) {
    if (cracoConfig.devServer) {
        let devServer: DevServerConfig;
        if (isFunction(cracoConfig.devServer)) {
            devServer = cracoConfig.devServer({}, {});
        } else {
            devServer = cracoConfig.devServer;
        }
        const { open, https, host, port } = devServer;

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
}
