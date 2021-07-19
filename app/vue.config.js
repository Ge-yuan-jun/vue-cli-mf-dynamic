const remoteEntryName = 'remoteEntry.js'
const publicPath = 'http://localhost:8080/'
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
    port: 8080
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
      name: 'app',
      // filename: remoteEntryName,
      // // 引入的 外部模块
      // remotes: {
      //   layout: 'layout@https://s1.hdslb.com/bfs/live-activity/nuwa/dragon_boot_festival_2021/remoteEntry.js',
      //   content: 'content@http://localhost:8081/remoteEntry.js'
      // },
      shared
    }])
  }
}