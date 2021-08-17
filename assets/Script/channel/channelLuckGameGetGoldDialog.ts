// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChannelBase from "./channelBase";
import ccLog from "../System/Log/ccLog";
import Utils from "../System/Utils/Utils";
import Emitter from "../System/Msg/Emitter";
import UtilsDB from "../System/Utils/UtilsDB";
import Api from "../System/api/api";
import JsonManager from "../System/manage/JsonManager";
import ChannelManger, {ChannelMangerType} from "../System/qudao/channelManger";
import SkinTrialDialog from "../dialog/skinTrialDialog";
import GameOverDialog from "../dialog/gameOverDialog";
import {Channel_oppoADType} from "../System/qudao/channel_oppo";
import ControlCommercial, {
    ControlCommercialItemName,
    ControlCommercialSceneId
} from "../control/controlCommercial";
import UtilsNode from "../System/Utils/UtilsNode";
import UtilsAction from "../System/Utils/UtilsAction";
import LuckGameGetGoldDialog from "../dialog/luckGameGetGoldDialog";

const {ccclass, property} = cc._decorator;




export interface IChannelLuckGameGetGoldDialog {
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
    开屏广告是否展示()
    开屏广告展示关卡间隔控制()
    开屏广告展示时间间隔控制()
    全屏视频广告时间间隔()
    全屏视频广告延迟展示()
    积木广告展示()
    积木广告延迟展示()
    积木广告位置变更()
    积木广告位置变更概率控制()
    测试开关()
}
@ccclass
export default class ChannelLuckGameGetGoldDialog extends ChannelBase implements IChannelLuckGameGetGoldDialog{
    测试开关(){
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.测试开关) == true) {
            this.bindComponent.气球获得_看广告领取实际点击.getComponent(cc.Sprite).enabled = true
            this.bindComponent.气球获得_普通领取实际点击.getComponent(cc.Sprite).enabled = true
        }
    }

    开屏广告是否展示() {
    }
    开屏广告展示关卡间隔控制() {
    }
    开屏广告展示时间间隔控制() {
    }
    全屏视频广告时间间隔() {
    }
    全屏视频广告延迟展示() {
    }
    小手指引导() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.小手指引导) == true) {
            UtilsNode.show(this.bindComponent.引导_小手指,true)
            UtilsAction.hand(this.bindComponent.引导_小手指)
        }

    }
    按钮缩放() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.结算,
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
            ControlCommercialSceneId.结算,
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
                ControlCommercialSceneId.结算,
                ControlCommercialItemName.激励广告点击区域参数控制)
            if (ControlNum == null) {
                ControlNum = 100
            }
            // this.bindComponent.气球获得_看广告领取实际点击.height += ControlNum
        }
    }
    激励广告点击区域时间间隔控制(is) {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.激励广告点击区域时间间隔控制,is) == true) {
            return true
        }
        return false
    }
    激励广告点击区域次数控制(is) {
        // ControlCommercial.getItemNameCount(sceneId,itemName)
        if (ControlCommercial.getItemNameCount(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.激励广告点击区域次数控制,is) == true) {
            return true
        }
        return false
    }
    激励视频图标展示() {

    }
    原生广告展示() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.原生广告展示) == true) {
            ccLog.log("判断是否出现广告","原生广告展示",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告展示",false)
        return false
    }
    原生广告展示次数(is) {
        if (ControlCommercial.getItemNameCount(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.原生广告展示次数,is) == true) {
            ccLog.log("判断是否出现广告","原生广告展示次数",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告展示次数",false)
        return false
    }
    原生广告点击区域开关控制() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.结算,
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
                ControlCommercialSceneId.结算,
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
                    parent : this.bindComponent.气球获得_广告节点,
                    oppoNativeADToClose :null,
                    ADTypeCode : Channel_oppoADType.K原生1280ID,
                    adCode : 1,
                    heights : [null,540],
                    debug  : ControlCommercial.getSceneData(
                    ControlCommercialSceneId.结算,
                    ControlCommercialItemName.测试开关),
                    closedSize : this.原生广告关闭按钮点击区域()
                }
                // ChannelManger.getInstance().getChannel().showNativeAd(data)
                ChannelManger.getInstance().getChannel().showNativeAdTest(data)
            }
            if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
                let data = {
                    cancelNode : null,
                    parent : this.bindComponent.气球获得_广告节点,
                    oppoNativeADToClose :null,
                    ADTypeCode : Channel_oppoADType.K原生1280ID,
                    adCode : 1,
                    heights : [null,540],
                    debug  : ControlCommercial.getSceneData(
                        ControlCommercialSceneId.结算,
                        ControlCommercialItemName.测试开关),
                    closedSize : this.原生广告关闭按钮点击区域()
                }
                // ChannelManger.getInstance().getChannel().showNativeAd(data)
                ChannelManger.getInstance().getChannel().showNativeAd(data)
            }
        }

    }
    原生广告点击区域时间间隔控制(is) {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.原生广告点击区域时间间隔控制,is) == true) {
            ccLog.log("判断是否出现广告","原生广告点击区域时间间隔控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告点击区域时间间隔控制",false)
        return false
    }

    原生广告点击区域次数控制(is) {
        if (ControlCommercial.getItemNameCount(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.原生广告点击区域次数控制,is) == true) {
            ccLog.log("判断是否出现广告","原生广告点击区域次数控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告点击区域次数控制",false)
        return false
    }
    原生广告关闭按钮点击区域() {
        let ControlNum =  ControlCommercial.getSceneData(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.原生广告关闭按钮点击区域)
        //    根据传值控制原生广告关闭按钮的点击区域，默认30x30，后台传值30，如后台传值20那么点击区域为20x20
        return ControlNum
    }
    原生广告延迟展示() {
        let ControlNum =  ControlCommercial.getSceneData(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.原生广告延迟展示)
        return ControlNum
    }
    原生广告概率控制() {
        if (ControlCommercial.getRandom(
            ControlCommercialSceneId.结算,
            ControlCommercialItemName.原生广告概率控制) == true) {
            ccLog.log("判断是否出现广告","原生广告概率控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","原生广告概率控制",false)
        return false

    }
    原生广告初始展示间隔控制(is) {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.结算,
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
            ControlCommercialSceneId.结算,
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

    // _gameOverDialog : GameOverDialog
    sound : boolean = false
    music : boolean = false
    @property(
        {
            type: LuckGameGetGoldDialog,
            displayName: "LuckGameGetGoldDialog_放这里"
        }
    )    // call cc.Enum
    bindComponent : LuckGameGetGoldDialog = null

    // setLayout(idialogLayout :IDialogLayout){
    //     idialogLayout.setLayoutDefault()
    // }
    // LIFE-CYCLE CALLBACKS:
   async init(){
       this.bindComponent.init(this)
       // IDialogLayout

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

       // if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
       //     this._gameOverDialog.initViewChannelNode(this._gameOverDialog.贴底布局 )
       //     //全屏广告
       //     if (this._gameOverDialog.data.data.index > 2) {
       //         this.sound = UtilsDB.getSettingSound()
       //         this.music = UtilsDB.getSettingMusic()
       //         UtilsDB.setSettingSound(false)
       //         UtilsDB.setSettingMusic(false)
       //         Emitter.fire("onInitMusicSwitch")
       //
       //         ChannelManger.getInstance().getChannel().showFullVideoAd(() => {
       //             this.setSoundMusic()
       //             this.myAD()
       //         }, () => {
       //             this.setSoundMusic()
       //             this.myAD()
       //         }, () => {
       //             this.setSoundMusic()
       //             this.myAD()
       //         })
       //         // qudaoCommon.showFullVideoAd(() => {
       //         //     this.setSoundMusic()
       //         //     this.myAD()
       //         // }, () => {
       //         //     this.setSoundMusic()
       //         //     this.myAD()
       //         // }, () => {
       //         //     this.setSoundMusic()
       //         //     this.myAD()
       //         // })
       //     } else {
       //         this.myAD()
       //     }
       // }
       this.测试开关()
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.web) {
           this.小手指引导()
           this.按钮缩放()
           this.激励广告点击区域参数控制()
           this.原生广告点击区域大小控制()

       }
       // this. 结算广告按钮实际点击
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
           this.小手指引导()
           this.按钮缩放()
           this.激励广告点击区域参数控制()
           this.原生广告点击区域大小控制()
       }
       // if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.vivo) {
       //     this._gameOverDialog.initViewChannelNode(this._gameOverDialog.贴底布局 )
       //     // Api.adCode = 4
       //     //设置 激励视频按钮和取消的入侵程度
       //     let height =  Utils.getADBtnHeight(
       //         Api.getAdCode(),
       //         // 4,
       //         this._gameOverDialog.结算多倍按钮实际点击,
       //         this._gameOverDialog.结算继续按钮实际点击,
       //         this.vivoADToClose)
       //
       //     this._gameOverDialog.结算多倍按钮实际点击.height = height
       //
       //
       //     // showInterstitialAd
       //
       //     // data.parent
       //     // data.ADTypeCode
       //     //data.oppoNativeADToClose
       //
       //     let  r = Utils.random(0,100)
       //     if (r < 30 ) {
       //         ChannelManger.getInstance().getChannel().showInterstitialAd();
       //     }else{
       //         // data.parent
       //         // data.ADTypeCode
       //         //data.oppoNativeADToClose
       //         let data = {
       //             cancelNode : this._gameOverDialog.结算继续按钮实际点击,
       //             parent : this.node,
       //             oppoNativeADToClose : this.oppoNativeADToClose,
       //             ADTypeCode : Channel_vivoADCode.原生广告1posID,
       //             heights : [null,900,950, 970, 1040]
       //         }
       //         ChannelManger.getInstance().getChannel().showNativeAd(data)
       //         // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       //     }
       //
       //
       //
       //
       //     // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       // }
       // if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.tt) {
       //     this._gameOverDialog.initViewChannelNode(this._gameOverDialog.居中布局 )
       //     // Api.adCode = 4
       //     //设置 激励视频按钮和取消的入侵程度
       //     let height =  Utils.getADBtnHeight(
       //         Api.getAdCode(),
       //         // 4,
       //         this._gameOverDialog.结算多倍按钮实际点击,
       //         this._gameOverDialog.结算继续按钮实际点击,
       //         this.ttADToClose)
       //
       //     this._gameOverDialog.结算多倍按钮实际点击.height = height
       //
       //
       //     // showInterstitialAd
       //
       //     // data.parent
       //     // data.ADTypeCode
       //     //data.oppoNativeADToClose
       //
       //     let  r = Utils.random(0,100)
       //     if (r < JsonManager.passSettingjson.ttchapinggailv ) {
       //        await Utils.setTimerOnce(this,0.5)
       //         ChannelManger.getInstance().getChannel().showInterstitialAd();
       //     }else{
       //         // data.parent
       //         // data.ADTypeCode
       //         //data.oppoNativeADToClose
       //         // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       //         ChannelManger.getInstance().getChannel().showBannerAd();
       //     }
       //
       //
       //
       //
       //     // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       // }
       //
       // if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.meizu) {
       //     this._gameOverDialog.initViewChannelNode(this._gameOverDialog.贴底布局 )
       //     let height =  Utils.getADBtnHeight(
       //         Api.getAdCode(),
       //         // 4,
       //         this._gameOverDialog.结算多倍按钮实际点击,
       //         this._gameOverDialog.结算继续按钮实际点击,
       //         this.meizuADToClose)
       //
       //     this._gameOverDialog.结算多倍按钮实际点击.height = height
       //     await  Utils.setTimerOnce(this,0.5)
       //     ChannelManger.getInstance().getChannel().showInterstitialAd()
       // }









       // switch (qudaoCommon.qudao) {
       //     case platform_Android:
       //     case platform_Android_mi:
       //     case platform_Android_oppo:
       //         // Emitter.fire("closeBannerByMenu")
       //
       //
       //          //全屏广告
       //         if (this._gameOverDialog.data.data.index > 2) {
       //             this.sound = UtilsDB.getSettingSound()
       //             this.music = UtilsDB.getSettingMusic()
       //             UtilsDB.setSettingSound(false)
       //             UtilsDB.setSettingMusic(false)
       //             Emitter.fire("onInitMusicSwitch")
       //             qudaoCommon.showFullVideoAd(()=>{
       //                 this.setSoundMusic()
       //                 this.myAD()
       //             },()=>{
       //                 this.setSoundMusic()
       //                 this.myAD()
       //             },()=>{
       //                 this.setSoundMusic()
       //                 this.myAD()
       //             })
       //         }else{
       //             this.myAD()
       //         }
       //
       //         break;
       //
       // }
       // this._gameOverDialog.setLayoutDefault()



    }

    async myAD(){

        //打开原生广告

        let newNum = Utils.random(0,100)
        if (newNum < 50) {
            // qudaoCommon.openDialogAd();
            ChannelManger.getInstance().getChannel().showFeedAd(0)
            // await Utils.setTimerOnce(this, 0.5)
            // let  data = {
            //     txt : "真真的播放了信息流"+" 随机数 "+newNum
            // }
            // // let cllbacks = {
            // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
            // //     failureCallback: this.newSkinDialogfailureCallback
            // // }
            // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        }else{
            //插屏广告
            // newNum = Utils.random(0,100)
            // if (newNum < 50) {
            //     await Utils.setTimerOnce(this, 0.5)
            //     qudaoCommon.openInAd()
            // }
            await Utils.setTimerOnce(this, 0.5)
            // qudaoCommon.openInAd()
            ChannelManger.getInstance().getChannel().showInterstitialAd()
            // let  data = {
            //     txt : "真真的播放了插屏"+" 随机数 "+newNum
            // }
            // // let cllbacks = {
            // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
            // //     failureCallback: this.newSkinDialogfailureCallback
            // // }
            // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        }
    }

    setSoundMusic(){
        UtilsDB.setSettingSound(this.sound)
        UtilsDB.setSettingMusic(this.music)
        Emitter.fire("onInitMusicSwitch")
    }

    //结算关闭时
    dialogfinsh(data){
        ccLog.log("结算渠道管理关闭数据是",data)

        // //安卓显示 全屏广告
        // switch (qudaoCommon.qudao) {
        //     case platform_Android:
        //     case platform_Android_mi:
        //     case platform_Android_oppo:
        //         // Emitter.fire("openBannerByMenu")
        //         qudaoCommon.closeDialogAd()
        //
        //
        //         break;
        //
        // }
        if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
            ChannelManger.getInstance().getChannel().closeFeedAd(0)
        }



    }

    onLoad () {
        super.onLoad()
        ccLog.log("检测先后顺序 ChannelgameOverDialog onLoad")
    }
    onDestroy() {
        super.onDestroy();
        // ChannelManger.getInstance().getChannel().hideBannerAd()
        // ChannelManger.getInstance().getChannel().closeFeedAd(0)
    }

    start () {
        this.init()
    }

    registerEmitter() {

    }

    removeEmitter() {

    }

    // update (dt) {}
}
