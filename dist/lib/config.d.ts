import type { CracoConfig } from '../types/config';
import type { BaseContext } from '../types/context';
export declare function processCracoConfig(cracoConfig: CracoConfig, context: BaseContext): CracoConfig;
export declare function loadCracoConfig(context: BaseContext): CracoConfig;
export declare function loadCracoConfigAsync(context: BaseContext): Promise<CracoConfig>;
