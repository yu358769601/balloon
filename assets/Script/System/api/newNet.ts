import {Seal} from "./Seal";
import ccLog from "../Log/ccLog";
import ControlCommercial from "../../control/controlCommercial";

export class  NewNet{
    public static readonly instance = new NewNet();



    /**广告rec4解密钥匙 */
    private ADKEY = 'f0dS9min6fSk8bLksM';
    private _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    private static sookiead = null;
     httpADType(request: string = 'post',paramData) {
       return  new Promise<any>((resolve, reject) => {
            let xmlhttp = cc.loader.getXMLHttpRequest();
            /*判断是否支持请求*/
            if (xmlhttp == null) {
                alert('你的浏览器不支持XMLHttp');
                return;
            }
            /*请求方式，并且转换为大写*/
            let httpType = request.toUpperCase();
            /*请求接口*/
           let httpUrl = "https://gamectrl.ugmars.com/api/bctrl";
            /*是否异步请求*/
           let async = true;
            /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
            // var paramData = {
            //     appid: 'qcql',   // 小游戏ID
            //     cnid: "mz",        //渠道ID
            //     postid: "QoHtip4H",      //广告位ID
            //     sookie: {}      //第一次只传空对象就可了,服务端缓存在客户端的内容，下次请求带过来
            // };
            if (this.sookiead) {
                paramData.sookie = this.sookiead;
            }
           let requestData = JSON.stringify(paramData);
            // console.log('发送数据', requestData, httpUrl)
            /*请求接收*/
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == 4 && (xmlhttp.status >= 200 && xmlhttp.status < 400)) {
                    // console.log("成功回调函数requestType: ", JSON.parse(this.rc4Decode(xmlhttp.responseText)));
                    let data = JSON.parse(this.rc4Decode(xmlhttp.responseText))//加密
                    console.log('回来什么呢',data)
                    if (data.status.code == '0') {
                        data.data.code //广告策略类型
                        data.data.sookie  //服务端缓存在客户端的内容，不能直接对象赋值对象，要以键的形式赋值
                        this.sookiead = data.data.sookie
                        this.codeAD = data.data.code

                        resolve(data)
                        // console.log('走记者李了吗', resolve,data)
                    }else{
                        reject(null)
                    }
                } else {
                    // console.log("失败回调函数: ", xmlhttp);
                    // reject(xmlhttp)
                }
            }
            /*接口连接，先判断连接类型是post还是get*/
            if (httpType == 'GET') {
                xmlhttp.open("GET", httpUrl, async);
                xmlhttp.send(null);
            } else if (httpType == 'POST') {
                xmlhttp.open("POST", httpUrl, async);
                // 发送合适的请求头信息
                xmlhttp.setRequestHeader("Content-Type", "html/text");//加密
                xmlhttp.setRequestHeader("ec", "true");//加密
                xmlhttp.send(this.rc4Encrypt(requestData));//加密
            }
        }).catch((e) => {});
    }

    static getData(url : string, request: string = 'post',paramData){
        return  new Promise<any>((resolve, reject) => {
            let xmlhttp = cc.loader.getXMLHttpRequest();
            /*判断是否支持请求*/
            if (xmlhttp == null) {
                alert('你的浏览器不支持XMLHttp');
                return;
            }
            /*请求方式，并且转换为大写*/
            let httpType = request.toUpperCase();
            /*请求接口*/
            let httpUrl = url;
            /*是否异步请求*/
            let async = true;
            /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
            // var paramData = {
            //     appid: 'qcql',   // 小游戏ID
            //     cnid: "mz",        //渠道ID
            //     postid: "QoHtip4H",      //广告位ID
            //     sookie: {}      //第一次只传空对象就可了,服务端缓存在客户端的内容，下次请求带过来
            // };
            // if (this.sookiead) {
            //     paramData.sookie = this.sookiead;
            // }

            ccLog.log("去网络请求的数据",paramData)
            let str: string = JSON.stringify(paramData.setData);
            //数据加密，秘钥由我方运营提供
            let requestData = Seal.rc4Encrypt(str, ControlCommercial.key);

            //请求的头部参数   appid:我方运营提供
            let headers = ['Content-Type', 'html/text', 'ec', 'true', 'appid', '123456'];


            // console.log('发送数据', requestData, httpUrl)
            /*请求接收*/
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == 4 && (xmlhttp.status >= 200 && xmlhttp.status < 400)) {
                    // console.log("成功回调函数requestType: ", JSON.parse(this.rc4Decode(xmlhttp.responseText)));
                    let data = JSON.parse(Seal.rc4Decode(xmlhttp.responseText,ControlCommercial.key))//加密
                    console.log('回来什么呢',data)
                    if (data.status.code == '0') {
                        // data.data.code //广告策略类型
                        // data.data.sookie  //服务端缓存在客户端的内容，不能直接对象赋值对象，要以键的形式赋值
                        // this.sookiead = data.data.sookie
                        // this.codeAD = data.data.code

                        resolve(data)
                        // console.log('走记者李了吗', resolve,data)
                    }else{
                        reject(null)
                    }
                } else {
                    // console.log("失败回调函数: ", xmlhttp);
                    // reject(xmlhttp)
                }
            }
            xmlhttp.onerror = (err) => {
                console.log("网络访问发生错误, 请检查网络是否畅通", err);
                resolve(null);
            };
            xmlhttp.timeout = 1000;
            xmlhttp.ontimeout = () => {
                console.log("网络请求超时, 请保证你的网络环境稳定");
                resolve(null);
            };



            /*接口连接，先判断连接类型是post还是get*/
            if (httpType == 'GET') {
                xmlhttp.open("GET", httpUrl, async);
                xmlhttp.send(null);
            } else if (httpType == 'POST') {
                xmlhttp.open("POST", httpUrl, async);
                // 发送合适的请求头信息
                xmlhttp.setRequestHeader("Content-Type", "html/text");//加密
                xmlhttp.setRequestHeader("ec", "true");//加密
                xmlhttp.setRequestHeader( 'appId', paramData.obj.gameId);//加密
                xmlhttp.send(requestData);//加密
            }
        }).catch((e) => {});
    }


    //获取后台配置数据，只需要在进入游戏内请求一次即可，无需多次请求
    // NewNet.getServerData()
    static async  getServerData(sendData){
        let bObj: any;
        //商业化后台控制的界面id集合（id详见我方运营提供的控制内容文档）
        //TTSDK.serverSookie服务端缓存在客户端的内容，第一次请求拿到后再次请求需要携带
        if (!this.sookiead) {
            //version：运营提供；
            //channelId：渠道id，详见后台控制内容中渠道id对应表；
            //controlIds：控制位id
            //userId：用户唯一id，手动生成一个16位的字符串保存在本地使用
            // sookie:服务端返回的数据，第一次请求完后端会返回该数据，之后每次请求都需要携带
            bObj = sendData
        } else {
            sendData.setData.sookie = this.sookiead
            bObj = sendData
        }

      let res =  await this.getData("https://gamectrl.ugmars.com/api/bctrl","post",bObj)
      // let res =  await this.getData("https://www.baidu.com/api/bctrl","post",bObj)
       ccLog.log("新广告请求回来的参数",res)
        // //请求内容
        // HttpClient.toData("https://gamectrl.ugmars.com/api/bctrl", str, 'post', 'text', headers, false, function (res) {
        //     //数据解密，同数据加密的秘钥一致
        //     res = JSON.parse(Seal.rc4Decode(res, "ksgamesqqq"));
        //     //需要缓存在客户端的数据
        //     TTSDK.serverSookie = res.data.sookie;
        //     console.log("tt配置内容:" + res);
        // });


        return res
    }


    static async  getAdControl(){//拉取广告策略
         const httpSdkUrl = "";//http请求路径，例：https://gamectrl.ugmars.com/api/
         let appId = "202107006";//应用id,区分安卓与小游戏，默认为小游戏
         let channelId = '1006';//渠道id
         let appVersion = "0.0.1";//版本号
         let controlIds = ["sqqq_qd","sqqq_xslb","sqqq_pfsy"];//请求列表
         let userId = "12345678978778";//用户随机id

         let sookie = {};//sookie缓存，默认为空
        if(channelId == ''){
            console.log('无法识别渠道类型');
            return
        }
        let reqData = {
            version: appVersion,           //app版本
            channelId: channelId,    //渠道ID // Platfrom.sdkId
            controlIds: controlIds,  //控制位ID
            userId: userId,  //16位数的随机id
            sookie: sookie
        }
        let control = await this.asyncHttpRequest(reqData,"bctrl",appId);//control为服务器返回的数据
        console.log("control",control);
    }
    /**异步的http请求 */
    static  asyncHttpRequest<T>(paramObj, requestType:string,appId :string ) {
        return new Promise<T>((resolve, reject) => {
            let xmlhttp = cc.loader.getXMLHttpRequest();
            /*判断是否支持请求*/
            if (xmlhttp == null) {
                console.log('你的浏览器不支持XMLHttp');
                return;
            }
            /*请求方式，并且转换为大写*/
            let httpType = "POST";//'post'.toUpperCase();
            /*请求接口*/
            let httpUrl = "https://gamectrl.ugmars.com/api/" + requestType;
            /*是否异步请求*/
            let async = true;
            let requestData = JSON.stringify(paramObj);//请求数据转换成字符串
            /*请求接收*/
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == 4 && (xmlhttp.status >= 200 && xmlhttp.status < 400)) {
                    let data = JSON.parse(Seal.rc4Decode(xmlhttp.responseText))//rc4Decode方法是解密算法
                    console.log(data);
                    if(data.status.code == 0){
                        if ("bctrl" == requestType) {
                            resolve(data.data.params);
                        } else {
                            resolve(data.data);
                        }
                        if(data.data.sookie){
                            // sookie = data.data.sookie;
                        }
                    }
                    else{
                        resolve(null);
                    }
                } else {
                    // console.log("失败回调函数: " + requestType, xmlhttp);
                }
            }
            xmlhttp.onerror = (err) => {
                cc.log("网络访问发生错误, 请检查网络是否畅通", err);
                resolve(null);
            };
            xmlhttp.timeout = 3000;
            xmlhttp.ontimeout = () => {
                cc.log("网络请求超时, 请保证你的网络环境稳定");
                resolve(null);
            };
            /*接口连接，先判断连接类型是post还是get*/
            if (httpType == 'GET') {
                xmlhttp.open("GET", httpUrl, async);
                xmlhttp.send(null);
            } else if (httpType == 'POST') {
                xmlhttp.open("POST", httpUrl, async);
                xmlhttp.setRequestHeader("Content-Type", "html/text");
                xmlhttp.setRequestHeader("ec", "true");
                xmlhttp.setRequestHeader("appId", appId);
                // if(ADKEY == ""){//是否加密
                //     xmlhttp.setRequestHeader("Content-Type", "application/json");
                //     xmlhttp.setRequestHeader("ec", "false");
                // }
                // else{
                //     xmlhttp.setRequestHeader("Content-Type", "html/text");
                //     xmlhttp.setRequestHeader("ec", "true");
                // }
                // if(appId){
                //     xmlhttp.setRequestHeader("appId", appId);
                // }
                xmlhttp.send(Seal.rc4Encrypt(requestData));//rc4Encrypt是加密算法
            }
        });
    }



}