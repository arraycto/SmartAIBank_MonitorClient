import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Cookies from 'js-cookie'
import './assets/icons' // icon
import i18n from './lang' // Internationalization
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
import '@/styles/index.scss' // global css
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import services from './services'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'


var http = require('./common/http')
Vue.config.productionTip = false
Vue.use(vuescroll, {
  'ops': {
    'bar': {
      'keepShow': true,
      /** Bar's background , default -> #00a650 */
      'background': 'rgb(149, 153, 158)'
      /** Bar's opacity, default -> 1  */
    }
  }
})
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(Element, {
  'size': Cookies.get('size') || 'medium', // set element-ui default size
  'i18n': (key, value) => i18n.t(key, value)
})
Vue.prototype.$http = http
Vue.prototype.$services = services
new Vue({
  router,
  store,
  i18n,
  'render': h => h(App)
}).$mount('#app')
router.beforeEach(function (to, from, next) {
  sessionStorage.currentPage = to.name
  next()
})

