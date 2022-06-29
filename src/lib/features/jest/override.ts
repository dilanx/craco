import type { CracoConfig } from '../../../types/config';
import type { JestContext } from '../../../types/context';

import { loadJestConfigProvider, overrideJestConfigProvider } from '../../cra';
import { log } from '../../logger';
import { mergeJestConfig } from './merge-jest-config';

export function overrideJest(cracoConfig: CracoConfig, context: JestContext) {
    if (cracoConfig.jest) {
        const craJestConfigProvider = loadJestConfigProvider(cracoConfig);

        const proxy = () => {
            return mergeJestConfig(cracoConfig, craJestConfigProvider, context);
        };

        overrideJestConfigProvider(cracoConfig, proxy);

        log('Overrided Jest config.');
    }
}
