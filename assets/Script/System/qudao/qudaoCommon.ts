import platform_qq from "./platform_qq";
import platform_Android from "./platform_Android";
import Platform_ios from "./platform_ios";
import platform_vivo from "./platform_vivo";
import platform_null from "./platform_null";
import platform_oppo, {Platform_oppoADCode} from "../qudao/platform_oppo";
import platform_meizu from "./platform_meizu";
import platform_Android_oppo from "./platform_Android_oppo";
import platform_Android_mi from "./platform_Android_mi";

const { ccclass, property } = cc._decorator;
export enum gameCode
{
    shenhe  = 1,
    shangxian  = 2,
    teshu  = 3,


    oppo_code1 = 1,
    oppo_code2 = 2,
    oppo_code3 = 3,
    oppo_code4 = 4,

    qq_code1 = 1,
    qq_code2 = 2,
    qq_code3 = 3,
    qq_code4 = 4,

}


export enum BossFightingType
{
    victory = 0,
    defeated = 1
}
@ccclass
export default class qudaoCommon extends cc.Component {
    static qudao = platform_null;
    // static qudao = platform_baidu;
    // static qudao = platform_toutiao;
    // static qudao = platform_vivo;
    // static qudao = platform_oppo;
    // static qudao = platform_meizu
    // static qudao = platform_qq;
    // static qudao = platform_Android;
    // static qudao = Platform_ios;
    // static qudao = platform_Android_oppo;

    static isNewbieGuide = false;

    static initallAd() {
        //判断当前渠道是 安卓渠道
        // if (qudaoCommon.qudao._name == qudaoType.vivo) {
        //     this.qudao.initAd();
        // }
        //  this.qudao.initAd();
        // if (qudaoCommon.qudao == qudaoType.ANDROID) {
        // }
        this.qudao.initAd();
        Emitter.register('onNewbieGuide', this.onNewbieGuide,this)
    }
    static onNewbieGuide(self,type){
        // if(type === NewbieGuideEduType.买两个魔物){
        //     this.isNewbieGuide = true;
        // }
        // if(type === NewbieGuideEduType.正常玩){
        //     this.isNewbieGuide = false;
        // }
    }



    //安卓渠道特殊处理//   游戏中出现的广告
    static openBannerAd() {
        switch (this.qudao) {
            case platform_Android:
            case platform_Android_oppo:
            case platform_Android_mi:
                this.qudao.showBannerAd();
            case Platform_ios:
                this.qudao.showBannerAd();
                break;
            case platform_vivo:
                this.qudao.showBannerAd();
                break;
            case platform_meizu:
                // this.qudao.hideBannerAd();
                break;
            case platform_null:
                this.qudao.showBannerAd();
                break;
            default:
                this.qudao.showBannerAd();
                break;
        }

    }
    static closeBannerAd() {
        switch (this.qudao) {
            case platform_Android:
                this.qudao.hideBannerAd();
                break;
            case Platform_ios:
                this.qudao.hideBannerAd();
                break;
            case platform_vivo:
                this.qudao.hideBannerAd();
                break;
            case platform_meizu:
                // this.qudao.hideBannerAd();
                break;
            case platform_null:
                this.qudao.hideBannerAd();
                break;
            default:
                this.qudao.hideBannerAd();
                break;
        }

    }


    //banner广告播放  信息流广告底部 原生广告
    static openDialogAd(data ?) {
        if(this.isNewbieGuide){
            return;
        }
        switch (this.qudao) {
            case platform_Android:
                this.qudao.showFeedAd(0);
                break;
            case platform_Android_oppo:
            case platform_Android_mi:
                // if (data.name == "GameOverDialog" ||data.name == "NewSkinDialog") {
                //     this.qudao.showFeedAd(0);
                // }else if (data.name == "LuckDialog" ||data.name == "TipsDialog") {
                //     this.qudao.showFeedAd(1);
                // }
                // this.qudao.showFeedAd(data.index);
                this.qudao.showFeedAd(0);
                break;
            case Platform_ios:
                this.qudao.showFeedAd();
                break;
            case platform_oppo:
                // let data = {
                //     node : this.node,
                //     name : "GameOverDialog"
                // }
                if (data.name == "GameOverDialog" ||data.name == "LuckDialog") {
                    this.qudao.showNativeAd(data.node,0);
                }else if (data.name == "TipsDialog") {
                    this.qudao.showNativeAd(data.node,1);
                }else if (data.name == "NewSkinDialog") {
                    this.qudao.showNativeAd(data.node,2);
                } else{
                    this.qudao.showNativeAd(data.node);
                }

                break;
            case platform_vivo:
                this.qudao.showNativeAd(data.node);
                break;
            case platform_null:
                this.qudao.showNativeAd(data.node);
                break;
            // case platform_qq:
            //     this.qudao.showBlockAd()
            //     break;
            default:
                this.qudao.showBannerAd(data);
                break;
        }
    }
    // qudaoCommon.closeDialogAd()
    //banner广告关闭
    static closeDialogAd() {
        // ccLog.log("信息流关闭")
        switch (this.qudao) {
            case platform_Android:
            case platform_Android_oppo:
            case platform_Android_mi:
                this.qudao.closeFeedAd()
                break;
            case Platform_ios:
                this.qudao.closeFeedAd()
                break;
            case platform_oppo:
                this.qudao.closeNativeAd();
                break;
            case platform_vivo:
                this.qudao.closeNativeAd();
                break;
            case platform_null:
                this.qudao.closeNativeAd();
                break;
            // case platform_qq:
            //     this.qudao.hideBlockAd()
            //     break;
            default:
                this.qudao.hideBannerAd();
                break;
        }
    }

    //激励视频广告播放
    static openVideoAd(successfulCallback, cancelCallback, failureCallback) {
        this.qudao.showVideoAd(successfulCallback, cancelCallback, failureCallback)
    }

    //全屏视频广告播放
    static showFullVideoAd(successfulCallback, cancelCallback, failureCallback) {
        // let  data = {
        //     txt : "取消广告,无法领取奖励"+(this.qudao==platform_Android)
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : DialogType.打印吐司,zIndex : 100,data:data},null)
        switch (this.qudao) {
            case platform_Android:
            case platform_Android_oppo:
            case platform_Android_mi:
                this.qudao.showFullVideoAd(successfulCallback, cancelCallback, failureCallback)
                break;
            default:

                break;
        }
    }

    //插屏广告播放 插屏广告
    static openInAd() {
        this.qudao.showInterstitialAd();
    }

     //插屏广告播放
     static moreGame() {
        this.qudao.moreGame();
    }
    //点击隐私协议
     static showClDialog() {
        this.qudao.showClDialog();
    }
    // qudaoCommon.showBlockAd()
    static showBlockAd() {
        if (qudaoCommon.qudao == platform_qq) {
            this.qudao.showBlockAd();
        } else {

        }
    }
// qudaoCommon.hideBlockAd()
    static hideBlockAd() {
        if (qudaoCommon.qudao == platform_qq) {
            this.qudao.hideBlockAd();
        } else {

        }
    }
    // qudaoCommon.showAppBox()
    static showAppBox() {
        if (qudaoCommon.qudao == platform_qq) {
            this.qudao.showAppBox();
        } else {

        }
    }
}

