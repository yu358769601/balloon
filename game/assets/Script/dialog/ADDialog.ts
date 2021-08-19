// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsAction from "../System/Utils/UtilsAction";
import BaseDialog from "./BaseDialog";
import UtilsDB from "../System/Utils/UtilsDB";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import GameSetting, {passModeType} from "../System/mode/gameSetting";
import Umengstatistics from "../System/qudao/umengstatistics";
import ChannelManger, {ChannelMangerType} from "../System/qudao/channelManger";
import {ItemPreType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class  ADDialog extends BaseDialog {

    @property(cc.Button)
    successful: cc.Button = null;
    @property(cc.Button)
    failure: cc.Button = null;

    @property([cc.Node])
    nodes: cc.Node [] = [];



    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    ss : string = "ADDialog"
    sound : boolean = false
    music : boolean = false
    data : any = null


    isSuccess : boolean = false


    onDestroy() {
        GameSetting.setPassMode(passModeType.恢复)
    }

    onLoad () {
        GameSetting.setPassMode(passModeType.暂停)
        Umengstatistics.setEventForAndroidCountADByRecordPlayer()
        // 判断渠道让页面是否显示 true or false

        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.web) {
            this.setAllActive(true)
        }else {
            this.setAllActive(false)
        }

        this.sound = UtilsDB.getSettingSound()
        this.music = UtilsDB.getSettingMusic()

        UtilsDB.setSettingSound(false)
        UtilsDB.setSettingMusic(false)
        Emitter.fire("onInitMusicSwitch")



        // if (UtilsDB.getSettingSound()) {
        //     // this.soundSwitch = false
        //     // this.getComponentInChildren(cc.Sprite).spriteFrame = this.soundOff
        //     this.soundOn.active =  false
        //     this.soundOff.active = true
        //     this.sound = UtilsDB.getSettingSound()
        // }else{
        //     // this.soundSwitch = true
        //     // this.getComponentInChildren(cc.Sprite).spriteFrame = this.soundOn
        //     this.soundOn.active = true
        //     this.soundOff.active = false
        // }



    }
    async setData(data) {
        this.data = data



        // this.initView()
        //
        //
        //
        //
        // this.upDataLists()
        //
        //
        // this.setListData(0)
        // ccLog.log("商店被点击了",this.lists[0])

    }
    initCallback(callbacks){
        UtilsDB.isADDialogCD(()=>{
            // if (callbacks.lookDialogfailureCallback) {
            //     callbacks.lookDialogfailureCallback(this.data)
            // }
            // cc.game.resume()
            // Emitter.fire("onGamePauseOrResume",true)
            this.failure.node.off(cc.Node.EventType.TOUCH_END)
            this.node.destroy()
            // this.timeOutshangci = Utils.getTime()
            this.setSoundMusic();
            // Emitter.fire('onTipsShow',{txt: "取消广告,无法领取奖励"})
            let  data = {
                txt : "暂无广告，请稍后再试"
            }
            // let cllbacks = {
            //     successfulCallback: this.newSkinDialogsuccessfulCallback,
            //     failureCallback: this.newSkinDialogfailureCallback
            // }
            Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        },()=>{
            // if (callbacks.lookDialogfailureCallback) {
            //     callbacks.lookDialogfailureCallback(this.data)
            // }
            // cc.game.resume()
            Emitter.fire("onGamePauseOrResume",true)
            this.failure.node.off(cc.Node.EventType.TOUCH_END)
            this.node.destroy()
            // this.timeOutshangci = Utils.getTime()
            this.setSoundMusic();
            // Emitter.fire('onTipsShow',{txt: "取消广告,无法领取奖励"})
            // let  data = {
            //     txt : "暂无广告，请稍后再试"
            // }
            // // let cllbacks = {
            // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
            // //     failureCallback: this.newSkinDialogfailureCallback
            // // }
            // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        },()=>{


            if (callbacks) {
                // this.successfulCallback = callbacks.successfulCallback
                // this.failureCallback = callbacks.failureCallback
                if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.web){
                    this.successful.node.on(cc.Node.EventType.TOUCH_END,(t)=>{
                        // ccLog.log("看广告成功之后",this.data,"都有什么呢",callbacks)
                        if (callbacks.lookDialogsuccessfulCallback) {

                            callbacks.lookDialogsuccessfulCallback(this.data)
                        }
                        this.successful.node.off(cc.Node.EventType.TOUCH_END)
                        this.node.destroy()
                        this.setSoundMusic()
                    },this)

                    this.failure.node.on(cc.Node.EventType.TOUCH_END,(t)=>{
                        if (callbacks.lookDialogfailureCallback) {
                            callbacks.lookDialogfailureCallback(this.data)
                        }
                        this.failure.node.off(cc.Node.EventType.TOUCH_END)
                        this.node.destroy()
                        this.setSoundMusic();
                        // Emitter.fire('onTipsShow',{txt: "取消广告,无法领取奖励"})
                        let  data = {
                            txt : "取消广告,无法领取奖励"
                        }
                        // let cllbacks = {
                        //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                        //     failureCallback: this.newSkinDialogfailureCallback
                        // }
                        Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
                    },this)
                }

                ChannelManger.getInstance().getChannel().showVideoAd(() => {
                    if (callbacks.lookDialogsuccessfulCallback) {

                        callbacks.lookDialogsuccessfulCallback(this.data)
                    }
                    ccLog.log("rewardVideo 成功发放奖励 2")
                    this.isSuccess = true

                    //如果是这些渠道回来就直接关闭
                    switch (ChannelManger.getInstance().getChannelType()){
                        case ChannelMangerType.oppo:
                        case ChannelMangerType.vivo:
                        case ChannelMangerType.meizu:
                        case ChannelMangerType.tt:
                        case ChannelMangerType.qq:
                            this.node.destroy()
                        break;
                    }
                    this.setSoundMusic();
                    //
                    //
                    // // Emitter.fire("onGamePauseOrResume",true)
                    // this.successful.node.off(cc.Node.EventType.TOUCH_END)
                    // // this.node.destroy()
                    // // this.timeOutshangci = Utils.getTime()
                    // this.setSoundMusic()
                    // cc.game.resume()
                }, () => {
                    if (callbacks.lookDialogfailureCallback) {
                        callbacks.lookDialogfailureCallback(this.data)
                    }
                    ccLog.log("rewardVideo 取消2")
                    // this.failure.node.off(cc.Node.EventType.TOUCH_END)

                    // this.isSuccess = true
                    this.scheduleOnce(()=>{
                        ccLog.log("rewardVideo 关闭1")
                        ccLog.log("rewardVideo 我是谁",this.ss)
                        if (this.isValid ) {
                            ccLog.log("rewardVideo 关闭2",this.isValid )
                            if (this.node.isValid) {
                                ccLog.log("rewardVideo 关闭3",this.node.isValid )
                                ccLog.log("rewardVideo 关闭4","是否有奖励",this.isSuccess )
                                if (this.isSuccess) {

                                }else{
                                    let  data = {
                                        txt : "取消无法获得奖励"
                                    }
                                    // let cllbacks = {
                                    //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                                    //     failureCallback: this.newSkinDialogfailureCallback
                                    // }
                                    Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
                                }

                                this.node.destroy()
                                Emitter.fire("onGamePauseOrResume",true)
                                // cc.game.resume()
                                // this.timeOutshangci = Utils.getTime()
                                this.setSoundMusic();
                                ccLog.log("rewardVideo 关闭5","关闭完成" )
                            }
                        }

                    },1)
                    //暂时注释
                    // this.node.destroy()
                    // Emitter.fire("onGamePauseOrResume",true)
                    // // cc.game.resume()
                    // // this.timeOutshangci = Utils.getTime()
                    // this.setSoundMusic();

                    // let  data = {
                    //     txt : "关闭广告"
                    // }
                    // // let cllbacks = {
                    // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                    // //     failureCallback: this.newSkinDialogfailureCallback
                    // // }
                    // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)


                    // Emitter.fire('onTipsShow',{txt: "取消广告,无法领取奖励"})
                    // let  data = {
                    //     txt : "取消广告,无法领取奖励"
                    // }
                    // // let cllbacks = {
                    // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                    // //     failureCallback: this.newSkinDialogfailureCallback
                    // // }
                    // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
                }, () => {
                    if (callbacks.lookDialogfailureCallback) {
                        callbacks.lookDialogfailureCallback(this.data)
                    }
                    ccLog.log("rewardVideo 失败2")
                    // cc.game.resume()
                    Emitter.fire("onGamePauseOrResume",true)
                    this.failure.node.off(cc.Node.EventType.TOUCH_END)
                    this.node.destroy()
                    // this.timeOutshangci = Utils.getTime()
                    this.setSoundMusic();
                    // Emitter.fire('onTipsShow',{txt: "取消广告,无法领取奖励"})
                    let  data = {
                        txt : "暂无广告，请稍后再试"
                    }
                    // let cllbacks = {
                    //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                    //     failureCallback: this.newSkinDialogfailureCallback
                    // }
                    Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
                })

            }

        })



        // qudaoCommon.openVideoAd(() => {
        //     if (callbacks.lookDialogsuccessfulCallback) {
        //
        //         callbacks.lookDialogsuccessfulCallback(this.data)
        //     }
        //     // Emitter.fire("onGamePauseOrResume",true)
        //     this.successful.node.off(cc.Node.EventType.TOUCH_END)
        //     this.node.destroy()
        //     // this.timeOutshangci = Utils.getTime()
        //     this.setSoundMusic()
        //     // cc.game.resume()
        // }, () => {
        //     if (callbacks.lookDialogfailureCallback) {
        //         callbacks.lookDialogfailureCallback(this.data)
        //     }
        //     this.failure.node.off(cc.Node.EventType.TOUCH_END)
        //     this.node.destroy()
        //     Emitter.fire("onGamePauseOrResume",true)
        //     // cc.game.resume()
        //     // this.timeOutshangci = Utils.getTime()
        //     this.setSoundMusic();
        //     // Emitter.fire('onTipsShow',{txt: "取消广告,无法领取奖励"})
        //     let  data = {
        //         txt : "取消广告,无法领取奖励"
        //     }
        //     // let cllbacks = {
        //     //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        //     //     failureCallback: this.newSkinDialogfailureCallback
        //     // }
        //     Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        // }, () => {
        //     if (callbacks.lookDialogfailureCallback) {
        //         callbacks.lookDialogfailureCallback(this.data)
        //     }
        //     // cc.game.resume()
        //     Emitter.fire("onGamePauseOrResume",true)
        //     this.failure.node.off(cc.Node.EventType.TOUCH_END)
        //     this.node.destroy()
        //     // this.timeOutshangci = Utils.getTime()
        //     this.setSoundMusic();
        //     // Emitter.fire('onTipsShow',{txt: "取消广告,无法领取奖励"})
        //     let  data = {
        //         txt : "暂无广告，请稍后再试"
        //     }
        //     // let cllbacks = {
        //     //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        //     //     failureCallback: this.newSkinDialogfailureCallback
        //     // }
        //     Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        // });




    }
    setSoundMusic(){
        UtilsDB.setSettingSound(this.sound)
        UtilsDB.setSettingMusic(this.music)
        Emitter.fire("onInitMusicSwitch")
    }
    setAllActive(b){
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].active = b
        }
    }

    registerEmitter() {
    }

    removeEmitter() {
    }

    subclassCall(): any {
    }

    initView() {
    }
    // clickTimeMin : number = 0
    // clickTimeMax : number = 2
    // clickTime : boolean = false
    //  update (dt) {
    //      // clickTimeMin : number = 0
    //      // clickTimeMax : number = 2
    //      // clickTime : boolean = false
    //      if (this.clickTime == true) {
    //         this.clickTimeMin+=dt
    //          if (this.clickTimeMin >= this.clickTimeMax ) {
    //              this.clickTime = false
    //          }
    //      }
    //  }
}
