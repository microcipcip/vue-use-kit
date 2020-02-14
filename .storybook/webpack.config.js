const path = require('path')
const rootDir = path.resolve(__dirname, '..')

module.exports = ({ config }) => {
  // Enable typescript support
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          compact: true
        }
      },
      {
        loader: require.resolve('ts-loader'),
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  })

  config.resolve.alias = Object.assign(config.resolve.alias, {
    '@src': path.resolve(rootDir, 'src')
  })

  config.node = {
    __dirname: true
  }

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
