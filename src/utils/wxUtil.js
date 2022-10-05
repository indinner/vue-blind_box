
import BaseConfig from "@/config/base.config.js"
let wxUtil={


    /**
     * 获取用户头像等信息*/
    getUserInfo(that){
        if(localStorage.getItem('userInfo')!==null){
            return;
        }
        let uri=location.href.split("#")[0]
        let code=this.getQueryVariable("code")
        if(code!==undefined){
            /*根据code用户信息*/
            that.$http.get("/wxAuthentication/getUserInfo?code="+code)
                .then((res)=>{
                    if(res.data.result){
                        localStorage.setItem('userInfo',res.data.data)
                    }else {
                        /*认证失败,处理...*/
                    }
                })
        }else {
            location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+BaseConfig.wxConfig.APPID+"&redirect_uri="+encodeURI(uri)+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        }
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