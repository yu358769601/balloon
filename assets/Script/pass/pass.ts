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
import {ItemPreType} from "../System/Type/enums";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

enum PassEnum {
    关卡= "pass"
}

@ccclass
export default class Pass extends BasePass {

    // LIFE-CYCLE CALLBACKS:

    data : any = null

    重新开始 : cc.Node = null
    游乐场 : cc.Node = null

    lineNode : cc.Node = null

    onDestroy() {
        super.onDestroy();
    }

    onLoad () {
        super.onLoad()
    }

    start () {
        let itemStart =  this.getComponentInChildren("itemStart")

        Emitter.fire("onStartGame",itemStart.node)
        let itemLineBGs =  this.getComponentsInChildren("itemLineBG")


        let group = 0
        for (let i = 0; i <itemLineBGs.length ; i++) {
            group+= itemLineBGs[i].group
        }
        Emitter.fire("onSetGroup",group)



    }

    registerEmitter() {

    }

    removeEmitter() {

    }

    startGame(){
        this.startGameView()

    }
    endGame(){
        this.endGameView()

    }

    setData(data) {
        this.data = data
        ccLog.log("本关所有内容",data)
        this.initView()


        //初始化游乐场
        this.initPlayBackground()
        // ItemPreType.条目棍子


    }


  async  addLine(){

        this.lineNode = await UtilsNode.getNode(ItemPreType.条目棍子,this.游乐场)
        // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
        this.lineNode.getComponent("itemLine").setData(this.data)
    }

    initPlayBackground(){






        // this.addLine()
    }

    initView() {
        let data

        data = {
            type : GetNodeType.纯查找,
            otherData : "重新开始",
            parentNode : this.node
        }
        this.重新开始 = GetNode.getNode(data)
        this.重新开始.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("点击生效了吗 本关所有内容",this.data)
            Emitter.fire("onSetPassByName",this.data)
        },this)


        data = {
            type : GetNodeType.纯查找,
            otherData : "游乐场",
            parentNode : this.node
        }
        this.游乐场 = GetNode.getNode(data)
    }

    // update (dt) {}
}
