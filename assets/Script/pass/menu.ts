// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import JsonManager from "../System/manage/JsonManager";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsAction from "../System/Utils/UtilsAction";
import Utils from "../System/Utils/Utils";
import {balloonName, DialogType, ItemPreType} from "../System/Type/enums";
import {SoundType} from "../System/sound/sound";
import {ItemSuperItemType} from "../item/itemSuperItem";
import {GetLuckDialogType} from "../dialog/getLuckDialog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    data: any





    onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onInitPass', this.onInitPass, this)
        Emitter.remove('onNextPass', this.onNextPass, this)
        Emitter.remove('onShowAll', this.onShowAll, this)
        Emitter.remove('onCheckGo', this.onCheckGo, this)
        Emitter.remove('onShowAllByGetLuck', this.onShowAllByGetLuck, this)
    }

    registerEmitter() {
        Emitter.register('onInitPass', this.onInitPass, this)
        Emitter.register('onNextPass', this.onNextPass, this)
        Emitter.register('onShowAll', this.onShowAll, this)
        Emitter.register('onCheckGo', this.onCheckGo, this)
        Emitter.register('onShowAllByGetLuck', this.onShowAllByGetLuck, this)
    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()

        // this.随机橡皮_图片
        Emitter.fire("onAssetsShowHide",true)
        Emitter.fire("onAssetsLifeShowHide",true)
        this.initView()
        this.initClick()
    }

    onInitPass(selfName, data) {
        this.data = data
        ccLog.log("游戏关卡开始", data)


        // ccLog.log("shopPass",this.shopPass)
        // this.shopPass.setData(data.pass,this.passItemPs)


        // pass:
        //     gameData: {title: "寻找公主"}
        //     index: 0
        //     itemName: "pass_104"
        //     passName: "pass_104"
        //     tip: "pass_104_tip"
        // this.关卡标题.string = "任务"+ (data.pass.index)
        // this.关卡副标题.string = data.pass.gameData.title


    }

   async onShowAllByGetLuck(selfName,b){
       await this.onShowAll(selfName,b)

       let list : [] =[]
       for (let itemPreType in GetLuckDialogType) {
           if (typeof GetLuckDialogType[itemPreType]  ===  "number") {
               list.push(GetLuckDialogType[itemPreType])
               ccLog.log("返回按钮点击之后的显示限时领取 0  ",GetLuckDialogType[itemPreType] )
           }

       }
       let random = Utils.random(0,list.length)
        ccLog.log("返回按钮点击之后的显示限时领取 1  ",list[random] )
       ccLog.log("返回按钮点击之后的显示限时领取 2  ",list )
       let  data = {
           self : this,
           type : list[random]  ,

       }
       let cllbacks = {
           // lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
           // lookDialogfailureCallback: this.lookDialogfailureCallback
       }
       Emitter.fire("onOpenDialog",{name : DialogType.限时礼包,zIndex : 100,data:data},null)

    }




    async onNextPass(selfName, data) {
        ccLog.log("要给过去的数据是 1 ", data)

        // index: 1
        // isPlay: true
        // itemName: "pass_1"


        let addGemData = {
            type: AssetsType.体力,
            count: JsonManager.passSettingjson.passAddLife,
            show : true,
            callback_donthave : async ()=>{
                let index = data.index
                // UtilsDB.addCheckpointRecords(returnData.data.itemName)
                index++
                ccLog.log("下一关数据 index", index)

                let pass = await JsonManager.getPassByIndex(index)
                ccLog.log("下一关数据", pass)
                let passData = await JsonManager.getPassDataByName(pass.passName, false)
                let myPassSave = UtilsDB.getMyPassSave()
                // myPassSave.index =data.pass.index
                // let passName = data.pass.passName
                myPassSave.index =index
                myPassSave.passName =data.itemName
                UtilsDB.setMyPassSave(myPassSave)

                Emitter.fire("onRemovePass")

                await this.onShowAll("",true)

                // let  datatt = {
                //     txt : "没有体力了小老弟"
                // }
                // // let cllbacks = {
                // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                // //     failureCallback: this.newSkinDialogfailureCallback
                // // }
                // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:datatt},null)

                let  data = {
                    self : this,
                    type : GetLuckDialogType.体力,

                }
                let cllbacks = {
                    // lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
                    // lookDialogfailureCallback: this.lookDialogfailureCallback
                }
                Emitter.fire("onOpenDialog",{name : DialogType.限时礼包,zIndex : 100,data:data},null)

            },
            // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
            callback_subsucceed : async()=>{
                let index = data.index


                // UtilsDB.addCheckpointRecords(returnData.data.itemName)
                index++
                ccLog.log("下一关数据 index", index)

                let pass = await JsonManager.getPassByIndex(index)
                ccLog.log("下一关数据", pass)
                let passData = await JsonManager.getPassDataByName(pass.passName, false)

                // UtilsDB.addCheckpointRecords(pass.itemName,SelectCheckPointType.已解锁未通关)

                if (pass == null) {
                    index = 0
                    pass = JsonManager.getPassByIndex(index)

                    ccLog.log("下一关数据吗", pass)
                    Emitter.fire("onSetPassByName", passData)
                } else {
                    Emitter.fire("onSetPassByName", passData)
                }
            }
        }
        // Emitter.fire("onEduShowIndex",2)
        UtilsDB.addLifeAssets(addGemData)




    }

    passCount : number = 0

    onCheckGo(selfName,data){
        this.passCount++
        if (this.passCount>=JsonManager.passSettingjson.superGetCountPlayMax) {
            this.passCount = 0
            Emitter.fire("onOpenDialog", {name: DialogType.超级奖励, zIndex: 100,data : data}, null)
        }else{
            Emitter.fire("onOpenDialog", {name: DialogType.结算界面, zIndex: 100,data : data}, null)
        }

    }



    菜单_吞噬: cc.Node
    菜单_UI组: cc.Node

    菜单_开始按钮: cc.Node
    菜单_设置按钮: cc.Node
    菜单_商城按钮: cc.Node
    菜单_消失动画吞噬: cc.Node
    菜单_熊熊: cc.Node
    菜单_背景: cc.Node

    菜单_更多精彩: cc.Node
    菜单_添加桌面: cc.Node
    菜单_无敌风火轮: cc.Node

    菜单_测试按钮: cc.Node
    initView() {
        let data

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_吞噬",
            parentNode: this.node
        }
        this.菜单_吞噬 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_UI组",
            parentNode: this.node
        }
        this.菜单_UI组 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_开始按钮",
            parentNode: this.node
        }
        this.菜单_开始按钮 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_设置按钮",
            parentNode: this.node
        }
        this.菜单_设置按钮 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_商城按钮",
            parentNode: this.node
        }
        this.菜单_商城按钮 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "菜单_消失动画吞噬",
            parentNode: this.node
        }
        this.菜单_消失动画吞噬 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_熊熊",
            parentNode: this.node
        }
        this.菜单_熊熊 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_背景",
            parentNode: this.node
        }
        this.菜单_背景 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "菜单_更多精彩",
            parentNode: this.node
        }
        this.菜单_更多精彩 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_测试按钮",
            parentNode: this.node
        }
        this.菜单_测试按钮 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "菜单_添加桌面",
            parentNode: this.node
        }
        this.菜单_添加桌面 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_无敌风火轮",
            parentNode: this.node
        }
        this.菜单_无敌风火轮 = GetNode.getNode(data)
    }

    initClick() {
        this.菜单_开始按钮.on(cc.Node.EventType.TOUCH_END, async () => {
            ccLog.log("准备去开始去了")
            Emitter.fire("onPlaySound",SoundType.按钮,1)

            let addGemData = {
                type: AssetsType.体力,
                count: JsonManager.passSettingjson.passAddLife,
                show : true,
                callback_donthave : ()=>{
                    // let  data = {
                    //     txt : "没有体力了小老弟"
                    // }
                    // // let cllbacks = {
                    // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                    // //     failureCallback: this.newSkinDialogfailureCallback
                    // // }
                    // Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)

                    let  data = {
                        self : this,
                        type : GetLuckDialogType.体力,
                    }
                    let cllbacks = {
                        // lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
                        // lookDialogfailureCallback: this.lookDialogfailureCallback
                    }
                    Emitter.fire("onOpenDialog",{name : DialogType.限时礼包,zIndex : 100,data:data},null)

                },
                // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
                callback_subsucceed : async()=>{
                    await this.onShowAll("",false)
                    let pass = await JsonManager.getPassByIndex(UtilsDB.getMyPassSave().index)
                    ccLog.log("关卡信息",pass)
                    Emitter.fire("onSetPassByName", pass)
                }
            }
            // Emitter.fire("onEduShowIndex",2)
            UtilsDB.addLifeAssets(addGemData)




        }, this)
        this.菜单_设置按钮.on(cc.Node.EventType.TOUCH_END, async () => {
            Emitter.fire("onPlaySound",SoundType.按钮,1)
            Emitter.fire("onOpenDialog", {name: DialogType.设置, zIndex: 100,data : this.data}, null)
        }, this)

        this.菜单_商城按钮.on(cc.Node.EventType.TOUCH_END, async () => {
            Emitter.fire("onPlaySound",SoundType.按钮,1)
            Emitter.fire("onOpenDialog", {name: DialogType.商店, zIndex: 100,data : null}, null)

        }, this)
        this.菜单_测试按钮.on(cc.Node.EventType.TOUCH_END, async () => {

            // Emitter.fire("onOpenDialog", {name: DialogType.超级奖励, zIndex: 100,data : {}}, null)
            //测试按钮
            // let  data = {
            //     self : this,
            //     type : GetLuckDialogType.金币_体力
            // }
            // let cllbacks = {
            //     // lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
            //     // lookDialogfailureCallback: this.lookDialogfailureCallback
            // }
            // Emitter.fire("onOpenDialog",{name : DialogType.限时礼包,zIndex : 100,data:data},null)


        }, this)
        this.菜单_无敌风火轮.on(cc.Node.EventType.TOUCH_END, async () => {

            let data = {
                self : this,
                // otherData : otherData
            }
            // let cllbacks = {
            //     // successfulCallback : this.successfulCallbackLuck,
            //     // failureCallback : this.failureCallbackLuck
            // }
            Emitter.fire("onOpenDialog",{name : DialogType.转盘,zIndex : 100,data:data},null)

        }, this)




    }

   async onShowAll(selfName,b) {
        let time = 1
        //显示
       if (this.菜单_开始按钮.active == false && b == true) {
           this.菜单_消失动画吞噬.active = true
           this.菜单_开始按钮.active = true
           UtilsAction.fadeIn(this.菜单_开始按钮,time,null)
           UtilsAction.moveBy(this.菜单_设置按钮,time,+300,0,null)
           UtilsAction.moveBy(this.菜单_商城按钮,time,-300,0,null)

           UtilsAction.moveBy(this.菜单_添加桌面,time,-300,0,null)
           UtilsAction.moveBy(this.菜单_更多精彩,time,+300,0,null)
           this.菜单_熊熊.active = true
           await Utils.setTimerOnce(this,time)
           this.菜单_消失动画吞噬.active = false
           this.菜单_吞噬.active = true
           this.菜单_背景.active = true


           ccLog.log("此处应该删除关卡")
       } else if (this.菜单_开始按钮.active == true && b == false) {
           //消失
           this.菜单_消失动画吞噬.active = true
           UtilsAction.fadeOut(this.菜单_开始按钮,time,null)
           UtilsAction.moveBy(this.菜单_设置按钮,time,-300,0,null)
           UtilsAction.moveBy(this.菜单_商城按钮,time,+300,0,null)

           UtilsAction.moveBy(this.菜单_添加桌面,time,+300,0,null)
           UtilsAction.moveBy(this.菜单_更多精彩,time,-300,0,null)

           this.菜单_熊熊.active = false
           await Utils.setTimerOnce(this,time)
           this.菜单_开始按钮.active = false
           this.菜单_消失动画吞噬.active = false
           this.菜单_吞噬.active = false
           this.菜单_背景.active = false
           ccLog.log("此处应该开始关卡")

       }

    }


    start() {

    }

    // update (dt) {}
}
