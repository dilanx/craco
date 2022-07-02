>
> ℹ️ The latest CRACO release does not support CRA 5, but alpha builds will be regularly released over the next few days. Keep up to date with our progress [here](https://github.com/dilanx/craco/issues/426).
>

# CRACO

[![NPM Status](https://img.shields.io/npm/v/@craco/craco.svg)](https://www.npmjs.com/package/@craco/craco)
[![Build Status](https://img.shields.io/travis/gsoft-inc/craco/master.svg?style=flat&label=travis)](https://travis-ci.org/gsoft-inc/craco)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/sharegate/craco/pulls)

[![NPM Downloads](https://img.shields.io/npm/dm/@craco/craco.svg)](https://www.npmjs.com/package/@craco/craco)

**C**reate **R**eact **A**pp **C**onfiguration **O**verride is an easy and comprehensible configuration layer for create-react-app.

Get all the benefits of create-react-app **and** customization without using 'eject' by adding a single configuration (e.g. `craco.config.js`) file at the root of your application and customize your eslint, babel, postcss configurations and many more.

All you have to do is create your app using [create-react-app](https://github.com/facebook/create-react-app/) and customize the configuration file.

## Support

- Create React App (CRA) 4.*
- Yarn
- Yarn Workspace
- NPM
- Lerna (with or without hoisting)
- Custom `react-scripts` version

## Documentation

- [Installation](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#installation) - How to install and setup CRACO.
- [Configuration](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration) - How to customize your CRA installation with CRACO.
  - [Configuration File](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-file)
  - [Configuration Helpers](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-helpers)
  - [Exporting your Configuration](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#exporting-your-configuration)
  - [Setting a Custom Location for the configuration file](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#setting-a-custom-location-for-cracoconfigjs)
- [CRA Toolchain for Beginners](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#cra-toolchain-for-beginners)
  - [Notes on CRA Configurations and Problem Solving](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#notes-on-cra-configurations-and-problem-solving)
  - [Ejecting CRA to Learn](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#ejecting-cra-to-learn)
  - [Direct Versus Functional Config Definitions](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#direct-object-literal-versus-functional-config-definitions)
- [API](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#api) - CRACO APIs for Jest and Webpack.
  - [Jest API](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#jest-api)
  - [Webpack API](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#webpack-api)
- [Recipes](https://github.com/sharegate/craco/tree/master/recipes) – Short recipes for common use cases.
- [Available Plugins](#community-maintained-plugins) - Plugins maintained by the community.
- [Develop a Plugin](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#develop-a-plugin) - How to develop a plugin for CRACO.
- [Backward Compatibility](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#backward-compatibility)
- [Debugging](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#debugging)

## Community Maintained Plugins

* [craco-preact](https://github.com/DocSpring/craco-preact) by [@DocSpring](https://github.com/DocSpring)
* [craco-less](https://github.com/DocSpring/craco-less) by [@DocSpring](https://github.com/DocSpring)
* [craco-antd](https://github.com/DocSpring/craco-antd) by [@DocSpring](https://github.com/DocSpring)
* [craco-plugin-react-hot-reload](https://github.com/HasanAyan/craco-plugin-react-hot-reload) by [@hasanayan](https://github.com/hasanayan)
* [craco-plugin-single-spa-application](https://github.com/hasanayan/craco-plugin-single-spa-application) by [@hasanayan](https://github.com/hasanayan)
* [craco-babel-loader](https://github.com/rjerue/craco-babel-loader) by [@rjerue](https://github.com/rjerue/)
* [craco-esbuild](https://github.com/pradel/create-react-app-esbuild) by [@pradel](https://github.com/pradel)
* [craco-raw-loader](https://github.com/melMass/craco-raw-loader) by [@melMass](https://github.com/melMass)
* [craco-base64-inline-loader](https://github.com/melMass/craco-base64-inline-loader) by [@melMass](https://github.com/melMass)
* [craco-workbox](https://github.com/kevinsperrine/craco-workbox) by [@kevinsperrine](https://github.com/kevinsperrine)
* [craco-use-babelrc](https://github.com/jackwilsdon/craco-use-babelrc) by [@jackwilsdon](https://github.com/jackwilsdon)
* [craco-image-optimizer-plugin](https://github.com/kkulbae/craco-image-optimizer-plugin) by [@kkulbae](https://github.com/kkulbae)
* [craco-interpolate-html-plugin](https://github.com/kkulbae/craco-interpolate-html-plugin) by [@kkulbae](https://github.com/kkulbae)
* [craco-cesium](https://www.npmjs.com/package/craco-cesium) by [rot1024](https://github.com/rot1024)
* [craco-sass-resources-loader](https://github.com/tilap/craco-sass-resources-loader) by [tilap](https://github.com/tilap)
* [craco-linaria](https://github.com/jedmao/craco-linaria) by [jedmao](https://github.com/jedmao)
* [craco-plugin-scoped-css](https://github.com/gaoxiaoliangz/react-scoped-css/tree/master/packages/craco-plugin-scoped-css) by [gaoxiaoliangz](https://github.com/gaoxiaoliangz)
* [react-app-alias](https://github.com/oklas/react-app-alias) by [@oklas](https://github.com/oklas)
* [craco-favicons](https://github.com/rickysullivan/craco-favicons) by [@rickysullivan](https://github.com/rickysullivan)
* [craco-styled-jsx](https://github.com/cr4zyc4t/craco-styled-jsx) by [@cr4zyc4t](https://github.com/cr4zyc4t)
* [craco-purescript-loader](https://github.com/andys8/craco-purescript-loader) by [@andys8](https://github.com/andys8)
* [craco-parameter-decorator](https://github.com/org-redtea/craco-parameter-decorator) by [@Hokid](https://github.com/Hokid)
* [storybook-preset-craco](https://github.com/artisanofcode/storybook-preset-craco) by [@danielknell](https://github.com/danielknell)

## Acknowledgements

[@timarney](https://github.com/timarney) for having created [react-app-rewired](https://github.com/timarney/react-app-rewired).

## License

Copyright © 2020, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a 
copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
