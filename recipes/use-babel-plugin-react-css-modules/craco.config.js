const CSS_MODULE_LOCAL_IDENT_NAME = "[local]___[hash:base64:5]";

module.exports = {
    style: {
        modules: {
            localIdentName: CSS_MODULE_LOCAL_IDENT_NAME
        }
    },
    babel: {
        plugins: [
            ["babel-plugin-react-css-modules", { generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME, attributeNames: { activeStyleName: "activeClassName" } }]
        ]
    }
};
