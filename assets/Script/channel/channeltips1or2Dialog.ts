// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChannelBase, {ChannelBaseType} from "./channelBase";
import ccLog from "../System/Log/ccLog";
import Utils from "../System/Utils/Utils";
import Emitter from "../System/Msg/Emitter";
import Api from "../System/api/api";
import {IDialogLayout} from "../dialog/BaseDialog";
import ChannelManger from "../System/qudao/channelManger";
import {Channel_oppoADType} from "../System/qudao/channel_oppo";
import {Channel_vivoADCode} from "../System/qudao/channel_vivo";
import JsonManager from "../System/manage/JsonManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Channeltips1or2Dialog extends ChannelBase {
    //oppo策略 激励视频和取消的距离比
    oppoADToClose = [
        0,0,5,10,15
    ]
    //取消和 原生广告的 距离比
    oppoNativeADToClose = [
        0,0,15,30,50
    ]

    vivoADToClose = [
        0,0,5,10,15
    ]
    //取消和 原生广告的 距离比
    vivoNativeADToClose = [
        0,0,15,30,50
    ]

   ttADToClose = [
        0,0,15,20,35
    ]
   meizuADToClose = [
        0,0,10,15,35
    ]


    _tips1or2Dialog : Tips1or2Dialog

    // LIFE-CYCLE CALLBACKS:
   async init(tips1or2Dialog :Tips1or2Dialog){
        this._tips1or2Dialog = tips1or2Dialog

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

       //如果是 安卓 一类的 就去调用 这种显示广告
       if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
           this._tips1or2Dialog.initViewChannelNode(this._tips1or2Dialog.居中布局 )
           ChannelManger.getInstance().getChannel().showFeedAd(0)
       }
//         code1	10秒内展示2次，默认点击区域
//         code2	5秒内展示2次，原生广告按钮占关闭按钮15%点击区域，查看提示占关闭按钮5%；
       // code3	5秒内展示2次，原生广告按钮占关闭按钮30%点击区域，查看提示占关闭按钮10%；
       // code4	无限制展示次数，原生广告按钮占关闭按钮50%点击区域，查看提示占关闭按钮15%；
       //
       // this. 结算广告按钮实际点击
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
           this._tips1or2Dialog.initViewChannelNode(this._tips1or2Dialog.贴底布局 )
           // Api.adCode = 4
          //设置 激励视频按钮和取消的入侵程度
          let height =  Utils.getADBtnHeight(
               Api.getAdCode(),
               // 4,
               this._tips1or2Dialog.结算广告按钮实际点击,
               this._tips1or2Dialog.结算关闭按钮实际点击,
               this.oppoADToClose)

           this._tips1or2Dialog.结算广告按钮实际点击.height = height

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose
           let data = {
               cancelNode : this._tips1or2Dialog.结算关闭按钮实际点击,
               parent : this.node,
               oppoNativeADToClose : this.oppoNativeADToClose,
               ADTypeCode : Channel_oppoADType.K原生320ID,
               heights : [null,900,950, 970, 1040]
           }
           ChannelManger.getInstance().getChannel().showNativeAd(data)
           // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }

       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.vivo) {
           this._tips1or2Dialog.initViewChannelNode(this._tips1or2Dialog.贴底布局 )
           // Api.adCode = 4
           //设置 激励视频按钮和取消的入侵程度
           let height =  Utils.getADBtnHeight(
               Api.getAdCode(),
               // 4,
               this._tips1or2Dialog.结算广告按钮实际点击,
               this._tips1or2Dialog.结算关闭按钮实际点击,
               this.vivoADToClose)

           this._tips1or2Dialog.结算广告按钮实际点击.height = height

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose
           let data = {
               cancelNode : this._tips1or2Dialog.结算关闭按钮实际点击,
               parent : this.node,
               // oppoNativeADToClose : this.oppoNativeADToClose,
               ADTypeCode : Channel_vivoADCode.原生广告1posID,
               heights : [null,900,950, 970, 1040]
           }
          await Utils.setTimerOnce(this,0.5)
           ChannelManger.getInstance().getChannel().showNativeAd(data)
           // ChannelManger.getInstance().getChannel().showNativeAdTest(data)

       }




       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.tt) {
           this._tips1or2Dialog.initViewChannelNode(this._tips1or2Dialog.居中布局 )
           let height =  Utils.getADBtnHeight(
               Api.getAdCode(),
               // 4,
               this._tips1or2Dialog.结算广告按钮实际点击,
               this._tips1or2Dialog.结算关闭按钮实际点击,
               this.ttADToClose)

           this._tips1or2Dialog.结算广告按钮实际点击.height = height

           ChannelManger.getInstance().getChannel().showBannerAd()

           let  r = Utils.random(0,100)
           if (r < JsonManager.passSettingjson.ttchapinggailv ) {
               await Utils.setTimerOnce(this,0.5)
               ChannelManger.getInstance().getChannel().showInterstitialAd();
           }
       }

       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.meizu) {
           this._tips1or2Dialog.initViewChannelNode(this._tips1or2Dialog.贴底布局 )
           let height =  Utils.getADBtnHeight(
               Api.getAdCode(),
               // 4,
               this._tips1or2Dialog.结算广告按钮实际点击,
               this._tips1or2Dialog.结算关闭按钮实际点击,
               this.meizuADToClose)

           this._tips1or2Dialog.结算广告按钮实际点击.height = height
           await  Utils.setTimerOnce(this,0.5)
           ChannelManger.getInstance().getChannel().showInterstitialAd()
       }




        //模拟 oppo
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.web) {
           this._tips1or2Dialog.initViewChannelNode(this._tips1or2Dialog.贴底布局 )
           // Api.adCode = 4
          //设置 激励视频按钮和取消的入侵程度
          let height =  Utils.getADBtnHeight(
              Api.getAdCode(),
               // 4,
               this._tips1or2Dialog.结算广告按钮实际点击,
               this._tips1or2Dialog.结算关闭按钮实际点击,
               this.oppoADToClose)

           this._tips1or2Dialog.结算广告按钮实际点击.height = height

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose
           let data = {
               cancelNode : this._tips1or2Dialog.结算关闭按钮实际点击,
               parent : this.node,
               oppoNativeADToClose : this.oppoNativeADToClose,
               ADTypeCode : Channel_oppoADType.K原生320ID,
               heights : [null,900,950, 970, 1040]
           }
           // ChannelManger.getInstance().getChannel().showNativeAd(data)
           await  Utils.setTimerOnce(this,0.5)
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
        //         if (data.data.index > 1) {
        //             qudaoCommon.showFullVideoAd()
        //         }
        //         qudaoCommon.closeDialogAd()
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
