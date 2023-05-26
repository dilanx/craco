import type {
  BaseContext,
  CompleteLoader,
  Configure,
  CracoStyleConfig,
  Loader,
} from '@craco/types';
import type { Configuration as WebpackConfig } from 'webpack';

import { isString } from 'lodash';
import { getLoaders, loaderByName } from '../../../loaders';
import { log, logError } from '../../../logger';
import { projectRoot } from '../../../paths';
import { deepMergeWithArray, isArray, isFunction } from '../../../utils';

const CRA_PLUGINS = (presetEnv: any) => {
  return [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')(presetEnv),
    require(require.resolve('postcss-normalize', { paths: [projectRoot] })),
  ];
};

const CRA_PRESET_ENV = {
  autoprefixer: {
    flexbox: 'no-2009',
  },
  stage: 3,
};

function usePostcssConfigFile(match: Loader) {
  if (
    !isString(match.loader?.options) &&
    match.loader?.options?.postcssOptions
  ) {
    const ident = match.loader.options.postcssOptions.ident;
    const sourceMap = match.loader.options.postcssOptions.sourceMap;

    match.loader.options.postcssOptions = {
      ident: ident,
      sourceMap: sourceMap,
    };

    log('Overwrited PostCSS config to use a config file.');
  }
}

function extendsPostcss(
  match: CompleteLoader,
  { postcss: postcssOptions }: CracoStyleConfig
) {
  const { plugins, env } = postcssOptions ?? {};
  if (isArray(plugins) || env) {
    let postcssPlugins: any[];

    if (env) {
      const mergedPreset = deepMergeWithArray({}, CRA_PRESET_ENV, env);
      postcssPlugins = CRA_PLUGINS(mergedPreset);

      log('Merged PostCSS env preset.');
    } else {
      let craPlugins: any[] = [];

      if (!isString(match.loader.options)) {
        const options = match.loader.options?.postcssOptions;
        if (isFunction(options)) {
          craPlugins = options().plugins;
        } else {
          craPlugins = options?.plugins;
        }
      }

      postcssPlugins = craPlugins || [];
    }

    if (plugins) {
      postcssPlugins = isFunction(plugins)
        ? plugins(postcssPlugins)
        : postcssPlugins.concat(plugins);

      log('Added PostCSS plugins.');
    }

    if (match.loader.options && !isString(match.loader.options)) {
      if (match.loader.options.postcssOptions) {
        match.loader.options.postcssOptions.plugins = postcssPlugins;
      } else {
        match.loader.options.postcssOptions = {
          plugins: postcssPlugins,
        };
      }
    }
  }
}

function applyLoaderOptions(
  match: CompleteLoader,
  loaderOptions: Configure<any, BaseContext>,
  context: BaseContext
) {
  if (isFunction(loaderOptions)) {
    match.loader.options = loaderOptions(match.loader.options || {}, context);

    if (!match.loader.options) {
      throw new Error(
        "craco: 'style.postcss.loaderOptions' function didn't return a loader config object."
      );
    }
  } else {
    // TODO: ensure is otherwise a plain object, if not, log an error.
    match.loader.options = deepMergeWithArray(
      {},
      match.loader.options || {},
      loaderOptions
    );
  }

  log('Applied PostCSS loaders options.');
}

function overrideLoader(
  match: CompleteLoader,
  styleConfig: CracoStyleConfig,
  context: BaseContext
) {
  const { mode, loaderOptions } = styleConfig.postcss ?? {};

  if (mode === 'file') {
    usePostcssConfigFile(match);
  } else {
    extendsPostcss(match, styleConfig);
  }

  if (loaderOptions) {
    applyLoaderOptions(match, loaderOptions, context);
  }

  log('Overrided PostCSS loader.');
}

export function overridePostcss(
  styleConfig: CracoStyleConfig,
  webpackConfig: WebpackConfig,
  context: BaseContext
) {
  if (styleConfig.postcss) {
    const { hasFoundAny, matches } = getLoaders(
      webpackConfig,
      loaderByName('postcss-loader')
    );

    if (!hasFoundAny) {
      logError('Cannot find any PostCSS loaders.');

      return webpackConfig;
    }

    matches.forEach((x) => {
      overrideLoader(x as CompleteLoader, styleConfig, context);
    });
  }

  return webpackConfig;
}
