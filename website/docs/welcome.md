---
title: Welcome
slug: /
---

# CRACO

## What is CRACO?

To customize most things when using [Create React App](https://create-react-app.dev), you can eject. However, you'll then need to maintain every configuration and script yourself, which can be a bit annoying. **CRACO**, which stands for **C**reate **R**eact **A**pp **C**onfiguration **O**verride, allows you to get all of the benefits of [Create React App](https://create-react-app.dev) without ejecting. Customize your configurations ESLint, Babel, PostCSS, and many more with just a single configuration file at the root of your project.

:::caution

By doing this you're breaking the ["guarantees"](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710) that CRA provides. That is to say, you now "own" the configs. **No support** will be provided. Proceed with caution.

:::

## About the documentation

On this site, you can find the complete documentation for CRACO. If you notice any mistakes or have something you think should be added, create an [issue](https://github.com/dilanx/craco/issues) or submit a pull request.

## CRA toolchain

### Introduction

Create React App is intended to allow people to get started with writing React apps quickly. It does this by packaging several key components with a solid default configuration.

After some initial experimentation, many people find the default CRA is not quite the right fit. Yet, selecting and configuring a toolchain featuring all of the components CRA already offers is overwhelming.

CRACO allows you to enjoy the recognizable project structure of CRA while changing detailed configuration settings of each component.

### Notes on CRA configurations and problem solving

Keep in mind that there are _some_ configuration settings available to CRA without CRACO.

Getting exactly what you want may involve a combination of making changes through your CRACO configuration file and by using some of the more limited but still important settings available in CRA.

Before jumping into customizing your CRACO configuration, step back and think about each part of the problem you're trying to solve. Be sure to review these resources on the CRA configuration, as it may save you time:

- [Important environment variables that configure CRA](https://create-react-app.dev/docs/advanced-configuration/)
- [Learn about using `postbuild` commands in `package.json`](https://stackoverflow.com/questions/41495658/use-custom-build-output-folder-when-using-create-react-app/51818028#51818028)
- [Proxying API or other requests](https://create-react-app.dev/docs/proxying-api-requests-in-development/) or ["how to integrate CRA's dev server with a second backend"](https://github.com/facebook/create-react-app/issues/147)
- [Search CRACO issues for gotchas, hints, and examples](https://github.com/dilanx/craco/issues?q=is%3Aissue+sort%3Aupdated-desc)

### Ejecting CRA to learn

Avoiding ejecting is a major goal for many CRACO users. However, if you're still learning toolchains and modern frontend workflows, it may be helpful to create a sample ejected CRA project to see how the default CRA app configures each of the components.

While CRACO's default configuration inherits directly from CRA's default settings, seeing the default CRA config files throughout the ejected CRA file structure may give you useful perspective.

You may even want to try testing a change in the ejected app to better understand how it would be done with your CRACO-based project.

## Acknowledgements

- Thanks to [@gsoft-inc](https://github.com/gsoft-inc), the original creator of CRACO, who then passed the project off to me. Specifically, a big shout out to [@patricklafrance](https://github.com/patricklafrance).
- Thanks to [@timarney](https://github.com/timarney), the creator of [react-app-rewired](https://github.com/timarney/react-app-rewired), for his original idea.

## License

Copyright © 2022 Dilan Nair.

This code is licensed under the Apache License 2.0, which can be viewed [here](https://github.com/dilanx/craco/blob/main/packages/craco/LICENSE).
