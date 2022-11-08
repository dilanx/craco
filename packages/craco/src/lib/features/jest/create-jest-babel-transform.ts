import type { CracoConfig } from '@craco/types';

import babelJest from 'babel-jest';
import { loadCracoConfig } from '../../config';
import { isArray } from '../../utils';

/**
 * To check if support jsx-runtime
 * Copy from https://github.com/facebook/create-react-app/blob/2b1161b34641bb4d2f269661cd636bbcd4888406/packages/react-scripts/config/jest/babelTransform.js#L12
 */
const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

export function createJestBabelTransform(cracoConfig?: CracoConfig): any {
  if (!cracoConfig) {
    const context = { env: process.env.NODE_ENV };
    cracoConfig = loadCracoConfig(context);
  }

  const craBabelTransformer: any = {
    presets: [
      [
        'babel-preset-react-app',
        {
          runtime: hasJsxRuntime ? 'automatic' : 'classic',
        },
      ],
    ],
    babelrc: false,
    configFile: false,
  };

  if (cracoConfig) {
    const { addPresets, addPlugins } = cracoConfig.jest?.babel ?? {};

    if (cracoConfig.babel) {
      if (addPresets) {
        const { presets } = cracoConfig.babel;

        if (isArray(presets)) {
          craBabelTransformer.presets =
            craBabelTransformer.presets?.concat(presets);
        }
      }

      if (addPlugins) {
        const { plugins } = cracoConfig.babel;

        if (isArray(plugins)) {
          craBabelTransformer.plugins = plugins;
        }
      }
    }
  }

  return babelJest.createTransformer
    ? babelJest.createTransformer(craBabelTransformer)
    : undefined;
}
