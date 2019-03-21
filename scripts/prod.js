const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports  = options => {
  const Base = baseConfig(options),
  { plugins = [] } = Base
  plugins.push(new webpack.NamedModulesPlugin())
  plugins.push(new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['*.*']
  }))

  return merge(Base, {
    mode: 'production',
    entry: options.entry,
    output: {
      publicPath: './'
    }
  })
}
