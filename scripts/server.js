const fs = require('fs')
const path = require('path')
const util = require('util')
const signale = require('signale')
const express = require('express')
const env = process.env.NODE_ENV || 'development'
const webpack = require('webpack')
const httpProxy = require('http-proxy-middleware')
const devServer = require('webpack-dev-middleware')
const hotServer = require('webpack-hot-middleware')
const { entrys } = require('./utils')

let config = {}

const parmas = entrys()

const app = express()

const RootPath = process.env.INIT_CWD || process.env.PWD || process.cwd()

const ConfigPath = path.join(RootPath, 'config.js')

;(async () => {
  const hasConfig = await util.promisify(fs.stat)(ConfigPath).then(stat => stat.isFile()).catch(() => false),
    hasSrc = await util.promisify(fs.stat)(path.join(RootPath, config.entry || parmas['-s'])).then(stat => stat.isDirectory()).catch(() => false)

  if(hasSrc) {
    if(hasConfig) {
      config = require(ConfigPath)

      if(config.proxy) {
        app.use(httpProxy(config.proxyFilters || '/', config.proxy))
      }
    }
    const port = config.port || 8000
    const entry = path.join(RootPath, config.entry || parmas['-s'])
    const output = path.join(RootPath, config.output || parmas['-o'])

    app.use('/', express.static(path.join(RootPath, config.entry || parmas['-s'])))

    if(env === 'development') {
      const webpackConfig = require('./dev')
      const compiler = webpack(webpackConfig({
        entry,
        output: {
          path: output,
          filename: '[name]-[hash].js',
          publicPath: `./`
        },
        template: config.template || parmas['-h'],
        title: config.title || parmas['-t']
      }))
      app.use(devServer(compiler))
      app.use(hotServer(compiler))

      app.listen(port, err => {
        if (err) {
          throw signale.fatal(err)
        }
        signale.success(`server, runing in http://localhost:${port}, wait....`)
      })
    } else {
      app.get('*', (_req, res) => {
        res.sendFile(path.join(RootPath, parmas['-p']))
      })
      app.listen(port, err => {
        if (err) {
          throw signale.fatal(err)
        }
        signale.success(`server, runing in http://localhost:${port}`)
      })
    }
  } else {
    return signale.fatal(Error(`目录: ${entry} 不存在`))
  }
})()

