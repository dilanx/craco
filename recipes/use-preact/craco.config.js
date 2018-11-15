// Install the craco-preact plugin:
//
// Yarn:   yarn add craco-preact
// NPM:    npm i -S craco-preact
//
// craco-preact documentation: https://github.com/FormAPI/craco-preact

module.exports = {
  plugins: [{ plugin: require('craco-preact') }],
};


// FormAPI is committed to maintaining the craco-preact plugin.
// They will ensure that Preact works with any future versions of
// create-react-app, craco, and webpack.
//
// If you would prefer to set it up manually, here's how you can do that:
//
// Add the "preact" and "preact-compat" libraries
// to your package.json:
//
// Yarn:   yarn add preact preact-compat
// NPM:    npm i -S preact preact-compat
//
// Then use this craco.config.js:

module.exports = {
  webpack: {
    alias: { react: 'preact-compat', 'react-dom': 'preact-compat' },
  }
};
