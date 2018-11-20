<template>
  <div>
    <input-keyboard style="font-size:16px;"
                    :isIdCard="true"
                    placeholder="请输入车主身份证号"
                    v-model="idcard">
    </input-keyboard>
  </div>
</template>

<script>
  import InputKeyboard from '@/components/InputKeyboard/index'
  export default {
    header: {
      title: '测试'
    },
    data() {
      return {
        idcard: ''
      }
    },
    created(){

    },
    methods:{

    },
    components: {
      InputKeyboard
    }
  }
</script>
