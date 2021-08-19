import {qudaoType} from "../Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Platform_ios extends cc.Component {
    static _name : any = qudaoType.Ios;

    static _haveBannerAd:any = false;
    static _haveFeedAd: any = false;

    static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败

    static initAd() {
        this.loadFullVideoAd();
        this.loadRewardVideoAd();
    }

    static createBanner() {
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showBanner", "()V");
        console.log("预加载===============>安卓Banner广告");
    }

    static showBannerAd() {
        if(this._haveBannerAd){
            // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerVisibility", "()V");
            console.log("再次展示===============>安卓Banner广告");
        }else{
            this.createBanner();
            this._haveBannerAd = true;
        }
    }

    static hideBannerAd() {
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerInvisibility", "()V");
        console.log("暂时隐藏===============>安卓Banner广告");
    }


    static loadFullVideoAd() {
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadFullVideoAd", "()V");
        console.log("预加载FullVideoAd===============>预加载显示");
    }


    static showFullVideoAd() {
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFullVideoAd", "()V");
        console.log("展示showFullVideoAd===============>显示");
    }

    static  loadRewardVideoAd() {
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadRewardVideoAd", "()V");
        console.log("预加载激励视频===============>预加载显示");
    }

    static videoSuccessCallback () {
        console.log('视频广告关闭回调');
        this._videoAdSuccessCallback && this._videoAdSuccessCallback();
        this._videoAdSuccessCallback = null;
    }
   

    static showVideoAd(successfulCallback,cancelCallback,failureCallback) {
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showRewardVideoAd", "()V");
        console.log("展示showRewardedVideoAd===============>显示");
    }

    static showInterstitialAd() {
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showInterstitialAd", "()V");
        console.log("展示Interstitial广告===============>显示");
    }

    static preFeedAd() {
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFeedAd", "()V");
        console.log("预加载FeedAd=====================>预加载");
    }

    static showFeedAd() {
        if (this._haveFeedAd) {
            // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setFeedVisibility", "()V");
            console.log("FeedAd=====================>显示隐藏广告");
        } else {
            this.preFeedAd();
            this._haveFeedAd = true;
        }
    }

    static closeFeedAd() {
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setFeedInvisibility", "()V");
        console.log("Feed=====================>暂时隐藏广告");
    }

    static videoFailedCallback(){
        console.log("暂无广告，请稍后再试");
        Emitter.fire('onTipsShow',{txt: "暂无广告，请稍后再试"})
        this._videoAdFailCallback && this._videoAdFailCallback();
        this._videoAdFailCallback = null; 
    }
}

cc["platform_IOS"] = Platform_ios;