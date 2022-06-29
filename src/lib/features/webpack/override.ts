import type { CracoConfig } from '../../../types/config';
import type { WebpackContext } from '../../../types/context';

import {
    loadWebpackDevConfig,
    loadWebpackProdConfig,
    overrideWebpackDevConfig,
    overrideWebpackProdConfig,
} from '../../cra';
import { mergeWebpackConfig } from './merge-webpack-config';

export function overrideWebpackDev(
    cracoConfig: CracoConfig,
    context: WebpackContext
) {
    const craWebpackConfig = loadWebpackDevConfig(cracoConfig);
    const resultingWebpackConfig = mergeWebpackConfig(
        cracoConfig,
        craWebpackConfig,
        context
    );

    overrideWebpackDevConfig(cracoConfig, resultingWebpackConfig);
}

export function overrideWebpackProd(
    cracoConfig: CracoConfig,
    context: WebpackContext
) {
    const craWebpackConfig = loadWebpackProdConfig(cracoConfig);
    const resultingWebpackConfig = mergeWebpackConfig(
        cracoConfig,
        craWebpackConfig,
        context
    );

    overrideWebpackProdConfig(cracoConfig, resultingWebpackConfig);
}
