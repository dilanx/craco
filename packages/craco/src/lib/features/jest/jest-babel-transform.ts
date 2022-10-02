import type { TransformOptions as BTransformOptions } from '@babel/core';
import type {
  SyncTransformer,
  TransformOptions as JTransformOptions,
} from '@jest/transform';

import { loadCracoConfigAsync } from '../../config';
import { createJestBabelTransform } from './create-jest-babel-transform';

let jestBabelTransform: SyncTransformer<BTransformOptions> | undefined;

// cracoConfig is only available inside the transform, but the transform needs to include whatever options cracoConfig
// specifies. So, the first time this transform is run, it generates a new transform -- using cracoConfig -- and
// uses that to process files.
module.exports = {
  ...createJestBabelTransform(),
  async processAsync(
    src: string,
    filename: string,
    transformOptions: JTransformOptions<BTransformOptions>
  ) {
    if (!jestBabelTransform) {
      const context = { env: process.env.NODE_ENV };
      const cracoConfig = await loadCracoConfigAsync(context);
      jestBabelTransform = createJestBabelTransform(cracoConfig);
    }

    return jestBabelTransform?.process(src, filename, transformOptions);
  },
};
