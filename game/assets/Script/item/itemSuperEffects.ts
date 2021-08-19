// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsAction from "../System/Utils/UtilsAction";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemSuperEffects extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        // Emitter.remove('onPassItemEffectsAllDie', this.onPassItemEffectsAllDie, this)
    }

    registerEmitter() {
        // Emitter.register('onPassItemEffectsAllDie', this.onPassItemEffectsAllDie, this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()


        this.initView();

        this.initActiton()

    }
    onPassItemEffectsAllDie(){
        this.node.destroy()
    }
    callBack : any

    setCallBack(callBack){
        this.callBack = callBack
    }
    initActiton(){
        ccLog.log("执行海胆了吗 0",this.node)
        this.超级奖励条目_海胆.scaleX = 0
        this.超级奖励条目_海胆.scaleY = 0
        // UtilsNode.show(this.超级奖励条目_海胆,true)
        ccLog.log("执行海胆了吗 1",this.超级奖励条目_海胆)
        UtilsAction.scaleTo(this.超级奖励条目_海胆,0.5,3,3,()=>{
            ccLog.log("执行海胆了吗 2",this.node)
            this.node.destroy()
            if (this.callBack) {
                this.callBack()
            }
        })
    }

    超级奖励条目_海胆 : cc.Node
    private initView() {
        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "超级奖励条目_海胆",
            parentNode: this.node
        }
        this.超级奖励条目_海胆 = GetNode.getNode(data)
    }

    start () {

    }

    // update (dt) {}
}
