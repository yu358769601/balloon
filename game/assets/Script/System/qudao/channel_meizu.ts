import ChannelAllBase from "./channelAllBase";
import {Ichannel_android} from "./Ichannel_android";
import ChannelManger, {ChannelMangerType} from "./channelManger";
import {Platform_oppoADCode} from "./platform_oppo";
import ccLog from "../Log/ccLog";
import {Channel_oppoADCode, Channel_oppoADType} from "./channel_oppo";
import UtilsTime from "../Utils/UtilsTime";
import Api from "../api/api";

const {ccclass, property} = cc._decorator;

// 《钱多多》K激励视频ID: 337437
// 《钱多多》K原生1280ID: 337438
// 《钱多多》K原生320ID: 337439
// 《钱多多》K原生三张ID: 337443
// 《钱多多》KbannerID: 337436
// oppo包名：com.ks.qdddqhzl.kyx.nearme.gamecenter
export enum Channel_meizuADCode {
    横幅 = "wERlXjzx",
    激励视频 = "xviNfjyC",
    插屏 = "E4gsGHwh",
}
export enum Channel_meizuADType {
    横幅 = 0,
    激励视频 = 1,
    插屏 = 2,
}


export class Channel_meizu extends ChannelAllBase implements Ichannel_android{
     bannerAdcreate: any = null;
     videoAdcreate: any = null;
     interstitialAdcreate: any = null;
     nativeAdcreate: any = null;
     _nativeCurrentAd: any = null;





     _createNativeAdTime : number = 0
     _createNativeAdCountMax : number = 2
     _createNativeAdCountMin : number = 0

    constructor() {
        super();
        // this.initAd()
        // cc["platform_Android"] = this;

    }
     adnative : [] = null;//原生广告
     adnativedata : []= null;//原生广告数据
     adnativepic : []= null;//原生广告图片

     adnativepicDialog : []= [];//原生广告图片


    checkChannel(): boolean {
        //如果是浏览器 就强制web
        if(ChannelManger.getInstance().forcedWEB(typeof qg != "undefined" ) == true){
            return true
        }
        return false;
    }

    initAd() {
        ccLog.log("我现在是 魅族")



        //
        //
        // // this.loadFullVideoAd();
        // // this.loadRewardVideoAd();
        // this.createVideoAd();
        // // this.initNativeAd();
        // this.createBanner()
        // //提前加载自渲染
        // this.createnative()
    }

     createVideoAd() {
        // if (cc.sys.platform != cc.sys.OPPO_GAME) {
        //     return
        // }
        // if (qg == null) {
        //    return
        // }
        const videoAd = qg.createRewardedVideoAd({
            //激励视频
            adUnitId: Channel_meizuADCode.激励视频,
        });

        videoAd.onError(err => {
            console.log("激励视频广告加载失败", err);
            if (this._videoAdFailCallback) {
                this._videoAdFailCallback();
            }
            this._videoAdFailCallback = null;
        });

        videoAd.onClose(res => {
            if (res && res.isEnded || res === undefined) {
                console.log("视频观看成功");
                if (this._videoAdSuccessCallback) {
                    this._videoAdSuccessCallback();
                }
            } else {
                console.log("视频观看取消");
                if (this._videoAdCancelCallback) {
                    this._videoAdCancelCallback();
                }
            }
            this._videoAdSuccessCallback = null;
            this._videoAdCancelCallback = null;
        });
        this.videoAdcreate = videoAd;
    };

