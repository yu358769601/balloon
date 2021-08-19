// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChannelBase, {ChannelBaseType} from "./channelBase";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import Api from "../System/api/api";
import GameSetting, {gameModeType} from "../System/mode/gameSetting";
import {IDialogLayout} from "../dialog/BaseDialog";
import ChannelManger from "../System/qudao/channelManger";
import {Channel_oppoADType} from "../System/qudao/channel_oppo";
import {Channel_vivoADCode} from "../System/qudao/channel_vivo";
import JsonManager from "../System/manage/JsonManager";
import Utils from "../System/Utils/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChannelOnlineGiftBagDialog extends ChannelBase {
    //oppo策略 激励视频和取消的距离比
    oppoADToClose = [
        0,0,5,10,15
    ]
    //取消和 原生广告的 距离比
    oppoNativeADToClose = [
        0,0,15,30,50
    ]

    _t : any = null

    // LIFE-CYCLE CALLBACKS:
   async init(t :any){
        this._t = t

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
       ccLog.log("加钱显示广告")
       // switch (qudaoCommon.qudao) {
       //     case platform_Android:
       //     case platform_Android_mi:
       //     case platform_Android_oppo:
       //         // Emitter.fire("closeBannerByMenu")
       //       //打开原生广告
       //         qudaoCommon.openDialogAd()
       //         break;
       //
       // }
       if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
           this._t.initViewChannelNode(this._t.居中布局 )
           // qudaoCommon.openDialogAd()
           ChannelManger.getInstance().getChannel().showFeedAd(0)
       }
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {

           this._t.initViewChannelNode(this._t.贴底布局 )

           // Api.adCode = 4
           //设置 激励视频按钮和取消的入侵程度
           // let height =  Utils.getADBtnHeight(
           //      Api.getAdCode(),
           //      // 4,
           //      this._t.结算广告按钮实际点击,
           //      this._t.结算关闭按钮实际点击,
           //      this.oppoADToClose)
           //
           //  this._t.结算广告按钮实际点击.height = height

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose
           let data = {
               cancelNode : this._t.关闭按钮,
               parent : this.node,
               oppoNativeADToClose : this.oppoNativeADToClose,
               ADTypeCode : Channel_oppoADType.K原生三张ID,
               heights : [null,900,950, 970, 1040]
           }
           ChannelManger.getInstance().getChannel().showNativeAd(data)
           // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.vivo) {
           this._t.initViewChannelNode(this._t.贴底布局 )
           // Api.adCode = 4
           //设置 激励视频按钮和取消的入侵程度
           // let height =  Utils.getADBtnHeight(
           //      Api.getAdCode(),
           //      // 4,
           //      this._t.结算广告按钮实际点击,
           //      this._t.结算关闭按钮实际点击,
           //      this.oppoADToClose)
           //
           //  this._t.结算广告按钮实际点击.height = height

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose
           let data = {
               cancelNode : this._t.关闭按钮,
               parent : this.node,
               oppoNativeADToClose : this.oppoNativeADToClose,
               ADTypeCode : Channel_vivoADCode.原生广告1posID,
               heights : [null,900,950, 970, 1040]
           }
           ChannelManger.getInstance().getChannel().showNativeAd(data)
           // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.tt) {
           this._t.initViewChannelNode(this._t.居中布局 )
           ChannelManger.getInstance().getChannel().showBannerAd()
           let  r = Utils.random(0,100)
           if (r < JsonManager.passSettingjson.ttchapinggailv ) {
               await Utils.setTimerOnce(this,0.5)
               ChannelManger.getInstance().getChannel().showInterstitialAd();
           }
       }



       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.web) {
           this._t.initViewChannelNode(this._t.居中布局 )
           // Api.adCode = 4
           //设置 激励视频按钮和取消的入侵程度
           // let height =  Utils.getADBtnHeight(
           //     Api.getAdCode(),
           //     // 4,
           //     this._t.结算广告按钮实际点击,
           //     this._t.结算关闭按钮实际点击,
           //     this.oppoADToClose)
           //
           // this._t.结算广告按钮实际点击.height = height

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose
           let data = {
               cancelNode : this._t.关闭按钮,
               parent : this.node,
               oppoNativeADToClose : this.oppoNativeADToClose,
               ADTypeCode : Channel_oppoADType.K原生三张ID,
               heights : [null,900,950, 970, 1040]
           }
           // ChannelManger.getInstance().getChannel().showNativeAd(data)
           ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }


       Emitter.fire("onGetCodeAD")

    }
    setLayout(idialogLayout :IDialogLayout){
        idialogLayout.setLayoutDefault()
    }


    //结算关闭时
    dialogfinsh(data){
        ccLog.log("结算渠道管理关闭数据是",data)
        //安卓显示 全屏广告
        // switch (qudaoCommon.qudao) {
        //     case platform_Android:
        //     case platform_Android_mi:
        //     case platform_Android_oppo:
        //         // Emitter.fire("openBannerByMenu")
        //         if (data.data.index > 1) {
        //             qudaoCommon.showFullVideoAd()
        //         }
        //
        //         break;
        //
        // }
    }

    onLoad () {
        super.onLoad()
        ccLog.log("检测先后顺序 ChannelgameOverDialog onLoad")
    }
    onDestroy() {
        super.onDestroy();
        // Emitter.fire("openBannerByMenu")
        // qudaoCommon.closeDialogAd()
        ChannelManger.getInstance().getChannel().closeFeedAd(0)
        ChannelManger.getInstance().getChannel().hideBannerAd()
    }

    start () {

    }

    registerEmitter() {

    }

    removeEmitter() {

    }

    // update (dt) {}
}
