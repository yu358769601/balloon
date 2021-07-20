// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BasePass from "./basePass";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import {DialogType, ItemPreType} from "../System/Type/enums";
import UtilsNode from "../System/Utils/UtilsNode";
import JsonManager from "../System/manage/JsonManager";

const {ccclass, property} = cc._decorator;

enum PassEnum {
    关卡 = "pass"

}

// enum PassItemEnum {
//     点= "itemPoint",
//     线= "itemLineBG",
//     钥匙= "itemLuckKey",
//
// }
@ccclass
export default class Pass extends BasePass {

    // LIFE-CYCLE CALLBACKS:

    data: any = null

    重新开始: cc.Node = null
    游乐场: cc.Node = null

    lineNode: cc.Node = null

    关卡_返回按钮: cc.Node = null

    getitemNames: string[] = []

    onDestroy() {
        super.onDestroy();
    }

    onLoad() {
        super.onLoad()
    }

    start() {



    }

    registerEmitter() {
        Emitter.register('onGameOverCall', this.onGameOverCall, this)
        Emitter.register('onPlayAgainGameOverCall', this.onPlayAgainGameOverCall, this)
    }

    removeEmitter() {
        Emitter.remove('onGameOverCall', this.onGameOverCall, this)
        Emitter.remove('onPlayAgainGameOverCall', this.onPlayAgainGameOverCall, this)
    }

    startGame() {
        this.startGameView()

    }

    endGame() {
        this.endGameView()

    }

    async setData(data) {
        this.getitemNames = [
            ItemPreType.点, ItemPreType.线, ItemPreType.钥匙,ItemPreType.操作棍
        ]
        this.data = data

        this.initView()

        this.initOnClick()


        this.data.getitemNames =  this.getitemNames
        ccLog.log("设置关卡的数据 Pass",  this.data)
            let passData = JsonManager.getPassDatas(this.data)
            //初始化游乐场
            await this.initPlayBackground(passData)
            // ItemPreType.条目棍子

            await this.addLine(passData)


    }
    onGameOverCall(){
        Emitter.fire("onOpenDialog", {name: DialogType.结算界面, zIndex: 100,data : this.data}, null)
    }
    onPlayAgainGameOverCall(){
        Emitter.fire("onOpenDialog", {name: DialogType.重玩界面, zIndex: 100,data : this.data}, null)
    }

    async addLine(passData) {
        let itemLine = passData[ItemPreType.操作棍][0]
        if (itemLine) {
            // this.data.itemLine = itemLine

            this.lineNode = await UtilsNode.getNode(ItemPreType.操作棍, this.游乐场)
            // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
            this.lineNode.getComponent(ItemPreType.操作棍).setData(itemLine)


            let itemStart = this.getComponentInChildren("itemStart")

            Emitter.fire("onStartGame", itemStart.node)
            let itemLineBGs = this.getComponentsInChildren("itemLineBG")




            let group = 0
            for (let i = 0; i < itemLineBGs.length; i++) {
                group += itemLineBGs[i].group
            }
            Emitter.fire("onSetGroup", group)
        }

    }

    async initPlayBackground(passData) {
        ccLog.log("游乐场数据", passData)


        for (let i = 0; i < passData[ItemPreType.点].length; i++) {
            let itemPoint = passData[ItemPreType.点][i]

            let itemPointNode = await UtilsNode.getNode(itemPoint.typeName,this.游乐场)

            itemPointNode.getComponent(itemPoint.typeName).setData(itemPoint)

            // // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
            // ccLog.log("有东西么",this.currentNode)
            // this.currentNode.getComponent("basePass").setData(data)
        }
        for (let i = 0; i < passData[ItemPreType.线].length; i++) {
            let itemPoint = passData[ItemPreType.线][i]

            let itemPointNode = await UtilsNode.getNode(itemPoint.typeName,this.游乐场)

            itemPointNode.getComponent(itemPoint.typeName).setData(itemPoint)

            // // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
            // ccLog.log("有东西么",this.currentNode)
            // this.currentNode.getComponent("basePass").setData(data)
        }
        for (let i = 0; i < passData[ItemPreType.钥匙].length; i++) {
            let itemPoint = passData[ItemPreType.钥匙][i]

            let itemPointNode = await UtilsNode.getNode(itemPoint.typeName,this.游乐场)

            itemPointNode.getComponent(itemPoint.typeName).setData(itemPoint)

            // // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
            // ccLog.log("有东西么",this.currentNode)
            // this.currentNode.getComponent("basePass").setData(data)
        }


    }

    initView() {
        let data

        data = {
            type: GetNodeType.纯查找,
            otherData: "重新开始",
            parentNode: this.node
        }
        this.重新开始 = GetNode.getNode(data)



        data = {
            type: GetNodeType.纯查找,
            otherData: "游乐场",
            parentNode: this.node
        }
        this.游乐场 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "关卡_返回按钮",
            parentNode: this.node
        }
        this.关卡_返回按钮 = GetNode.getNode(data)


    }

    // update (dt) {}
    private initOnClick() {
        this.重新开始.on(cc.Node.EventType.TOUCH_START, () => {
            ccLog.log("点击生效了吗 本关所有内容", this.data)
            Emitter.fire("onSetPassByName", this.data)
        }, this)

        this.关卡_返回按钮.on(cc.Node.EventType.TOUCH_START, () => {
            this.node.destroy()
            Emitter.fire("onShowAll", true)
        }, this)

    }
}
