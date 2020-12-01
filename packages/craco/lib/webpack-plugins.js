function pluginByName(targetPluginName) {
    return plugin => {
        return plugin.constructor.name === targetPluginName;
    };
}

function getPlugin(webpackConfig, matcher) {
    const matchingPlugin = webpackConfig.plugins.find(matcher);

    return {
        isFound: matchingPlugin !== undefined,
        match: matchingPlugin
    };
}

function removePlugins(webpackConfig, matcher) {
    const prevCount = webpackConfig.plugins.length;
    webpackConfig.plugins = webpackConfig.plugins.filter(x => !matcher(x));
    const removedPluginsCount = prevCount - webpackConfig.plugins.length;

    return {
        hasRemovedAny: removedPluginsCount > 0,
        removedCount: removedPluginsCount
    };
}

module.exports = {
    getPlugin,
    pluginByName,
    removePlugins
};
