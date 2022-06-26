import { getLoaders, loaderByName } from '../../../loaders';
import { log, logError } from '../../../logger';
import { isArray, isFunction, deepMergeWithArray } from '../../../utils';
import { projectRoot } from '../../../paths';
import { CompleteLoader, Loader } from '../../../../types/loaders';
import {
    PostCssLoaderOptions,
    PostCssOptions,
    CracoStyleConfig,
    Context,
} from '../../../../types/config';
import { Configuration as WebpackConfig } from 'webpack';
import { isString } from 'lodash';

export const POSTCSS_MODES: {
    extends: 'extends';
    file: 'file';
} = {
    extends: 'extends',
    file: 'file',
};

const CRA_PLUGINS = (presetEnv: any) => {
    // prettier-ignore
    return [
        require("postcss-flexbugs-fixes"),
        require("postcss-preset-env")(presetEnv),
        require(require.resolve("postcss-normalize", { paths: [projectRoot] }))
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
    { plugins, env }: PostCssOptions
) {
    if (isArray(plugins) || env) {
        let postcssPlugins: any[];

        if (env) {
            const mergedPreset = deepMergeWithArray({}, CRA_PRESET_ENV, env);
            postcssPlugins = CRA_PLUGINS(mergedPreset);

            log('Merged PostCSS env preset.');
        } else {
            let craPlugins: any[] = [];

            if (!isString(match.loader.options)) {
                let options = match.loader.options?.postcssOptions;
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
                match.loader.options.postcssOptions.plugins = () =>
                    postcssPlugins;
            } else {
                match.loader.options.postcssOptions = {
                    plugins: () => postcssPlugins,
                };
            }
        }
    }
}

function applyLoaderOptions(
    match: CompleteLoader,
    loaderOptions: PostCssLoaderOptions,
    context: Context
) {
    if (isFunction(loaderOptions)) {
        match.loader.options = loaderOptions(
            match.loader.options || {},
            context
        );

        if (!match.loader!.options) {
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
    postcssConfig: PostCssOptions,
    context: Context
) {
    const { mode, loaderOptions } = postcssConfig;

    if (mode === POSTCSS_MODES.file) {
        usePostcssConfigFile(match);
    } else {
        extendsPostcss(match, postcssConfig);
    }

    if (loaderOptions) {
        applyLoaderOptions(match, loaderOptions, context);
    }

    log('Overrided PostCSS loader.');
}

export function overridePostcss(
    styleConfig: CracoStyleConfig,
    webpackConfig: WebpackConfig,
    context: Context
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
            overrideLoader(x as CompleteLoader, styleConfig.postcss!, context);
        });
    }

    return webpackConfig;
}
