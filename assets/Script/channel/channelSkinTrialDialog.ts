// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChannelBase, {ChannelBaseType} from "./channelBase";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import ChannelManger, {ChannelMangerType} from "../System/qudao/channelManger";
import Menu from "../pass/menu";
import Utils from "../System/Utils/Utils";
import Api from "../System/api/api";
import {Channel_oppoADType} from "../System/qudao/channel_oppo";
import SkinTrialDialog from "../dialog/skinTrialDialog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChannelSkinTrialDialog extends ChannelBase {

    @property(
        {
            type: SkinTrialDialog,
            displayName: "SkinTrialDialog_放这里"
        }
    )    // call cc.Enum
    bindComponent : SkinTrialDialog = null
    // LIFE-CYCLE CALLBACKS:
   async init(){
        // this._menu = menu
       this.bindComponent.init(this)
        // switch (this.channelType){
        //     case ChannelBaseType.Android:
        //
        //         break;
        // }

        // switch (qudaoCommon.qudao) {
        //     case platform_Android:
        //
        //         break;
        //     case platform_Android:
        //
        //         break;
        // }


       // if (qudaoCommon.qudao == platform_Android_oppo ||qudaoCommon.qudao == platform_qq ) {
       //     menu.更多精彩.active = true;
       //
       // }else{
       //     menu.更多精彩.active = false
       // }

       // let channelMangerType = ChannelManger.getInstance().getChannelType()
       // if (channelMangerType == ChannelMangerType.Android_oppo ||channelMangerType == ChannelMangerType.qq ) {
       //     menu.更多精彩.active = true;
       // }else{
       //     menu.更多精彩.active = false
       // }


       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.web) {
           // this._gameOverDialog.initViewChannelNode(this._gameOverDialog.居中布局 )
           // Api.adCode = 4
           //设置 激励视频按钮和取消的入侵程度
           // let height =  Utils.getADBtnHeight(
           //     Api.getAdCode(),
           //     // 4,
           //     this._gameOverDialog.结算多倍按钮实际点击,
           //     this._gameOverDialog.结算继续按钮实际点击,
           //     this.oppoADToClose)
           //
           // this._gameOverDialog.结算多倍按钮实际点击.height = height

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose


           // let data = {
           //     cancelNode : null,
           //     parent : this.node,
           //     oppoNativeADToClose :null,
           //     ADTypeCode : Channel_oppoADType.K原生1280ID,
           //     heights : [null,900,950, 970, 1040]
           // }
           // // ChannelManger.getInstance().getChannel().showNativeAd(data)
           // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }


       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
           let data = {
               cancelNode : null,
               parent : this.node,
               oppoNativeADToClose :null,
               ADTypeCode : Channel_oppoADType.K原生1280ID,
               heights : [null,900,950, 970, 1040]
           }
           ChannelManger.getInstance().getChannel().showNativeAd(data)
           // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }


    }
    onLoad () {
        super.onLoad()
        // ccLog.log("检测先后顺序 ChannelgameOverDialog onLoad")
    }
    onDestroy() {
        super.onDestroy();

    }
    // Emitter.fire("openBannerByMenu")
    //显示广告
    // openBannerByMenu(){
    //     if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
    //         ChannelManger.getInstance().getChannel().showBannerAd()
    //     }
    //
    //     // switch (qudaoCommon.qudao) {
    //     //     case platform_Android:
    //     //     case platform_Android_mi:
    //     //     case platform_Android_oppo:
    //     //         // Emitter.fire("closeBannerByMenu")
    //     //         //打开原生广告
    //     //         qudaoCommon.openBannerAd()
    //     //         break;
    //     //
    //     // }
    // }
    // Emitter.fire("closeBannerByMenu")
    //关闭广告
    // closeBannerByMenu(){
    //     if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
    //         ChannelManger.getInstance().getChannel().hideBannerAd()
    //     }
    //     // switch (qudaoCommon.qudao) {
    //     //     case platform_Android:
    //     //     case platform_Android_mi:
    //     //     case platform_Android_oppo:
    //     //         // Emitter.fire("openBannerByMenu")
    //     //         //打开原生广告
    //     //         qudaoCommon.closeBannerAd()
    //     //         break;
    //
    //     }
    start () {
            this.init()
    }

    registerEmitter() {

        // Emitter.register("openBannerByMenu",this.openBannerByMenu,this)
        // Emitter.register("closeBannerByMenu",this.closeBannerByMenu,this)
    }

    removeEmitter() {
        // Emitter.remove("openBannerByMenu",this.openBannerByMenu,this)
        // Emitter.remove("closeBannerByMenu",this.closeBannerByMenu,this)
    }

    // update (dt) {}
}
