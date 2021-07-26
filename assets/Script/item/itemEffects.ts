// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsAction from "../System/Utils/UtilsAction";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemEffects extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onPassItemEffectsAllDie', this.onPassItemEffectsAllDie, this)
    }

    registerEmitter() {
        Emitter.register('onPassItemEffectsAllDie', this.onPassItemEffectsAllDie, this)
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

    initActiton(){

        this.特效_圆圈.scaleX = 1.5
        this.特效_圆圈.scaleY = 1.5

        UtilsAction.scaleTo(this.特效_圆圈,1,0,0,()=>{
            this.node.destroy()
        })
    }

    特效_圆圈 : cc.Node
    private initView() {
        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "特效_圆圈",
            parentNode: this.node
        }
        this.特效_圆圈 = GetNode.getNode(data)
    }

    start () {

    }

    // update (dt) {}
}
