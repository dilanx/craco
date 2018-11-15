// Install the craco-less plugin:
//
// Yarn:   yarn add craco-less
// NPM:    npm i -S craco-less
//
// craco-less documentation: https://github.com/FormAPI/craco-less

module.exports = {
    plugins: [
        {
            plugin: require("craco-less"),
            options: {
                // less-loader options
                // See: https://webpack.js.org/loaders/less-loader/
            }
        }
    ]
};
