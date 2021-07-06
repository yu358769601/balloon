// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChannelBase, {ChannelBaseType} from "./channelBase";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import ChannelManger from "../System/qudao/channelManger";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Channelmenu extends ChannelBase {

    _menu : Menu

    // LIFE-CYCLE CALLBACKS:
   async init(menu :Menu){
        this._menu = menu

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
       let channelMangerType = ChannelManger.getInstance().getChannelType()
       if (channelMangerType == ChannelMangerType.Android_oppo ||channelMangerType == ChannelMangerType.qq ) {
           menu.更多精彩.active = true;
       }else{
           menu.更多精彩.active = false
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
    openBannerByMenu(){
        if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
            ChannelManger.getInstance().getChannel().showBannerAd()
        }

        // switch (qudaoCommon.qudao) {
        //     case platform_Android:
        //     case platform_Android_mi:
        //     case platform_Android_oppo:
        //         // Emitter.fire("closeBannerByMenu")
        //         //打开原生广告
        //         qudaoCommon.openBannerAd()
        //         break;
        //
        // }
    }
    // Emitter.fire("closeBannerByMenu")
    //关闭广告
    closeBannerByMenu(){
        if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
            ChannelManger.getInstance().getChannel().hideBannerAd()
        }
        // switch (qudaoCommon.qudao) {
        //     case platform_Android:
        //     case platform_Android_mi:
        //     case platform_Android_oppo:
        //         // Emitter.fire("openBannerByMenu")
        //         //打开原生广告
        //         qudaoCommon.closeBannerAd()
        //         break;

        }
    start () {

    }

    registerEmitter() {

        Emitter.register("openBannerByMenu",this.openBannerByMenu,this)
        Emitter.register("closeBannerByMenu",this.closeBannerByMenu,this)
    }

    removeEmitter() {
        Emitter.remove("openBannerByMenu",this.openBannerByMenu,this)
        Emitter.remove("closeBannerByMenu",this.closeBannerByMenu,this)
    }

    // update (dt) {}
}
