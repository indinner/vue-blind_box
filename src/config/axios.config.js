import axios from "axios";

let request = axios.create({
    timeout: 7000,
})


//判断是否是生产环境
if (process.env.NODE_ENV === 'development') {
    request.defaults.baseURL = 'http://192.168.31.44:7770'
} else if (process.env.NODE_ENV === 'production') {
    request.defaults.baseURL = 'http://121.4.138.132:8891'
}

/*request.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
request.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

//请求拦截器
request.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if(token){
        config.headers['token']=token
    }
    return config
},error => {
    return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use(response => {
    if(response.headers.token){
        localStorage.setItem("token",response.headers.token)
    }
    return response
},error => {
    let { response } = error
    if (response){
        switch(response.status){
            case 404:
            //进行错误跳转之类
            case 401:
                //用户未登录
            case 403:
                //登录态失效
                break;
        }
    } else {
        //服务器没有返回结果 分两种情况 断网服务器崩了
        if(!window.navigator.onLine){
            //断网处理：跳转到断网页面
            return
        }
        return Promise.reject(error)
    }
})*/
export default request;