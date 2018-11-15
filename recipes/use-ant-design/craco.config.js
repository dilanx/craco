// Install the craco-antd plugin:
//
// Yarn:   yarn add craco-antd
// NPM:    npm i -S craco-antd
//
// craco-antd documentation: https://github.com/FormAPI/craco-antd

module.exports = {
    plugins: [
    {
        plugin: require("craco-antd"),
        options: {
        // You can customize the theme in here, or by creating an
        // antd.customize.json file in your project's root directory.
        customizeTheme: {
            "@primary-color": "#1DA57A",
            "@link-color": "#1DA57A",
            "@border-radius-base": "2px"
        },
        lessLoaderOptions: {
            // Any other less-loader options
            // See: https://webpack.js.org/loaders/less-loader/
        }
        }
    }
    ]
};