     createnative(){//创建原生广告，只调用一次
        let tempnativeid = [];
        console.log("现在是 oppo");
         // tempnativeid[0] = null
         tempnativeid[Channel_oppoADType.K原生1280ID] = Channel_oppoADCode.K原生1280ID
         tempnativeid[Channel_oppoADType.K原生320ID] = Channel_oppoADCode.K原生320ID
         tempnativeid[Channel_oppoADType.K原生三张ID] = Channel_oppoADCode.K原生三张ID
         // tempnativeid.push(Channel_oppoADCode.K原生1280ID);
         // tempnativeid.push(Channel_oppoADCode.K原生320ID);
         // tempnativeid.push(Channel_oppoADCode.K原生三张ID);
         // tempnativeid.push(Channel_oppoADCode.KbannerID);
        this.adnative = [];
        this.adnativedata = [];
        this.adnativepic = [];
        // if(this.adnative == null)
        // {
        //     this.adnative = [];
        //     this.adnativedata = [];
        //     this.adnativepic = [];
        // }
        for(let i in tempnativeid)
        {
            // if(!this.adnative[i] && tempnativeid[i] != "")
            // {
            this.adnativepic[i] = null;

            if(cc.sys.platform == cc.sys.OPPO_GAME){
                console.log("加载oppo原生广告"+i,"参数是",tempnativeid[i]);
                this.adnative[i] = qg.createNativeAd({
                    adUnitId: tempnativeid[i]
                });
            }

            this.adnative[i].onLoad((res) => {
                if (res && res.adList){
                    console.log("原生广告完成"+i);
                    this.adnativedata[i] = res.adList.pop();
                    this.loadnativepic(i);
                }
            });
            this.adnative[i].onError(err => {
                console.log("原生广告加载异常"+i, err);
            });
            this.adnative[i].load();
            // }
        }
    }
     createnativeByIndex(index){//创建原生广告，只调用一次
        if (index == null) {
            this.createnative()
            return
        }
        let tempnativeid = [];
        console.log("现在是 oppo",cc.sys.platform == cc.sys.OPPO_GAME);
        if(cc.sys.platform == cc.sys.OPPO_GAME){
            // tempnativeid.push(Channel_oppoADCode.K原生1280ID);
            // tempnativeid.push(Channel_oppoADCode.K原生320ID);
            // tempnativeid.push(Channel_oppoADCode.K原生三张ID);
            // tempnativeid.push(Channel_oppoADCode.KbannerID);
            // tempnativeid[0] = null
            tempnativeid[Channel_oppoADType.K原生1280ID] = Channel_oppoADCode.K原生1280ID
            tempnativeid[Channel_oppoADType.K原生320ID] = Channel_oppoADCode.K原生320ID
            tempnativeid[Channel_oppoADType.K原生三张ID] = Channel_oppoADCode.K原生三张ID
        }
        else if(cc.sys.platform == cc.sys.VIVO_GAME){
            tempnativeid.push("原生广告ID1");
            tempnativeid.push("原生广告ID2");
            tempnativeid.push("原生广告ID3");
        }
        // this.adnative = [];
        // this.adnativedata = [];
        // this.adnativepic = [];
        // if(this.adnative == null)
        // {
        //     this.adnative = [];
        //     this.adnativedata = [];
        //     this.adnativepic = [];
        // }

        if (this.adnativepic[index] == null) {
            if(cc.sys.platform == cc.sys.OPPO_GAME){
                console.log("加载oppo原生广告"+index,"参数是",tempnativeid[index]);
                this.adnative[index] = qg.createNativeAd({
                    adUnitId: tempnativeid[index]
                });
            }
            else if(cc.sys.platform == cc.sys.VIVO_GAME){
                this.adnative[index] = qg.createNativeAd({
                    posId: tempnativeid[index]
                });
            }
            this.adnative[index].offLoad()
            this.adnative[index].offError()
            this.adnative[index].onLoad((res) => {
                if (res && res.adList){
                    console.log("原生广告完成"+index);
                    this.adnativedata[index] = res.adList.pop();
                    this.loadnativepic(index);
                }
            });
            this.adnative[index].onError(err => {
                console.log("原生广告加载异常"+index, err);
            });
            this.adnative[index].load();
        }


        // for(let i in tempnativeid)
        // {
        //     // if(!this.adnative[i] && tempnativeid[i] != "")
        //     // {
        //         this.adnativepic[i] = null;
        //         if(cc.sys.platform == cc.sys.OPPO_GAME){
        //             console.log("加载oppo原生广告"+i,"参数是",tempnativeid[i]);
        //             this.adnative[i] = qg.createNativeAd({
        //                 adUnitId: tempnativeid[i]
        //             });
        //         }
        //         else if(cc.sys.platform == cc.sys.VIVO_GAME){
        //             this.adnative[i] = qg.createNativeAd({
        //                 posId: tempnativeid[i]
        //             });
        //         }
        //         this.adnative[i].onLoad((res) => {
        //             if (res && res.adList){
        //                 console.log("原生广告完成"+i);
        //                 this.adnativedata[i] = res.adList.pop();
        //                 this.loadnativepic(i);
        //             }
        //         });
        //         this.adnative[i].onError(err => {
        //             console.log("原生广告加载异常"+i, err);
        //         });
        //         this.adnative[i].load();
        //     // }
        // }
    }
    //显示激励视频广告
     showVideoAd(successfulCallback, cancelCallback, failureCallback) {
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;

        const videoAd = qg.createRewardedVideoAd({
            adUnitId: Channel_meizuADCode.激励视频,
        });

        videoAd.onError((err) => {
            console.log("激励视频错误信息" + JSON.stringify(err));
        });

        videoAd.load();
        videoAd.onLoad(function () {
            console.log("激励视频加载成功");
            videoAd.show().then(() => {
                console.log('激励视频广告展示完成');
            }).catch((err) => {
                console.log('激励视频广告展示失败', JSON.stringify(err));
            }); //展示广告，可以提前调用load，在需要的时候调用show
        });

        videoAd.onClose(() => {
            console.log('视频广告关闭回调');
            this._videoAdSuccessCallback && this._videoAdSuccessCallback();
            this._videoAdSuccessCallback = null;
        })
    }
     async initNativeAd(code ?) {
        return new Promise <any>((resolve, reject) => {
            let tempCode =  Platform_oppoADCode.K原生640ID
            if (code != null) {
                tempCode = code
            }
            const nativeAd = qg.createNativeAd({
                adUnitId: tempCode,
            });

            nativeAd.load();
            nativeAd.onLoad(async(res) => {
                // Emitter.fire('onTipsShow',{txt: "onload触发"+JSON.stringify(res)})
                console.log('原生广告加载完成-onload触发', JSON.stringify(res));
                let nativeCurrentAd;
                if (res && res.adList) {
                    nativeCurrentAd = res.adList[0];
                    // const remoteUrl = nativeCurrentAd.iconUrlList[0];
                    const remoteUrl = nativeCurrentAd.imgUrlList[0];
                    console.log("下载资源图片完成"+remoteUrl);

                    this._nativeCurrentAd = nativeCurrentAd;
                    // Emitter.fire('onTipsShow',{txt: "下载资源图片完成"+remoteUrl})
                    // https://adsfs.heytapimage.com/ads-material-depot/image/c264bd4465aa08f0b7516dc6a1c06328.jpg?region=cn-north-1&x-ocs-process=image%2fresize%2cm_fix%2cw_640%2ch_320%2ffallback
                    cc.assetManager.loadRemote(remoteUrl, async(err, texture) => {


                        console.log("下载资源图片完成 有没有错误",err);

                        if (texture != null) {
                            this._nativeAdTexture = texture;
                            // console.log("下载资源图片完成",texture);
                            resolve()
                        }
                        if (err != null) {
                            console.log("现在有错误");
                            resolve()
                        }


                    })

                }
            });

            nativeAd.onError(err => {
                console.log("原生广告加载异常", err);
                resolve()
            });
            this.nativeAdcreate = nativeAd;

        })


    };

