import type { CliArgs } from '../../../types/args';
import type { CracoConfig } from '../../../types/config';
import type { DevServerContext } from '../../../types/context';
export declare function createDevServerConfigProviderProxy(callerCracoConfig: CracoConfig, callerContext: DevServerContext, options: CliArgs): (proxy: any, allowedHost: string) => any;
