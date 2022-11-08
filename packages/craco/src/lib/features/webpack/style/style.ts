import type { BaseContext, CracoConfig } from '@craco/types';
import type { Configuration as WebpackConfig } from 'webpack';

import { overrideCss } from './css';
import { overridePostcss } from './postcss';
import { overrideSass } from './sass';

export function overrideStyle(
  cracoConfig: CracoConfig,
  webpackConfig: WebpackConfig,
  context: BaseContext
) {
  if (cracoConfig.style) {
    webpackConfig = overrideCss(cracoConfig.style, webpackConfig, context);
    webpackConfig = overrideSass(cracoConfig.style, webpackConfig, context);
    webpackConfig = overridePostcss(cracoConfig.style, webpackConfig, context);
  }

  return webpackConfig;
}
