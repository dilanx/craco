import type { Configuration as WebpackConfig } from 'webpack';
import type { CracoConfig } from '../../../types/config';
import type { WebpackContext } from '../../../types/context';
export declare function mergeWebpackConfig(cracoConfig: CracoConfig, webpackConfig: WebpackConfig, context: WebpackContext): WebpackConfig;
