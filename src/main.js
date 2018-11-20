import Vue from 'vue'
import App from '@/App'
import { router } from '@/router'
import registerRouterWatcher from '@/router/routerWatcher'
import store from '@/store'
import http from '@/common/libs/http'
import localforage from 'localforage'
import '@/common/directives/index'
import cookie from 'vue-js-cookie'
import vMap from 'vue-amap'
import mintui from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
import  { LoadingPlugin } from 'vux'

import 'mint-ui/lib/style.min.css'
import '@/common/stylus/reset.styl'
import 'animate.css'

Vue.use(LoadingPlugin)
Vue.use(cookie)
Vue.use(mintui)
Vue.use(InfiniteScroll)
Vue.use(vMap)
vMap.initAMapApiLoader({
  // key: '78bf6bcea1cb57126ace2056d33cb4d1', // webAPI
  // key: '7fd4063c424a7790a1675c1dd6288d65', // jsAPI
  key: 'afb1bdc8e58e6011b7e663bb8354ab1a', // jsAPI
  plugin: ['AMap.Geolocation']
})
registerRouterWatcher(router)

Object.defineProperty(Vue.prototype, '$db', { value: localforage })
Object.defineProperty(Vue.prototype, '$http', { value: http })

Vue.config.productionTip = false
/* eslint-disable no-new */
window.$vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
