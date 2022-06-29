import type { CracoConfig } from '../types/config';
import type { BaseContext } from '../types/context';

import { cosmiconfigSync } from 'cosmiconfig';
import { default as tsLoader } from 'cosmiconfig-typescript-loader';
import path from 'path';
import { getArgs } from './args';
import { applyCracoConfigPlugins } from './features/plugins';
import { log } from './logger';
import { projectRoot } from './paths';
import { deepMergeWithArray, isArray, isFunction, isString } from './utils';

const DEFAULT_CONFIG: CracoConfig = {
    reactScriptsVersion: 'react-scripts',
    style: {
        postcss: {
            mode: 'extends',
        },
    },
    eslint: {
        mode: 'extends',
    },
    jest: {
        babel: {
            addPresets: true,
            addPlugins: true,
        },
    },
};

const moduleName = 'craco';
const explorer = cosmiconfigSync(moduleName, {
    searchPlaces: [
        'package.json',
        `${moduleName}.config.ts`,
        `${moduleName}.config.js`,
        `${moduleName}.config.cjs`,
        `.${moduleName}rc.ts`,
        `.${moduleName}rc.js`,
        `.${moduleName}rc`,
    ],
    loaders: {
        '.ts': tsLoader(),
    },
});

function ensureConfigSanity(cracoConfig: CracoConfig) {
    if (cracoConfig.plugins && isArray(cracoConfig.plugins)) {
        cracoConfig.plugins.forEach((x, index) => {
            if (!x.plugin) {
                throw new Error(
                    `craco: Malformed plugin at index: ${index} of 'plugins'.`
                );
            }
        });
    }
}

export function processCracoConfig(
    cracoConfig: CracoConfig,
    context: BaseContext
) {
    let resultingCracoConfig = deepMergeWithArray(
        {},
        DEFAULT_CONFIG,
        cracoConfig
    );
    ensureConfigSanity(resultingCracoConfig);

    return applyCracoConfigPlugins(resultingCracoConfig, context);
}

function getConfigPath() {
    const args = getArgs();

    if (args.config && isString(args.config)) {
        return path.resolve(projectRoot, args.config);
    } else {
        const packageJsonPath = path.join(projectRoot, 'package.json');

        const packageJson = require(packageJsonPath);

        if (packageJson.cracoConfig && isString(packageJson.cracoConfig)) {
            // take it as the path to the config file if it's path-like, otherwise assume it contains the config content below
            return path.resolve(projectRoot, packageJson.cracoConfig);
        } else {
            const result = explorer.search(projectRoot);

            if (result === null) {
                throw new Error(
                    'craco: Config file not found. check if file exists at root (craco.config.ts, craco.config.js, .cracorc.js, .cracorc.json, .cracorc.yaml, .cracorc)'
                );
            }

            return result.filepath;
        }
    }
}

function getConfigAsObject(context: BaseContext) {
    const configFilePath = getConfigPath();
    log('Config file path resolved to: ', configFilePath);
    const result = explorer.load(configFilePath);

    const configAsObject = isFunction(result?.config)
        ? result?.config(context)
        : result?.config;

    if (!configAsObject) {
        throw new Error(
            "craco: Config function didn't return a config object."
        );
    }
    return configAsObject;
}

export function loadCracoConfig(context: BaseContext) {
    const configAsObject = getConfigAsObject(context);

    if (configAsObject instanceof Promise) {
        throw new Error(
            'craco: Config function returned a promise. Use `loadCracoConfigAsync` instead of `loadCracoConfig`.'
        );
    }

    return processCracoConfig(configAsObject, context);
}

// The "build", "start", and "test" scripts use this to wait for any promises to resolve before they run.
export async function loadCracoConfigAsync(context: BaseContext) {
    const configAsObject = await getConfigAsObject(context);

    if (!configAsObject) {
        throw new Error("craco: Async config didn't return a config object.");
    }

    return processCracoConfig(configAsObject, context);
}
