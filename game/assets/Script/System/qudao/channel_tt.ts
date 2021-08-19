import ChannelAllBase from "./channelAllBase";
import {Ichannel_android} from "./Ichannel_android";
import ChannelManger, {ChannelMangerType} from "./channelManger";
import {Platform_oppoADCode} from "./platform_oppo";
import {Channel_oppoADCode, Channel_oppoADType} from "./channel_oppo";
import ccLog from "../Log/ccLog";
import Api from "../api/api";
import Emitter from "../Msg/Emitter";

const {ccclass, property} = cc._decorator;

// 抖音
// APPID:tt82e1f45c1dd94abd02
// AppSecret：1ea120cf007e396277a567b228a433aa259aad5c
//
// 广告参数
// banner      1cw8b06jnxee07jdba
// 激励式视频  gfm1hb438iikdinfrq
// 插屏广告    27ebn5nh19hj8rmfmr

export enum Channel_ttADCode {
    banner = "1cw8b06jnxee07jdba",
    激励式视频 = "gfm1hb438iikdinfrq",
    插屏广告 = "27ebn5nh19hj8rmfmr",
}
export enum Channel_ttADType {
    banner = 0,
    激励式视频 = 1,
    插屏广告 = 2,
}


export class Channel_tt extends ChannelAllBase implements Ichannel_android{
     bannerAdcreate: any = null;
     videoAdcreate: any = null;
     interstitialAdcreate: any = null;
     nativeAdcreate: any = null;
     _nativeCurrentAd: any = null;

     _interstitialAd: any = null;
     _recorder: any = null;
     _recorderTime: any = null;
     _recorderVideoPath: any = null;
     _interval: any = null;

    //自动停止不走回调
     _autoStop: any = false;




    ADtimesCD:[] =  [
        null,
        10,
        5,
        5,
        0,
    ]



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
        if(ChannelManger.getInstance().forcedWEB(typeof tt != "undefined" ) == true){
            return true
        }
        return false;
    }

    initAd() {
        ccLog.log("我现在是 tt")
        this.createBannerAd();
        this.createVideoAd();
    }

    //录屏
     startRecorder(duration ?,onStopCallback ?,onErrorCallback ?) {
        let appName = tt.getSystemInfoSync().appName;
        if (appName === "devtools") return;
        let recorder = tt.getGameRecorderManager();
        this._recorder = recorder;
        let _duration = 120
        if (duration != null) {
            _duration = duration
        }


        // this.stopRecorder(false)
        // recorder.onStop(null)


        recorder.onStart((res) => {
            console.log("录屏开始");
            // do somethine;
            this._interval = 1;
            this._recorderTime = 0;
            console.log("录屏开始",this._interval);
            // this.unschedule(this.startCountdown);
            // this.schedule(this.startCountdown, this._interval);
        });





        recorder.onError((res) => {
            console.log("错误信息" + res.errMsg);
            if (onErrorCallback) {
                onErrorCallback()
            }
        });

        recorder.start({
            duration: _duration
        });
        recorder.onStop((res) => {

            console.log(res.videoPath);
            // do somethine;
            this._recorderVideoPath = res.videoPath;
            this._recorder = null;
            console.log("录屏停止",this._recorderVideoPath,"是否允许回调",this._autoStop);
            // if (this._autoStop) {
            //头条录屏结束  qudaoCommon.shareMessage(successCb, cancelCb)
            if (onStopCallback) {
                onStopCallback()
            }
            // }
            this._autoStop = true
            // this.unschedule(this.startCountdown);
        });
    }
    stopRecorder (b) {
        if (this._recorder) {
            console.log("手动调用停止");
            this._autoStop = b
            this._recorder.stop();

        }
    }
     shareMessage(successCb, cancelCb) {

        const descStr = [
            "动动你的小脑袋瓜!",
        ];
        // let randNum = Utils.random(0,descStr.length - 1);
        let randNum = 0

        tt.shareAppMessage({
            channel: "video",
            title: "钱多多的奇幻之旅",
            desc: descStr[randNum],
            imageUrl: "",
            templateId: "", // 替换成通过审核的分享ID
            query: "",
            extra: {
                videoPath: this._recorderVideoPath, // 可替换成录屏得到的视频地址
                videoTopics: ["钱多多的奇幻之旅"],
                hashtag_list: ["钱多多的奇幻之旅"],
                video_title: descStr[randNum], //生成的默认内容
            },
            success() {
                console.log("分享视频成功");
                successCb && successCb();

            },
            fail(e) {
                console.log("分享视频失败",e);
                cancelCb && cancelCb(e);
            }
        });
    }



     createBannerAd() {
        const systemInfo = tt.getSystemInfoSync();
        const screenWidth = systemInfo.windowWidth;
        const screenHeight = systemInfo.windowHeight;
        const targetBannerAdWidth = 200;
        const bannerAd = tt.createBannerAd({
            adUnitId: Channel_ttADCode.banner,
            adIntervals: 30,
            style: {
                width: targetBannerAdWidth,
                top: screenHeight - (targetBannerAdWidth / 16 * 9),
                left: (screenWidth - targetBannerAdWidth) / 2
            }
        });

        bannerAd.onLoad(function () {

        });
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        bannerAd.onResize(res => {
            bannerAd.style.top = screenHeight - res.height;
            bannerAd.style.left = (screenWidth - res.width) / 2; // 水平居中
        });

        bannerAd.onError(err => {
            console.log(err)
        });

        this.bannerAdcreate = bannerAd
    }


     createVideoAd() {

         console.log('广告加载成功');
         const videoAd = tt.createRewardedVideoAd({
             adUnitId: Channel_ttADCode.激励式视频,
         });
         videoAd.onLoad(() => {
             console.log("videoAd广告加载成功");
         });

         videoAd.onError((errMsg) => {
             console.log("激励广告错误：", errMsg);
             if (this._videoAdFailCallback) {
                 this._videoAdFailCallback();
             }
             this._videoAdFailCallback = null;
         });

         videoAd.onClose((res) => {
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

         this.videoAdcreate = videoAd
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
        console.log('广告显示成功');
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;

        this.videoAdcreate.show().then(() => {
            console.log('广告显示成功');
        })
            .catch(err => {
                console.log('广告组件出现问题', err);
                // 可以手动加载一次
                this.videoAdcreate.load().then(() => {
                    console.log("手动加载成功");
                    // 加载成功后需要再显示广告
                    return this.videoAdcreate.show();
                });
            });
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
     showBannerAd() {
        if (this.bannerAdcreate) {
            this.bannerAdcreate
                .show()
                .then(() => {
                    console.log("广告显示成功");
                })
                .catch((err) => {
                    console.log("广告组件出现问题", err);
                });
        } else {
            console.log("没有bannerAdcreate");
        }
    }

     hideBannerAd() {
        if (this.bannerAdcreate) {
            this.bannerAdcreate.hide();
            console.log("广告隐藏");
        } else {
            console.log("没有bannerAdcreate");
        }

    }


    showFeedAd(num) {

    }

    showInterstitialAd() {
        const interstitialAd = tt.createInterstitialAd({
            adUnitId: Channel_ttADCode.插屏广告,
        });
        interstitialAd.load()
            .then(() => {
                interstitialAd.show().then(() => {
                    console.log("插屏广告展示成功");
                });
            })
            .catch((err) => {
                console.log(err);
            });

        interstitialAd.onLoad((res)=>{
            console.log("插屏加载成功", res)
        });

        interstitialAd.onError((err)=>{
            console.log("插屏加载失败", err)
        })
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

