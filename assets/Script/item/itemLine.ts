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
//棍子

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
        this.startNode = startNode
        this.node.setPosition(this.startNode.getPosition())



        this.onSetWideth(null,null)
    }

    //设置宽高
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

       this.index =  this.startNode.getComponent("itemPoint").index

        Emitter.fire("onEndNodeShow",this.index)
    }



    onLoad() {
        this.removeEmitter()
        this.registerEmitter()

        this.initView()

        instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
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
        Emitter.remove('onLineAngleLeft', this.onLineAngleLeft, this)
        Emitter.remove('onLineAngleRight', this.onLineAngleRight, this)
        Emitter.remove('onLineTOUCH_START', this.onLineTOUCH_START, this)
        Emitter.remove('onLineTOUCH_END', this.onLineTOUCH_END, this)
        Emitter.remove('onCollisionEnterByControlCheckLineCollision', this.onCollisionEnterByControlCheckLineCollision, this)
        Emitter.remove('onCollisionExitByControlCheckLineCollision', this.onCollisionExitByControlCheckLineCollision, this)
        Emitter.remove('onStartGame', this.onStartGame, this)
    }

    registerEmitter() {
        Emitter.register('onLineAngleLeft', this.onLineAngleLeft, this)
        Emitter.register('onLineAngleRight', this.onLineAngleRight, this)
        Emitter.register('onLineTOUCH_START', this.onLineTOUCH_START, this)
        Emitter.register('onLineTOUCH_END', this.onLineTOUCH_END, this)
        Emitter.register('onCollisionEnterByControlCheckLineCollision', this.onCollisionEnterByControlCheckLineCollision, this)
        Emitter.register('onCollisionExitByControlCheckLineCollision', this.onCollisionExitByControlCheckLineCollision, this)
        Emitter.register('onStartGame', this.onStartGame, this)
    }

    start() {

    }

    onLineAngleLeft(selfName) {
        this.node.angle += 2
    }

    onLineAngleRight(selfName) {
        this.node.angle -= 2
    }

    onLineTOUCH_START(selfName) {
        this.endNode = null
    }

    onLineTOUCH_END(selfName) {
        if (this.endNode == null) {

        } else {
            // if (this.checkNode1 == null) {
            //
            // }
            if (this.startNode != null && this.endNode != null) {
                // Emitter.fire("onShowTempLine", this.startNode.getComponent("itemPoint").index)
                 //设置临时显示

                if (this.startNode != this.endNode) {
                    ccLog.log("编号 棍子", this.index ," 落点 ",this.endNode.getComponent("itemPoint").index)

                    //设置落点
                    this.node.setPosition(this.endNode.getPosition())
                    this.startNode = this.endNode


                    this.index =  this.endNode.getComponent("itemPoint").index
                    // ccLog.log("我要爆炸了 1 ", "起点单位", this.startNode, "落点单位", this.endNode)

                    Emitter.fire("onEndNodeShow",this.index)
                } else {
                    ccLog.log("我要爆炸了 2")
                }
            }
            // ccLog.log("我要爆炸了 0 ", "起点单位", this.startNode, "落点单位", this.endNode)



        }
    }

    async onCollisionEnterByControlCheckLineCollision(selfName, sendData) {
        // let sendData = {
        //     other,
        //     self,
        // }
        // ccLog.log("撞到了 碰撞 "," 受害者 ",sendData.self," 肇事者 ",sendData.other)
        //大哥布林
        // if (sendData.self.getComponent("beatingSlime")) {
        //     ccLog.log("史莱姆 进来了"," 肇事者 ",sendData.self)
        //     sendData.self.getComponent("beatingSlime").setInTag(true)
        // }

        //进入范围提示
        // sendData.self.node.getComponent("itemPoint").标记.active = true
        if (sendData.self.node.getComponent("itemPoint").标记.active == true) {
            this.endNode = sendData.self.node
        }

    }

    onCollisionExitByControlCheckLineCollision(selfName, sendData) {
        // ccLog.log("撞到了 退出 碰撞 "," 受害者 ",sendData.self," 肇事者 ",sendData.other)
        //出去范围提示
        // sendData.self.node.getComponent("itemPoint").标记.active = false

        if (sendData.self.node.getComponent("itemPoint").标记.active == true) {
            this.endNode = null
        }
    }

    move() {
        if (this.moveDir != null) {
            this.node.angle = (cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x))) * 1;
        }


    }

    update(dt) {
        this.move();
    }

}