// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeThemeStyles =
  require('prism-react-renderer/themes/vsDark').styles;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CRACO',
  tagline: 'Create React App Configuration Override',
  url: 'https://craco.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dilanx', // Usually your GitHub org/user name.
  projectName: 'craco', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/dilanx/craco/tree/main/website',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'plugins',
        path: 'plugins',
        routeBasePath: 'plugins',
        sidebarPath: false,
        editUrl: 'https://github.com/dilanx/craco/tree/main/website',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'recipes',
        path: 'recipes',
        routeBasePath: 'recipes',
        sidebarPath: require.resolve('./sidebarsRecipes.js'),
        editUrl: 'https://github.com/dilanx/craco/tree/main/website',
      },
    ],
    'docusaurus-plugin-sass',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'CRACO',
        logo: {
          alt: 'CRACO logo',
          src: 'img/craco.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'welcome',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: 'plugins',
            label: 'Plugins',
            position: 'left',
          },
          {
            to: 'recipes',
            label: 'Recipes',
            position: 'left',
          },
          {
            href: 'https://github.com/dilanx/craco',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://www.npmjs.com/package/@craco/craco',
            label: 'npm',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'Dilan Nair Open Source Logo',
          src: '/img/open-source.svg',
          href: 'https://www.dilanxd.com',
          width: 280,
          target: '_blank',
        },
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'About CRACO',
                to: 'docs',
              },
              {
                label: 'Getting Started',
                to: 'docs/getting-started',
              },
              {
                label: 'Configuration',
                to: 'docs/configuration/getting-started',
              },
              {
                label: 'Configuration API',
                to: 'docs/configuration-api',
              },
              {
                label: 'Plugin API',
                to: 'docs/plugin-api/getting-started',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Community Maintained Plugins',
                to: 'plugins',
              },
              {
                label: 'Recipes',
                to: 'recipes',
              },
              {
                label: 'Issues',
                href: 'https://github.com/dilanx/craco/issues',
              },
              {
                label: 'Discussions',
                href: 'https://github.com/dilanx/craco/discussions',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/craco',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/dilanx/craco',
              },
              {
                label: 'npm',
                href: 'https://www.npmjs.com/package/@craco/craco',
              },
            ],
          },
        ],

        copyright: `Copyright © ${new Date().getFullYear()} Dilan Nair`,
      },
      prism: {
        darkTheme: {
          plain: {
            color: '#D4D4D4',
            backgroundColor: '#212121',
          },
          styles: [
            ...darkCodeThemeStyles,
            {
              types: ['title'],
              style: {
                color: '#569CD6',
                fontWeight: 'bold',
              },
            },
            {
              types: ['property', 'parameter'],
              style: {
                color: '#9CDCFE',
              },
            },
            {
              types: ['script'],
              style: {
                color: '#D4D4D4',
              },
            },
            {
              types: ['boolean', 'arrow', 'atrule', 'tag'],
              style: {
                color: '#569CD6',
              },
            },
            {
              types: ['number', 'color', 'unit'],
              style: {
                color: '#B5CEA8',
              },
            },
            {
              types: ['font-matter'],
              style: {
                color: '#CE9178',
              },
            },
            {
              types: ['keyword', 'rule'],
              style: {
                color: '#C586C0',
              },
            },
            {
              types: ['regex'],
              style: {
                color: '#D16969',
              },
            },
            {
              types: ['maybe-class-name'],
              style: {
                color: '#4EC9B0',
              },
            },
            {
              types: ['constant'],
              style: {
                color: '#4FC1FF',
              },
            },
          ],
        },
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
      },
    }),
};

module.exports = config;
