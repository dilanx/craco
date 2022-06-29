import type { Configuration as WebpackConfig, RuleSetRule } from 'webpack';
import type {
    Configure,
    CracoBabelConfig,
    CracoConfig,
} from '../../../types/config';
import type { BaseContext } from '../../../types/context';
import type { CompleteLoader } from '../../../types/loaders';

import { TransformOptions } from '@babel/core';
import { getLoaders, loaderByName } from '../../loaders';
import { log, logError } from '../../logger';
import { deepMergeWithArray, isArray, isFunction, isString } from '../../utils';

// TODO: CRA use a cacheIdentifier, should we update it with the new plugins?

function addPresets(loader: RuleSetRule, babelPresets: any[]) {
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

function addPlugins(loader: RuleSetRule, babelPlugins: any[]) {
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
    loaderOptions: Configure<TransformOptions, BaseContext>,
    context: BaseContext
) {
    if (isFunction(loaderOptions)) {
        loader.options = loaderOptions(
            (loader.options as TransformOptions) || {},
            context
        );

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
    context: BaseContext
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
    context: BaseContext
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
