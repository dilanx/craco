import type {
  BaseContext,
  Configure,
  CracoConfig,
  CracoEsLintConfig,
} from '@craco/types';
import type { PluginOptions } from 'eslint-webpack-plugin/types/options';
import type { Configuration as WebpackConfig } from 'webpack';

import { log, logError } from '../../logger';
import { deepMergeWithArray, isFunction } from '../../utils';
import { getPlugin, pluginByName, removePlugins } from '../../webpack-plugins';

function disableEslint(webpackConfig: WebpackConfig) {
  const { hasRemovedAny } = removePlugins(
    webpackConfig,
    pluginByName('ESLintWebpackPlugin')
  );

  if (hasRemovedAny) {
    log('Disabled ESLint.');
  } else {
    logError("Couldn't disabled ESLint.");
  }
}

function extendsEslintConfig(
  plugin: any,
  eslintConfig: CracoEsLintConfig,
  context: BaseContext
) {
  const { configure } = eslintConfig;

  if (configure) {
    if (isFunction(configure)) {
      if (plugin.options) {
        plugin.options.baseConfig = configure(
          plugin.options.baseConfig || {},
          context
        );
      } else {
        plugin.options = {
          baseConfig: configure({}, context),
        };
      }

      if (!plugin.options.baseConfig) {
        throw new Error(
          "craco: 'eslint.configure' function didn't return a config object."
        );
      }
    } else {
      // TODO: ensure is otherwise a plain object, if not, log an error.
      if (plugin.options) {
        plugin.options.baseConfig = deepMergeWithArray(
          {},
          plugin.options.baseConfig || {},
          configure
        );
      } else {
        plugin.options = {
          baseConfig: configure,
        };
      }
    }

    log("Merged ESLint config with 'eslint.configure'.");
  }
}

function useEslintConfigFile(plugin: any) {
  if (plugin.options) {
    plugin.options.useEslintrc = true;
    delete plugin.options.baseConfig;
  } else {
    plugin.options = {
      useEslintrc: true,
    };
  }

  log('Overrided ESLint config to use a config file.');
}

function enableEslintIgnoreFile(plugin: any) {
  if (plugin.options) {
    plugin.options.ignore = true;
  } else {
    plugin.options = {
      ignore: true,
    };
  }

  log('Overrided ESLint config to enable an ignore file.');
}

function applyPluginOptions(
  plugin: any,
  pluginOptions: Configure<PluginOptions, BaseContext>,
  context: BaseContext
) {
  if (isFunction(pluginOptions)) {
    plugin.options = pluginOptions(plugin.options || {}, context);

    if (!plugin.options) {
      throw new Error(
        "craco: 'eslint.pluginOptions' function didn't return a config object."
      );
    }
  } else {
    // TODO: ensure is otherwise a plain object, if not, log an error.
    plugin.options = deepMergeWithArray(plugin.options || {}, pluginOptions);
  }

  log('Applied ESLint plugin options.');
}

export function overrideEsLint(
  cracoConfig: CracoConfig,
  webpackConfig: WebpackConfig,
  context: BaseContext
) {
  if (cracoConfig.eslint) {
    const { enable, mode, pluginOptions } = cracoConfig.eslint;

    if (enable === false) {
      disableEslint(webpackConfig);

      return webpackConfig;
    }

    const { isFound, match } = getPlugin(
      webpackConfig,
      pluginByName('ESLintWebpackPlugin')
    );

    if (!isFound) {
      logError('Cannot find ESLint plugin (ESLintWebpackPlugin).');
      return webpackConfig;
    }

    enableEslintIgnoreFile(match);

    if (mode === 'file') {
      useEslintConfigFile(match);
    } else {
      extendsEslintConfig(match, cracoConfig.eslint, context);
    }

    if (pluginOptions) {
      applyPluginOptions(match, pluginOptions, context);
    }
  }

  return webpackConfig;
}
