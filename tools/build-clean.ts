/* eslint-disable */
const rimraf = require('rimraf')
const path = require('path')

const distDir = path.resolve(__dirname, '..', 'dist')

const handleError = (err: Error) => {
  if (err) return console.log(err)
}

// Remove stories folder
rimraf(`${distDir}/**/stories/**`, handleError)

// Remove test files
rimraf(`${distDir}/**/*.spec.*`, handleError)

// Remove build helpers files
rimraf(`${distDir}/**/helpers/**`, handleError)

// Remove useSampleComponent
rimraf(`${distDir}/**/useSampleComponent/**`, handleError)
