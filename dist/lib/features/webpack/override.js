"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideWebpackProd = exports.overrideWebpackDev = void 0;
var cra_1 = require("../../cra");
var merge_webpack_config_1 = require("./merge-webpack-config");
function overrideWebpackDev(cracoConfig, context) {
    var craWebpackConfig = (0, cra_1.loadWebpackDevConfig)(cracoConfig);
    var resultingWebpackConfig = (0, merge_webpack_config_1.mergeWebpackConfig)(cracoConfig, craWebpackConfig, context);
    (0, cra_1.overrideWebpackDevConfig)(cracoConfig, resultingWebpackConfig);
}
exports.overrideWebpackDev = overrideWebpackDev;
function overrideWebpackProd(cracoConfig, context) {
    var craWebpackConfig = (0, cra_1.loadWebpackProdConfig)(cracoConfig);
    var resultingWebpackConfig = (0, merge_webpack_config_1.mergeWebpackConfig)(cracoConfig, craWebpackConfig, context);
    (0, cra_1.overrideWebpackProdConfig)(cracoConfig, resultingWebpackConfig);
}
exports.overrideWebpackProd = overrideWebpackProd;
