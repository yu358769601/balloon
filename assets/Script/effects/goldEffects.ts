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
import {EffectsType, ItemPreType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GoldEffects extends cc.Component {

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

    }

    start () {

    }
    data : any
    setData(data){
        this.data = data

        this.startAction()
    }
    callbacks : any

    initCallback(callbacks){
        this.callbacks = callbacks
    }


    async startAction() {
        // let tims = [0.5,0.75,1]
        // UtilsAction.moveByRepeatForeverXY(this.node, tims[Utils.random(0, tims.length)], 0, 50, null)


        let time = 0.5

        // await UtilsAction.jumpTo(this.node,time,positionEnd.x,positionEnd.y,50,Utils.random(1,3),null)

        //掉皮皮
        let tempList =  Utils.getCirclePoints(200,new cc.Vec2(0,0),Utils.random(6,10),500)
        // Emitter.fire("onPlaySound",SoundType.气球爆了扎气球时,1)
        for (let i = 0; i < tempList.length; i++) {
            let item =  await UtilsNode.getNode(EffectsType.关卡接上掉金币条目,this.node)
            // item.setPosition(temp[i])
            let addGemItem = item.getComponent(EffectsType.关卡接上掉金币条目)
            addGemItem.setData({time : time})
            addGemItem.node.setPosition(cc.v2(0,0))

            // tempList[i].y-=300

            addGemItem.startAction(tempList[i])
        }

        await Utils.setTimerOnce(this,time)
        this.node.destroy()


    }

    // update (dt) {}
}
