// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsRecipes = {
  docs: [
    {
      type: 'category',
      label: 'Recipes',
      link: {
        type: 'generated-index',
        slug: '/',
        description: 'A collection of configs for common use cases.',
      },
      items: ['add-autoprefixer-options'],
    },
  ],
};

module.exports = sidebarsRecipes;
