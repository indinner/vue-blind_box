
import BaseConfig from "@/config/base.config.js"
let wxUtil={


    /**
     * 获取用户头像等信息
     * @param callBack 认证成功的回调函数*/
    getUserInfo(that,callBack){
        let uri=location.href.split("#")[0]
        let code=this.getQueryVariable("code")
        if(code!==undefined){
            /*根据code用户信息*/
            that.$http.get("/wxAuthentication/getUserInfo?code="+code)
                .then((res)=>{
                    if(res.data.result){
                        this.saveUserInfo(that,JSON.parse(res.data.data))
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
        that.$http.post("/box/saveUserInfo",userInfo,{
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then((res)=>{

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


}

export default wxUtil