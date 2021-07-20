// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import Utils from "../System/Utils/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlClick extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


    }

    start() {

    }

    myTime : number = 0

    controlTime: number = 1000

    onClick(EventType,callBack){
        let time = Utils.getTime()
        if (time - this.myTime > this.controlTime ) {
            this.myTime = time
            if (callBack) {
                callBack()
            }
        }
    }


    // update (dt) {}
}
