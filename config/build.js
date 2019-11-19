'use strict'

const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('../config/common')


module.exports = () => {
  const config = {...common}
  const isDevMode = config.mode !== 'production'
  const version = process.env.VERSION

  // SASS
  config.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader'
    ],
  })

  // MiniCssExtractPlugin
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: isDevMode ? '[name].css' : `[name]-v${version}.css`,
      chunkFilename: isDevMode ? '[id].css' : `[id]-v${version}.css`,
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  )

  // Entry
  config.entry = {
    'css-for-browser-extensions': resolve(__dirname, '../', 'src/sass/app.sass'),
  }

  // Output
  config.output = {
    path: resolve(__dirname, '../', 'dist/')
  }

  return config
}