    async showNativeAdTest(data){
        let tempCode =  0
        this.adnativepic = []
        tempCode = data.ADTypeCode
        // this.shownative(tempCode)
        let successfulCallback = () => {
            // this.clicknative(tempCode)
            ccLog.log("点了广告了")
        };

        // let code = adCode
        const h = 0 - cc.winSize.height / 2;
        const pos = cc.v2(0, h);
        console.log("现在 图呢","所有的图",this.adnativepic,"具体", this.adnativepic[data.ADTypeCode]);
        // let newdata = {
        //     code : adCode,
        //     texture : this.adnativepic[data.ADTypeCode],
        //     height : heightList[adCode]
        // }
        let adCode = Api.getAdCode()
        data.adCode = adCode

        let remoteUrl = "https://adsfs.heytapimage.com/ads-material-depot/image/968155e6c0dc59663538c2b9a98a7ea8.jpg"
        await cc.assetManager.loadRemote(remoteUrl, async(err, texture) => {


            console.log("下载资源图片完成 有没有错误",err,texture);

            if (texture != null) {
                // this._nativeAdTexture = texture;
                // console.log("下载资源图片完成",texture);
                this.adnativepic[data.ADTypeCode] = texture

                Emitter.fire('onSetTempSprite',texture)
            }
            if (err != null) {
                console.log("现在有错误");
            }


        })

        console.log("下载资源图片完成 结果 1 ",this.adnativepic,data.ADTypeCode);
        data.texture = this.adnativepic[data.ADTypeCode]
        data.height = data.heights[data.adCode]

        // data.parent
        // data.ADTypeCode
        //data.oppoNativeADToClose

        Emitter.fire('onOpenNativeAdDialog',data, pos,data.parent,successfulCallback)
    }



