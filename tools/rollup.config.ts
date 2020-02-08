/* eslint-disable */
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const camelCase = require('lodash.camelcase')
const typescript = require('rollup-plugin-typescript2')
const json = require('rollup-plugin-json')
const { rootDir, srcDir } = require('./config')

const pkg = require(`${rootDir}/package.json`)

const libraryName = pkg.name

const formatDate = () => {
  const pad = s => (s < 10 ? '0' + s : s)
  const d = new Date()
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

const banner = `/**
  * Name: ${libraryName}
  * Author: ${pkg.author}
  * Website: ${pkg.repository.url} 
  * Date: ${formatDate()} 
*/`

export default {
  input: `${srcDir}/${libraryName}.ts`,
  output: [
    {
      banner,
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      globals: {
        vue: 'Vue',
        '@vue/composition-api': 'vueCompositionApi'
      }
    },
    { file: pkg.module, format: 'es' }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['vue', '@vue/composition-api'],
  watch: {
    include: `${srcDir}/**`
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve()
  ]
}
