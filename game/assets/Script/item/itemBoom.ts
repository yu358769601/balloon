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
export default class ItemBoom extends cc.Component {
   
    data: any = null
    // LIFE-CYCLE CALLBACKS:
    type: number = 0

    @property(
        {
            type: [cc.SpriteFrame],
            displayName: "爆炸备选0"
        }
    )
    爆炸备选0: cc.SpriteFrame [] = []
    @property(
        {
            type: [cc.SpriteFrame],
            displayName: "爆炸备选1"
        }
    )
    爆炸备选1: cc.SpriteFrame [] = []
    @property(
        {
            type: [cc.SpriteFrame],
            displayName: "爆炸备选2"
        }
    )
    爆炸备选2: cc.SpriteFrame [] = []


    爆炸条目_样子: cc.Sprite = null

    onLoad() {

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

    setData(data) {
        this.type = 0
        this.data = data

        let beixuan = []

        beixuan.push(this.爆炸备选0)
        beixuan.push(this.爆炸备选1)
        beixuan.push(this.爆炸备选2)

        this.initView()
        this.initOnClick()

        this.type  = this.data.type

       let list = beixuan[this.type]

        let r = Utils.random(0,list.length)

        this.爆炸条目_样子.spriteFrame = list[r]

    }

    initOnClick() {
        // this.扎气球条目_实际点击.on(cc.Node.EventType.TOUCH_START, () => {
        //     ccLog.log("此时此刻我应该爆炸了 然后掉钱")
        //     Emitter.fire("onItemBalloonBoom",this)
        //     this.node.destroy()
        // }, this);
    }

   async startAction(positionEnd) {
        // let tims = [0.5,0.75,1]
        // UtilsAction.moveByRepeatForeverXY(this.node, tims[Utils.random(0, tims.length)], 0, 50, null)


       let time = 1

       await UtilsAction.jumpTo(this.node,time,positionEnd.x,positionEnd.y,50,Utils.random(1,3),null)
       this.node.destroy()
    }


    start() {

    }

    // update (dt) {}
}
