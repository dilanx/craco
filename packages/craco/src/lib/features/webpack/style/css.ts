import type {
  BaseContext,
  CompleteLoader,
  Configure,
  CracoStyleConfig,
} from '@craco/types';
import type { Configuration as WebpackConfig, RuleSetRule } from 'webpack';

import { getLoaders, loaderByName } from '../../../loaders';
import { log, logError } from '../../../logger';
import {
  deepMergeWithArray,
  isBoolean,
  isFunction,
  isString,
} from '../../../utils';

interface CompleteLoaderModule {
  loader: {
    options: {
      [key: string]: any;
    };
  };
}

function setModuleLocalIdentName(
  match: CompleteLoaderModule,
  localIdentName: string
) {
  // The css-loader version of create-react-app has changed from 2.1.1 to 3.2.0
  // https://github.com/facebook/create-react-app/commit/f79f30
  if (isBoolean(match.loader.options.modules)) {
    delete match.loader?.options?.getLocalIdent;
    match.loader.options.localIdentName = localIdentName;
  } else {
    // This setting applies to create-react-app@3.3.0
    delete match.loader.options.modules.getLocalIdent;
    match.loader.options.modules.localIdentName = localIdentName;
  }

  log('Overrided CSS modules local ident name.');
}

function applyLoaderOptions(
  match: CompleteLoader,
  loaderOptions: Configure<any, BaseContext>,
  context: BaseContext
) {
  if (isFunction(loaderOptions)) {
    match.loader.options = loaderOptions(
      (match.loader as RuleSetRule).options || {},
      context
    );

    if (!match.loader.options) {
      throw new Error(
        "craco: 'style.css.loaderOptions' function didn't return a loader config object."
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

  log('Applied CSS loaders options.');
}

function overrideCssLoader(
  match: CompleteLoader,
  { css: cssOptions }: CracoStyleConfig,
  context: BaseContext
) {
  if (cssOptions?.loaderOptions) {
    applyLoaderOptions(match, cssOptions.loaderOptions, context);

    log('Overrided CSS loader.');
  }
}

function overrideModuleLoader(
  match: CompleteLoader,
  modulesOptions: { [key: string]: any } | undefined
) {
  if (modulesOptions?.localIdentName) {
    setModuleLocalIdentName(
      match as CompleteLoaderModule,
      modulesOptions.localIdentName
    );

    log('Overrided CSS module loader.');
  }
}

export function overrideCss(
  styleConfig: CracoStyleConfig,
  webpackConfig: WebpackConfig,
  context: BaseContext
) {
  if (styleConfig.modules || styleConfig.css) {
    const { hasFoundAny, matches } = getLoaders(
      webpackConfig,
      loaderByName('css-loader')
    );

    if (!hasFoundAny) {
      logError('Cannot find any CSS loaders.');
      return webpackConfig;
    }

    if (styleConfig.modules) {
      const cssModuleLoaders = matches.filter(
        (x) =>
          !isString(x.loader) &&
          x.loader?.options &&
          !isString(x.loader?.options) &&
          x.loader.options.modules
      );

      cssModuleLoaders.forEach((x) => {
        overrideModuleLoader(x as CompleteLoader, styleConfig.modules);
      });
    }

    if (styleConfig.css) {
      matches.forEach((x) => {
        overrideCssLoader(x as CompleteLoader, styleConfig, context);
      });
    }
  }

  return webpackConfig;
}
