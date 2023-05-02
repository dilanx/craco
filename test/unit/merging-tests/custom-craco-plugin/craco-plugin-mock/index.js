const fs = require('fs');
const path = require('path');

function onPostBuild({ paths }) {
  const pluginLogPath = path.join(__dirname, '..', 'plugin.log');
  fs.writeFileSync(pluginLogPath, 'Plugin executed successfully');
}

module.exports = {
  onPostBuild,
};
