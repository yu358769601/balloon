import {qudaoType} from "../Type/enums";

const { ccclass, property } = cc._decorator;

@ccclass
export default class platform_qq extends cc.Component {
    static _name : any = qudaoType.QQ;

    static bannerAdcreate: any = null;
    static videoAdcreate: any = null;
    static interstitialAdcreate: any = null;
    static appBoxAdcreate: any = null;
    static blockAdcreate: any = null;
    static _appBoxAdCloseCallback: any = null;
    static _appBoxAdShowCallback: any = null;

    static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _videoAdFailCallback: any = null;

    static _shareImageUrl : string = ""
    //激励视频观看失败回调---获取失败

    static initAd() {
        // banner广告	bb37b2f0fb38a1ea0bed5fbcc2d1839a
        // 激励视频广告	8c24e8cdf679144f932c982b45eb5ce1
        // 盒子广告	c1a247f988c29715fea31eb98d78a442
        // 插屏广告	74f8c8ecaed7df393a92bdef6c201118
        // 积木广告	a44cd2ff988fcf501860b913576775d8
        this.createBannerAd();
        this.createVideoAd();
        this.createInterstitialAd();
        this.createBlockAd();
        this.createAppBox();

        this._shareImageUrl = "https://fxhgames.ugmars.com/albumnew/konglomngfenxiangtupian.jpg";
        // 初始分享菜单
        this.initShareMenu();
    }
    static getShareText() {
        let  text = `合成喂养恐龙，成为猎人勇斗魔物`;
        return text;
    }
    static initShareMenu() {

        qq.showShareMenu({
            withShareTicket: true
        })
        qq.onShareAppMessage( (res)=> {
            // var shareData = ["我们不是生产食物，我们只是食物的搬运工！"];
            // var randomIndex = Math.floor(Math.random() * shareData.length);
            // var queryData = "parent_id=" + PlayerData.member_id;
            // console.log("share : " + queryData);
            return {
                title: this.getShareText(),
                imageUrl: this._shareImageUrl,
                // title: shareData[randomIndex].title,
                // imageUrl: shareData[randomIndex].thumb,
                //query: queryData,
                success(res) {
                    console.log("回调数据：" + res);
                    console.log("转发成功!!!")
                },
                fail(res) {
                    console.log("转发失败!!!")
                }
            }
        })
    }
    //创建banner广告
    static createBannerAd() {
        const systemInfo = qq.getSystemInfoSync();
        const screenWidth = systemInfo.windowWidth;
        const screenHeight = systemInfo.windowHeight;
        // console.log("screenHeight" + screenHeight);
        var targetBannerAdWidth = 300;
        var targetBannerAdHeight = 70;
        var bannerAd = qq.createBannerAd({
            adUnitId: "bb37b2f0fb38a1ea0bed5fbcc2d1839a",
            style: {
                top: screenHeight - targetBannerAdHeight, // 根据系统约定尺寸计算出广告高度
                left: (screenWidth - targetBannerAdWidth) / 2,
                width: targetBannerAdWidth,
                height: targetBannerAdHeight
            },
        });

        bannerAd.onLoad(() => {
            console.log("广告加载成功");
        });

        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        bannerAd.onResize(res => {
            bannerAd.style.top = screenHeight - res.height;
            bannerAd.style.left = (screenWidth - res.width) / 2; // 水平居中
        });
        bannerAd.onError(err => {
            // console.log(err)
        });
        this.bannerAdcreate = bannerAd;

    }

    //头条分享
    // platform_qq.shareMessage(successCb, cancelCb)
    static shareMessage(successCb, cancelCb){
        // if (qudaoCommon.qudao == platform_toutiao){
        //     qq.shareMessage(successCb, cancelCb)
        // }

    }

    //显示banner广告
    static showBannerAd() {
        if (this.bannerAdcreate) {
            this.bannerAdcreate.show();
        }else {
            console.log("bannerAdcreate失败");
        }
    }
    //隐藏banner广告
    static hideBannerAd() {
        if (this.bannerAdcreate) {
            this.bannerAdcreate.hide();

        } else {
            console.log("bannerAdcreate失败");
        }
    }
    //创建激励视频广告
    static createVideoAd() {

        const videoAd = qq.createRewardedVideoAd({
            adUnitId: "8c24e8cdf679144f932c982b45eb5ce1",
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

        videoAd.onError((errMsg) => {
            console.log("激励广告错误：", errMsg);
            if (this._videoAdFailCallback) {
                this._videoAdFailCallback();
            }
            this._videoAdFailCallback = null;
        });

        this.videoAdcreate = videoAd;

    }
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

    //创建插屏广告
    static createInterstitialAd() {
        const interstitialAd = qq.createInterstitialAd({
            adUnitId: "74f8c8ecaed7df393a92bdef6c201118",
        });

        interstitialAd.onLoad(){
            console.log("插屏成功")
        }

        this.interstitialAdcreate = interstitialAd;
    }
    //显示插屏广告
    static showInterstitialAd() {
        this.interstitialAdcreate.show().catch((err) => {
            console.error("插屏出错", err)
        })
    }

    //注意:需要真机才能看到
    static createBlockAd() {
            var adWidth = 300;
            var adHight = 70;
            var systemInfo = qq.getSystemInfoSync();
            var windowWidth = systemInfo.windowWidth;
            var screenHeight = systemInfo.screenHeight;
            var blockAd = qq.createBlockAd({
                adUnitId: "a44cd2ff988fcf501860b913576775d8",
                style: {
                    left: (windowWidth /2),
                    top: screenHeight * 0.8, // 根据系统约定尺寸计算出广告高度600
                },
                size: 4,
                orientation: "landscape"
            });

            blockAd.onLoad(function () {
                console.log('积木广告素材拉取');

            });

            blockAd.onError(err => {
                console.log('积木广告 失败',err)
            });

            blockAd.onResize(size => {
                console.log('blockAd---->onResize');
                console.log("积木文件尺寸 ", size);
                blockAd.style.left = (windowWidth /2 - size.width); // 水平居中
                blockAd.style.top = screenHeight * 0.8;
            });
            this.blockAdcreate = blockAd;
    }
    //创建积木广告
    static showBlockAd() {
        console.log('积木广告成功++++');
        if (this.blockAdcreate) {
            let blockAdcreate = this.blockAdcreate.show();
            // console.log('积木广告show成功++++',blockAdcreate);
        }

    }
    //隐藏积木广告
    static hideBlockAd() {
        if (this.blockAdcreate) {
            this.blockAdcreate.hide();
        }else {

        }

    }
    //创建盒子广告
    static createAppBox() {
        let appBox = qq.createAppBox({
            adUnitId: "c1a247f988c29715fea31eb98d78a442",
        });

        appBox.load()
            .then(res => {
                console.log("预加载广告盒子成功");
                // 这里可以加入这样的逻辑 判断盒子load成功与否 显示是否 依据变量来决定是否重新load
            })
            .catch(err => {
                console.log("预加载广告盒子失败",err);
            });

        appBox.onClose(res => {
            console.log("关闭盒子");
            if (this._appBoxAdCloseCallback) {
                this._appBoxAdCloseCallback();
            }

            cc.director.resume();
            this._appBoxAdCloseCallback = null;
        });
        this.appBoxAdcreate = appBox;
    }

    //显示盒子广告
    static showAppBox() {
            this.appBoxAdcreate.show();
            cc.director.pause();
        // console.log("显示盒子",this.appBoxAdcreate);
    }
}
