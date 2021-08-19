// import BaseComponent from "../System/Base/BaseComponent";

import {qudaoType} from "../Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Platform_oppo extends cc.Component {
// export default class toutiao extends BaseComponent {
    static _name : any = qudaoType.OPPO;

    static bannerAdcreate: any = null;
    static videoAdcreate: any = null;
    static interstitialAdcreate: any = null;
    static nativeAdcreate: any = null;
    static _nativeCurrentAd: any = null;
    static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败
    static _createBannerTime: any = null;
    static js:  any = null;
    static _nativeAdTexture: any = null;

    static _createNativeAdTime : number = 0
    static _createNativeAdCountMax : number = 2
    static _createNativeAdCountMin : number = 0


    static initAd() {
        // this._bannerAdId = "227067";
        // this._nativeAdid = "283365";
        // this._videoAdId = "283347";
        // this.createBannerAd();
        this.createVideoAd();
        this.initNativeAd();
        
    }

    static createBannerAd() {
        // const bannerAd = qg.createBannerAd({
        //     adUnitId: "227067",
        //     style: {
        //         top: 300,
        //         left: 0,
        //         width: 900,
        //         height: 300,
        //     }
        // });
    
        // bannerAd.onError(err => {
        //     console.log("banner广告加载失败", err);
        // });
    
        // bannerAd.onHide(function () {
        //     console.log('banner 广告隐藏')
        // });
    
        // bannerAd.onLoad(function () {
        //     console.log("banner 广告加载成功");
        // });
    
        // bannerAd.onResize(res => {
        //     console.log('banner 宽度：' + obj.width + ', banner 高度：' + obj.height)
        // });
    
        // this.bannerAdcreate = bannerAd;
    }

    static showBannerAd() {
        // var currentTime = (new Date).getTime();
        // var time = (currentTime - this._startTime) / 1000;
        // if (time <= 60) {
        //     return;
        // }
        // if (this.bannerAdcreate) {
            // this.bannerAdcreate.show();
        // } else {
        //     console.log("bannerAdcreate广告加载失败");
        // }
    }
    
    static hideBannerAd() {
        // if (this.bannerAdcreate) {
            // this.bannerAdcreate.hide()
        // } else {
        //     console.log("bannerAdcreate广告加载失败");
        // }
    }

    static createVideoAd() {
        // if (cc.sys.platform != cc.sys.OPPO_GAME) {
        //     return
        // }
        const videoAd = qg.createRewardedVideoAd({
            adUnitId: "283347",
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

    //显示激励视频广告
    static showVideoAd(successfulCallback, cancelCallback, failureCallback) {
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

    static showInterstitialAd() {

    }


    static initNativeAd() {
        // if (cc.sys.platform != cc.sys.OPPO_GAME) {
        //     return
        // }
        // oppo原生广告策略
        // this.nativeAdcreate = null;

        let currentTime = UtilsTime.getTime()
        let time = (currentTime - this._createNativeAdTime) / 1000;
        Api.getAdControlInfoByOppo((code)=>{
            //时光回转这里开始
            // code1   60秒内展示2次原生广告
            // code2   40秒内展示2次原生广告
            // code3   20秒内展示2次原生广告
            // code4   不限制，只要调用即展示
            // Emitter.fire('onTipsShow',{txt: "先访问网络回来了"+code})
            if (code!=null) {
                let temptime = 0
                temptime = Api.OppoApiData.times[code]
                if (this._createNativeAdCountMin >= this._createNativeAdCountMax) {
                    if (time < temptime) {
                        return;
                    }
                    this._createNativeAdCountMin = 0
                }
                
                const nativeAd = qg.createNativeAd({
                    adUnitId: "283365",
                });

                nativeAd.load();
                nativeAd.onLoad((res) => {
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
                      
                        cc.assetManager.loadRemote(remoteUrl, (err, texture) => {
                            this._nativeAdTexture = texture;
                            // console.log("下载资源图片完成",texture);
                         
                            console.log("下载资源图片完成 有没有错误",err);

                            if (texture != null) {
                                // console.log("现在有图");
                                const h = 0 - cc.winSize.height / 2;
                                // console.log("现在有图 0",h);
                                const pos = cc.v2(0, h);
                                // console.log("现在有图 1",pos);
                                let currentTime = UtilsTime.getTime()
                                // console.log("现在有图 2",currentTime);
                                this._createNativeAdTime = currentTime
                                // console.log("现在有图 3",this._createNativeAdTime);
                                this._createNativeAdCountMin++
                                // console.log("现在有图 4",this._createNativeAdCountMin);
                                if (this._createNativeAdCountMin>=this._createNativeAdCountMax) {
                                    // console.log("现在有图 5",this._createNativeAdCountMin,"",this._createNativeAdCountMax);
                                    this._createNativeAdCountMin = this._createNativeAdCountMax
                                    // console.log("现在有图 6",this._createNativeAdCountMin,"",this._createNativeAdCountMax);
                                }
                            }
                            if (err != null) {
                                console.log("现在有错误");
                            }

                            // if (err == null) {
                            //
                            // }else{
                            //     console.log("奇怪的地区");
                            // }
                            console.log("次数有没有增加",this._createNativeAdCountMin);
                        })
                    }
                });

                nativeAd.onError(err => {
                    console.log("原生广告加载异常", err);
                });
                this.nativeAdcreate = nativeAd;
            }
        })
    };
    
    static showNativeAd(node) {

        // if(this.nativeAdcreate){
            let texture = this._nativeAdTexture;
            this.nativeAdcreate.reportAdShow({ adId: this._nativeCurrentAd.adId.toString() });
            let successfulCallback = () => {
                this.nativeAdcreate.reportAdClick({ adId: this._nativeCurrentAd.adId.toString() })
                this.initNativeAd()
            };
            const h = 0 - cc.winSize.height / 2;
            const pos = cc.v2(0, h);
            Emitter.fire('onOpenNativeAdDialog',{texture:texture}, pos,node,successfulCallback)
        // }
  

    }

    static closeNativeAd() {
        if (this.nativeAdcreate != null) {
            this.nativeAdcreate.destroy();
            this.initNativeAd()

        }else {

        }
    }

}
