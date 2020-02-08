/* eslint-disable */
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const srcDir = path.resolve(rootDir, 'src')
const distDir = path.resolve(rootDir, 'dist')

module.exports = {
  rootDir,
  srcDir,
  distDir
}
