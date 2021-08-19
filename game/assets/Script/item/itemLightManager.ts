// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemLightManager extends cc.Component {




    onLoad () {
        this.initView();

        this.startActIon()
    }
    光_光1 : cc.Node
    光_光2 : cc.Node

    private initView() {
        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "光_光1",
            parentNode: this.node,
        }
        this.光_光1 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "光_光2",
            parentNode: this.node,
        }
        this.光_光2 = GetNode.getNode(data)
    }
    startActIon(){
        UtilsAction.turnUpRepeatForeverSetDeltaAngle(this.光_光1,360,2)
        UtilsAction.turnUpRepeatForeverSetDeltaAngle(this.光_光2,-360,2)
    }
    start () {

    }

    // update (dt) {}
}
