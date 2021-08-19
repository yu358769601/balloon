import ChannelAllBase from "./channelAllBase";
import {Ichannel_android} from "./Ichannel_android";
import ChannelManger, {ChannelMangerType} from "./channelManger";
import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;

export class Channel_android extends ChannelAllBase implements Ichannel_android{


    constructor() {
        super();
        // this.initAd()
        // cc["platform_Android"] = this;

    }
    checkChannel(): boolean {
        //如果是浏览器 就强制web
        if(ChannelManger.getInstance().forcedWEB(typeof jsb != "undefined" ) == true){
            return true
        }
        return false;
    }
    initAd() {
        cc["platform_Android"] = ChannelManger.getInstance().getChannel()
        //如果是浏览器 就强制web
        this.loadFullVideoAd();
        this.loadRewardVideoAd();

        this.initGame()
    }

    public  initGame(){
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "initGame", "()V");
        console.log("初始化安卓渠道===============>");
    }
    createBanner() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showBanner", "()V");
        console.log("预加载===============>安卓Banner广告");
    }

    hideBannerAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerInvisibility", "()V");
        console.log("暂时隐藏===============>安卓Banner广告");
    }



    showBannerAd() {
        if(this._haveBannerAd){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setBannerVisibility", "()V");
            console.log("再次展示===============>安卓Banner广告");
        }else{
            this.createBanner();
            this._haveBannerAd = true;
        }
    }

    showFeedAd(num) {
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

    showInterstitialAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showInterstitialAd", "()V");
        console.log("展示Interstitial广告===============>显示");
    }

    showVideoAd(successfulCallback,cancelCallback,failureCallback) {
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showRewardVideoAd", "()V");
        console.log("展示showRewardedVideoAd===============>显示");
    }

    closeFeedAd(num) {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "closeNative", "(I)V",num);
        console.log("Feed=====================>暂时隐藏广告");
    }


    loadFullVideoAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadFullVideoAd", "()V");
        console.log("预加载FullVideoAd===============>预加载显示");
    }

    loadRewardVideoAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "loadRewardVideoAd", "()V");
        console.log("预加载激励视频===============>预加载显示");
    }

    preFeedAd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFeedAd", "()V");
        console.log("预加载FeedAd=====================>预加载");
    }

    setQuDaoByAndroid() {
        ChannelManger.getInstance().setChannelType(ChannelMangerType.Android)
        console.log("设置了安卓渠道呢");

    }

    setQuDaoByAndroidOppo(num) {
        switch (num) {
            case 0:
                ChannelManger.getInstance().setChannelType(ChannelMangerType.Android_oppo)
                cc["platform_Android"] = ChannelManger.getInstance().getChannel()
                console.log('设置特殊渠道',"android oppo");
                break;
            case 1:
                ChannelManger.getInstance().setChannelType(ChannelMangerType.Android_mi)
                cc["platform_Android"] = ChannelManger.getInstance().getChannel()
                console.log('设置特殊渠道',"android mi");
                break;
        }
    }

    showClDialog() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showClDialog", "()V");
        console.log("点击隐私协议=====================>");
    }

    showFullVideoAd(successfulCallback, cancelCallback, failureCallback) {
        this._fullAdSuccessCallback = successfulCallback;
        this._fullAdCancelCallback = cancelCallback;
        this._fullAdFailCallback = failureCallback;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "showFullVideoAd", "()V");
        console.log("展示showFullVideoAd===============>显示");
    }

    public  fullSuccessCallback () {
        console.log('视频广告关闭回调');
        this._fullAdSuccessCallback && this._fullAdSuccessCallback();
        this._fullAdSuccessCallback = null;
    }
    public    fullFailedCallback(){
        this._fullAdFailCallback && this._fullAdFailCallback();
        this._fullAdFailCallback = null;
    }
    public   fullCancelCallback(){
        this._fullAdCancelCallback && this._fullAdCancelCallback();
        this._fullAdCancelCallback = null;
    }

    videoCancelCallback() {
        ccLog.log("rewardVideo 取消1")
        // let  data = {
        //     txt : "暂无广告，请稍后再试"
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        this._videoAdCancelCallback && this._videoAdCancelCallback();
        this._videoAdCancelCallback = null;
    }

    videoFailedCallback() {
        ccLog.log("rewardVideo 失败1")
        // let  data = {
        //     txt : "暂无广告，请稍后再试"
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        this._videoAdFailCallback && this._videoAdFailCallback();
        this._videoAdFailCallback = null;
    }

    videoSuccessCallback() {
        ccLog.log("rewardVideo 成功发放奖励 1")
        // let  data = {
        //     txt : "暂无广告，请稍后再试"
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        this._videoAdSuccessCallback && this._videoAdSuccessCallback();
        this._videoAdSuccessCallback = null;
    }
     moreGame() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "jumpSpecialArea", "()V");
        console.log("更多游戏广告");
    }

}

