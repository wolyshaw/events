#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const util = require('util')
const signale = require('signale')
const webpack = require('webpack')
const webpackConfig = require('./prod')
const { entrys } = require('./utils')

let config = {}

const parmas = entrys()

const RootPath = process.env.INIT_CWD || process.env.PWD || process.cwd()

const ConfigPath = path.join(RootPath, 'config.js')

const entry = path.join(RootPath, parmas['-s'])

;(async () => {
  const hasConfig = await util.promisify(fs.stat)(ConfigPath).then(stat => stat.isFile()).catch(() => false),
    hasSrc = await util.promisify(fs.stat)(path.join(RootPath, config.entry || parmas['-s'])).then(stat => stat.isDirectory()).catch(() => false)

  if(hasSrc) {
    if(hasConfig) {
      config = require(ConfigPath)
    }
    const entry = path.join(RootPath, config.entry || parmas['-s'])
    const output = path.join(RootPath, config.output || parmas['-o'])

    webpack(
      webpackConfig({
        entry,
        output: {
          path: output,
          filename: '[name]-[hash].js',
          publicPath: `./`
        },
        template: config.template || parmas['-h'],
        title: config.title || parmas['-t']
      }),
      (error, stats) => {
        if(error) {
          return signale.fatal(Error(error.stack || error))
        }

        const info = stats.toJson()

        if (stats.hasErrors()) {
          return info.errors.map(err => signale.error(err))
        }
      }
    )
  } else {
    return signale.fatal(Error(`目录: ${entry} 不存在`))
  }
})()
