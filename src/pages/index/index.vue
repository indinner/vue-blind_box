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
              <span>我有 {{ scrip.userInfo.rose }} 玫瑰</span>
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
                <van-button @click="signIn" class="signin_btn" size="mini" color="black">签到</van-button>
              </div>
            </div>


            <div>
              <div class="div_buy_1">
                <div v-for="item in commodityRose" class="div_buy_2">
                  <div class="rose_name">
                    <span>{{item.roseCount}}玫瑰</span>
                  </div>
                  <div class="rose_price">
                    <span>{{ item.total/100 }}元</span>
                  </div>
                  <div class="rose_buy">
                    <van-button @click="buyRose(item)" class="rose_buy_bt" size="small" color="#e83a3a">购买</van-button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </van-popup>
      </div>

      <!--   添加纸条   -->
      <div>
        <van-popup v-model:show="show.saveScrip"
                   lazy-render
                   round
                   closeable
                   :style="{ width:'90%' }">
          <div class="div_scrip">
            <!--     title       -->
            <div v-show="scrip.gender===0" class="div_scrip_title">放入一张女生纸条</div>
            <div v-show="scrip.gender===1" class="div_scrip_title">放入一张男生纸条</div>
            <!--     头像昵称       -->
            <div class="div_headimg">
              <img class="scrip_headimg" :src="scrip.userInfo.headimgurl" />
              <div class="scrip_nickname">
                <span>{{ scrip.userInfo.nickname }}</span>
              </div>
            </div>
            <!-- 输入框 -->
            <div class="scrip_input_div">
              <div>
                <!-- 定位 -->
                <div class="div_location">
                  <van-tag color="black" size="medium" type="warning">
                    <van-icon name="location" /><span>{{ scrip.cityName }}</span>
                  </van-tag>
                </div>
                <div class="van-hairline--bottom"></div>
              </div>
              <!-- 内容 -->
              <van-field
                  v-model="scrip.resume"
                  type="textarea"
                  placeholder="输入你的交友宣言(请文明填写,禁止在宣言留下个人信息,请认真填写VX号,事先检查是否打开了加好友的权限)"
              />
              <!-- 图片 -->
              <div class="div_uploader_img">
                <van-image  fit="cover" class="div_uploader_img_preview" v-for="item in scrip.picture" :src="item" />
                <van-uploader
                    v-show="scrip.picture.length<3"
                    :after-read="afterRead">
                </van-uploader>
              </div>

              <!-- 我的VX -->
              <div class="div_vx_input">
                <van-field left-icon="wechat" v-model="scrip.weChat" label="WX or TEL" placeholder="请输入WX or TEL" />
              </div>

              <!-- 纸条生命  -->
              <div class="div_vx_input1" >
                <van-cell-group inset>
                  <van-field
                      center
                      clearable
                      readonly
                      left-icon="smile"
                      label="纸条生命"
                  >
                    <template #button>
                      <van-stepper v-model="scrip.life" min="1" max="5" />
                    </template>
                  </van-field>
                </van-cell-group>

              </div>


            </div>

            <div>
              <div class="div_title1">
                <span class="div_title1_text1">2玫瑰/次 </span>
                <span class="div_title1_text2"> 限时免费</span>
              </div>
            </div>

            <!--  保存按钮  -->
            <div>
              <div class="div_bt_save">
                <van-button @click="scrip.isOpen=1" v-show="!scrip.isOpen" :plain="true" class="div_bt_save_1" size="normal" color="black">
                   <van-icon name="circle"></van-icon>展示在广场
                </van-button>
                <van-button @click="scrip.isOpen=0" v-show="scrip.isOpen" :plain="false" class="div_bt_save_1" size="normal" color="black">
                  <van-icon name="success"></van-icon>展示在广场
                </van-button>
                <van-button @click="saveScrip" class="div_bt_save_2" size="normal" color="black">
                  确认放入
                </van-button>
              </div>
            </div>
          </div>
        </van-popup>
      </div>

      <!--   展示抽取的纸条   -->
      <van-popup v-model:show="show.getScripShow"
                 lazy-render
                 round
                 closeable
                 :style="{ width:'90%' }">
        <div class="div_scrip">
          <!--     title       -->
          <div class="div_scrip_title">抽到的小纸条~</div>
          <!--     头像昵称       -->
          <div class="div_headimg">
            <img class="scrip_headimg" :src="getScripData.userInfo.headimgurl" />
            <div class="scrip_nickname">
              <span>{{ getScripData.userInfo.nickname }}</span>
            </div>
          </div>
          <!-- 输入框 -->
          <div class="scrip_input_div">
            <div>
              <!-- 定位 -->
              <div class="div_location">
                <van-tag color="black" size="medium" type="warning">
                  <van-icon name="location" /><span>{{ getScripData.cityName }}</span>
                </van-tag>
              </div>
              <div class="van-hairline--bottom"></div>
            </div>
            <!-- 内容 -->
            <van-field
                readonly
                v-model="getScripData.resume"
                type="textarea"
                placeholder="输入你的交友宣言(请文明填写,禁止在宣言留下个人信息,请认真填写VX号,事先检查是否打开了加好友的权限)"
            />
            <!-- 图片 -->
            <div class="div_uploader_img">
              <van-image  fit="cover" class="div_uploader_img_preview" v-for="item in getScripData.picture" :src="item" />
            </div>

            <!-- 我的VX -->
            <div class="div_vx_input1">
              <van-field readonly  left-icon="wechat" v-model="getScripData.weChat" label="WX or TEL" placeholder="请输入WX or TEL" />
            </div>

          </div>

        </div>
      </van-popup>

      <!--   确认抽取   -->
      <van-popup style="border-radius: 10px" v-model:show="show.outScripShow">
        <van-button v-show="scrip.userInfo.outSex===0" @click="getScrip(0,2)" type="success" color="black" size="normal">
          <span class="div_confirm">确认抽取女生纸条？</span>
        </van-button>
        <van-button v-show="scrip.userInfo.outSex===1" @click="getScrip(1,2)" type="success" color="black" size="normal">
          <span class="div_confirm">确认抽取男生纸条？</span>
        </van-button>
      </van-popup>

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

        <div @click="show.roseShow=!show.roseShow" class="div_2_box">
          <div style="display: flex;justify-content: center">
            <div class="div_2_icon">
              <img style="width: 100%;height: 100%" src="https://cos.jianwei.top/blind_box/icon/%E7%8E%AB%E7%91%B0.png"/>
            </div>
            <div class="div_2_text">
              <span>我的玫瑰</span>
            </div>
          </div>
          <div class="div_2_tex1">
            <span>{{ scrip.userInfo.rose }}</span>
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
            <span>{{ scrip.userInfo.scripCount }}</span>
          </div>
        </div>

      </div>
    </div>

    <!--   存放两个盒子 -->
    <div class="div_1">
      <div class="div_box_1">
        <img class="img" src="https://rbt-1302363069.cos.ap-shanghai.myqcloud.com/yuelao/501638764175257772.png">
        <div class="div_btn1">
          <van-button @click="outScrip(1)" class="div_btn" color="black"><span class="out">抽取</span>一张男生纸条</van-button>
        </div>
        <div class="div_btn1">
          <van-button @click="inScrip(1)" class="div_btn" color="black"><span class="in">放入</span>一张男生纸条</van-button>
        </div>
      </div>
      <div class="div_box_0">
        <img class="img" src="https://rbt-1302363069.cos.ap-shanghai.myqcloud.com/yuelao/822877153040097396.png">
        <div class="div_btn1">
          <van-button @click="outScrip(0)" class="div_btn" color="black"><span class="out">抽取</span>一张女生纸条</van-button>
        </div>
        <div class="div_btn1">
          <van-button @click="inScrip(0)" class="div_btn" color="black"><span class="in">放入</span>一张女生纸条</van-button>
        </div>
      </div>
    </div>

    <!--  纸条广场  -->
    <div style="padding-bottom: 10%">
      <div v-for="item in scrips" class="div_square">
        <div>
          <!-- 性别,城市  -->
          <div class="div_city">
            <span v-show="item.gender===0" class="div_city_sex">[女生]</span>
            <span v-show="item.gender===1" class="div_city_sex1">[男生]</span>
            <span class="div_city_city">{{ item.cityName }}</span>
          </div>
          <div class="van-hairline--bottom"></div>
          <div class="div_intro">
            <span  class="van-multi-ellipsis--l2 div_intro_span">{{item.resume}}</span>
          </div>
          <div class="div_picture">
            <van-image lazy-load @click="previewImg(item1)" v-for="item1 in item.picture" class="div_picture_img" fit="cover"
                       :src="item1"></van-image>
          </div>
          <div class="van-hairline--bottom"></div>
          <div class="div_square_time">
            <div class="square_time">{{ item.createTime }}</div>
            <div class="square_bt">
              <van-button @click="getScripById(item)" class="square_bt_bt" size="mini" round color="black">取走</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>

