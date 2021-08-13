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
import GetLuckDialog from "../dialog/getLuckDialog";
import ControlCommercial, {
    ControlCommercialItemName,
    ControlCommercialSceneId
} from "../control/controlCommercial";
import {DialogType} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

export interface IChannelGetLuckDialog {
    小手指引导()
    按钮缩放()
    插屏广告展示()
    插屏展示间隔()
    插屏延迟展示()
    插屏广告概率控制()
    盒子广告展示()
    盒子广告延迟展示控制()
    盒子广告展示间隔控制()
    激励广告点击区域开关控制()
    激励广告点击区域参数控制()
    激励广告点击区域时间间隔控制()
    激励广告点击区域次数控制()
    激励视频图标展示()
    原生广告展示()
    原生广告展示次数()
    原生广告点击区域开关控制()
    原生广告点击区域大小控制()
    原生广告点击区域时间间隔控制()
    原生广告点击区域次数控制()
    原生广告关闭按钮点击区域()
    原生广告延迟展示()
    原生广告概率控制()
    原生广告初始展示间隔控制()
    原生广告展示间隔控制()
    积木广告展示()
    积木广告延迟展示()
    积木广告位置变更()
    积木广告位置变更概率控制()
}


//限时礼包
@ccclass
export default class ChannelGetLuckDialog extends ChannelBase implements IChannelGetLuckDialog{
    小手指引导() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.小手指引导) == true) {
            UtilsNode.show(this.bindComponent.引导_小手指,true)
            UtilsAction.hand(this.bindComponent.引导_小手指)
        }

    }
    按钮缩放() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.按钮缩放) == true) {
            UtilsAction.btnAn(this.bindComponent.失败_看广告按钮)
        }

    }
    插屏广告展示() {

    }
    插屏展示间隔() {

    }
    插屏延迟展示() {

    }
    插屏广告概率控制() {

    }
    盒子广告展示() {

    }
    盒子广告延迟展示控制() {

    }
    盒子广告展示间隔控制() {

    }
    激励广告点击区域开关控制() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.激励广告点击区域开关控制) == true) {
            return true
        }
        return false
    }
    激励广告点击区域参数控制() {
        if (this.激励广告点击区域开关控制() && this.激励广告点击区域时间间隔控制() && this.激励广告点击区域次数控制()) {
          let ControlNum =  ControlCommercial.getSceneData(
                ControlCommercialSceneId.限时礼包,
                ControlCommercialItemName.激励广告点击区域参数控制)
            if (ControlNum == null) {
                ControlNum = 100
            }
            this.bindComponent.失败_看广告跳过实际点击.height += ControlNum
        }
    }
    激励广告点击区域时间间隔控制() {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.激励广告点击区域时间间隔控制) == true) {
            return true
        }
        return false
    }
    激励广告点击区域次数控制() {
        // ControlCommercial.getItemNameCount(sceneId,itemName)
        if (ControlCommercial.getItemNameCount(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.激励广告点击区域次数控制) == true) {
            return true
        }
        return false
    }
    激励视频图标展示() {

    }
    原生广告展示() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告展示) == true) {
            return true
        }
        return false
    }
    原生广告展示次数() {
        if (ControlCommercial.getItemNameCount(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告展示次数) == true) {
            return true
        }
        return false
    }
    原生广告点击区域开关控制() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告点击区域开关控制) == true) {
            return true
        }
        return false
    }
   async 原生广告点击区域大小控制() {
        if (this.原生广告展示()
            && this.原生广告展示次数()
            && this.原生广告点击区域开关控制()
            && this.原生广告点击区域时间间隔控制()
            && this.原生广告点击区域次数控制()
            && this.原生广告展示间隔控制()
            && this.原生广告初始展示间隔控制()
            && this.原生广告概率控制()
        ) {
            let ControlNum =  ControlCommercial.getSceneData(
                ControlCommercialSceneId.限时礼包,
                ControlCommercialItemName.原生广告点击区域大小控制)
            if (ControlNum == null) {
                ControlNum = 100
            }
            // this.bindComponent.失败_看广告跳过实际点击.height += ControlNum
            //根据渠道不同展示广告
            //先留着
           let time = this.原生广告延迟展示()
          await  Utils.setTimerOnce(this,time)


        }

    }
    原生广告点击区域时间间隔控制() {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告点击区域时间间隔控制) == true) {
            return true
        }
        return false
    }
    原生广告点击区域次数控制() {
        if (ControlCommercial.getItemNameCount(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告点击区域次数控制) == true) {
            return true
        }
        return false
    }
    原生广告关闭按钮点击区域() {
        let ControlNum =  ControlCommercial.getSceneData(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告关闭按钮点击区域)
    //    根据传值控制原生广告关闭按钮的点击区域，默认30x30，后台传值30，如后台传值20那么点击区域为20x20

    }
    原生广告延迟展示() {
        let ControlNum =  ControlCommercial.getSceneData(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告延迟展示)
        return ControlNum
    }
    原生广告概率控制() {
        let ControlNum =  ControlCommercial.getSceneData(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告概率控制)

       let random = Utils.random(0,100)
        if (ControlNum*100 > random) {
            return true
        }else{
            return false
        }


    }
    原生广告初始展示间隔控制() {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告初始展示间隔控制) == true) {
            return true
        }
        return false
    }
    原生广告展示间隔控制() {


    this.原生广告初始展示间隔控制()

        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告展示间隔控制) == true) {
            return true
        }
        return false
    }
    积木广告展示() {

    }
    积木广告延迟展示() {

    }
    积木广告位置变更() {

    }
    积木广告位置变更概率控制() {

    }

    @property(
        {
            type: GetLuckDialog,
            displayName: "GetLuckDialog_放这里"
        }
    )    // call cc.Enum
    bindComponent : GetLuckDialog = null
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



            this.小手指引导()
            this.按钮缩放()
            this.激励广告点击区域参数控制()
            this.原生广告点击区域大小控制()


       }


       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
           let data = {
               cancelNode : null,
               parent : this.node,
               oppoNativeADToClose :null,
               ADTypeCode : Channel_oppoADType.K原生三张ID,
               heights : [null,900,950, 970, 1040]
           }
           ChannelManger.getInstance().getChannel().showNativeAd(data)
       }


    }
    onLoad () {
        super.onLoad()
        // ccLog.log("检测先后顺序 ChannelgameOverDialog onLoad")
    }
    onDestroy() {
        super.onDestroy();


        if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
            ChannelManger.getInstance().getChannel().hideBannerAd()
        }

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
            this.init()
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
