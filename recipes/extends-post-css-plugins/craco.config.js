// This solution works for adding new plugins to CRA.
// If you want to also override the existing plugins, we recommend to use your own post css config file.
// You can find a recipe here: https://github.com/sharegate/craco/tree/master/recipes/use-a-post-css-config-file

module.exports = {
    style: {
        postcss: {
            plugins: [
                require("cssnano")({
                    preset: 'default',
                })
            ]
        }
    }
};
