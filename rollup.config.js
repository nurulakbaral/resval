const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup')
const fileSizeVisualization = require('rollup-plugin-filesize')
const { terser } = require('rollup-plugin-terser')

module.exports = (config) => {
  nrwlConfig(config)
  return {
    ...config,
    plugins: [...config.plugins, fileSizeVisualization(), terser()],
  }
}
