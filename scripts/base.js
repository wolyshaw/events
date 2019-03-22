const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const mode = process.env.NODE_ENV || 'development'

const pxLoader = {
  loader: 'px2rem-loader',
  options: {
    remPrecision: 5,
    remUnit: 50
  }
}

module.exports = options => {
  const setting = Object.assign({}, options)
  return {
    mode,
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
            pxLoader,
          ]
        },
        {
          test: /\.less$/,
          include: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            pxLoader,
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
            pxLoader,
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('postcss-import'),
                  require('postcss-custom-properties')(),
                  require('autoprefixer')({browsers: ['ios >= 7.0']})
                ])
              }
            },
            {
              loader: 'less-loader',
            }
          ]
        },
        {
          test: /\.(jpg|png|jpeg|gif)$/,
          exclude: /node_modules/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1,
              fallback: 'file-loader'
            }
          }
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          loader: 'svg-sprite-loader',
        }
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
