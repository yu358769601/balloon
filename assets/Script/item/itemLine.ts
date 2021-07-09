// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {instance} from "../../scripts/Joystick";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemLine extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

    //检测有没有
    checkNode1 : cc.Node = null
    checkNode2 : cc.Node = null
    private moveDir: cc.Vec2;
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: cc.Event.EventTouch, data){
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

    removeEmitter(){
        Emitter.remove('onLineAngleLeft', this.onLineAngleLeft,this)
        Emitter.remove('onLineAngleRight', this.onLineAngleRight,this)
        Emitter.remove('onLineTOUCH_START', this.onLineTOUCH_START,this)
        Emitter.remove('onLineTOUCH_END', this.onLineTOUCH_END,this)
        Emitter.remove('onCollisionEnterByControlCheckLineCollision', this.onCollisionEnterByControlCheckLineCollision,this)
        Emitter.remove('onCollisionExitByControlCheckLineCollision', this.onCollisionExitByControlCheckLineCollision,this)
    }

    registerEmitter(){
        Emitter.register('onLineAngleLeft', this.onLineAngleLeft,this)
        Emitter.register('onLineAngleRight', this.onLineAngleRight,this)
        Emitter.register('onLineTOUCH_START', this.onLineTOUCH_START,this)
        Emitter.register('onLineTOUCH_END', this.onLineTOUCH_END,this)
        Emitter.register('onCollisionEnterByControlCheckLineCollision', this.onCollisionEnterByControlCheckLineCollision,this)
        Emitter.register('onCollisionExitByControlCheckLineCollision', this.onCollisionExitByControlCheckLineCollision,this)
    }

    start () {

    }

    onLineAngleLeft(selfName){
        this.node.angle+=2
    }
    onLineAngleRight(selfName){
        this.node.angle-=2
    }
    onLineTOUCH_START(selfName){
        this.checkNode2 = null
    }

    onLineTOUCH_END(selfName){
        if (this.checkNode2 == null) {

        }else{
            // if (this.checkNode1 == null) {
            //
            // }
            if (this.checkNode1 != null && this.checkNode2 != null  ) {
                ccLog.log("原点的号码",this.checkNode1.getComponent("itemPoint").index)
                Emitter.fire("onShowTempLine", this.checkNode1.getComponent("itemPoint").index)
            }
            ccLog.log("我要爆炸了 0 ","起点单位",this.checkNode1,"落点单位",this.checkNode2)
            if (this.checkNode1 != this.checkNode2) {

                this.node.setPosition( this.checkNode2.getPosition())
                this.checkNode1 = this.checkNode2

                ccLog.log("我要爆炸了 1 ","起点单位",this.checkNode1,"落点单位",this.checkNode2)

            }else{
                ccLog.log("我要爆炸了 2")
            }



        }
    }
    async onCollisionEnterByControlCheckLineCollision(selfName,sendData){
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

        sendData.self.node.getComponent("itemPoint").标记.active = true
        this.checkNode2 = sendData.self.node
    }
    onCollisionExitByControlCheckLineCollision(selfName,sendData){
        // ccLog.log("撞到了 退出 碰撞 "," 受害者 ",sendData.self," 肇事者 ",sendData.other)
        sendData.self.node.getComponent("itemPoint").标记.active = false
        this.checkNode2 = null
    }
    move() {
        if (this.moveDir != null) {
            this.node.angle = (cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) )*1;
        }



    }

    update (dt) {
        this.move();
    }
}
