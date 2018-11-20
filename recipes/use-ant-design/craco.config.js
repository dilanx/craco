// Offical documentation available at: https://github.com/FormAPI/craco-antd

module.exports = {
    plugins: [
        {
            plugin: require("craco-antd"),
            options: {
                customizeTheme: {
                    "@primary-color": "#1DA57A"
                },
                lessLoaderOptions: {
                    noIeCompat: true
                }
            }
        }
    ]
};
