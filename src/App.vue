<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import httpService from './common/service_http'
import base from '@/common/base'
import websocketClient from '@/common/websocketClient'
var http = require('./common/http')
export default {
  name: 'app',
  data: function () {
    return {

    }
  },
  components: {


  },
  mounted () {
    var self = this
    base.init(self)
    http.init(self)
    httpService.init(self)
    if (sessionStorage.currentPage && sessionStorage.orgId) {
      var websocket = {
        'url': window.DCSpace.sysConfig.serveUrl + 'api/v1/ws',
        'user': base.getStore({ 'key': 'userName' }),
        'token': base.getStore({ 'key': 'httpToken' })
      }

      websocketClient.connect(websocket.url, websocket.user, websocket.token)
      sessionStorage.hasConnected = 'connected'

      self.$router.push(sessionStorage.currentPage)
    } else {
      self.$router.push('login')
    }
    window.addEventListener('resize', function () {
      base.resizeEcharts()
      self.$store.commit('operate/setWindowResize', true)
    })
  },
  watch: {
    '$route.name': function (val) {
      if (this.$store.state.operate.windowResize) {
        base.resizeEcharts()
      }
    }
  },
  methods: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* min-width: 1280px; */
}
</style>
