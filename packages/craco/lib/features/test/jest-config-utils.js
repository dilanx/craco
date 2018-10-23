function getJestBabelConfig({ babel }) {
    const result = (addPresets = true, addPlugins = true) => ({
        addPresets,
        addPlugins
    });

    if (babel) {
        return result(babel.addPresets, babel.addPlugins);
    }

    return result();
}

module.exports = {
    getJestBabelConfig: getJestBabelConfig
};
