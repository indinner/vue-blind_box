<template>
  <van-popup :close-on-click-overlay="false" style="border-radius: 10px" v-model:show="show.login">
    <van-button @click="login" type="success" size="normal">一键授权登录</van-button>
  </van-popup>
  <router-view></router-view>
</template>

<script>

import wxUtil from "./utils/wxUtil.js"
export default {
  name: 'App',
  components: {

  },
  data(){
    return{
      show:{
        login:false
      }
    }
  },
  created() {
    if(localStorage.getItem('userInfo')===null&&wxUtil.getQueryVariable("code")===undefined){
      /*提示认证*/
      this.show.login=true
    }else if(wxUtil.getQueryVariable("code")!==undefined) {
      this.login()
    }
  },
  methods:{
    login(){
      wxUtil.getUserInfo(this,()=>{
        location.href="/"
      })
    }
  }
}
</script>

<style>

</style>
