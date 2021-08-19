import Emitter from "../Msg/Emitter";
import {qudaoType} from "../Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class platform_Android_oppo extends cc.Component {
    static _name : any = qudaoType.ANDROID_oppo;

    static _haveBannerAd: any = false;
    static _haveFeedAd: any = false;

    static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败

    static _fullAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _fullAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _fullAdFailCallback: any = null;     //激励视频观看失败回调---获取失败
    static initAd() {
        this.loadFullVideoAd();
        this.loadRewardVideoAd();
    }

    static createBanner() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showBanner", "()V");
        console.log("预加载===============>安卓Banner广告");
    }

    static showBannerAd() {
        if (this._haveBannerAd) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerVisibility", "()V");
            console.log("再次展示===============>安卓Banner广告");
        } else {
            this.createBanner();
            this._haveBannerAd = true;
        }
    }

    static hideBannerAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerInvisibility", "()V");
        console.log("暂时隐藏===============>安卓Banner广告");
    }


    static loadFullVideoAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadFullVideoAd", "()V");
        console.log("预加载FullVideoAd===============>预加载显示");
    }


    static showFullVideoAd(successfulCallback, cancelCallback, failureCallback) {
        this._fullAdSuccessCallback = successfulCallback;
        this._fullAdCancelCallback = cancelCallback;
        this._fullAdFailCallback = failureCallback;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFullVideoAd", "()V");
        console.log("展示showFullVideoAd===============>显示");
    }
    static fullSuccessCallback () {
        console.log('视频广告关闭回调');
        this._fullAdSuccessCallback && this._fullAdSuccessCallback();
        this._fullAdSuccessCallback = null;
    }
    static  fullFailedCallback(){
        this._fullAdFailCallback && this._fullAdFailCallback();
        this._fullAdFailCallback = null;
    }
    static  fullCancelCallback(){
        this._fullAdCancelCallback && this._fullAdCancelCallback();
        this._fullAdCancelCallback = null;
    }




    static loadRewardVideoAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadRewardVideoAd", "()V");
        console.log("预加载激励视频===============>预加载显示");
    }

    static videoSuccessCallback() {
        console.log('视频广告关闭回调');
        this._videoAdSuccessCallback && this._videoAdSuccessCallback();
        this._videoAdSuccessCallback = null;
    }


    static showVideoAd(successfulCallback, cancelCallback, failureCallback) {
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showRewardVideoAd", "()V");
        console.log("展示showRewardedVideoAd===============>显示");
    }

    static showInterstitialAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showInterstitialAd", "()V");
        console.log("展示Interstitial广告===============>显示");
    }

    static preFeedAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFeedAd", "()V");
        console.log("预加载FeedAd=====================>预加载");
    }

    //显示信息流广告
    static showFeedAd(num) {
        //带自渲染
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showNative", "(I)V",num);
        //不带自渲染
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFeedAd", "()V");
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showNativeTest", "(I)V",num);
        // if (this._haveFeedAd) {
        //     this._haveFeedAdCount++
        //     if (this._haveFeedAdCount < this._haveFeedAdCountMax) {
        //         jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFeedAd", "()V");
        //         console.log("FeedAd=====================>显示隐藏广告");
        //     }else{
        //         this._haveFeedAdCount = 0
        //         this.preFeedAd();
        //     }
        // } else {
        //     this.preFeedAd();
        //     this._haveFeedAd = true;
        //     // this._haveFeedAdCount ++
        // }
    }
    //自渲染回调
    static loadNativeData(json){
        // {
        //     "num":1,
        //     "finalTitle":"标题",
        //     "finalDesc":"秘密",
        //     "finalImg":"http://t3.a.market.xiaomi.com/download/AdCe" +
        // "nter/0a69bc9f7ffb54384a56affde2453bf02587e335a/AdCenter0a69bc9f7ff" +
        // "b54384a56affde2453bf02587e335a.jpg",
        //     "finalIcon":"",
        //     "Logo":"",
        //     "Btn":""
        // }
        console.log("游戏部分得到了回调"," num ",json.num );
        console.log("游戏部分得到了回调"," finalTitle ",json.finalTitle );
        console.log("游戏部分得到了回调"," finalDesc ",json.finalDesc );
        console.log("游戏部分得到了回调"," finalImg ",json.finalImg );
        console.log("游戏部分得到了回调"," finalIcon ",json.finalIcon );
        console.log("游戏部分得到了回调"," Logo ",json.Logo );
        console.log("游戏部分得到了回调"," Btn ",json.Btn );

        let sendJson = {
            num : json.num,
            finalTitle : json.finalTitle,
            finalDesc : json.finalDesc,
            finalImg : json.finalImg,
            finalIcon : json.finalIcon,
            Logo : json.Logo,
            Btn : json.Btn,
        }

        Emitter.fire("onMyAndroidDrawCallBack",sendJson)
    }



    static closeFeedAd(num) {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "closeNative", "(I)V",num);
        console.log("Feed=====================>暂时隐藏广告");
    }
    static clickNative(num) {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "clickNative", "(I)V",num);
        console.log("Feed=====================>暂时隐藏广告");
    }

    static moreGame() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "jumpSpecialArea", "()V");
        console.log("更多游戏广告");
    }
    static showClDialog() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showClDialog", "()V");
        console.log("点击隐私协议=====================>");
    }

    static videoFailedCallback(){
        console.log("暂无广告，请稍后再试");
        // Emitter.fire('onTipsShow',{txt: "暂无广告，请稍后再试"})
        this._videoAdFailCallback && this._videoAdFailCallback();
    }

}

cc["platform_Android_oppo"] = platform_Android_oppo;