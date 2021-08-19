import qudaoCommon from "./qudaoCommon";
import platform_Android_oppo from "../qudao/platform_Android_oppo";
import platform_Android_mi from "./platform_Android_mi";
import {qudaoType} from "../Type/enums";
import Emitter from "../Msg/Emitter";
const {ccclass, property} = cc._decorator;

@ccclass
export default class platform_Android extends cc.Component {
    public  static _name : any = qudaoType.ANDROID;

    public static _haveBannerAd:any = false;
    public  static _haveFeedAd: any = false;
    public  static _haveFeedAdCount: number = 0;
    public static _haveFeedAdCountMax: number = 2;



    public static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    public static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    public  static _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败

    public static _fullAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    public  static _fullAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    public static _fullAdFailCallback: any = null;     //激励视频观看失败回调---获取失败

    public  static initAd() {
        this.loadFullVideoAd();
        this.loadRewardVideoAd();

        this.initGame()
    }
    public static initGame(){
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "initGame", "()V");
        console.log("初始化安卓渠道===============>");
    }
    public static createBanner() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showBanner", "()V");
        console.log("预加载===============>安卓Banner广告");
    }

    public static showBannerAd() {
        if(this._haveBannerAd){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerVisibility", "()V");
            console.log("再次展示===============>安卓Banner广告");
        }else{
            this.createBanner();
            this._haveBannerAd = true;
        }
    }

    public static hideBannerAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerInvisibility", "()V");
        console.log("暂时隐藏===============>安卓Banner广告");
    }


    public static loadFullVideoAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadFullVideoAd", "()V");
        console.log("预加载FullVideoAd===============>预加载显示");
    }


    public  static showFullVideoAd(successfulCallback, cancelCallback, failureCallback) {
        this._fullAdSuccessCallback = successfulCallback;
        this._fullAdCancelCallback = cancelCallback;
        this._fullAdFailCallback = failureCallback;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFullVideoAd", "()V");
        console.log("展示showFullVideoAd===============>显示");
    }
    public static fullSuccessCallback () {
        console.log('视频广告关闭回调');
        this._fullAdSuccessCallback && this._fullAdSuccessCallback();
        this._fullAdSuccessCallback = null;
    }
    public  static  fullFailedCallback(){
        this._fullAdFailCallback && this._fullAdFailCallback();
        this._fullAdFailCallback = null;
    }
    public static  fullCancelCallback(){
        this._fullAdCancelCallback && this._fullAdCancelCallback();
        this._fullAdCancelCallback = null;
    }


    public static  loadRewardVideoAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadRewardVideoAd", "()V");
        console.log("预加载激励视频===============>预加载显示");
    }

    public static videoSuccessCallback () {
        console.log('视频广告关闭回调');
        this._videoAdSuccessCallback && this._videoAdSuccessCallback();
        this._videoAdSuccessCallback = null;
    }

    public static setQuDaoByAndroid(){
        // console.log('视频广告关闭回调');
        qudaoCommon.qudao = platform_Android
        cc["platform_Android"] = platform_Android;
        // let  data = {
        //     txt : "切换安卓"
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
    }
    public static setQuDaoByAndroidOppo(num){
        cc.log('设置特殊渠道',num);

        switch (num) {
            case 0:
                qudaoCommon.qudao =platform_Android_oppo
                cc["platform_Android"] = platform_Android_oppo;
                cc.log('设置特殊渠道',"android oppo");
            break;
            case 1:
                qudaoCommon.qudao =platform_Android_mi
                cc["platform_Android"] = platform_Android_mi;
                cc.log('设置特殊渠道',"android mi");
                break;
        }

        // let  data = {
        //     txt : "切换安卓oppo"
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : ItemLoad.打印吐司,zIndex : 100,data:data},null)
    }

    public static showVideoAd(successfulCallback,cancelCallback,failureCallback) {
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showRewardVideoAd", "()V");
        console.log("展示showRewardedVideoAd===============>显示");
    }

    public static showInterstitialAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showInterstitialAd", "()V");
        console.log("展示Interstitial广告===============>显示");
    }

    public static preFeedAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFeedAd", "()V");
        console.log("预加载FeedAd=====================>预加载");
    }
    //显示信息流广告
    public static showFeedAd(num) {

        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showNative", "(I)V",num);
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

    public static closeFeedAd(num) {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "closeNative", "(I)V",num);
        console.log("Feed=====================>暂时隐藏广告");
    }
    public static showClDialog() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showClDialog", "()V");
        console.log("点击隐私协议=====================>");
    }

    public  static videoFailedCallback(){
        console.log("暂无广告，请稍后再试");
        Emitter.fire('onTipsShow',{txt: "暂无广告，请稍后再试"})
        this._videoAdFailCallback && this._videoAdFailCallback();
        this._videoAdFailCallback = null; 
    }
}

