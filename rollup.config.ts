/* eslint-disable */
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import ttypescript from 'ttypescript'

const pkg = require('./package.json')

const libraryName = 'vue-use-kit'

const formatDate = () => {
  const pad = s => (s < 10 ? '0' + s : s)
  const d = new Date()
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

const banner = `/**
  * Name: Vue use kit
  * Author: ${pkg.author}
  * Website: ${pkg.repository.url} 
  * Date: ${formatDate()} 
*/`

export default {
  input: `src/${libraryName}.ts`,
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
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      // Fix typescript definition paths
      typescript: ttypescript,
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            { transform: 'typescript-transform-paths' },
            { transform: 'typescript-transform-paths', afterDeclarations: true }
          ]
        }
      },
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
