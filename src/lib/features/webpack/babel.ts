import type { RuleSetRule, Configuration as WebpackConfig } from 'webpack';
import type {
    CracoBabelConfig,
    BabelLoaderOptions,
    BabelPlugins,
    BabelPresets,
    Context,
    CracoConfig,
} from '../../../types/config';
import type { CompleteLoader } from '../../../types/loaders';
import { getLoaders, loaderByName } from '../../loaders';
import { log, logError } from '../../logger';
import { isFunction, isArray, deepMergeWithArray, isString } from '../../utils';

// TODO: CRA use a cacheIdentifier, should we update it with the new plugins?

function addPresets(loader: RuleSetRule, babelPresets: BabelPresets) {
    if (isArray(babelPresets)) {
        if (loader.options && !isString(loader.options)) {
            if (loader.options.presets) {
                loader.options.presets =
                    loader.options.presets.concat(babelPresets);
            } else {
                loader.options.presets = babelPresets;
            }
        } else {
            loader.options = {
                presets: babelPresets,
            };
        }
    }

    log('Added Babel presets.');
}

function addPlugins(loader: RuleSetRule, babelPlugins: BabelPlugins) {
    if (isArray(babelPlugins)) {
        if (loader.options && !isString(loader.options)) {
            if (loader.options.plugins) {
                loader.options.plugins =
                    loader.options.plugins.concat(babelPlugins);
            } else {
                loader.options.plugins = babelPlugins;
            }
        } else {
            loader.options = {
                plugins: babelPlugins,
            };
        }
    }

    log('Added Babel plugins.');
}

function applyLoaderOptions(
    loader: RuleSetRule,
    loaderOptions:
        | BabelLoaderOptions
        | ((
              babelLoaderOptions: BabelLoaderOptions,
              context: Context
          ) => BabelLoaderOptions)
        | undefined,
    context: Context
) {
    if (isFunction(loaderOptions)) {
        loader.options = loaderOptions(loader.options || {}, context);

        if (!loader.options) {
            throw new Error(
                "craco: 'babel.loaderOptions' function didn't return a loader config object."
            );
        }
    } else {
        // TODO: ensure is otherwise a plain object, if not, log an error.
        loader.options = deepMergeWithArray(
            {},
            loader.options || {},
            loaderOptions
        );
    }

    log('Applied Babel loader options.');
}

function overrideLoader(
    match: CompleteLoader,
    babelConfig: CracoBabelConfig,
    context: Context
) {
    const { presets, plugins, loaderOptions } = babelConfig;

    if (presets) {
        addPresets(match.loader, presets);
    }

    if (plugins) {
        addPlugins(match.loader, plugins);
    }

    if (loaderOptions) {
        applyLoaderOptions(match.loader, loaderOptions, context);
    }
}

export function overrideBabel(
    cracoConfig: CracoConfig,
    webpackConfig: WebpackConfig,
    context: Context
) {
    if (cracoConfig.babel) {
        const { hasFoundAny, matches } = getLoaders(
            webpackConfig,
            loaderByName('babel-loader')
        );

        if (!hasFoundAny) {
            logError('Cannot find any Babel loaders.');

            return webpackConfig;
        }

        matches.forEach((x) => {
            overrideLoader(x as CompleteLoader, cracoConfig, context);
        });
    }

    return webpackConfig;
}
