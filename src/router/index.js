import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index')
  }
]

export const router = new Router({
  routes: constantRouterMap,

  scrollBehavior (to, from, savedPosition) {
    if (from.path !== '/orderDetails') {
      return { x: 0, y: 0 }
    } else {
      return savedPosition
    }
  }
})
