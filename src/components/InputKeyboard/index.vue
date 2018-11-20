<template>
  <div id="idcard-keyboard">
    <div class="input-box box">
      <div class="input-label item no-flex">
        <span style="min-width: 2.16rem;display: flex;font-size: .3rem; font-family: PingFangSC-Regular;color: #111">身份证号</span>
      </div>
      <div ref="inputField" class="input-field item" @click.stop="inputFocus">
        <span ref="inputValue" class="input-value" v-if="value">{{value}}</span>
        <span ref="inputValue" class="input-value" style="color: #BBBBBB;font-size: .3rem; font-family: PingFangSC-Regular;" v-else>{{placeholder
          }}</span>
        <i class="cursor-point" :style="{left: moveLeft + 'px'}" v-if="isVisiable"></i>
      </div>
    </div>

    <transition name="fade">
      <div id="mask" v-if="isVisiable">
        <div id="key-board" ref="keyBoard" :class="{'pc-box': !isMobile}">
          <div class="tool">
            <p @click.stop="hideKeyBoard">完成</p>
          </div>
          <div class="key-area">
            <div class="key-column">
              <div class="key-cell no-border-top no-border-left" @click.stop="keyClick('1')">1</div>
              <div class="key-cell no-border-top" @click.stop="keyClick('2')">2</div>
              <div class="key-cell no-border-top no-border-right" @click.stop="keyClick('3')">3</div>
            </div>
            <div class="key-column">
              <div class="key-cell no-border-left" @click.stop="keyClick('4')">4</div>
              <div class="key-cell" @click.stop="keyClick('5')">5</div>
              <div class="key-cell no-border-right" @click.stop="keyClick('6')">6</div>
            </div>
            <div class="key-column">
              <div class="key-cell no-border-left" @click.stop="keyClick('7')">7</div>
              <div class="key-cell" @click.stop="keyClick('8')">8</div>
              <div class="key-cell no-border-right" @click.stop="keyClick('9')">9</div>
            </div>
            <div class="key-column">
              <div class="key-cell key-special no-border-left no-border-bottom" v-show="isIdCard" @click.stop="keyClick('X')">X</div>
              <div class="key-cell key-special no-border-bottom" v-show="!isIdCard"></div>
              <div class="key-cell no-border-bottom" @click.stop="keyClick('0')">0</div>
              <div class="key-cell key-special no-border-right no-border-bottom" @click.stop="keyClick('D')"><i class="del"></i></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
document.body.addEventListener('touchstart',function(){});
import { browser } from 'common/libs/util'

export default {
  created() {
    this.value = this.inputValue
    this.hideKeyBoardFn = this.hideKeyBoard.bind(this)
    this.onKeypressFn = this.onKeypressHandler.bind(this)
  },
  model: {
    prop: 'inputValue',
    event: 'changeValue'
  },
  props: {
    placeholder: {
      default: '请输入身份证号',
      type: String
    },
    isIdCard: {
      default: true,
      type: Boolean
    },
    inputValue: {
      default: '',
      type: String
    },
    maxlength: {
      default: 18,
      type: Number
    }
  },
  watch:{
    'inputValue'(newVal){
      this.value = newVal
    }
  },
  data() {
    return {
      isVisiable: false,
      appEl: '',
      value: '',
      moveLeft: 0,
      pointerPosition: 0,
      appStyle: {},
      top: 0,
      isMobile: browser.versions.mobile,
    }
  },
  mounted(){
    this.appEl = document.body.querySelector('#app')
  },
  methods:{
    // 获取焦点
    inputFocus(e){
      this.showKeyBoard()

      this.inputClick(e)
    },
    showKeyBoard() {
      this.isVisiable = true
      this.appEl.addEventListener('click', this.hideKeyBoardFn, false)

      this.$nextTick(this.showInputFieldInView)
      document.addEventListener('keydown', this.onKeypressFn)
    },
    hideKeyBoard() {
      this.isVisiable = false
      this.appEl.removeEventListener('click', this.hideKeyBoardFn, false)

      this.recoverInputField()
      document.removeEventListener('keydown', this.onKeypressFn)
    },
    onKeypressHandler(e){
      let key = e.key + ''
      key = key.toUpperCase()
      if(/[0-9]/.test(key)) {
        this.keyClick(key)
      }else if(key === 'BACKSPACE'){
        this.keyClick('D')
      }else if(key === 'ARROWLEFT'){
        this.pointerPosition --
        this.moveCursorPoint()
      }else if(key === 'ARROWRIGHT'){
        this.pointerPosition ++
        this.moveCursorPoint()
      }else if(key === "HOME"){
        this.pointerPosition = 0
        this.moveCursorPoint()
      }else if(key === "END"){
        this.pointerPosition = 9999
        this.moveCursorPoint()
      }
    },
    showInputFieldInView(){

      // 获取窗口高度
      let windowHeight = window.innerHeight

      // 获取键盘高度
      let keyboardHeight = this.$refs.keyBoard.getBoundingClientRect().height

      // 获取输入框到顶部的距离
      let inputTop = this.$refs.inputField.getBoundingClientRect().top
      let inputHeight = this.$refs.inputField.getBoundingClientRect().height

      if( inputTop + inputHeight > windowHeight - keyboardHeight) {
        this.top = inputTop

        this.appStyle.scrollY = window.scrollY

        let moveDistance = inputTop - (windowHeight - keyboardHeight) + inputHeight
        console.log(`-${moveDistance}px`)

        this.appEl.style.position = `relative`
        this.appEl.style.top = `-${moveDistance}px`
        this.appEl.style.paddingBottom = `${moveDistance}px`
      }
    },
    recoverInputField(){
      this.appEl.style.position = ""
      this.appEl.style.top = ""
      this.appEl.style.paddingBottom = ""
      window.scrollTo(0, this.appStyle.scrollY)
    },
    // 按键盘
    keyClick(keyValue) {
      switch(keyValue) {
        case 'D':
          if(this.pointerPosition > 0) {
            this.deleteAction()
          }
          break
        default :
          if(this.value.length < this.maxlength) {
            this.inputAction(keyValue)
          }
      }

      this.$nextTick(() => {
        this.moveCursorPoint()
      })

      this.$emit('changeValue', this.value)
      this.$emit('change', this.value)
    },

    // 删除动作
    deleteAction() {
      this.pointerPosition --
      this.insertInputChard()
    },

    // 输入动作
    inputAction(inputChar) {
      this.insertInputChard(inputChar)
      this.pointerPosition ++
    },

    insertInputChard(char) {
      let valueArr = this.value.split('')
      valueArr.splice(this.pointerPosition, char ? 0 : 1, char)
      this.value = valueArr.join('')
    },

    // 移动光标
    moveCursorPoint() {
      let charWidth = this.$refs.inputValue.getBoundingClientRect().width / this.value.length

      this.pointerPosition = this.pointerPosition < 0 ? 0 : this.pointerPosition
      this.pointerPosition = this.pointerPosition < this.maxlength ? this.pointerPosition : this.maxlength

      this.moveLeft = this.pointerPosition * charWidth || 0
    },

    // 用户点击
    inputClick( e ){

      // 输入框宽度
      let inputWidth = this.$refs.inputValue.getBoundingClientRect().width

      // 用户点击坐标
      let offsetX = e.offsetX > inputWidth ? inputWidth : e.offsetX

      // 每个字符宽度
      let charWidth = this.$refs.inputValue.getBoundingClientRect().width / this.value.length

      // 计算当前光标位置
      this.pointerPosition  = Math.round(offsetX / charWidth)

      this.moveCursorPoint()
    }
  }
}
</script>

