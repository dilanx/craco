const fs = require('fs');
const path = require('path');
const cracoConfig = require('./craco.config');
const CracoPluginMock = require('./craco-plugin-mock');

describe('CRACO custom plugin', () => {
  const pluginLogPath = path.join(__dirname, 'plugin.log');

  afterEach(() => {
    if (fs.existsSync(pluginLogPath)) {
      fs.unlinkSync(pluginLogPath);
    }
  });

  it('correctly includes the custom plugin', () => {
    const pluginEntry = cracoConfig.plugins.find(pluginEntry => pluginEntry.plugin === CracoPluginMock);
    expect(pluginEntry).toBeDefined();
  });

  it('correctly executes the onPostBuild function of the custom plugin', () => {
    const pluginEntry = cracoConfig.plugins.find(pluginEntry => pluginEntry.plugin === CracoPluginMock);

    pluginEntry.plugin.onPostBuild({});

    const logContent = fs.readFileSync(pluginLogPath, 'utf-8');
    expect(logContent).toEqual('Plugin executed successfully');
  });
});
