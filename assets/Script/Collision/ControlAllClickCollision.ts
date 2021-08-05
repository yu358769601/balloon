// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlAllClickCollision extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    // 当碰撞产生时调用
    onCollisionEnter(other,self){
        ccLog.log("撞到了 碰撞 ")
        let sendData = {
            other,
            self,
        }
        Emitter.fire("onCollisionEnterByControlAllClickCollision", sendData)
    }
    // 碰撞状态中调用
    onCollisionStay(other, self) {

    }
    // 碰撞结束时调用
    onCollisionExit(other, self) {
        let sendData = {
            other,
            self,
        }
        Emitter.fire("onCollisionExitByControlAllClickCollision", sendData)
    }

    onLoad () {

    }

    start () {

    }

    // update (dt) {}
}
