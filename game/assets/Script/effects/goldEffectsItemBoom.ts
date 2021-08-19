// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsAction from "../System/Utils/UtilsAction";
import Utils from "../System/Utils/Utils";
import Emitter from "../System/Msg/Emitter";
import {SoundType} from "../System/sound/sound";
import UtilsNode from "../System/Utils/UtilsNode";
import {ItemPreType} from "../System/Type/enums";
import GetNode, {GetNodeType} from "../System/Utils/getNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GoldEffectsItemBoom extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(
        {
            type: [cc.SpriteFrame],
            displayName: "爆炸备选"
        }
    )
    爆炸备选: cc.SpriteFrame [] = []
    onLoad () {
        // this.startAction()
    }
    爆炸条目_样子 : cc.Sprite
    start () {

    }
    data : any
    setData(data){
        this.data = data
        this.initView()



        this.爆炸条目_样子.spriteFrame = this.爆炸备选[0]

    }
    callbacks : any

    initCallback(callbacks){
        this.callbacks = callbacks
    }

    initView() {

        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "爆炸条目_样子",
            parentNode: this.node,
        }
        this.爆炸条目_样子 = GetNode.getNode(data).getComponent(cc.Sprite)
    }

    async startAction(positionEnd) {
        // let tims = [0.5,0.75,1]
        // UtilsAction.moveByRepeatForeverXY(this.node, tims[Utils.random(0, tims.length)], 0, 50, null)

        let time = this.data.time

        await UtilsAction.jumpToAndFadeOut(this.node,time,positionEnd.x,positionEnd.y,100,Utils.random(1,3),null)

        this.node.destroy()


    }

    // update (dt) {}
}
