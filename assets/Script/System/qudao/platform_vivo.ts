import {qudaoType} from "../Type/enums";

const { ccclass, property } = cc._decorator;

@ccclass
export default class platform_vivo extends cc.Component {
    static _name : any = qudaoType.VIVO;

    static bannerAdcreate: any = null;

    static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败
    static _createBannerTime: any = null;
    static _nativeAd: any = null;
    static _nativeCurrentAd: any = null;
    static _nativeAdTexture: any = null;
    static _isShowNativeAd: any = null;

    static initAd() {
        this.initNativeAd()
        // vivo
        // 游戏名：最强恐龙
        // 包名：com.kesheng.zqkl.vivominigame
        // 激励视频posID：ca784064e1bc4ac691375bba737ccd82
        // 原生广告2posID：068491eba8f5493da74a960ce5099292
        // 原生广告1posID：1a5b5822a26e4940b0f613d92c49de9a
        // 插屏posID：ce99079912894a12a4ada4d11daf554e
        // bannerposID：feb0589eb2ed4324ad69b966057bf14d

    }

    static showBannerAd() {
        // var currentTime = (new Date).getTime();
        // var time = (currentTime - this._createBannerTime)/1000;
        // if(time < 10){
        //     return;
        // }
        // if (cc.sys.platform != cc.sys.VIVO_GAME) {
        //     return
        // }
        const bannerAd = qg.createBannerAd({
            posId: "feb0589eb2ed4324ad69b966057bf14d",
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

    static hideBannerAd() {
        if (this.bannerAdcreate) {
            this.bannerAdcreate.destroy();
            this.bannerAdcreate = null;
        }else{
            console.log("bannerAdcreater创建失败")
        }
    }

    static showVideoAd(successfulCallback, cancelCallback, failureCallback) {
        // if (cc.sys.platform != cc.sys.VIVO_GAME) {
        //     return
        // }
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;
        const rewardedAd = qg.createRewardedVideoAd({
            posId: "ca784064e1bc4ac691375bba737ccd82"
        });

        rewardedAd.onError(err => {
            console.log("激励视频广告加载失败", err);
        });

        rewardedAd.onLoad(function (res) {
            console.log('激励视频广告加载完成-onload触发', JSON.stringify(res));
            rewardedAd.show().then(() => {
                console.log('激励视频广告展示完成');
            }).catch((err) => {
                console.log('激励视频广告展示失败', JSON.stringify(err));
            })
        });

        const func = (res) => {
            if (res.isEnded) {
                console.log(">>>>>>>>>>>>>>>>>>>>>>给予奖励");
                this._videoAdSuccessCallback && this._videoAdSuccessCallback();
            } else {
                console.log(">>>>>>>>>>>>>>>>>>>>>>提前关闭");
                this._videoAdCancelCallback && this._videoAdCancelCallback();
            }
            this._videoAdSuccessCallback = null;
            this._videoAdCancelCallback = null;
        };

        rewardedAd.onClose(func);
    }
    //显示插屏广告
    static showInterstitialAd() {
        // if (cc.sys.platform != cc.sys.VIVO_GAME) {
        //     return
        // }
        // 创建插屏广告实例，提前初始化
        const interstitialAd = qg.createInterstitialAd({
            adUnitId: "ce99079912894a12a4ada4d11daf554e",
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


   static initNativeAd() {
       // if (cc.sys.platform != cc.sys.VIVO_GAME) {
       //     return
       // }
       const nativeAd = qg.createNativeAd({
            posId: "1a5b5822a26e4940b0f613d92c49de9a",
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
        // }
    }

    static showNativeAd(node) {
        if (!this._nativeAd) return;
        this._isShowNativeAd = true;
        if (this._nativeCurrentAd) {
            this.loadNativeAdDialog(node);
        } else {
            this._nativeAd.load();
        }
    }

    static loadNativeAdDialog(node) {
        let texture = this._nativeAdTexture;
        let successfulCallback = () => {
            this.clickNativeAd();
        };
        const h = 0 - cc.winSize.height / 2;
        const pos = cc.v2(0, h);
        Emitter.fire('onOpenNativeAdDialog',{texture:texture}, pos,node,successfulCallback)
    }

    static clickNativeAd() {
        this._nativeAd.reportAdShow({ adId: this._nativeCurrentAd.adId.toString() });
        this._nativeAd.reportAdClick({ adId: this._nativeCurrentAd.adId.toString() });
        this.preLoadNative();
    }

    static preLoadNative() {
        this._nativeCurrentAd = null;
        this._isShowNativeAd = false;
        this._nativeAdTexture = null;
        this._nativeAd.load();
    }

    static closeNativeAd() {
        // if (this._nativeAd != null) {
        //     // this._nativeAd.destroy();
        // }else {
        //
        // }
    }

}