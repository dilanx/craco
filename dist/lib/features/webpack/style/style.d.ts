import type { Configuration as WebpackConfig } from 'webpack';
import type { CracoConfig } from '../../../../types/config';
import type { BaseContext } from '../../../../types/context';
export declare function overrideStyle(cracoConfig: CracoConfig, webpackConfig: WebpackConfig, context: BaseContext): WebpackConfig;
