import type { Configuration as WebpackConfig } from 'webpack';
import type { CliArgs } from '../../../types/args';
import type { CracoConfig } from '../../../types/config';
import type { WebpackContext } from '../../../types/context';
export declare function createWebpackDevConfig(callerCracoConfig: CracoConfig, callerContext?: WebpackContext, options?: CliArgs): WebpackConfig;
export declare function createWebpackProdConfig(callerCracoConfig: CracoConfig, callerContext?: WebpackContext, options?: CliArgs): WebpackConfig;
