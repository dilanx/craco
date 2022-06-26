import type {
    SassLoaderOptions,
    SassOptions,
    CracoStyleConfig,
    Context,
} from '../../../../types/config';
import type { Configuration as WebpackConfig } from 'webpack';
import type { CompleteLoader, Loader } from '../../../../types/loaders';
import { getLoaders, loaderByName } from '../../../loaders';
import { log, logError } from '../../../logger';
import { isString, isFunction, deepMergeWithArray } from '../../../utils';

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
    loaderOptions: SassLoaderOptions,
    context: Context
) {
    if (isFunction(loaderOptions)) {
        setLoaderProperty(match, 'options', {
            whenString: () => loaderOptions({}, context),
            whenObject: () =>
                loaderOptions(match.loader.options || {}, context),
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
                deepMergeWithArray(
                    {},
                    match.loader.options || {},
                    loaderOptions
                ),
        });
    }

    log('Applied Sass loaders options.');
}

function overrideLoader(
    match: CompleteLoader,
    sassOptions: SassOptions,
    context: Context
) {
    const { loaderOptions } = sassOptions;

    if (loaderOptions) {
        applyLoaderOptions(match, loaderOptions, context);

        log('Overrided Sass loader.');
    }
}

export function overrideSass(
    styleConfig: CracoStyleConfig,
    webpackConfig: WebpackConfig,
    context: Context
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
            overrideLoader(x as CompleteLoader, styleConfig.sass!, context);
        });
    }

    return webpackConfig;
}
