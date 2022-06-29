import type { Configuration as WebpackConfig } from 'webpack';
import type { CracoConfig } from '../../../types/config';

import { log } from '../../logger';

function disableTypeChecking(webpackConfig: WebpackConfig) {
    webpackConfig.plugins = webpackConfig.plugins?.filter(
        (plugin) => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
    );

    log('Disabled TypeScript type checking.');

    return webpackConfig;
}

export function overrideTypeScript(
    cracoConfig: CracoConfig,
    webpackConfig: WebpackConfig
) {
    if (cracoConfig.typescript) {
        const { enableTypeChecking } = cracoConfig.typescript;

        if (enableTypeChecking === false) {
            disableTypeChecking(webpackConfig);
        }
    }

    return webpackConfig;
}
