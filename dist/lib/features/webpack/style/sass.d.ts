import type { Configuration as WebpackConfig } from 'webpack';
import type { CracoStyleConfig } from '../../../../types/config';
import { BaseContext } from '../../../../types/context';
export declare function overrideSass(styleConfig: CracoStyleConfig, webpackConfig: WebpackConfig, context: BaseContext): WebpackConfig;
