import type { CracoConfig } from '../../../types/config';
import type { DevServerContext } from '../../../types/context';
export declare function createConfigProviderProxy(cracoConfig: CracoConfig, context: DevServerContext): (proxy: any, allowedHost: string) => any;
