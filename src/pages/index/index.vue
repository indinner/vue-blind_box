<template>
  <div>

    <!--  轮播图  -->
    <div class="div_0" >
      <img class="banner_img" src="http://cdn.jianwei.top/blind_box/icon/banner.jpg"/>
    </div>

    <!--  公告  -->
    <div style="display: flex;justify-content: center">
      <div class="notice">
        <div style="display: flex;justify-content: center">
          <div class="notice_div">🧸 爱情属于勇敢的人儿~</div>
        </div>
      </div>
    </div>

    <!--   存放两个盒子 -->
    <div class="div_1">
      <div class="div_box_1">
        <img class="img" src="https://rbt-1302363069.cos.ap-shanghai.myqcloud.com/yuelao/501638764175257772.png">
        <van-button class="div_btn" color="black"><span class="out">抽取</span>一张男生纸条</van-button>
        <van-button class="div_btn" color="black"><span class="in">放入</span>一张男生纸条</van-button>
      </div>
      <div class="div_box_0">
        <img class="img" src="https://rbt-1302363069.cos.ap-shanghai.myqcloud.com/yuelao/822877153040097396.png">
        <van-button class="div_btn" color="black"><span class="out">抽取</span>一张女生纸条</van-button>
        <van-button class="div_btn" color="black"><span class="in">放入</span>一张女生纸条</van-button>
      </div>
    </div>



  </div>

</template>

<script>
export default {
  name: "index"
}
</script>

<style src="./index.css">

</style>