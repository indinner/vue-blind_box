const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    open: true,
    host: '127.0.0.1',
    port: 80,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
      '/api': {
        target: 'http://192.168.31.44:7770',//这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': ''//请求的时候使用这个api就可以
        }
      }
    },
    allowedHosts: [
      'host.com', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.overwatch2.vip'   // .是二级域名的通配符
    ],
  },

})
