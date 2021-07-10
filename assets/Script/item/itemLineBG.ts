// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {instance} from "../../scripts/Joystick";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import Vec2 = cc.Vec2;
import Size = cc.Size;

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemLine extends cc.Component {
//下面的临时点

    // LIFE-CYCLE CALLBACKS:
    @property({
        displayName: "本身编号",
        tooltip: "本身编号",
        // type: cc.Integer
    })
    index : string = ""
    @property({
        displayName: "起点节点",
        tooltip: "起点节点",
        type: cc.Node
    })
    startNode : cc.Node = null
    @property({
        displayName: "终点节点",
        tooltip: "终点节点",
        type: cc.Node
    })
    endNode : cc.Node = null


    @property({
        displayName: "长度有多少组",
        tooltip: "长度有多少组",
        // type: cc.Node
    })
    group : number = 1
    @property({
        displayName: "每组有多长",
        tooltip: "每组有多长",
        // type: cc.Node
    })
        //默认 高32 宽52
    groupWidthLength : number =52

    @property({
        displayName: "每组有多宽",
        tooltip: "每组有多宽",
        // type: cc.Node
    })
        //默认 高32 宽52
    groupHeightLength : number =32


    中距离: cc.Node = null




    private moveDir: cc.Vec2;

    //开始游戏
    onStartGame(selfName,startNode){

    }

    onSetWideth(selfName,data){
        if (data) {
            this.groupWidthLength = data.width
            this.groupHeightLength = data.height
        }
        this.中距离.width = this.groupWidthLength*this.group
        this.中距离.height = this.groupHeightLength


        let boxCollider = this.中距离.getComponent(cc.BoxCollider)
        boxCollider.offset = new Vec2(this.中距离.width/2,0)
        boxCollider.size = new Size(this.中距离.width,this.中距离.height)

        this.中距离.opacity = 0


    }

    setData(){
        this.onSetWideth(null,null)
    }



    onLoad() {
        this.removeEmitter()
        this.registerEmitter()

        this.initView()





        this.setData()
    }

    onTouchStart(event: cc.Event.EventTouch, data) {
        Emitter.fire("onLineTOUCH_START")

    }

    onTouchMove(event: cc.Event.EventTouch, data) {
        // this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
    }

    onTouchEnd(event: cc.Event.EventTouch, data) {
        // this._speedType = data.speedType;
        Emitter.fire("onLineTOUCH_END")
    }

    protected onDestroy(): void {
        this.removeEmitter()
    }

    initView(){
        let data
         data = {
            type : GetNodeType.纯查找,
            otherData : "中距离",
            parentNode : this.node
        }
        this.中距离 = GetNode.getNode(data)
    }


    removeEmitter() {
    }

    registerEmitter() {
    }

    start() {

    }



    update(dt) {
    }

}