'use strict'

const { resolve } = require('path')
const common = require('../config/common');


module.exports = () => {
  const config = {...common}

  // SASS
  config.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: resolve(__dirname, '../'),
  });

  return config
}