     //渲染原生广告
     async showNativeAd(data) {

         // data.parent
         // data.ADTypeCode
         //data.oppoNativeADToClose

        console.log("现在 有没有图","所有的图",this.adnativepic,"具体", this.adnativepic[data.ADTypeCode]);

        if (this.adnativepic[data.ADTypeCode] == null) {
            this.createnativeByIndex(data.ADTypeCode)
            return
        }



        // if (cc.sys.platform != cc.sys.OPPO_GAME) {
        //     return
        // }
        // oppo原生广告策略
        // this.nativeAdcreate = null;
        //  await this.initNativeAd(code)

        let currentTime = UtilsTime.getTime()
        let time = (currentTime - this._createNativeAdTime) / 1000;


         let adCode = Api.getAdCode()
         if (adCode ==4) {
             this._createNativeAdCountMin = 0
         }
         if (data.ADTypeCode!=null) {
             let temptime = 0
             temptime = this.ADtimesCD[adCode]
             if (this._createNativeAdCountMin >= this._createNativeAdCountMax) {
                 if (time < temptime) {
                     return;
                 }
                 this._createNativeAdCountMin = 0
             }
             let tempCode =  0

             tempCode = data.ADTypeCode
             this.shownative(tempCode)
             let successfulCallback = (self) => {
                 console.log("从后面回来的 0 ",tempCode,self,"整体",this.adnativepicDialog);
                 this.clicknative(tempCode,self )
             };

             // let code = adCode
             const h = 0 - cc.winSize.height / 2;
             const pos = cc.v2(0, h);
             console.log("现在 图呢","所有的图",this.adnativepic,"具体", this.adnativepic[data.ADTypeCode]);
             // let newdata = {
             //     code : adCode,
             //     texture : this.adnativepic[data.ADTypeCode],
             //     height : heightList[adCode]
             // }

             data.adCode = adCode

             console.log("下载资源图片完成 结果 1 ",this.adnativepic,data.ADTypeCode);
             data.texture = this.adnativepic[data.ADTypeCode]
             data.height = data.heights[data.adCode]
             // data.height = Utils.getADNativeHeight(adCode,data.cancelNode,data.parent,data.oppoNativeADToClose)
             // data.parent
             // data.ADTypeCode
             //data.oppoNativeADToClose
             
             Emitter.fire('onOpenNativeAdDialog',data, pos,data.parent,successfulCallback)
             //设置按钮高度
             // let codeData = {
             //     code : adCode
             // }
             // Emitter.fire('onLookADBtnHeight',codeData)

             let currentTime = UtilsTime.getTime()
             // console.log("现在有图 2",currentTime);
             this._createNativeAdTime = currentTime
             // console.log("现在有图 3",this._createNativeAdTime);
             if (adCode !=4) {
                 this._createNativeAdCountMin++
             }

             // console.log("现在有图 4",this._createNativeAdCountMin);
             if (this._createNativeAdCountMin>=this._createNativeAdCountMax) {
                 // console.log("现在有图 5",this._createNativeAdCountMin,"",this._createNativeAdCountMax);
                 this._createNativeAdCountMin = this._createNativeAdCountMax
                 // console.log("现在有图 6",this._createNativeAdCountMin,"",this._createNativeAdCountMax);
             }

         }

    };

