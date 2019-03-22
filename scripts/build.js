#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const util = require('util')
const signale = require('signale')
const webpack = require('webpack')
const webpackConfig = require('./prod')
const { entrys } = require('./utils')

const parmas = entrys()

const RootPath = path.resolve(path.join(__dirname, '../', parmas['-e'], parmas['-p']))

const entry = path.join(RootPath, parmas['-s'])

const output = path.join(RootPath, parmas['-o'])

;(async () => {
  const hasSrc = await util.promisify(fs.stat)(entry)
    .then(stat => stat.isDirectory())
    .catch(() => false)

  if(hasSrc) {
    webpack(
      webpackConfig({
        entry,
        output: {
          path: output,
          filename: '[name]-[hash].js',
          publicPath: `./`
        },
        template: parmas['-h'],
        title: parmas['-t']
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
