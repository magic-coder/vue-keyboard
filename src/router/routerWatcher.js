/**
 *
  1. 导航被触发。
  2. 在失活的组件里调用离开守卫。
  3. 调用全局的 beforeEach 守卫。
  4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
  5. 在路由配置里调用 beforeEnter。
  6. 解析异步路由组件。
  7. 在被激活的组件里调用 beforeRouteEnter。
  8. 调用全局的 beforeResolve 守卫 (2.5+)。
  9. 导航被确认。
  10. 调用全局的 afterEach 钩子。
  11. 触发 DOM 更新。
  12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
 * @param {*} router
 */
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import config from '@/common/config/constants'
import http from '@/common/libs/http'
import cookie from 'vue-js-cookie'
import localforage from 'localforage'

let isCheckedLogin = false
NProgress.configure({ showSpinner: false });

export default function registerWatcher (router) {

  // 全局前置守卫
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if(!to.meta.needLogin){
      next()
    } else {
      if(isCheckedLogin) {
        next()
      } else {
        let token = cookie.get(config.tokenName)
        let res = await http.post('/checkToken', {token})
        isCheckedLogin = true
        if(res.head.errorCode === '0000') {
          localforage.setItem('channelCode', res.body.userId)
          localforage.setItem('channelName', res.body.channelName)
          if(to.path === '/login') {
            next({
              name: 'carInfo'
            })
          } else {
            next()
          }
        } else {
          if(to.path === '/login') {
            next()
          } else {
            next('login')
          }
        }
      } 
    }
  })

  // 全局后置守卫
  router.afterEach((to, from) => {
    NProgress.done()
  })

  // 全局解析守卫
  router.beforeResolve((to, from, next) => {
    let components = router.getMatchedComponents(to)
    let component = components[0] || {}

    next()
  })
}