// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDialog from "./BaseDialog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DetailedSettingDialog extends BaseDialog {

    data : any = null
    // LIFE-CYCLE CALLBACKS:

    编辑器详情_关闭 : cc.Node

    编辑器详情_点布局 : cc.Node

    onDestroy() {
        super.onDestroy();
    }

    onLoad () {
        super.onLoad()
    }

    start () {

    }
    callbacks : any
    initCallback(callbacks) {
        this.callbacks = callbacks
    }

    initView() {
        let data

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器详情_关闭",
            parentNode: this.node
        }
        this.编辑器详情_关闭 = GetNode.getNode(data)


        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "编辑器详情_点布局",
            parentNode: this.node
        }
        this.编辑器详情_点布局 = GetNode.getNode(data)

    }

    registerEmitter() {
    }

    removeEmitter() {
    }

    setData(data) {
        this.data = data

        this.initView()

        this.initOnClick()
    }
    initOnClick(){
        this.编辑器详情_关闭.on(cc.Node.EventType.TOUCH_START, () => {


            if ( this.callbacks.successfulCallback) {
                this.callbacks.successfulCallback(this.data)
            }
            ccLog.log("有啥啊",this.callbacks)
            this.finshNo()
        }, this)
    }
    subclassCall(): any {
        return this
    }

    // update (dt) {}
}
