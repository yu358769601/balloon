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
import SignInDialog from "../dialog/signInDialog";
import SuperGetDialog from "../dialog/superGetDialog";
import ControlCommercial, {
    ControlCommercialItemName,
    ControlCommercialSceneId
} from "../control/controlCommercial";
import UtilsNode from "../System/Utils/UtilsNode";
import UtilsAction from "../System/Utils/UtilsAction";
import {ItemPreType} from "../System/Type/enums";
import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

export interface IChannelSuperGetDialog {
    特殊按钮2开关控制()
    特殊按钮2展示概率控制()
    特殊按钮2展示间隔控制(is)
    特殊按钮2点击区域大小()
    插屏展示间隔()
    插屏延迟展示()
    插屏广告概率控制()

    盒子广告展示()
    盒子广告延迟展示控制()
    盒子广告展示间隔控制()
    激励广告点击区域开关控制()
    激励广告点击区域参数控制()
    激励广告点击区域时间间隔控制(is)
    激励广告点击区域次数控制(is)
    激励视频图标展示()
    原生广告展示()
    原生广告展示次数(is)
    原生广告点击区域开关控制()
    原生广告点击区域大小控制()
    原生广告点击区域时间间隔控制(is)
    原生广告点击区域次数控制(is)
    原生广告关闭按钮点击区域()
    原生广告延迟展示()
    原生广告概率控制()
    原生广告初始展示间隔控制(is)
    原生广告展示间隔控制(is)
    积木广告展示()
    积木广告延迟展示()
    积木广告位置变更()
    积木广告位置变更概率控制()
}


@ccclass
export default class ChannelSuperGetDialog extends ChannelBase implements  IChannelSuperGetDialog{


