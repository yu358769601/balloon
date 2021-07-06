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
export default class Victory extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    onDestroy() {
        this.removeEmitter()
    }
    onLoad() {
        this.removeEmitter()
        this.registerEmitter()


    }
    礼花效果 : sp.Skeleton = null
    initView(){
        Emitter.fire("onGetNode", "礼花效果", (node) => {

            this.礼花效果 = node.getComponent(sp.Skeleton)

        })
    }


    registerEmitter() {
        Emitter.register('onVictory', this.onVictory,this)
    }

    removeEmitter() {
        Emitter.remove('onVictory', this.onVictory,this)
    }
    onVictory(){
        this.node.active = true
        ccLog.log("现在有东西吗",this,this.礼花效果)
        this.礼花效果.setAnimation(0,"victory",false)
    }


    start() {
        this.initView()
        this.node.active = false
    }

    // update (dt) {}
}
