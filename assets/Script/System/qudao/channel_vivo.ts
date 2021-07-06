import ChannelAllBase from "./channelAllBase";
import {Ichannel_android} from "./Ichannel_android";
import ChannelManger, {ChannelMangerType} from "./channelManger";
import ccLog from "../Log/ccLog";
import {Channel_oppoADCode, Channel_oppoADType} from "./channel_oppo";
import Emitter from "../Msg/Emitter";
import Utils from "../Utils/Utils";

const {ccclass, property} = cc._decorator;

// vivo
// 包名：com.ks.qdddqhzl.vivominigame
// Cp-ID：567217d9961b3a944aaa
// App-ID：105488882
// App-key：9d413528a8970edc5ce51ad2219c3584
// 广告参数
// MediaID：a59e5cda60474cfaa0b89f90c509333f
// bannerposID：6104353cefea4871b0f8a4020c665f08
// 原生广告1posID：21199a2d577c4671a8a86b7dfc342187
// 原生广告2posID：eb66037bcab9497c9661a1639ccb6d9e
// 激励视频posID：a3cc477feb194be6b50188d278ab5b80
// 插屏posID：56c9b25ac4834208bbb938325ef88342

// vivo包名：com.ks.qdddqhzl.vivominigame

export enum Channel_vivoADCode {
    插屏posID = "56c9b25ac4834208bbb938325ef88342",
    原生广告1posID = "21199a2d577c4671a8a86b7dfc342187",
    原生广告2posID = "eb66037bcab9497c9661a1639ccb6d9e",
    bannerposID = "6104353cefea4871b0f8a4020c665f08",
    激励视频posID = "a3cc477feb194be6b50188d278ab5b80",
}
// export enum Channel_vivoADType {
//     K激励视频ID = 0,
//     K原生1280ID = 1,
//     K原生320ID = 2,
//     K原生三张ID = 3,
//     KbannerID = 4,
// }


export class Channel_vivo extends ChannelAllBase implements Ichannel_android{
     bannerAdcreate: any = null;
     videoAdcreate: any = null;
     interstitialAdcreate: any = null;
     nativeAdcreate: any = null;
     _nativeCurrentAd: any = null;

     _createBannerTime: any = null;
     _nativeAd: any = null;
     _nativeAdTexture: any = null;
     _isShowNativeAd: any = null;


    // ADtimesCD:[] =  [
    //     null,
    //     10,
    //     5,
    //     5,
    //     0,
    // ]



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


    checkChannel(): boolean {
        //如果是浏览器 就强制web
        if(ChannelManger.getInstance().forcedWEB(typeof qg != "undefined" ) == true){
            return true
        }
        return false;
    }

