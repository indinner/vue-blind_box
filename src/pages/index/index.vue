<template>
  <div>

    <!--  弹出层  -->
    <div>

      <!--   展示玫瑰   -->
      <div>
        <van-popup v-model:show="show.roseShow"
                   lazy-render
                   position="bottom"
                   round
                   closeable
                   :style="{ height: '60%' }">
          <div>
            <div class="rose_div">
              <img  class="rose_img" src="https://cos.jianwei.top/blind_box/icon/%E7%8E%AB%E7%91%B0.png"/>
            </div>
            <div class="rose_text">
              <span>我有 {{ userInfo.rose }} 玫瑰</span>
            </div>
            <div class="rose_sign">
              <div style="display: flex;justify-content: center">
                <div class="signin">
                  <img  class="rose_img1" src="https://cos.jianwei.top/blind_box/icon/%E7%8E%AB%E7%91%B0.png"/>
                </div>
                <div class="signin_text">
                  <span>每天签到领玫瑰</span>
                </div>
              </div>
              <div class="signin_div_btn">
                <van-button class="signin_btn" size="mini" color="black">签到</van-button>
              </div>
            </div>


            <div>
              <div class="div_buy_1">
                <div v-for="item in 3" class="div_buy_2">
                  <div class="rose_name">
                    <span>1玫瑰</span>
                  </div>
                  <div class="rose_price">
                    <span>0.88元</span>
                  </div>
                  <div class="rose_buy">
                    <van-button class="rose_buy_bt" size="small" color="#e83a3a">购买</van-button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </van-popup>
      </div>

    </div>

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

    <!-- 中部按钮   -->
    <div>
      <div class="div_2">

        <div class="div_2_box">
          <div style="display: flex;justify-content: center">
            <div class="div_2_icon">
              <img style="width: 100%;height: 100%" src="https://cos.jianwei.top/blind_box/icon/%E7%8E%AB%E7%91%B0.png"/>
            </div>
            <div class="div_2_text">
              <span>我的玫瑰</span>
            </div>
          </div>
          <div class="div_2_tex1">
            <span>{{ userInfo.rose }}</span>
          </div>
        </div>

        <div class="div_2_box">
          <div style="display: flex;justify-content: center">
            <div class="div_2_icon">
              <img style="width: 100%;height: 100%" src="https://cos.jianwei.top/blind_box/icon/%E6%83%85%E4%B9%A6.png"/>
            </div>
            <div class="div_2_text">
              <span>我的纸条</span>
            </div>
          </div>
          <div class="div_2_tex1">
            <span>1</span>
          </div>
        </div>

      </div>
    </div>

    <!--   存放两个盒子 -->
    <div class="div_1">
      <div class="div_box_1">
        <img class="img" src="https://rbt-1302363069.cos.ap-shanghai.myqcloud.com/yuelao/501638764175257772.png">
        <div class="div_btn1">
          <van-button class="div_btn" color="black"><span class="out">抽取</span>一张男生纸条</van-button>
        </div>
        <div class="div_btn1">
          <van-button class="div_btn" color="black"><span class="in">放入</span>一张男生纸条</van-button>
        </div>
      </div>
      <div class="div_box_0">
        <img class="img" src="https://rbt-1302363069.cos.ap-shanghai.myqcloud.com/yuelao/822877153040097396.png">
        <div class="div_btn1">
          <van-button class="div_btn" color="black"><span class="out">抽取</span>一张女生纸条</van-button>
        </div>
        <div class="div_btn1">
          <van-button class="div_btn" color="black"><span class="in">放入</span>一张女生纸条</van-button>
        </div>
      </div>
    </div>

    <!--  纸条广场  -->





  </div>

</template>

<script>
export default {
  name: "index",
  data(){
    return{
      show:{
        roseShow:false,//玫瑰弹出层
      },
      userInfo:{
        headimgurl: "",
        nickname: "任胖子",
        openid: "",
        sex: 0,
        rose:0,
      }
    }
  },
  created() {
    this.initUserInfo()
  },
  mounted() {
  },
  methods:{
    initUserInfo(){
      let userInfo=localStorage.getItem('userInfo')
      if(userInfo!==null){
        userInfo=JSON.parse(userInfo)
        this.$http.get("/box/getUserInfo?openid="+userInfo.openid)
        .then((res)=>{
          console.log("读取授权信息如下:",res);
          if(res.data.result){
            this.userInfo=res.data.data
          }
        })
      }
    }
  }
}
</script>

<style src="./index.css">

</style>