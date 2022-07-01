"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideStyle = void 0;
var css_1 = require("./css");
var postcss_1 = require("./postcss");
var sass_1 = require("./sass");
function overrideStyle(cracoConfig, webpackConfig, context) {
    if (cracoConfig.style) {
        webpackConfig = (0, css_1.overrideCss)(cracoConfig.style, webpackConfig, context);
        webpackConfig = (0, sass_1.overrideSass)(cracoConfig.style, webpackConfig, context);
        webpackConfig = (0, postcss_1.overridePostcss)(cracoConfig.style, webpackConfig, context);
    }
    return webpackConfig;
}
exports.overrideStyle = overrideStyle;
