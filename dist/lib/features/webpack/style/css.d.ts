import type { Configuration as WebpackConfig } from 'webpack';
import type { CracoStyleConfig } from '../../../../types/config';
import type { BaseContext } from '../../../../types/context';
export declare function overrideCss(styleConfig: CracoStyleConfig, webpackConfig: WebpackConfig, context: BaseContext): WebpackConfig;
