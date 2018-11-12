// You just need to add the "preact" and "preact-compat" libraries
// to your package.json:
//
// $ yarn add preact preact-compat
//
// OR
//
// $ npm i -S preact preact-compat

module.exports = {
  webpack: {
    alias: { react: 'preact-compat', 'react-dom': 'preact-compat' },
  }
};
