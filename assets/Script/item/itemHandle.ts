// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemHandle extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    public firstX = null;
    public firstY = null;

    onLoad () {
        this.initView()
    }

    initView(){
        this.node.on(cc.Node.EventType.TOUCH_START,(event)=>{
            let location = event.getLocation();// 获取节点坐标
            this.firstX = location.x;
            this.firstY = location.y;
            // 获取触点在空间节点上的坐标
            // var tempPlayer = node.parent.convertToNodeSpaceAR(location);
            // node.setPosition(tempPlayer);
            Emitter.fire("onLineTOUCH_START")
        },this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE,(event) =>{
            let touchPoint = event.getLocation();
            let endX = this.firstX - touchPoint.x;
            let endY = this.firstY - touchPoint.y;
            // var tempPlayer = node.parent.convertToNodeSpaceAR(touchPoint);
            // node.setPosition(tempPlayer);

            if (Math.abs(endX) > Math.abs(endY)){
                //手势向左右
                //判断向左还是向右
                if (endX  > 0){
                    //向左函数
                    // ccLog.log("移动方向 ",'left');
                    Emitter.fire("onLineAngleLeft")
                } else {
                    //向右函数
                    // ccLog.log("移动方向 ",'right');
                    Emitter.fire("onLineAngleRight")
                }
            } else {
                //手势向上下
                //判断手势向上还是向下
                if (endY  > 0){
                    //向下函数
                    // ccLog.log("移动方向 ",'down');
                } else {
                    //向上函数
                    // ccLog.log("移动方向 ",'up');
                }
            }

            this.firstX = touchPoint.x;
            this.firstY = touchPoint.y;
        },this);

        this.node.on(cc.Node.EventType.TOUCH_END,(event)=>{
            Emitter.fire("onLineTOUCH_END")
        },this);
    }

    start () {

    }

    // update (dt) {}
}
