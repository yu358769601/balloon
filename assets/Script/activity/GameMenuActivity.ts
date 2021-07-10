// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Activity from "../System/Ui/Activity";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import GetNode, {GetNodeType} from "../System/Utils/getNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMenuActivity extends Activity {

    onCreate(data: any) {
        ccLog.log("执行顺序 ","onCreate")

        this.initView()
    }

    private initView() {

    }
    // LIFE-CYCLE CALLBACKS:

    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onShowTempLine', this.onShowTempLine,this)
    }
    registerEmitter(){
        Emitter.register('onShowTempLine', this.onShowTempLine,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
        ccLog.log("执行顺序 ","onLoad")
    }
    onShowTempLine(self,index){
        // Emitter.fire("onShowTempLine", this.checkNode1.getComponent("itemPoint").index)

        // let data
        // data = {
        //     type : GetNodeType.开始隐藏通过参数显示,
        //     otherData : index+"",
        //     parentNode : this.node
        // }
        // let temp = GetNode.getNode(data)
        // if (temp) {
        //     if (temp.active == false) {
        //         temp.active = true
        //     }
        // }



    }
    start () {

       let itemStart =  this.getComponentInChildren("itemStart")

        Emitter.fire("onStartGame",itemStart.node)

    }

    // update (dt) {}
}
