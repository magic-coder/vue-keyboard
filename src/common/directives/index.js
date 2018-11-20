import Vue from 'vue'
import {router} from '@/router/index'

/**
 * 跳转指令
 * 1. <span v-jump="'/insure/car/insureProgram'">点击跳转</span>
 * 2. <span v-jump="{path: '/insure/car/insureProgram', query: {id: 1214}}">点击跳转（携带参数）</span>
 * 3. <span v-jump.replace="{path: '/insure/car/insureProgram', query: {id: 1214}}">点击跳转（无痕）</span>
 * 4. <span v-jump.go="-1">前进 or 后退</span>
 */

Vue.directive('jump', {
  'inserted': function(el, binding) {
    let param = typeof binding.value === 'string'
                  ? {path: binding.value}
                  : binding.value
    if(param){
      el.addEventListener('click', function clickHandler(e) {
        e.stopPropagation()
        if(binding.modifiers.replace) {
          router.replace(param)
        }else if(binding.modifiers.go) {
          router.go(param)
        } else {
          router.push(param)
        }
      }, false)
    }
  }
})