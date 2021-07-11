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
        Emitter.remove('onEndNodeShow', this.onEndNodeShow,this)
    }
    registerEmitter(){
        Emitter.register('onEndNodeShow', this.onEndNodeShow,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
        ccLog.log("执行顺序 ","onLoad")
    }
    onEndNodeShow(selfName,data) {

        ccLog.log("进来的数据是",data)

        if (data.index1 != null) {
            //让本次的 下面的棍子亮起来
            let newData = {
                index1: data.index1,
                index2: data.index2,
                component: "itemLineBG",
                parentNode: this.node
            }
            let tempItem = GetNode.getNodeByComponent(newData).getComponent("itemLineBG")


            Emitter.fire("onAddGroup",- tempItem.group)
            // showNode
            ccLog.log("现在的有没有这个  tempItem ", tempItem)
            tempItem.showNode()
        }


    }


    start () {

       let itemStart =  this.getComponentInChildren("itemStart")

        Emitter.fire("onStartGame",itemStart.node)
        let itemLineBGs =  this.getComponentsInChildren("itemLineBG")


        let group = 0
        for (let i = 0; i <itemLineBGs.length ; i++) {
            group+= itemLineBGs[i].group
        }
        Emitter.fire("onSetGroup",group)


    }

    // update (dt) {}
}
