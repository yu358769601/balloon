// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDialog from "./BaseDialog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOverDialog extends BaseDialog {


    // LIFE-CYCLE CALLBACKS:
    data : any = null

    过关 : cc.Node = null


    onLoad () {
        super.onLoad()
    }
    onDestroy() {
        super.onDestroy();
    }
    start () {

    }

    initCallback(callbacks) {

    }

    registerEmitter() {

    }

    removeEmitter() {

    }

    setData(data) {
        this.data = data
        this.initView()

    }

    subclassCall(): any {

    }

    initView() {
        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "过关",
            parentNode: this.node,
        }
        this.过关 = GetNode.getNode(data)
        this.过关.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("要给过去的数据是 0 ",this.data.data)
            Emitter.fire("onNextPass",this.data.data)
            this.node.destroy()
        },this)
    }

    // update (dt) {}
}
