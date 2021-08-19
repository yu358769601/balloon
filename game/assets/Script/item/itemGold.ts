// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import Utils from "../System/Utils/Utils";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemGold extends cc.Component {

    data: any = null
    // LIFE-CYCLE CALLBACKS:
    type: number = 0

    @property(
        {
            type: [cc.SpriteFrame],
            displayName: "金币备选"
        }
    )
    金币备选: cc.SpriteFrame [] = []


    金币条目_样子: cc.Sprite = null

    onLoad() {

    }

    initView() {

        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "金币条目_样子",
            parentNode: this.node,
        }
        this.金币条目_样子 = GetNode.getNode(data).getComponent(cc.Sprite)
    }

    setData(data) {
        this.type = 0
        this.data = data
        this.initView()
        this.initOnClick()
        this.金币条目_样子.spriteFrame = this.金币备选[this.type]

    }

    initOnClick() {
        // this.扎气球条目_实际点击.on(cc.Node.EventType.TOUCH_START, () => {
        //     ccLog.log("此时此刻我应该爆炸了 然后掉钱")
        //     Emitter.fire("onItemBalloonBoom",this)
        //     this.node.destroy()
        // }, this);
    }

   async startAction(nodeY) {
        // let tims = [0.5,0.75,1]
        // UtilsAction.moveByRepeatForeverXY(this.node, tims[Utils.random(0, tims.length)], 0, 50, null)



       let times = [0.3,0.1]
       let time = times[0]
       // ccLog.log("什么呢", Math.abs(nodeY.y-this.node.y)>400)
       if ( Math.abs(nodeY.y-this.node.y)>400) {

       }else{
           time = times[1]
       }


       let x = Utils.random(0,200)*Utils.randomZF()
       await UtilsAction.moveTo(this.node,time,this.node.x+x,nodeY.y+20,null)
       UtilsAction.jumpTo(this.node,time,this.node.x+x,nodeY.y,50,Utils.random(1,4),null)

    }


    start() {

    }

    // update (dt) {}
}
