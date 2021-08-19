import {qudaoType} from "../Type/enums";

const { ccclass, property } = cc._decorator;

@ccclass
export default class platform_baidu extends cc.Component {
    static _name : any = qudaoType.BAIDU;

    static _rewardedVideoAd: any = null;
    static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败
    // static adUnitId: 7249055;
    // static appSid: e168bd90;

    static initAd() {
        this.createVideoAd()
    }

    static createVideoAd() {
        console.log("createVideoAd成功");
        if (swan.createRewardedVideoAd) {
            const rewardedVideoAd = swan.createRewardedVideoAd({
                adUnitId: "7249055",
                appSid: "e168bd90",
            });

            rewardedVideoAd.onLoad(() => {
                console.log('视频加载完成');
            });

            rewardedVideoAd.onClose((res) => {
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

            rewardedVideoAd.onError((errMsg) => {
                console.log("激励广告错误：", errMsg);
                if (this._videoAdFailCallback) {
                    this._videoAdFailCallback();
                }
                this._videoAdFailCallback = null;
            });
            this._rewardedVideoAd = rewardedVideoAd;
        }
    }

    static showVideoAd(successfulCallback, cancelCallback, failureCallback) {
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;
        this._rewardedVideoAd.load()                   //激励视频加载
            .then(() => this._rewardedVideoAd.show())
            .catch(err => {
                console.log(err.errMsg);
                this._rewardedVideoAd.load().then(() => {
                    console.log("手动加载成功");
                    // 加载成功后需要再显示广告
                    return this._rewardedVideoAd.show();
                });
            });
    }

    static showInterstitialAd() {

    }

}