    特殊按钮2开关控制() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.漂浮窗,
            ControlCommercialItemName.特殊按钮2开关控制) == true) {
            // UtilsNode.show(this.bindComponent.引导_小手指,true)
            // UtilsAction.hand(this.bindComponent.引导_小手指)
            ccLog.log("判断是否出现广告","特殊按钮2开关控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","特殊按钮2开关控制",false)
        return false
    }

    特殊按钮2展示概率控制() {
        if (ControlCommercial.getRandom(
            ControlCommercialSceneId.漂浮窗,
            ControlCommercialItemName.特殊按钮2展示概率控制) == true) {
            ccLog.log("判断是否出现广告","特殊按钮2展示概率控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","特殊按钮2展示概率控制",false)
        return false
    }

    特殊按钮2展示间隔控制(is) {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.漂浮窗,
            ControlCommercialItemName.特殊按钮2展示间隔控制,is) == true) {
            ccLog.log("判断是否出现广告","特殊按钮2展示间隔控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","特殊按钮2展示间隔控制",false)
        return false
    }

    特殊按钮2点击区域大小() {
        if (
            Utils.allTrueOrFalseByAllItem(true,[
                this.特殊按钮2开关控制(),
                this.特殊按钮2展示概率控制(),
                this.特殊按钮2展示间隔控制(true),
            ])
        ) {
            this.特殊按钮2展示间隔控制(false)
            let ControlNum =  ControlCommercial.getSceneData(
                ControlCommercialSceneId.漂浮窗,
                ControlCommercialItemName.特殊按钮2点击区域大小)
            // if (ControlNum == null) {
            //     ControlNum = 100
            // }
            // this.bindComponent.失败_看广告跳过实际点击.height += ControlNum
            //根据渠道不同展示广告
            //先留着
            if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.web) {
                let data = {
                    // cancelNode : null,
                    rootNode: this.node,
                    // oppoNativeADToClose :null,
                    ADTypeCode: Channel_oppoADType.K原生1280ID,
                    // heights : [null,900,950, 970, 1040]
                    p: new Vec2(-800, 0),
                    orientation: 1,
                    ylist: [200, 600],
                    name: ItemPreType.飞的原生广告或者激励视频广告
                }
                // ChannelManger.getInstance().getChannel().showNativeAd(data)
                ChannelManger.getInstance().getChannel().showNativeAdTestFly(data)

            }
            if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
                let data = {
                    // cancelNode : null,
                    rootNode: this.node,
                    // oppoNativeADToClose :null,
                    ADTypeCode: Channel_oppoADType.K原生1280ID,
                    // heights : [null,900,950, 970, 1040]
                    p: new Vec2(-800, 0),
                    orientation: 1,
                    ylist: [200, 600],
                    name: ItemPreType.飞的原生广告或者激励视频广告
                }
                // ChannelManger.getInstance().getChannel().showNativeAd(data)
                ChannelManger.getInstance().getChannel().showNativeAdFly(data)

            }
        }
    }


    小手指引导() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.小手指引导) == true) {
            UtilsNode.show(this.bindComponent.引导_小手指,true)
            UtilsAction.hand(this.bindComponent.引导_小手指)
        }

    }
    按钮缩放() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.按钮缩放) == true) {
            UtilsAction.btnAn(this.bindComponent.胜利_看广告领取样子)
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
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.激励广告点击区域开关控制) == true) {
            return true
        }
        return false
    }
    激励广告点击区域参数控制() {



        if (
            Utils.allTrueOrFalseByAllItem(true,[
                this.激励广告点击区域开关控制(),
                this.激励广告点击区域时间间隔控制(true),
                this.激励广告点击区域次数控制(true),
            ])
        ) {
            this.激励广告点击区域时间间隔控制(false)
            this.激励广告点击区域次数控制(false)

            let ControlNum =  ControlCommercial.getSceneData(
                ControlCommercialSceneId.盲盒,
                ControlCommercialItemName.激励广告点击区域参数控制)
            if (ControlNum == null) {
                ControlNum = 100
            }
            this.bindComponent.胜利_看广告领取实际点击.height += ControlNum
        }
    }
    激励广告点击区域时间间隔控制(is) {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.激励广告点击区域时间间隔控制,is) == true) {
            return true
        }
        return false
    }
    激励广告点击区域次数控制(is) {
        // ControlCommercial.getItemNameCount(sceneId,itemName)
        if (ControlCommercial.getItemNameCount(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.激励广告点击区域次数控制,is) == true) {
            return true
        }
        return false
    }
    激励视频图标展示() {

    }
    原生广告展示() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告展示) == true) {
            ccLog.log("判断是否出现广告","原生广告展示",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告展示",false)
        return false
    }
    原生广告展示次数(is) {
        if (ControlCommercial.getItemNameCount(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告展示次数,is) == true) {
            ccLog.log("判断是否出现广告","原生广告展示次数",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告展示次数",false)
        return false
    }
    原生广告点击区域开关控制() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告点击区域开关控制) == true) {
            ccLog.log("判断是否出现广告","原生广告点击区域开关控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告点击区域开关控制",false)
        return false
    }



    async 原生广告点击区域大小控制() {



        if (
            Utils.allTrueOrFalseByAllItem(true,[
                this.原生广告展示(),
                this.原生广告概率控制(),
                this.原生广告点击区域开关控制(),
                this.原生广告初始展示间隔控制(true),
                this.原生广告展示间隔控制(true),
                this.原生广告展示次数(true),
                this.原生广告点击区域时间间隔控制(true),
            ])
        ) {
            this.原生广告初始展示间隔控制(false)
            this.原生广告展示间隔控制(false)
            this.原生广告展示次数(false)
            this.原生广告点击区域时间间隔控制(false)
            let ControlNum =  ControlCommercial.getSceneData(
                ControlCommercialSceneId.盲盒,
                ControlCommercialItemName.原生广告点击区域大小控制)
            // if (ControlNum == null) {
            //     ControlNum = 100
            // }
            // this.bindComponent.失败_看广告跳过实际点击.height += ControlNum
            //根据渠道不同展示广告
            //先留着
            let time = this.原生广告延迟展示()
            await  Utils.setTimerOnce(this,time)
            if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.web) {
                let data = {
                    cancelNode : null,
                    parent : this.node,
                    oppoNativeADToClose :null,
                    ADTypeCode : Channel_oppoADType.K原生1280ID,
                    adCode : 1,
                    heights : [null,600+ControlNum]
                }
                // ChannelManger.getInstance().getChannel().showNativeAd(data)
                ChannelManger.getInstance().getChannel().showNativeAdTest(data)
            }
            if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
                let data = {
                    cancelNode : null,
                    parent : this.node,
                    oppoNativeADToClose :null,
                    ADTypeCode : Channel_oppoADType.K原生1280ID,
                    adCode : 1,
                    heights : [null,600+ControlNum]
                }
                // ChannelManger.getInstance().getChannel().showNativeAd(data)
                ChannelManger.getInstance().getChannel().showNativeAd(data)
            }
        }

    }
    原生广告点击区域时间间隔控制(is) {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告点击区域时间间隔控制,is) == true) {
            ccLog.log("判断是否出现广告","原生广告点击区域时间间隔控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告点击区域时间间隔控制",false)
        return false
    }

    原生广告点击区域次数控制(is) {
        if (ControlCommercial.getItemNameCount(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告点击区域次数控制,is) == true) {
            ccLog.log("判断是否出现广告","原生广告点击区域次数控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告点击区域次数控制",false)
        return false
    }
    原生广告关闭按钮点击区域() {
        let ControlNum =  ControlCommercial.getSceneData(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告关闭按钮点击区域)
        //    根据传值控制原生广告关闭按钮的点击区域，默认30x30，后台传值30，如后台传值20那么点击区域为20x20

    }
    原生广告延迟展示() {
        let ControlNum =  ControlCommercial.getSceneData(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告延迟展示)
        return ControlNum
    }
    原生广告概率控制() {
        if (ControlCommercial.getRandom(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告概率控制) == true) {
            ccLog.log("判断是否出现广告","原生广告概率控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告概率控制",false)
        return false

    }
    原生广告初始展示间隔控制(is) {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告初始展示间隔控制,is) == true) {
            ccLog.log("判断是否出现广告","原生广告初始展示间隔控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告初始展示间隔控制",false)
        return false
    }
    原生广告展示间隔控制(is) {


        // this.原生广告初始展示间隔控制()

        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.盲盒,
            ControlCommercialItemName.原生广告展示间隔控制,is) == true) {
            ccLog.log("判断是否出现广告","原生广告展示间隔控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告展示间隔控制",false)
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
            type: SuperGetDialog,
            displayName: "SuperGetDialog_放这里"
        }
    )    // call cc.Enum
    bindComponent : SuperGetDialog = null
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
           this.特殊按钮2点击区域大小()

       }


       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
           this.小手指引导()
           this.按钮缩放()
           this.激励广告点击区域参数控制()
           this.原生广告点击区域大小控制()
           this.特殊按钮2点击区域大小()
           // let data = {
           //     cancelNode : null,
           //     parent : this.node,
           //     oppoNativeADToClose :null,
           //     ADTypeCode : Channel_oppoADType.K原生三张ID,
           //     heights : [null,900,950, 970, 1040]
           // }
           // ChannelManger.getInstance().getChannel().showNativeAd(data)
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
