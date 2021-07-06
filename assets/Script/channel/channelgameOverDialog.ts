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

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChannelgameOverDialog extends ChannelBase {

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


    // _gameOverDialog : GameOverDialog
    sound : boolean = false
    music : boolean = false


    setLayout(idialogLayout :IDialogLayout){
        idialogLayout.setLayoutDefault()
    }
    // LIFE-CYCLE CALLBACKS:
   async init(gameOverDialog :GameOverDialog){
        this._gameOverDialog = gameOverDialog


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
       ccLog.log("进来什么",this._gameOverDialog.data)

       if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
           this._gameOverDialog.initViewChannelNode(this._gameOverDialog.贴底布局 )
           //全屏广告
           if (this._gameOverDialog.data.data.index > 2) {
               this.sound = UtilsDB.getSettingSound()
               this.music = UtilsDB.getSettingMusic()
               UtilsDB.setSettingSound(false)
               UtilsDB.setSettingMusic(false)
               Emitter.fire("onInitMusicSwitch")

               ChannelManger.getInstance().getChannel().showFullVideoAd(() => {
                   this.setSoundMusic()
                   this.myAD()
               }, () => {
                   this.setSoundMusic()
                   this.myAD()
               }, () => {
                   this.setSoundMusic()
                   this.myAD()
               })
               // qudaoCommon.showFullVideoAd(() => {
               //     this.setSoundMusic()
               //     this.myAD()
               // }, () => {
               //     this.setSoundMusic()
               //     this.myAD()
               // }, () => {
               //     this.setSoundMusic()
               //     this.myAD()
               // })
           } else {
               this.myAD()
           }
       }

       // this. 结算广告按钮实际点击
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
           this._gameOverDialog.initViewChannelNode(this._gameOverDialog.贴底布局 )
           // Api.adCode = 4
           //设置 激励视频按钮和取消的入侵程度
           let height =  Utils.getADBtnHeight(
               Api.getAdCode(),
               // 4,
               this._gameOverDialog.结算多倍按钮实际点击,
               this._gameOverDialog.结算继续按钮实际点击,
               this.oppoADToClose)

           this._gameOverDialog.结算多倍按钮实际点击.height = height

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose
           let data = {
               cancelNode : this._gameOverDialog.结算继续按钮实际点击,
               parent : this.node,
               oppoNativeADToClose : this.oppoNativeADToClose,
               ADTypeCode : Channel_oppoADType.K原生1280ID,
               heights : [null,900,950, 970, 1040]
           }
           ChannelManger.getInstance().getChannel().showNativeAd(data)
           // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.vivo) {
           this._gameOverDialog.initViewChannelNode(this._gameOverDialog.贴底布局 )
           // Api.adCode = 4
           //设置 激励视频按钮和取消的入侵程度
           let height =  Utils.getADBtnHeight(
               Api.getAdCode(),
               // 4,
               this._gameOverDialog.结算多倍按钮实际点击,
               this._gameOverDialog.结算继续按钮实际点击,
               this.vivoADToClose)

           this._gameOverDialog.结算多倍按钮实际点击.height = height


           // showInterstitialAd

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose

           let  r = Utils.random(0,100)
           if (r < 30 ) {
               ChannelManger.getInstance().getChannel().showInterstitialAd();
           }else{
               // data.parent
               // data.ADTypeCode
               //data.oppoNativeADToClose
               let data = {
                   cancelNode : this._gameOverDialog.结算继续按钮实际点击,
                   parent : this.node,
                   oppoNativeADToClose : this.oppoNativeADToClose,
                   ADTypeCode : Channel_vivoADCode.原生广告1posID,
                   heights : [null,900,950, 970, 1040]
               }
               ChannelManger.getInstance().getChannel().showNativeAd(data)
               // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
           }




           // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }
       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.tt) {
           this._gameOverDialog.initViewChannelNode(this._gameOverDialog.居中布局 )
           // Api.adCode = 4
           //设置 激励视频按钮和取消的入侵程度
           let height =  Utils.getADBtnHeight(
               Api.getAdCode(),
               // 4,
               this._gameOverDialog.结算多倍按钮实际点击,
               this._gameOverDialog.结算继续按钮实际点击,
               this.ttADToClose)

           this._gameOverDialog.结算多倍按钮实际点击.height = height


           // showInterstitialAd

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose

           let  r = Utils.random(0,100)
           if (r < JsonManager.passSettingjson.json.ttchapinggailv ) {
              await Utils.setTimerOnce(this,0.5)
               ChannelManger.getInstance().getChannel().showInterstitialAd();
           }else{
               // data.parent
               // data.ADTypeCode
               //data.oppoNativeADToClose
               // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
               ChannelManger.getInstance().getChannel().showBannerAd();
           }




           // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }

       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.meizu) {
           this._gameOverDialog.initViewChannelNode(this._gameOverDialog.贴底布局 )
           let height =  Utils.getADBtnHeight(
               Api.getAdCode(),
               // 4,
               this._gameOverDialog.结算多倍按钮实际点击,
               this._gameOverDialog.结算继续按钮实际点击,
               this.meizuADToClose)

           this._gameOverDialog.结算多倍按钮实际点击.height = height
           await  Utils.setTimerOnce(this,0.5)
           ChannelManger.getInstance().getChannel().showInterstitialAd()
       }




       if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.web) {
           this._gameOverDialog.initViewChannelNode(this._gameOverDialog.居中布局 )
           // Api.adCode = 4
           //设置 激励视频按钮和取消的入侵程度
           let height =  Utils.getADBtnHeight(
               Api.getAdCode(),
               // 4,
               this._gameOverDialog.结算多倍按钮实际点击,
               this._gameOverDialog.结算继续按钮实际点击,
               this.oppoADToClose)

           this._gameOverDialog.结算多倍按钮实际点击.height = height

           // data.parent
           // data.ADTypeCode
           //data.oppoNativeADToClose
           let data = {
               cancelNode : this._gameOverDialog.结算继续按钮实际点击,
               parent : this.node,
               oppoNativeADToClose : this.oppoNativeADToClose,
               ADTypeCode : Channel_oppoADType.K原生1280ID,
               heights : [null,900,950, 970, 1040]
           }
           // ChannelManger.getInstance().getChannel().showNativeAd(data)
           ChannelManger.getInstance().getChannel().showNativeAdTest(data)
       }




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
        ChannelManger.getInstance().getChannel().hideBannerAd()
        ChannelManger.getInstance().getChannel().closeFeedAd(0)
    }

    start () {

    }

    registerEmitter() {

    }

    removeEmitter() {

    }

    // update (dt) {}
}
