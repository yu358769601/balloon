// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";
import {PassItemType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControITempNode extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }

    start () {

    }

    protected onDestroy() {
        this.removeEmitter()
    }

    // update (dt) {}
    private removeEmitter() {
        Emitter.remove('onTempNodeInit', this.onTempNodeInit, this)
    }

    private registerEmitter() {
        Emitter.register('onTempNodeInit', this.onTempNodeInit, this)
    }

    currentNode: cc.Node = null

  async  onTempNodeInit(selfName,data){
        this.currentNode = await UtilsNode.getNode(data.name, this.node)
      this.currentNode.destroy()
      if (data.callBack) {
          data.callBack()
      }

    }



}
