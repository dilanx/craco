const { POSTCSS_MODES } = require("@craco/craco")

module.exports = {
  style: {
    postcss: {
      mode: POSTCSS_MODES.file,
    },
  },
}
