// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChannelBase, {ChannelBaseType} from "./channelBase";
import ccLog from "../System/Log/ccLog";
import ChannelManger from "../System/qudao/channelManger";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChannelSelectCheckPointViewPagerDialog extends ChannelBase {

    _selectCheckPointViewPagerDialog : SelectCheckPointViewPagerDialog

    // LIFE-CYCLE CALLBACKS:
   async init(selectCheckPointViewPagerDialog :SelectCheckPointViewPagerDialog){
        this._selectCheckPointViewPagerDialog = selectCheckPointViewPagerDialog

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
       //         qudaoCommon.openBannerAd()
       //         break;
       //
       // }
       if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
           ChannelManger.getInstance().getChannel().showBannerAd()
       }
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
           // Api.adCode = 4
           // ChannelManger.getInstance().getChannel().showNativeAd(data)
           ChannelManger.getInstance().getChannel().showBannerAd()
       }
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.vivo) {
           // Api.adCode = 4
           // ChannelManger.getInstance().getChannel().showNativeAd(data)
           ChannelManger.getInstance().getChannel().showBannerAd()
       }
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.meizu) {
           // Api.adCode = 4
           // ChannelManger.getInstance().getChannel().showNativeAd(data)
           ChannelManger.getInstance().getChannel().showBannerAd()
       }
    }
    //结算关闭时
    dialogfinsh(data){
        ccLog.log("结算渠道管理关闭数据是",data)
        //安卓显示 全屏广告
        // switch (qudaoCommon.qudao) {
        //     case platform_Android:
        //     case platform_Android_mi:
        //     case platform_Android_oppo:
        //         // qudaoCommon.closeBannerAd()
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
        // qudaoCommon.closeBannerAd()

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
