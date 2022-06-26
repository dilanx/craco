import { createDevServerConfigProviderProxy } from './lib/features/dev-server/api';
import { createJestConfig } from './lib/features/jest/api';
import {
    createWebpackDevConfig,
    createWebpackProdConfig,
} from './lib/features/webpack/api';
import { ESLINT_MODES } from './lib/features/webpack/eslint';
import { POSTCSS_MODES } from './lib/features/webpack/style/postcss';
import {
    addAfterLoader,
    addAfterLoaders,
    addBeforeLoader,
    addBeforeLoaders,
    getLoader,
    getLoaders,
    loaderByName,
    removeLoaders,
} from './lib/loaders';
import { gitHubIssueUrl, throwUnexpectedConfigError } from './lib/plugin-utils';
import { when, whenDev, whenProd, whenTest } from './lib/user-config-utils';
import {
    addPlugins,
    getPlugin,
    pluginByName,
    removePlugins,
} from './lib/webpack-plugins';

export {
    getLoader,
    getLoaders,
    removeLoaders,
    addBeforeLoader,
    addBeforeLoaders,
    addAfterLoader,
    addAfterLoaders,
    loaderByName,
    getPlugin,
    pluginByName,
    addPlugins,
    removePlugins,
    when,
    whenDev,
    whenProd,
    whenTest,
    throwUnexpectedConfigError,
    gitHubIssueUrl,
    ESLINT_MODES,
    POSTCSS_MODES,
    createJestConfig,
    createWebpackDevConfig,
    createWebpackProdConfig,
    createDevServerConfigProviderProxy,
};
