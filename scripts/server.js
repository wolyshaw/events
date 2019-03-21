const path = require('path')
const signale = require('signale')
const express = require('express')
const env = process.env.NODE_ENV || 'development'
// const config = require('./config')[env]
const webpack = require('webpack')
const httpProxy = require('http-proxy-middleware')
const devServer = require('webpack-dev-middleware')
const hotServer = require('webpack-hot-middleware')
const { entrys } = require('./utils')

const parmas = entrys()
console.log(parmas)

const app = express()

// const { dir, proxy, server } = config
const PORT = 8000

const RootPath = path.resolve(path.join(__dirname, '../', parmas['-e'], parmas['-p']))
console.log(RootPath)

app.use('/', express.static(path.join(RootPath, parmas['-s'])))

const entry = path.join(RootPath, parmas['-s'])

const output = path.join(RootPath, parmas['-o'])
const webpackConfig = require('./dev')

if(parmas['-P']) {
  const filters = (pathname, req) => req.method === 'POST' || /\.do$/.test(pathname)
  app.use(httpProxy(filters, {
    target: 'https://dev.lanjingfenqi.com',
    changeOrigin: true,
    secure: false
  }))
}
if(env === 'development') {
  const webpackConfig = require('./dev')
  const compiler = webpack(webpackConfig({
    entry,
    output: {
      path: output,
      filename: '[name]-[hash].js',
      publicPath: `./`
    },
    template: parmas['-h']
  }))
  app.use(devServer(compiler))
  app.use(hotServer(compiler))

  app.listen(PORT, err => {
    if (err) {
      throw signale.fatal(err)
    }
    signale.success(`server, runing in http://localhost:${PORT}, wait....`)
  })
} else {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(RootPath, parmas['-p']))
  })
  app.listen(PORT, err => {
    if (err) {
      throw signale.fatal(err)
    }
    signale.success(`server, runing in http://localhost:${PORT}`)
  })
}
