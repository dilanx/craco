module.exports = {
    style: {
        postcss: {
            plugins: [
                require("cssnano")({
                    preset: "default"
                })
            ]
        }
    }
};
