import { overrideCss } from './css';
import { overrideSass } from './sass';
import { overridePostcss } from './postcss';
import type { CracoConfig, Context } from '../../../../types/config';
import type { Configuration as WebpackConfig } from 'webpack';

export function overrideStyle(
    cracoConfig: CracoConfig,
    webpackConfig: WebpackConfig,
    context: Context
) {
    if (cracoConfig.style) {
        webpackConfig = overrideCss(cracoConfig.style, webpackConfig, context);
        webpackConfig = overrideSass(cracoConfig.style, webpackConfig, context);
        webpackConfig = overridePostcss(
            cracoConfig.style,
            webpackConfig,
            context
        );
    }

    return webpackConfig;
}
