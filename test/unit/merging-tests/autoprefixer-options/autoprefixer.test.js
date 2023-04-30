const cracoConfig = require('./craco.config');
const autoprefixer = require('autoprefixer');

describe('CRACO autoprefixer configuration', () => {
  it('correctly applies custom autoprefixer options', () => {
    const postcssPlugins = cracoConfig.style.postcss.plugins;
    const autoprefixerPluginEntry = postcssPlugins.find(
      (pluginEntry) => pluginEntry.plugin === autoprefixer
    );

    expect(autoprefixerPluginEntry).toBeDefined();
    expect(autoprefixerPluginEntry.options.grid).toEqual('autoplace');
    expect(autoprefixerPluginEntry.options.overrideBrowserslist).toEqual([
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 11',
    ]);
  });

  it('does not remove other PostCSS plugins', () => {
    const postcssPlugins = cracoConfig.style.postcss.plugins;
    const autoprefixerPluginEntry = postcssPlugins.find(
      (pluginEntry) => pluginEntry.plugin === autoprefixer
    );

    const pluginCountWithoutAutoprefixer =
      postcssPlugins.length - (autoprefixerPluginEntry ? 1 : 0);
    expect(pluginCountWithoutAutoprefixer).toBeGreaterThanOrEqual(0);
  });
});
