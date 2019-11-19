'use strict'

const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const dotenv = require('dotenv')

// Env
dotenv.config()

module.exports = {
  // Mode
  mode: process.env.MODE || 'production',

  // Watch
  watchOptions: {
    ignored: ['node_modules', 'dist', 'config', 'build', '.*']
  },

  // Module
  module: {
    rules: []
  },

  // Plugins
  plugins: []
}
