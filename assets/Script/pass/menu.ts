// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import UtilsDB from "../System/Utils/UtilsDB";
import JsonManager from "../System/manage/JsonManager";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsAction from "../System/Utils/UtilsAction";
import Utils from "../System/Utils/Utils";
import {DialogType} from "../System/Type/enums";

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
    }

    registerEmitter() {
        Emitter.register('onInitPass', this.onInitPass, this)
        Emitter.register('onNextPass', this.onNextPass, this)
        Emitter.register('onShowAll', this.onShowAll, this)
    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()

        // this.随机橡皮_图片

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

    async onNextPass(selfName, data) {
        ccLog.log("要给过去的数据是 1 ", data)
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
            type: GetNodeType.纯查找,
            otherData: "菜单_更多精彩",
            parentNode: this.node
        }
        this.菜单_更多精彩 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_添加桌面",
            parentNode: this.node
        }
        this.菜单_添加桌面 = GetNode.getNode(data)
    }

    initClick() {
        this.菜单_开始按钮.on(cc.Node.EventType.TOUCH_END, async () => {
            ccLog.log("准备去开始去了")

            await this.onShowAll("",false)
            let pass = await JsonManager.getPassByIndex(UtilsDB.getMyPassSave().index)
            ccLog.log("关卡信息",pass)
            Emitter.fire("onSetPassByName", pass)
        }, this)
        this.菜单_设置按钮.on(cc.Node.EventType.TOUCH_END, async () => {

            Emitter.fire("onOpenDialog", {name: DialogType.设置, zIndex: 100,data : this.data}, null)
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
