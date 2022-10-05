<template>
  <router-view></router-view>
</template>

<script>

import wxUtil from "./utils/wxUtil.js"
export default {
  name: 'App',
  components: {

  },
  created() {
    //wxUtil.getUserInfo(this)
  }
}
</script>

<style>

</style>
