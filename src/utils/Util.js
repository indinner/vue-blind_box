import BaseConfig from "@/config/base.config.js";
import wxUtil from "@/utils/wxUtil.js";

let Util={

    /*获取城市信息*/
    getCurrentCityName(){
        return new Promise(function (resolve, reject) {
            let myCity = new BMap.LocalCity()
            myCity.get(function (result) {
                resolve(result.name)
            })
        })
    },

    putFile(that,fileObject,name,type){
        let cos=this.initCos(that)
        return new Promise(function (resolve, reject) {
            cos.putObject({
                Bucket: 'ak-1302363069', /* 填入您自己的存储桶，必须字段 */
                Region: 'ap-shanghai',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
                Key: 'blind_box/img/'+name+'.'+type,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
                StorageClass: 'STANDARD',
                Body: fileObject, // 上传文件对象
                onProgress: function(progressData) {
                    //console.log(JSON.stringify(progressData));
                }
            }, function(err, data) {
                resolve(data)
                reject(err)
            });
        })
    },



    initCos(that){
        // 存储桶名称，由bucketname-appid 组成，appid必须填入，可以在COS控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket
        var Bucket = 'ak-1302363069';  /* 存储桶，必须字段 */

        // 存储桶region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/
        // 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
        var Region = 'ap-shanghai';     /* 存储桶所在地域，必须字段 */
        // 初始化实例
        const cos = new COS({
            Domain: 'cdn.jianwei.top', // 自定义加速域名
            Protocol: 'http:', // 请求协议： 'https:' 或 'http:'
            // getAuthorization 必选参数
            getAuthorization: function (options, callback) {
                // 初始化时不会调用，只有调用cos方法（比如cos.putObject）时才会进入
                // 异步获取临时密钥
                // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
                // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
                // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
                that.$http.get("/wxAuthentication/getCredential")
                    .then((res)=>{
                        let credentials=res.data.credentials
                        callback({
                            TmpSecretId: credentials.tmpSecretId,
                            TmpSecretKey: credentials.tmpSecretKey,
                            SecurityToken: credentials.sessionToken,
                            // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                            StartTime: res.data.startTime, // 时间戳，单位秒，如：1580000000
                            ExpiredTime: res.data.expiredTime, // 时间戳，单位秒，如：1580000000
                        });
                    })
                }
        });
        return cos;
    },
}

export default Util