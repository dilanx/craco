import type { Configuration as WebpackConfig } from 'webpack';

export function pluginByName(targetPluginName: string) {
    return (plugin: any) => {
        return plugin.constructor.name === targetPluginName;
    };
}

export function getPlugin(
    webpackConfig: WebpackConfig,
    matcher: (value: any, index?: number, obj?: any[]) => boolean
) {
    const matchingPlugin = webpackConfig.plugins?.find(matcher);

    return {
        isFound: matchingPlugin !== undefined,
        match: matchingPlugin,
    };
}

export function addPlugins(
    webpackConfig: WebpackConfig,
    webpackPlugins: any[]
) {
    const prependPlugins = [];
    const appendPlugins = [];

    for (const webpackPlugin of webpackPlugins) {
        if (Array.isArray(webpackPlugin)) {
            const [plugin, order] = webpackPlugin;
            if (order === 'append') {
                appendPlugins.push(plugin);
            } else {
                // Existing behaviour is to prepend
                prependPlugins.push(plugin);
            }
            continue;
        }
        prependPlugins.push(webpackPlugin);
    }

    webpackConfig.plugins = [
        ...prependPlugins,
        ...(webpackConfig.plugins as any[]),
        ...appendPlugins,
    ];
}

export function removePlugins(
    webpackConfig: WebpackConfig,
    matcher: (value: any, index?: number, array?: any[]) => boolean
) {
    const prevCount = webpackConfig.plugins?.length ?? 0;
    webpackConfig.plugins = webpackConfig.plugins?.filter(
        (x, i, a) => !matcher(x, i, a)
    );
    const removedPluginsCount =
        prevCount - (webpackConfig.plugins?.length ?? 0);

    return {
        hasRemovedAny: removedPluginsCount > 0,
        removedCount: removedPluginsCount,
    };
}
