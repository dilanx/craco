// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'welcome',
    'getting-started',
    {
      type: 'category',
      label: 'Configuration',
      link: {
        type: 'generated-index',
      },
      items: [
        'configuration/getting-started',
        'configuration/style',
        'configuration/eslint',
        'configuration/babel',
        'configuration/typescript',
        'configuration/webpack',
        'configuration/jest',
        'configuration/devserver',
        'configuration/plugins',
      ],
    },
    'configuration-api',
    {
      type: 'category',
      label: 'Plugin API',
      link: {
        type: 'generated-index',
      },
      items: [
        'plugin-api/getting-started',
        'plugin-api/hooks',
        {
          type: 'category',
          label: 'Utility Functions',
          link: {
            type: 'generated-index',
            description:
              'CRACO provides a suite of utility functions to help you develop your plugins.',
          },
          items: [
            'plugin-api/utility-functions/webpack-loaders',
            'plugin-api/utility-functions/webpack-asset-modules',
            'plugin-api/utility-functions/webpack-plugins',
            'plugin-api/utility-functions/miscellaneous',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
