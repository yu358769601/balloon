import {Channel_android} from "./channel_android";

const {ccclass, property} = cc._decorator;

export class Channel_android_oppo extends Channel_android{


    constructor() {
        super();
        // this.initAd()

    }
    //
    // initAd() {
    //     this.loadFullVideoAd();
    //     this.loadRewardVideoAd();
    //
    //     this.initGame()
    // }
    //
    // public  initGame(){
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "initGame", "()V");
    //     console.log("初始化安卓渠道===============>");
    // }
    // createBanner() {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showBanner", "()V");
    //     console.log("预加载===============>安卓Banner广告");
    // }
    //
    // hideBannerAd() {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerInvisibility", "()V");
    //     console.log("暂时隐藏===============>安卓Banner广告");
    // }
    //
    //
    //
    // showBannerAd() {
    //     if(this._haveBannerAd){
    //         jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerVisibility", "()V");
    //         console.log("再次展示===============>安卓Banner广告");
    //     }else{
    //         this.createBanner();
    //         this._haveBannerAd = true;
    //     }
    // }
    //
    // showFeedAd(num) {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showNative", "(I)V",num);
    //     // if (this._haveFeedAd) {
    //     //     this._haveFeedAdCount++
    //     //     if (this._haveFeedAdCount < this._haveFeedAdCountMax) {
    //     //         jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFeedAd", "()V");
    //     //         console.log("FeedAd=====================>显示隐藏广告");
    //     //     }else{
    //     //         this._haveFeedAdCount = 0
    //     //         this.preFeedAd();
    //     //     }
    //     // } else {
    //     //     this.preFeedAd();
    //     //     this._haveFeedAd = true;
    //     //     // this._haveFeedAdCount ++
    //     // }
    // }
    //
    // showInterstitialAd() {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showInterstitialAd", "()V");
    //     console.log("展示Interstitial广告===============>显示");
    // }
    //
    // showVideoAd(successfulCallback,cancelCallback,failureCallback) {
    //     this._videoAdSuccessCallback = successfulCallback;
    //     this._videoAdCancelCallback = cancelCallback;
    //     this._videoAdFailCallback = failureCallback;
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showRewardVideoAd", "()V");
    //     console.log("展示showRewardedVideoAd===============>显示");
    // }
    //
    // closeFeedAd(num) {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "closeNative", "(I)V",num);
    //     console.log("Feed=====================>暂时隐藏广告");
    // }
    //
    //
    // loadFullVideoAd() {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadFullVideoAd", "()V");
    //     console.log("预加载FullVideoAd===============>预加载显示");
    // }
    //
    // loadRewardVideoAd() {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadRewardVideoAd", "()V");
    //     console.log("预加载激励视频===============>预加载显示");
    // }
    //
    // preFeedAd() {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFeedAd", "()V");
    //     console.log("预加载FeedAd=====================>预加载");
    // }
    //
    // setQuDaoByAndroid() {
    //     ChannelManger.getInstance().setChannelType(ChannelMangerType.Android)
    //     cc["platform_Android"] = ChannelManger.getInstance().getChannel()
    // }
    //
    // setQuDaoByAndroidOppo(num) {
    //     switch (num) {
    //         case 0:
    //             ChannelManger.getInstance().setChannelType(ChannelMangerType.Android_oppo)
    //             cc["platform_Android"] = ChannelManger.getInstance().getChannel()
    //             cc.log('设置特殊渠道',"android oppo");
    //             break;
    //         case 1:
    //             ChannelManger.getInstance().setChannelType(ChannelMangerType.Android_mi)
    //             cc["platform_Android"] = ChannelManger.getInstance().getChannel()
    //             cc.log('设置特殊渠道',"android mi");
    //             break;
    //     }
    // }
    //
    // showClDialog() {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showClDialog", "()V");
    //     console.log("点击隐私协议=====================>");
    // }
    //
    // showFullVideoAd(successfulCallback, cancelCallback, failureCallback) {
    //     this._fullAdSuccessCallback = successfulCallback;
    //     this._fullAdCancelCallback = cancelCallback;
    //     this._fullAdFailCallback = failureCallback;
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFullVideoAd", "()V");
    //     console.log("展示showFullVideoAd===============>显示");
    // }
    //
    // public  fullSuccessCallback () {
    //     console.log('视频广告关闭回调');
    //     this._fullAdSuccessCallback && this._fullAdSuccessCallback();
    //     this._fullAdSuccessCallback = null;
    // }
    // public    fullFailedCallback(){
    //     this._fullAdFailCallback && this._fullAdFailCallback();
    //     this._fullAdFailCallback = null;
    // }
    // public   fullCancelCallback(){
    //     this._fullAdCancelCallback && this._fullAdCancelCallback();
    //     this._fullAdCancelCallback = null;
    // }

}

