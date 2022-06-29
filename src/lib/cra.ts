import type { Configuration as WebpackConfig } from 'webpack';
import type { CracoConfig } from '../types/config';

import path from 'path';
import semver from 'semver';
import { log } from './logger';
import { projectRoot } from './paths';

var envLoaded = false;
const CRA_LATEST_SUPPORTED_MAJOR_VERSION = '5.0.0';

/************  Common  ************/

// TODO here

function resolveConfigFilePath(cracoConfig: CracoConfig, fileName: string) {
    if (!envLoaded) {
        // Environment variables must be loaded before the CRA paths, otherwise they will not be applied.
        require(resolveConfigFilePathInner(cracoConfig, 'env.js'));

        envLoaded = true;
    }

    return resolveConfigFilePathInner(cracoConfig, fileName);
}

function resolveConfigFilePathInner(
    cracoConfig: CracoConfig,
    fileName: string
) {
    return require.resolve(
        path.join(cracoConfig.reactScriptsVersion, 'config', fileName),
        { paths: [projectRoot] }
    );
}

function resolveScriptsFilePath(cracoConfig: CracoConfig, fileName: string) {
    return require.resolve(
        path.join(cracoConfig.reactScriptsVersion, 'scripts', fileName),
        { paths: [projectRoot] }
    );
}

function resolveReactDevUtilsPath(fileName: string) {
    return require.resolve(path.join('react-dev-utils', fileName), {
        paths: [projectRoot],
    });
}

function overrideModule(modulePath: string, newModule: any) {
    if (!require.cache[modulePath]) {
        throw new Error(`Module not found: ${modulePath}`);
    }
    require.cache[modulePath]!.exports = newModule;
    log(`Overrided require cache for module: ${modulePath}`);
}

function resolvePackageJson(cracoConfig: CracoConfig) {
    return require.resolve(
        path.join(cracoConfig.reactScriptsVersion, 'package.json'),
        { paths: [projectRoot] }
    );
}

export function getReactScriptVersion(cracoConfig: CracoConfig) {
    const reactScriptPackageJsonPath = resolvePackageJson(cracoConfig);
    const { version } = require(reactScriptPackageJsonPath);

    return {
        version,
        isSupported: semver.gte(version, CRA_LATEST_SUPPORTED_MAJOR_VERSION),
    };
}

/************  Paths  ************/

let _resolvedCraPaths: any = null;

export function getCraPaths(cracoConfig: CracoConfig) {
    if (!_resolvedCraPaths) {
        _resolvedCraPaths = require(resolveConfigFilePath(
            cracoConfig,
            'paths.js'
        ));
    }

    return _resolvedCraPaths;
}

/************  Webpack Dev Config  ************/

function getWebpackDevConfigPath(cracoConfig: CracoConfig) {
    try {
        return {
            filepath: resolveConfigFilePath(cracoConfig, 'webpack.config.js'),
            isLegacy: false,
        };
    } catch (e) {
        return {
            filepath: resolveConfigFilePath(
                cracoConfig,
                'webpack.config.dev.js'
            ),
            isLegacy: true,
        };
    }
}

export function loadWebpackDevConfig(cracoConfig: CracoConfig): WebpackConfig {
    const result = getWebpackDevConfigPath(cracoConfig);

    log('Found Webpack dev config at: ', result.filepath);

    if (result.isLegacy) {
        return require(result.filepath);
    }

    return require(result.filepath)('development');
}

export function overrideWebpackDevConfig(
    cracoConfig: CracoConfig,
    newConfig: WebpackConfig
) {
    const result = getWebpackDevConfigPath(cracoConfig);

    if (result.isLegacy) {
        overrideModule(result.filepath, newConfig);
    } else {
        overrideModule(result.filepath, () => newConfig);
    }

    log('Overrided Webpack dev config.');
}

/************  Webpack Prod Config  ************/

function getWebpackProdConfigPath(cracoConfig: CracoConfig) {
    try {
        return {
            filepath: resolveConfigFilePath(cracoConfig, 'webpack.config.js'),
            isLegacy: false,
        };
    } catch (e) {
        return {
            filepath: resolveConfigFilePath(
                cracoConfig,
                'webpack.config.prod.js'
            ),
            isLegacy: true,
        };
    }
}

export function loadWebpackProdConfig(cracoConfig: CracoConfig): WebpackConfig {
    const result = getWebpackProdConfigPath(cracoConfig);

    log('Found Webpack prod config at: ', result.filepath);

    if (result.isLegacy) {
        return require(result.filepath);
    }

    return require(result.filepath)('production');
}

export function overrideWebpackProdConfig(
    cracoConfig: CracoConfig,
    newConfig: WebpackConfig
) {
    const result = getWebpackProdConfigPath(cracoConfig);

    if (result.isLegacy) {
        overrideModule(result.filepath, newConfig);
    } else {
        overrideModule(result.filepath, () => newConfig);
    }

    log('Overrided Webpack prod config.');
}

/************  Dev Server Config  ************/

function getDevServerConfigPath(cracoConfig: CracoConfig) {
    return resolveConfigFilePath(cracoConfig, 'webpackDevServer.config.js');
}

function getDevServerUtilsPath() {
    return resolveReactDevUtilsPath('WebpackDevServerUtils.js');
}

export function loadDevServerConfigProvider(cracoConfig: CracoConfig) {
    const filepath = getDevServerConfigPath(cracoConfig);

    log('Found dev server config at: ', filepath);

    return require(filepath);
}

export function overrideDevServerConfigProvider(
    cracoConfig: CracoConfig,
    configProvider: any
) {
    const filepath = getDevServerConfigPath(cracoConfig);

    overrideModule(filepath, configProvider);

    log('Overrided dev server config provider.');
}

export function loadDevServerUtils() {
    const filepath = getDevServerUtilsPath();

    log('Found dev server utils at: ', filepath);

    return require(filepath);
}

export function overrideDevServerUtils(newUtils: any) {
    const filepath = getDevServerUtilsPath();

    overrideModule(filepath, newUtils);

    log('Overrided dev server utils.');
}

/************  Jest Config  ************/

function getCreateJestConfigPath(cracoConfig: CracoConfig) {
    return resolveScriptsFilePath(cracoConfig, 'utils/createJestConfig.js');
}

export function loadJestConfigProvider(cracoConfig: CracoConfig) {
    const filepath = getCreateJestConfigPath(cracoConfig);

    log('Found jest config at: ', filepath);

    return require(filepath);
}

export function overrideJestConfigProvider(
    cracoConfig: CracoConfig,
    configProvider: any
) {
    const filepath = getCreateJestConfigPath(cracoConfig);

    overrideModule(filepath, configProvider);

    log('Overrided Jest config provider.');
}

/************  Scripts  *******************/

export function start(cracoConfig: CracoConfig) {
    const filepath = resolveScriptsFilePath(cracoConfig, 'start.js');

    log('Starting CRA at: ', filepath);

    require(filepath);
}

export function build(cracoConfig: CracoConfig) {
    const filepath = resolveScriptsFilePath(cracoConfig, 'build.js');

    log('Building CRA at: ', filepath);

    require(filepath);
}

export function test(cracoConfig: CracoConfig) {
    const filepath = resolveScriptsFilePath(cracoConfig, 'test.js');

    log('Testing CRA at: ', filepath);

    require(filepath);
}
