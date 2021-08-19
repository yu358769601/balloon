

import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemNewHand extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initView()

        this.action()
    }

    start () {

    }

    新手引导_手 : cc.Node

    initView(){
        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "新手引导_手",
            parentNode: this.node
        }
        this.新手引导_手 = GetNode.getNode(data)

    }

    action(){
        UtilsAction.newHandMode(this.新手引导_手)
    }


    // update (dt) {}
}
