const remoteEntryName = 'remoteEntry.js'
const publicPath = 'http://localhost:8082/'
const deps = require('./package.json').dependencies

const sharedLib = [
  'vue',
  'vue-router',
  'vue-class-component',
  'vue-property-decorator',
  'core-js'
]
const shared = {}
sharedLib.forEach(dep => {
  shared[dep] = {
    eager: false,
    singleton: true,
    requiredVersion: deps[dep]
  }
})

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8082
  },
  assetsDir: 'static',
  outputDir: 'dist',
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath,
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks')

    /* module federation plugin import */
    config
    .plugin('mf')
    .use(require('webpack/lib/container/ModuleFederationPlugin'), [{
      name: 'layout',
      filename: remoteEntryName,
      // 引入的 外部模块
      exposes: {
        './routes': './src/router/index.ts'
      },
      shared
    }])
  }
}