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

  config.node = {
    __dirname: true
  }

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
