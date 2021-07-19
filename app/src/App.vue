<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <h3>try to load components</h3>
    <ul>
      <li @click="loadExtraContentComponent">展示 content 中的组件</li>
      <li @click="loadExtraLayoutComponent">展示 layout 中的组件</li>
    </ul>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { contentExpose as content, layoutExpose as layout } from './utils/config'
import { loadComponent, loadRemoteEntryScript } from './utils/loadComponent'

@Component
export default class App extends Vue {
  async loadExtraContentComponent (): Promise<void> {
    try {
      const { url, scope, module } = content
      await loadRemoteEntryScript(url, scope)
      const remoteModule = await loadComponent(scope, module)
      console.log('remoteModule: ', remoteModule)
      this.$router.addRoute(remoteModule.default[0])
      this.$router.replace(remoteModule.default[0].path)
    } catch (e) {
      console.error('[app] app load content routes error: ' + e)
    }
  }

  async loadExtraLayoutComponent (): Promise<void> {
    try {
      const { url, scope, module } = layout
      await loadRemoteEntryScript(url, scope)
      const remoteModule = await loadComponent(scope, module)
      this.$router.addRoute(remoteModule.default[0])
      this.$router.replace(remoteModule.default[0].path)
    } catch (e) {
      console.error('[app] app load layout routes error: ' + e)
    }
  }

  async beforeCreate () {
    const parentRouter = window.location.hash.replace('#/', '')
    switch (parentRouter) {
      case 'content':
        try {
          const { url, scope, module } = content
          await loadRemoteEntryScript(url, scope)
          const remoteModule = await loadComponent(scope, module)
          console.log('remoteModule: ', remoteModule)
          this.$router.addRoute(remoteModule.default[0])
          // this.$router.replace(remoteModule.default[0].path)
        } catch (e) {
          console.error('[app] app load content routes error: ' + e)
        }
        // this.loadExtraContentComponent()
        break
      case 'layout':
        try {
          const { url, scope, module } = layout
          await loadRemoteEntryScript(url, scope)
          const remoteModule = await loadComponent(scope, module)
          this.$router.addRoute(remoteModule.default[0])
        } catch (e) {
          console.error('[app] app load layout routes error: ' + e)
        }
        break
      default:
        console.error('[app router]: cannot find match router')
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px
</style>
