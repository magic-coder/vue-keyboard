<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view class="root-view" v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    
     <transition name="fade" mode="out-in">
      <router-view class="root-view" v-if="!$route.meta.keepAlive"/>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .15s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>


<style lang="stylus">
  @import './style/common.css';
  @import '~common/stylus/base'
  
.weui-icon_toast.weui-loading
  width 40px
  height 40px
</style>
