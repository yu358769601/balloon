//服务端返回需要前端缓存的数据
private static serverSookie = null;
//获取后台配置数据，只需要在进入游戏内请求一次即可，无需多次请求
public getServerData(): void {
    let bObj: any;
    //商业化后台控制的界面id集合（id详见我方运营提供的控制内容文档）
    let viewArr = ["viewID1", "viewID2", "viewID3"];
    //TTSDK.serverSookie服务端缓存在客户端的内容，第一次请求拿到后再次请求需要携带
    if (!TTSDK.serverSookie) {
        //version：运营提供；  
        //channelId：渠道id，详见后台控制内容中渠道id对应表；  
        //controlIds：控制位id    
        //userId：用户唯一id，手动生成一个16位的字符串保存在本地使用   
        // sookie:服务端返回的数据，第一次请求完后端会返回该数据，之后每次请求都需要携带
        bObj = { version: "1.0.0", channelId: 'douyinh5', controlIds: viewArr, userId: "1234567891234567", sookie: {} }
    } else {
        bObj = { version: "1.0.0", channelId: 'douyinh5', controlIds: viewArr, userId: "1234567891234567", sookie: TTSDK.serverSookie }
    }
    let str: string = JSON.stringify(bObj);
    //数据加密，秘钥由我方运营提供
    str = Seal.rc4Encrypt(str, "test");

    //请求的头部参数   appid:我方运营提供
    let headers = ['Content-Type', 'html/text', 'ec', 'true', 'appid', '123456'];
    //请求内容
    HttpClient.toData("https://gamectrl.ugmars.com/api/bctrl", str, 'post', 'text', headers, false, function (res) {
        //数据解密，同数据加密的秘钥一致
        res = JSON.parse(Seal.rc4Decode(res, "test"));
        //需要缓存在客户端的数据
        TTSDK.serverSookie = res.data.sookie;
        console.log("tt配置内容:" + res);
    });
}
/**启动游戏，只需调用一次 */
public serverGameStart(): void {
    //version：运营提供；  
    //channelId：渠道id，详见后台控制内容中渠道id对应表；  
    //userId：用户唯一id，手动生成一个16位的字符串保存在本地使用       
    let bObj = { version: "1.0.0", channelId: 'douyinh5', userId: "1234567891234567" }
    let str: string = JSON.stringify(bObj);
    //数据加密，秘钥由我方运营提供
    str = Seal.rc4Encrypt(str, "test");

    //请求的头部参数   appid:我方运营提供
    let headers = ['Content-Type', 'html/text', 'ec', 'true', 'appid', '123456'];
    //请求内容
    HttpClient.toData("https://gamectrl.ugmars.com/api/gameStart", str, 'post', 'text', headers, false, function (res) {
        //数据解密，同数据加密的秘钥一致
        res = JSON.parse(Seal.rc4Decode(res, "test"));
        //服务端下发的请求间隔（单位：秒），前端需要使用该时间循环请求心跳接口
        let loopTime = res.data.refreshInterval;
        //循环请求心跳接口
        Laya.timer.loop(1000 * loopTime, this, TTSDK.serverHeartbeat);
    });
}
/**用户心跳 */
private static serverHeartbeat(): void {
    //version：运营提供；  
    //channelId：渠道id，详见后台控制内容中渠道id对应表；  
    //userId：用户唯一id，手动生成一个16位的字符串保存在本地使用  
    let bObj = { version: "1.0.0", channelId: 'douyinh5', userId: "1234567891234567" }
    let str: string = JSON.stringify(bObj);
    //数据加密，秘钥由我方运营提供
    str = Seal.rc4Encrypt(str, "test");
    console.log("触发用户心跳");
    //请求的头部参数   appid:我方运营提供
    let headers = ['Content-Type', 'html/text', 'ec', 'true', 'appid', '123456'];
    //请求内容
    HttpClient.toData("https://gamectrl.ugmars.com/api/heartbeat", str, 'post', 'text', headers, false, function (res) {
        console.log("用户心跳请求成功");
    });
}