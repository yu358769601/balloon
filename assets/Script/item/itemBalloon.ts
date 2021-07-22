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
export default class ItemBalloon extends cc.Component {

    data: any = null
    // LIFE-CYCLE CALLBACKS:
    type: number = 0

    @property(
        {
            type: [cc.SpriteFrame],
            displayName: "气球备选"
        }
    )
    气球备选: cc.SpriteFrame [] = []


    扎气球条目_样子: cc.Sprite = null
    扎气球条目_实际点击: cc.Node = null

    onLoad() {

    }

    initView() {

        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球条目_样子",
            parentNode: this.node,
        }
        this.扎气球条目_样子 = GetNode.getNode(data).getComponent(cc.Sprite)

        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球条目_实际点击",
            parentNode: this.node,
        }
        this.扎气球条目_实际点击 = GetNode.getNode(data)

        // this.node.on(cc.Node.EventType.TOUCH_START,(event)=>{
        //     let location = event.getLocation();// 获取节点坐标
        //     this.firstX = location.x;
        //     this.firstY = location.y;
        //     // 获取触点在空间节点上的坐标
        //     // var tempPlayer = node.parent.convertToNodeSpaceAR(location);
        //     // node.setPosition(tempPlayer);
        //     Emitter.fire("onLineTOUCH_START")
        // },this);
        //
        // this.node.on(cc.Node.EventType.TOUCH_MOVE,(event) =>{
        //     let touchPoint = event.getLocation();
        //     let endX = this.firstX - touchPoint.x;
        //     let endY = this.firstY - touchPoint.y;
        //     // var tempPlayer = node.parent.convertToNodeSpaceAR(touchPoint);
        //     // node.setPosition(tempPlayer);
        //
        //     if (Math.abs(endX) > Math.abs(endY)){
        //         //手势向左右
        //         //判断向左还是向右
        //         if (endX  > 0){
        //             //向左函数
        //             // ccLog.log("移动方向 ",'left');
        //             Emitter.fire("onLineAngleLeft")
        //         } else {
        //             //向右函数
        //             // ccLog.log("移动方向 ",'right');
        //             Emitter.fire("onLineAngleRight")
        //         }
        //     } else {
        //         //手势向上下
        //         //判断手势向上还是向下
        //         if (endY  > 0){
        //             //向下函数
        //             // ccLog.log("移动方向 ",'down');
        //             Emitter.fire("onLineAngleRight")
        //
        //         } else {
        //             //向上函数
        //             // ccLog.log("移动方向 ",'up');
        //             Emitter.fire("onLineAngleLeft")
        //         }
        //     }
        //
        //     this.firstX = touchPoint.x;
        //     this.firstY = touchPoint.y;
        // },this);
        //
        // this.node.on(cc.Node.EventType.TOUCH_END,(event)=>{
        //     Emitter.fire("onLineTOUCH_END")
        // },this);
    }

    setData(data) {
        this.type = Utils.random(0, 3)
        this.data = data
        this.initView()
        this.initOnClick()
        this.扎气球条目_样子.spriteFrame = this.气球备选[this.type]

    }

    initOnClick() {
        this.扎气球条目_实际点击.on(cc.Node.EventType.TOUCH_START, () => {
            ccLog.log("此时此刻我应该爆炸了 然后掉钱")
            Emitter.fire("onItemBalloonBoom",this)
            this.node.destroy()
        }, this);
    }

    startAction() {
        let tims = [0.5,0.75,1]
        UtilsAction.moveByRepeatForeverXY(this.node, tims[Utils.random(0, tims.length)], 0, 50, null)
    }


    start() {

    }

    // update (dt) {}
}