    initAd() {
        ccLog.log("我现在是 vivo")

        // this.initNativeAd();



        // this.loadFullVideoAd();
        // this.loadRewardVideoAd();
        // this.createVideoAd();
        //
        // this.createBanner()
        // //提前加载自渲染
        // this.createnative()

        this.createVideoAd()
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
            adUnitId: Channel_vivoADCode.激励视频posID,
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
            else if(cc.sys.platform == cc.sys.VIVO_GAME){
                this.adnative[i] = qg.createNativeAd({
                    posId: tempnativeid[i]
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
        if (this.videoAdcreate) {
            this._videoAdSuccessCallback = successfulCallback;
            this._videoAdCancelCallback = cancelCallback;
            this._videoAdFailCallback = failureCallback;
            this.videoAdcreate.load()                   //激励视频加载
                .then(() => this.videoAdcreate.show())
                .catch(err => {
                    // console.log(err.errMsg);
                    this.videoAdcreate.load().then(() => {
                        console.log("手动加载成功");
                        // 加载成功后需要再显示广告
                        return this.videoAdcreate.show();
                    });
                });
        }
    }
     clickNativeAd() {
        this._nativeAd.reportAdShow({ adId: this._nativeCurrentAd.adId.toString() });
        this._nativeAd.reportAdClick({ adId: this._nativeCurrentAd.adId.toString() });
        this.preLoadNative();
    }

     preLoadNative() {
        this._nativeCurrentAd = null;
        this._isShowNativeAd = false;
        this._nativeAdTexture = null;
        this._nativeAd.load();
    }
     loadNativeAdDialog(data) {
        let texture = this._nativeAdTexture;
        let successfulCallback = () => {
            this.clickNativeAd();
        };
        const h = 0 - cc.winSize.height / 2;
        const pos = cc.v2(0, h);
         data.texture = texture
         Emitter.fire('onOpenNativeAdDialog',data, pos,data.parent,successfulCallback)
    }

     async initNativeAd(posId ?) {
         const nativeAd = qg.createNativeAd({
             posId: posId,
         });
         nativeAd.onLoad((res) => {
             console.log('原生广告加载完成-onload触发', JSON.stringify(res));
             if (res && res.adList) {
                 var nativeCurrentAd = res.adList.pop();
                 var remoteUrl = nativeCurrentAd.imgUrlList.pop();
                 this._nativeCurrentAd = nativeCurrentAd;
                 console.log("==============>", remoteUrl)
                 cc.assetManager.loadRemote(remoteUrl, (err, texture) => {
                     this._nativeAdTexture = texture;
                     console.log("下载资源图片完成")
                     if (this._isShowNativeAd) {
                         this.loadNativeAdDialog();
                     }
                 })
             }
         });

         nativeAd.onError(err => {
             console.log("原生广告加载异常", err);
         });

         this._nativeAd = nativeAd;


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

        let remoteUrl = "https://adsfs.heytapimage.com/ads-material-depot/image/c264bd4465aa08f0b7516dc6a1c06328.jpg"
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

         data.height = data.heights[Api.getAdCode()]
         console.log('原生广告要设置多高', data.height);
         const nativeAd = qg.createNativeAd({
             posId: data.ADTypeCode,
         });
         nativeAd.onLoad((res) => {
             console.log('原生广告加载完成-onload触发', JSON.stringify(res));
             if (res && res.adList) {
                 var nativeCurrentAd = res.adList.pop();
                 var remoteUrl = nativeCurrentAd.imgUrlList.pop();
                 this._nativeCurrentAd = nativeCurrentAd;
                 console.log("==============>", remoteUrl)
                 cc.assetManager.loadRemote(remoteUrl, (err, texture) => {
                     this._nativeAdTexture = texture;
                     console.log("下载资源图片完成")
                         this.loadNativeAdDialog(data);
                 })
             }
         });

         nativeAd.onError(err => {
             console.log("原生广告加载异常", err);
         });

         this._nativeAd = nativeAd;

    };

    closeNativeAd() {
        if (this._nativeAd != null) {
            this._nativeAd.destroy();
        }else {

        }
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
                    Emitter.fire('onSetTempSprite',sp)
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

     clicknative(num){//上报点击
        let self = this;
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
            this.bannerAdcreate.destroy();
            this.bannerAdcreate = null;
        }else{
            console.log("bannerAdcreater创建失败")
        }
    }
    showBannerAd() {
        const bannerAd = qg.createBannerAd({
            posId: Channel_vivoADCode.bannerposID,
            style: {

            }
        });

        bannerAd.onError(err => {
            console.log("banner广告加载失败", err);
            this.bannerAdcreate = null;
        });
        //banner 广告监听
        bannerAd.onLoad(() => {
            console.log("banner 广告加载成功");

            bannerAd.show()
                .then(() => {
                    console.log('banner广告展示完成');
                    // this._createBannerTime = (new Date).getTime();
                })
                .catch((err) => {
                    console.log('banner广告展示失败', JSON.stringify(err));
                })
        });

        bannerAd.onResize(res => {
            console.log("参数=======>" + res)
        });

        bannerAd.onError(err => {
            console.log(err)
        });

        this.bannerAdcreate = bannerAd;
    }

    showFeedAd(num) {

    }

    showInterstitialAd() {
        // 创建插屏广告实例，提前初始化
        const interstitialAd = qg.createInterstitialAd({
            adUnitId: Channel_vivoADCode.插屏posID,
        });

        interstitialAd.onError(err => {
            console.log("插屏广告加载失败", err);
        });

        interstitialAd.show().then(()=>{
            console.log('插屏广告展示完成');
        }).catch((err)=>{
            console.log('插屏广告展示失败', JSON.stringify(err));
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