</template>

<script>
import Util from "@/utils/Util.js";
import wxUtil from "@/utils/wxUtil.js";
import {Dialog, ImagePreview, Notify} from "vant";
import BaseConfig from "@/config/base.config.js";

export default {
  name: "index",
  data(){
    return{
      show:{
        roseShow:false,//玫瑰弹出层
        saveScrip:false,//放纸条
        outScripShow:false,//确认购买纸条
        getScripShow:false,//展示抽到的纸条
      },
      commodityRose:[
        {
          total: 100,
          roseCount:2,
        },
        {
          total: 468,
          roseCount:10,
        },
        {
          total: 888,
          roseCount:20,
        }
      ],
      outScripSex:null,
      scrip:{
        cityName:'未知城市',
        weChat:'',
        picture:[],//点击上传后的图片预览样式
        isOpen:0,//是否展示到广场 0不展示 1展示
        userIp:localStorage.getItem('ip'),
        life:1,
        gender:0,//纸条所属盒子，0为女盒子 1为男盒子
        resume:'',//宣言
        userInfo:{
          headimgurl: "",
          nickname: "",
          openid: "",
          sex: 0,
          rose:0,
          scripCount:0,
          outSex:null,
          subRose:null,
        },
      },
      getScripData:{},//抽到的纸条
      scrips:[],
    }
  },
  created() {
    this.initUserInfo()
    this.getCity()
    this.initScrips()
  },
  mounted() {
  },
  methods:{

    /*取走指定纸条*/
    getScripById(item){
      console.log(item)
      this.scrip.userInfo.subRose=3
      Dialog.alert({
        message: '确认消耗【三朵玫瑰】取走纸条?',
        showCancelButton:true,
      }).then(() => {
        if(this.scrip.userInfo.rose<1){
          this.myNotify('玫瑰不够~',3000,'warning')
          this.show.outScripShow=false
          this.show.roseShow=true
          return
        }
        let ScripLog={
          scrip:item,
          userInfo:this.scrip.userInfo
        }
        this.$http.post("/box/getScripById",ScripLog)
        .then((res)=>{
          console.log("指定纸条:",res)
          if(res.data.result){
            this.initUserInfo()
            this.initScrips()
            this.getScripData=item
            this.show.outScripShow=false
            this.show.getScripShow=true
            this.myNotify('成功取出！',3000,'success')
          }else {
            this.show.outScripShow=false
            this.myNotify('取出失败,不扣除玫瑰',3000,'warning')
          }
        })
      });
    },

    /*初始化广场*/
    initScrips(){
      this.$http.get("/box/getListScrip")
      .then((res)=>{
        console.log(res)
        if(res.data.result){
          this.scrips=res.data.data
        }
      })
    },

    /*图片预览*/
    previewImg(img){
      ImagePreview([img]);
    },

    /*购买玫瑰*/
    async buyRose(item) {
      let baseCommodity = {
        openid: this.scrip.userInfo.openid,
        description: '玫瑰*'+item.roseCount,
        out_trade_no: new Date().getTime().toString() + 'xzt',
        total: item.total,
        userInfo:this.scrip.userInfo,
        roseCount:item.roseCount
      }
      let result = await wxUtil.placeOrder(this, BaseConfig.wxConfig.APPID, baseCommodity)
      if(result===200){
        /*用户支付成功*/
        this.$http.post("/box/outScrip", baseCommodity)
        .then((res)=>{
          console.log("购买玫瑰结果如下：",res)
          if(res.data.result){
            this.myNotify('购买成功',2000,'success')
            this.scrip.userInfo=res.data.data
            this.show.roseShow=false
          }
        })
      }
    },

    /*签到*/
    signIn(){
      this.$http.get("/box/signIn?openid="+this.scrip.userInfo.openid)
      .then((res)=>{
        console.log("签到结果",res)
        if(res.data.result){
          this.myNotify(res.data.data,2000,'success')
          if(res.data.data==='签到成功'){
            this.scrip.userInfo.rose=this.scrip.userInfo.rose+1
          }
        }
      })
    },

    /*放入纸条*/
    inScrip(gender){
      this.scrip.gender=gender
      this.show.saveScrip=true
    },
    saveScrip(){
      this.myNotify('正在投放纸条...',0,'primary')
      this.$http.post("/box/saveScrip",this.scrip)
      .then((res)=>{
        this.show.saveScrip=false
        this.initScrip()
        console.log("上传结果",res);
        if(res.data.result){
          /*上传成功*/
          this.myNotify('纸条投放成功啦~',2000,'success')
        }else {
          this.myNotify('纸条投放失败,请重试！',2000,'danger')
        }
      })
    },
    /*重置纸条数据*/
    initScrip(){
      this.scrip.picture=[]
      this.scrip.resume=''
      this.scrip.weChat=''
    },

    /*取纸条*/
    outScrip(sex) {
      this.scrip.userInfo.outSex=sex
      this.show.outScripShow=true
    },
    getScrip(sex,subRose){
      this.scrip.userInfo.outSex=sex
      this.scrip.userInfo.subRose=subRose
      if(this.scrip.userInfo.rose<1){
        this.myNotify('玫瑰不够~',3000,'warning')
        this.show.outScripShow=false
        this.show.roseShow=true
        return
      }
      this.myNotify('正在匹配缘分...',0,'primary')
      this.$http.post("/box/getScrip",this.scrip.userInfo)
      .then((res)=>{
        console.log("获取纸条结果如下",res)
        if(res.data.result){
          this.initUserInfo()
          this.getScripData=res.data.data
          this.show.outScripShow=false
          this.show.getScripShow=true
          this.myNotify('匹配成功！',3000,'success')
        }else {
          this.show.outScripShow=false
          this.myNotify('匹配失败,不扣除玫瑰',3000,'warning')
        }
      })
    },

    /*点击上传图片后触发此函数*/
    afterRead(file){
      console.log(file);
      this.myNotify('正在上传...',0,'primary')
      Util.putFile(this,file.file,this.scrip.userInfo.openid+'/'+new Date().getTime().toString(),"png")
      .then((res)=>{
        console.log("图片上传结果,",res)
        this.scrip.picture.push('http://'+res.Location)
        this.myNotify('上传成功',2000,'success')
      })
      .catch((err)=>{
        console.log(err)
        Notify({
          message: '上传失败',
          duration: 1000,
          type:'warning'
        });
      })
    },

    /*获取用户城市信息*/
    getCity(){
      Util.getCurrentCityName()
      .then(res=>{
        this.scrip.cityName=res
      })
    },
    /*初始化用户信息*/
    initUserInfo(){
      let userInfo=localStorage.getItem('userInfo')
      if(userInfo!==null){
        userInfo=JSON.parse(userInfo)
        this.$http.get("/box/getUserInfo?openid="+userInfo.openid)
        .then((res)=>{
          console.log("读取授权信息如下:",res);
          if(res.data.result){
            this.scrip.userInfo=res.data.data
          }
        })
      }
    },
    /*消息提示*/
    myNotify(message,duration,type){
      Notify({
        message: message,
        duration: duration,
        type:type
      });
    }
  }
}
</script>

<style src="./index.css">

</style>