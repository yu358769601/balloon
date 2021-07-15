// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import UtilsTime from "../System/Utils/UtilsTime";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlMaterial extends cc.Component {
    data : any = null

    cdTime : number = 200
    myCdTime : number = 0


    onLoad() {

    }

    TOUCH_START(t){
        this.checkCdTime()
        ccLog.log("点击")
    }
    checkCdTime(){
      let now =  UtilsTime.getTime()
        if (now - this.myCdTime < this.cdTime ) {
            //进入编辑模式
            this.data.node = this.node
            ccLog.log("进入编辑模式")
            Emitter.fire("onSetEditData",this.data)
        }

        this.myCdTime = now
    }


    setData(data){
        this.data = data
        this.node.on(cc.Node.EventType.TOUCH_START,this.TOUCH_START,this)
    }


    start() {

    }




    // update (dt) {}
}
