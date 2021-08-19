import ccLog from "../Log/ccLog";

class Net {
    public static readonly instance = new Net();

     go(paramData) {
       return  new Promise<any>((resolve, reject) => {
           let  url = ""
            let xmlhttp = cc.loader.getXMLHttpRequest();
            /*判断是否支持请求*/
            if (xmlhttp == null) {
                alert('你的浏览器不支持XMLHttp');
                return;
            }
           // paramData = {
           //     httpType : "get",
           //     httpUrl : "",
           //     async : true,
           //     data : {}
           // }
           let requestData = ""

           /*请求方式，并且转换为大写*/
            let httpType = paramData.httpType.toUpperCase();
            /*请求接口*/
           let httpUrl =paramData.httpUrl;
            /*是否异步请求*/
           let async = paramData.async;

            // console.log('发送数据', requestData, httpUrl)
            /*请求接收*/
            xmlhttp.onreadystatechange = () => {
                let temp = xmlhttp

                if (xmlhttp.status>0) {
                    if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                        // console.log("成功回调函数requestType: ", JSON.parse(this.rc4Decode(xmlhttp.responseText)));
                        // ccLog.log("网络请求 成功返回123123",xmlhttp)

                        let data = JSON.parse(xmlhttp.responseText)//加密
                        // ccLog.log("网络请求 成功返回123123",data,xmlhttp.responseText)
                        ccLog.log("网络请求 正常请求返回来的",data)
                        if (data.code == 0) {
                            resolve(data)
                        }else{
                            reject(xmlhttp)
                        }


                        // let data = xmlhttp.responseText
                        // console.log('回来什么呢',data)


                        // if (data.status.code == '0') {
                        //     // data.data.code //广告策略类型
                        //     // data.data.sookie  //服务端缓存在客户端的内容，不能直接对象赋值对象，要以键的形式赋值
                        //     // this.sookiead = data.data.sookie
                        //     // this.codeAD = data.data.code
                        //     //
                        //     // resolve(data)
                        //     // console.log('走记者李了吗', resolve,data)
                        // }else{
                        //     reject(null)
                        // }
                    } else {
                        ccLog.log("网络请求 失败",xmlhttp)
                        // console.log("失败回调函数: ", xmlhttp);
                        // reject(xmlhttp)
                        // ccLog.log("网络请求 失败返回",xmlhttp)
                        resolve(null)
                        // ccLog.log("网络请求 失败")
                    }
                }

            }
           xmlhttp.timeout  = 1;// 8 seconds for timeout

           xmlhttp.ontimeout =  (e) =>{
               // XMLHttpRequest 超时。在此做某事。
               ccLog.log("网络请求 超时",e)
               resolve(null)
           };
           xmlhttp.onerror = (e)=>{
               ccLog.log("网络请求 错误",e)
               resolve(null)
           }

            /*接口连接，先判断连接类型是post还是get*/
            if (httpType == 'GET') {

                url += "?";
                for(let item in paramData.data){
                    url += item +"=" +paramData.data[item] +"&";
                }
                httpUrl +=url

                xmlhttp.open("GET", httpUrl, async);
                xmlhttp.send();
                ccLog.log("网络请求 发过去的",httpUrl)
            } else if (httpType == 'POST') {
                xmlhttp.open("POST", httpUrl, async);
                // 发送合适的请求头信息
                // xmlhttp.setRequestHeader("Content-type","application/json");//加密
                //设置提交数据的方式，application/json json传输数据用的比较多
                // xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
                // xmlhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
                // xmlhttp.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
                xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                // xmlhttp.setRequestHeader("Content-Type", "application/json");

                // xmlhttp.setRequestHeader("ec", "true");//加密
                /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
                 // requestData += "?";
                    // JSON.stringify(paramData.data);
                for(let item in paramData.data){
                    requestData += item +"=" +paramData.data[item] +"&";
                }
                ccLog.log("网络请求 准备发过去",requestData)
                xmlhttp.send(requestData);//加密
                ccLog.log("网络请求 发过去的",requestData)
            }
        }).catch((e) => {
           ccLog.log("网络请求 可能有问题",e)
       });
    }

}
export default <Net>Net.instance;