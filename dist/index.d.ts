import { addAfterAssetModule, addAfterAssetModules, addBeforeAssetModule, addBeforeAssetModules, assetModuleByName, getAssetModule, getAssetModules, removeAssetModules } from './lib/asset-modules';
import { createDevServerConfigProviderProxy } from './lib/features/dev-server/api';
import { createJestConfig } from './lib/features/jest/api';
import { createWebpackDevConfig, createWebpackProdConfig } from './lib/features/webpack/api';
import { addAfterLoader, addAfterLoaders, addBeforeLoader, addBeforeLoaders, getLoader, getLoaders, loaderByName, removeLoaders } from './lib/loaders';
import { gitHubIssueUrl, throwUnexpectedConfigError } from './lib/plugin-utils';
import { when, whenDev, whenProd, whenTest } from './lib/user-config-utils';
import { addPlugins, getPlugin, pluginByName, removePlugins } from './lib/webpack-plugins';
export { getLoader, getLoaders, removeLoaders, addBeforeLoader, addBeforeLoaders, addAfterLoader, addAfterLoaders, loaderByName, getAssetModule, getAssetModules, removeAssetModules, addBeforeAssetModule, addBeforeAssetModules, addAfterAssetModule, addAfterAssetModules, assetModuleByName, getPlugin, pluginByName, addPlugins, removePlugins, when, whenDev, whenProd, whenTest, throwUnexpectedConfigError, gitHubIssueUrl, createJestConfig, createWebpackDevConfig, createWebpackProdConfig, createDevServerConfigProviderProxy, };
