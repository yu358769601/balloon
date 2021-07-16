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
    itemComponent : any

    onLoad() {

    }

    TOUCH_START(t){
        this.checkCdTime()
        ccLog.log("点击")
    }
    TOUCH_MOVE(t){
        let n_pos = t.getLocation();
        let delta = t.getDelta();
        this.node.x +=delta.x
        this.node.y +=delta.y

        //
        this.itemComponent.data.x = this.node.x
        this.itemComponent.data.y = this.node.y
        // ccLog.log("我要去设置位置的属性了",this.itemComponent)
    }
    TOUCH_END(t){

    }

    //双击编辑详细资料
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
        this.itemComponent = this.node.getComponent(this.data.itemName)

        ccLog.log("我是材料我的名字",data)
        this.node.on(cc.Node.EventType.TOUCH_START,this.TOUCH_START,this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.TOUCH_MOVE,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this.TOUCH_END,this)
    }


    start() {

    }




    // update (dt) {}
}