    static closeNativeAd() {
        // if (this.nativeAdcreate != null) {
        //     this.nativeAdcreate.offLoad(null)
        //     this.nativeAdcreate.destroy();
        //     this.nativeAdcreate = null
        //     this._nativeCurrentAd = null
        //     // this.initNativeAd()
        //
        // }else {
        //
        // }
        // for(let i in this.adnative){
        //     if (i != null){
        //         i.destroy();
        //     }
        // }
        // for (let i = 0; i < this.adnative.length; i++) {
        //     this.adnative[i].destroy();
        // }

    }


    createBanner() {
        const screenHeight = qg.getSystemInfoSync().screenHeight;
        const screenWidth = qg.getSystemInfoSync().screenWidth;
        const bannerAd = qg.createBannerAd({
            adUnitId: Channel_oppoADCode.KbannerID,
            style: {
                left: 0,
                top: screenHeight - screenWidth / 6.7,
                width: screenWidth,    // 设置banner需要的宽度，横屏游戏宽度建议使用参考值1440，必须设置
                height: screenWidth / 6.7    // 广告期望高度，在onResize里面可以根据广告的高度重
            }
        });

        bannerAd.onError(err => {
            console.log("banner广告加载失败", err);
        });

        bannerAd.onHide(function () {
            console.log('banner 广告隐藏')
        });

        bannerAd.onLoad(function () {
            console.log("banner 广告加载成功");
        });

        bannerAd.onResize(res => {
            console.log('banner 宽度：' + res.width + ', banner 高度：' + res.height)
        });

        this.bannerAdcreate = bannerAd;
    }



     loadnative(num){//加载原生广告
        if(this.adnative[num] && this.adnative[num] != null)
        {
            this.adnative[num].load();
        }
    }

     loadnativepic(num){//预加载原生广告的图片,需要显示原生广告时，直接引用图片对象adnativepic
        let self = this;
        // this.adnativepic[num] = null;
        let temppath = Utils.getStr(this.adnativedata[num].imgUrlList[0],0,"?")
        console.log("现在 下载图 路径 ",temppath);
        if(temppath != "")
        {

            cc.assetManager.loadRemote(temppath,  (err, tex)=> {
                if(err)
                {
                    console.log("现在 有错误 ",err);
                }
                else
                {
                    console.log("loadnativepicok "+num);
                    // let sp = new cc.SpriteFrame(tex,new cc.Rect(0, 0, tex.width, tex.height));
                    let sp = tex;
                    console.log("现在 有图 ",sp);
                    // console.log("现在 渠道名字 ",this._name);
                    this.adnativepic[num] = sp;
                    console.log("现在 放进去了吗 ",this.adnativepic);
                    console.log("现在 下载资源图片完成",tex);
                    // Emitter.fire('onSetTempSprite',sp)

                    if (this.adnativepicDialog[num] !=null) {
                        this.adnativepicDialog[num].onLoadSP(null,num,sp)
                    }
                    // Emitter.fire('onLoadSP',num,sp)
                }
            });
        }
    }

     shownative(num){//上报显示
        let self = this;
        if(this.adnative[num] != null && this.adnativedata[num] != null)
        {
            this.adnative[num].reportAdShow({ adId: this.adnativedata[num].adId });
        }
    }

