
import BaseConfig from "@/config/base.config.js"
let wxUtil={


    /**
     * 下单
     * @param that 上下文对象
     * @param appId 公众号appId
     * @param baseCommodity 商品信息*/
    async placeOrder(that,appId,baseCommodity) {
        /*获取预支付prepay_id*/
        let prepay_id = await this.getPrepayId(that,baseCommodity.openid,baseCommodity.description,baseCommodity.out_trade_no,baseCommodity.total)
        /*获取签名*/
        let signData={
            appId:appId,
            timeStamp:new Date().getTime().toString().substring(0,10),
            nonceStr:this.getRandom(),
            prepay_id:'prepay_id='+prepay_id
        }
        /*获取签名*/
        let paySign=await this.getPaySign(that,appId,signData);
        /*记录订单*/
        if(await this.saveOrder(that,baseCommodity)===200){
            /*调起支付*/
            return await this.onBridgeReady(appId,signData,paySign)
        }
    },

    onBridgeReady(appId,signData,paySign){
        return new Promise(function (resolve, reject) {
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    "appId": appId,     //公众号ID，由商户传入
                    "timeStamp": signData.timeStamp,     //时间戳，自1970年以来的秒数
                    "nonceStr": signData.nonceStr,      //随机串
                    "package": signData.prepay_id,
                    "signType": "RSA",     //微信签名方式：
                    "paySign": paySign
                },
                function (res) {
                    console.log("支付结果",res)
                    if (res.err_msg === "get_brand_wcpay_request:ok") {
                        resolve(200)
                    }else if(res.err_msg==="get_brand_wcpay_request:cancel"){
                        resolve(300)
                    }else {
                        resolve(400)
                    }
                });
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                //onBridgeReady();
            }
        })
    },

    saveOrder(that,baseCommodity){
        return new Promise(function (resolve, reject) {
            that.$http.post("/wxPay/saveOrder",baseCommodity)
                .then((res)=>{
                    console.log("创建订单如下:",res)
                    if(res.data.result){
                        resolve(200)
                    }else {
                        resolve(400)
                    }
                })
        })
    },


    /**
     * 签名*/
    getPaySign(that,appId,signData){
        return new Promise(function (resolve, reject) {
            that.$http.post("/wxPay/getPaySign",{
                appId:appId,
                timeStamp:signData.timeStamp,
                nonceStr:signData.nonceStr,
                prepay_id:signData.prepay_id
            })
                .then((res)=>{
                    console.log("签名结果如下:{}",res)
                    resolve(res.data)
                })
        })
    },



    /**
     * JSAPI统一下单，生成预支付交易单*/
    getPrepayId(that,openid,description,out_trade_no,total){
        return new Promise(function (resolve, reject) {
            /*请求后台统一下单，获取预支付prepay_id*/
            that.$http.post("/wxPay/jsapi",{
                description:description,
                out_trade_no:out_trade_no,
                total:total,
                openid:openid
            }).then((res)=>{
                if(res.data.prepay_id!=null||res.data.prepay_id!==""){
                    resolve(res.data.prepay_id)
                }else {
                    resolve(404)
                }
            }).catch((err)=>{
                resolve(404)
            })
        })
    },

    /**
     * 获取用户头像等信息
     * @param callBack 认证成功的回调函数*/
    getUserInfo(that,callBack){
        let uri=location.href.split("#")[0]
        let code=this.getQueryVariable("code")
        if(code!==undefined){
            /*根据code用户信息*/
            that.$http.get("/wxAuthentication/getUserInfo?code="+code)
                .then(async (res)=>{
                    if(res.data.result){
                        await this.saveUserInfo(that,JSON.parse(res.data.data))
                        localStorage.setItem('userInfo',res.data.data)
                        callBack()
                    }else {
                        /*认证失败,处理...*/
                    }
                })
        }else {
            location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+BaseConfig.wxConfig.APPID+"&redirect_uri="+encodeURI(uri)+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        }
    },
    /**
     * 存储用户信息*/
    saveUserInfo(that,userInfo){
        return new Promise(function (resolve, reject) {
            that.$http.post("/box/saveUserInfo",userInfo,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
                .then((res)=>{
                    resolve(200)
                })
        })
    },
    getQueryVariable (variable) {
        const after = location.href.split('?')[1]
        if (after) {
            const reg = new RegExp('(^|&)' + variable + '=([^&]*)(&|$)')
            const r = after.match(reg)
            if (r != null) {
                return decodeURIComponent(r[2])
            } else {
                return false
            }
        }
    },

    /**
     * 生成32位随机数*/
    getRandom(){
        let e = 32;
        var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
            a = t.length,
            n = "";
        for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
        return n
    },


}

export default wxUtil