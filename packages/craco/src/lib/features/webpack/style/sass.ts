import type {
  BaseContext,
  CompleteLoader,
  Configure,
  CracoStyleConfig,
} from '@craco/types';
import type { Configuration as WebpackConfig } from 'webpack';

import { getLoaders, loaderByName } from '../../../loaders';
import { log, logError } from '../../../logger';
import { deepMergeWithArray, isFunction, isString } from '../../../utils';

function setLoaderProperty(
  match: CompleteLoader,
  key: string,
  valueProviders: {
    whenString: () => any;
    whenObject: () => any;
  }
) {
  if (isString(match.loader)) {
    (match.parent as any)[match.index] = {
      loader: match.loader,
      [key]: valueProviders.whenString(),
    };
  } else {
    (match.loader as any)[key] = valueProviders.whenObject();
  }
}

function applyLoaderOptions(
  match: CompleteLoader,
  loaderOptions: Configure<any, BaseContext>,
  context: BaseContext
) {
  if (isFunction(loaderOptions)) {
    setLoaderProperty(match, 'options', {
      whenString: () => loaderOptions({}, context),
      whenObject: () => loaderOptions(match.loader.options || {}, context),
    });

    if (!match.loader.options) {
      throw new Error(
        "craco: 'style.sass.loaderOptions' function didn't return a loader config object."
      );
    }
  } else {
    // TODO: ensure is otherwise a plain object, if not, log an error.
    setLoaderProperty(match, 'options', {
      whenString: () => loaderOptions,
      whenObject: () =>
        deepMergeWithArray({}, match.loader.options || {}, loaderOptions),
    });
  }

  log('Applied Sass loaders options.');
}

function overrideLoader(
  match: CompleteLoader,
  { sass: sassOptions }: CracoStyleConfig,
  context: BaseContext
) {
  const { loaderOptions } = sassOptions ?? {};

  if (loaderOptions) {
    applyLoaderOptions(match, loaderOptions, context);

    log('Overrided Sass loader.');
  }
}

export function overrideSass(
  styleConfig: CracoStyleConfig,
  webpackConfig: WebpackConfig,
  context: BaseContext
) {
  if (styleConfig.sass) {
    const { hasFoundAny, matches } = getLoaders(
      webpackConfig,
      loaderByName('sass-loader')
    );

    if (!hasFoundAny) {
      logError('Cannot find any Sass loaders.');

      return webpackConfig;
    }

    matches.forEach((x) => {
      overrideLoader(x as CompleteLoader, styleConfig, context);
    });
  }

  return webpackConfig;
}