     clicknative(num,self1 ?){//上报点击
        let self = this;
         console.log("从后面回来的 1 ",self1 != null);
         if (self1 != null) {
             this.adnativepicDialog[num] = self1
             console.log("从后面回来的 2 ",num,self1,"整体",this.adnativepicDialog);
         }
        if(this.adnative[num] != null && this.adnativedata[num] != null)
        {
            this.adnative[num].reportAdClick({ adId: this.adnativedata[num].adId });


            this.loadnative(num);
        }else{
            this.loadnative(num);
        }

    }


     hideBannerAd() {
        if (this.bannerAdcreate) {
            this.bannerAdcreate.hide();
            this.bannerAdcreate.destroy();
            this.bannerAdcreate = null;
        } else {
            cc.log("bannerAdcreate失败")
        }
    }
    showBannerAd() {
        const screenHeight = qg.getSystemInfoSync().screenHeight;
        const screenWidth = qg.getSystemInfoSync().screenWidth;
        const bannerAd = qg.createBannerAd({
            adUnitId: Channel_meizuADCode.横幅,
            style: {
                left: 0,
                top: screenHeight - screenWidth / 6.7,
                width: screenWidth,    // 设置banner需要的宽度，横屏游戏宽度建议使用参考值1440，必须设置
                height: screenWidth / 6.7    // 广告期望高度，在onResize里面可以根据广告的高度重
            }
        });

        bannerAd.onError((err) => {
            console.log("banner错误信息" + JSON.stringify(err));
        });

        bannerAd.onLoad(() => {
            console.log("banner广告加载成功");
            bannerAd.show()
        });

        bannerAd.onResize(res => {
            console.log("banner onResize:", res.width, ",", res.height);
            bannerAd.style.top = screenHeight - res.height; //确定左上角位置，为底部位置
            bannerAd.style.left = 0;
            bannerAd.style.width = res.width;
            bannerAd.style.height = res.height;
        });

        this.bannerAdcreate = bannerAd;
    }

    showFeedAd(num) {

    }

    showInterstitialAd() {



        const insertAd = qg.createInsertAd({
            adUnitId: Channel_meizuADCode.插屏,
        });

        insertAd.load();

        insertAd.onLoad(() => {
            console.log("插屏广告加载成功");
            insertAd.show();
        });

        insertAd.onError((err) => {
            console.log("插屏广告错误信息" + JSON.stringify(err));
        });

    }


    closeFeedAd(num) {
    }


    loadFullVideoAd() {
    }

    loadRewardVideoAd() {
    }

    preFeedAd() {
    }

    setQuDaoByAndroid() {

    }

    setQuDaoByAndroidOppo(num) {
    }

    showClDialog() {
    }

    showFullVideoAd(successfulCallback, cancelCallback, failureCallback) {
    }

    public  fullSuccessCallback () {
        console.log('视频广告关闭回调');
        this._fullAdSuccessCallback && this._fullAdSuccessCallback();
        // this._fullAdSuccessCallback = null;
    }
    public    fullFailedCallback(){
        this._fullAdFailCallback && this._fullAdFailCallback();
        // this._fullAdFailCallback = null;
    }
    public   fullCancelCallback(){
        this._fullAdCancelCallback && this._fullAdCancelCallback();
        // this._fullAdCancelCallback = null;
    }

    videoCancelCallback() {
        console.log("暂无广告，请稍后再试");
        // let  data = {
        //     txt : "暂无广告，请稍后再试"
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        this._videoAdCancelCallback && this._videoAdCancelCallback();
        // this._videoAdCancelCallback = null;
    }

    videoFailedCallback() {
        console.log("暂无广告，请稍后再试");
        // let  data = {
        //     txt : "暂无广告，请稍后再试"
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        this._videoAdFailCallback && this._videoAdFailCallback();
        // this._videoAdFailCallback = null;
    }

    videoSuccessCallback() {
        console.log("广告结束得到奖励");
        // let  data = {
        //     txt : "暂无广告，请稍后再试"
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        this._videoAdSuccessCallback && this._videoAdSuccessCallback();
        // this._videoAdSuccessCallback = null;
    }
     moreGame() {
        console.log("更多游戏广告");
    }


}

