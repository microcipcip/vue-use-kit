/* eslint-disable */
const rimraf = require('rimraf')
const { distDir } = require('./config')

const handleError = (err: Error) => {
  if (err) return console.log(err)
}

// Remove lib folder
rimraf(`${distDir}/lib`, handleError)

// Remove stories folder
rimraf(`${distDir}/**/stories/**`, handleError)

// Remove test files
rimraf(`${distDir}/**/*.spec.*`, handleError)

// Remove build helpers files
rimraf(`${distDir}/**/helpers/**`, handleError)

// Remove tools
rimraf(`${distDir}/**/tools/**`, handleError)

// Remove useSampleComponent
rimraf(`${distDir}/**/useSampleComponent/**`, handleError)