<style lang="stylus" scoped>
#idcard-keyboard
  height 1rem
  line-height 1rem
  display flex

  $placeholderColor = #BBBBBB
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder{ /*WebKit browsers*/
    color: $placeholderColor!important;
  }
  input::-moz-input-placeholder, textarea::-moz-input-placeholder{ /*Mozilla Firefox*/
    color: $placeholderColor!important;
  }

  input::-ms-input-placeholder, textarea::-ms-input-placeholder{ /*Internet Explorer*/
    color: $placeholderColor!important;
  }
  .input-box
    .input-field
      position relative
      text-align left
      width 4.5rem
      /*margin-left 20px*/
      .cursor-point
        position absolute
        left 0
        top: .25rem
        display inline-block
        height 1.5em
        width:1px
        background-color: #000
        animation: blink 1s infinite step-start;
      .input-value
        display: inline-block;
        max-width: 100%;
        overflow hidden
        font-size .3rem
        font-family: PingFangSC-Regular;
        color: #111111;
  #mask
    #key-board
      position fixed
      bottom  0
      left 0
      right: 0
      background-color #f2f3f5
      z-index 10001
      .tool
        height 0.96rem
        color: #3F75D9
        font-size 0.34rem
        line-height 0.96rem
        vertical-align middle
        background: #F8F8F8
        p
          position absolute
          right 0.3rem
      .key-area
        .key-column
          display flex
          box-sizing border-box
          width 100%
          .key-cell
            flex 1
            width 33.33%
            height 1.12rem
            text-align center
            line-height 1.12rem
            box-sizing border-box
            background: #FFFFFF
            box-shadow: inset 0 0 0 0 #E5E5E5, inset 0 0 0 0 #E5E5E5
            border 1px solid #E5E5E5
            font-family: PingFangSC-Regular
            font-size: .44rem
            color: #111111
            &.key-special
              background: #E5E5E5
              line-height 1.12rem
            &:active
              background-color #3F75D9
              color #ffffff
          .no-border-top
            border-top none !important
          .no-border-left
            border-left none !important
          .no-border-right
            border-right none !important
          .no-border-bottom
            border-bottom none !important
          .del
            width 100%
            height 100%
            display block
            background url('./img/v2-del.png') no-repeat center !important
            background-size .56rem !important
.fade-enter, .fade-leave-active
  opacity 0
.fade-enter-active, .fade-leave-active
  transition all .3s ease-in-out
@keyframes blink {
  0%,to {
      background-color: #000;
      color: #aaa
  }

  50% {
      background-color: transparent;
      color: #000
  }
}
</style>
