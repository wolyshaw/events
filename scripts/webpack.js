const path = require('path')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const mode = process.env.NODE_ENV || 'development'

module.exports = options => {
  const setting = Object.assign({
    title: 'event',
  }, options)
  return {
    mode: 'production',
    entry: options.entry,
    output: options.output,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { 'targets': { browsers: ['last 2 versions'] }, modules: false }], '@babel/preset-react'],
                plugins: [
                  '@babel/plugin-syntax-dynamic-import',
                  '@babel/plugin-transform-runtime',
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-object-rest-spread',
                  ['@babel/transform-react-jsx', { 'pragma': 'h' }]
                ]
              }
            },
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ]
        },
        {
          test: /\.less$/,
          include: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                modifyVars: {},
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.(css|less)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?modules&localIdentName=[local]--[hash:base64:5]',
            {
              loader: 'less-loader',
            }
          ]
        },
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(path.join(__dirname, '../')),
      }
    },
    node: {
      __dirname: true,
      __filename: true
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'common',
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: setting.title,
        template: setting.template,
        analytics: 'html.analytics',
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css',
        chunkFilename: '[name]-[contenthash].css'
      }),
    ]
  }
}
