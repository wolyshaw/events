const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base')

module.exports = options => {
  const Base = baseConfig(options),
  { plugins = [] } = Base

  plugins.push(new webpack.NamedModulesPlugin())
  plugins.push(new webpack.HotModuleReplacementPlugin())

  return merge((Base), {
    entry: [options.entry, 'webpack-hot-middleware/client?reload=true'],
    output: {
      publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map'
  })
}
