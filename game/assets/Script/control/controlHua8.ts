// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {ClickType} from "./clickmoveitem";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlHua8 extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    _clickType : ClickType = ClickType.抬起

    @property({
        displayName :"最大值移动数量",
        tooltip: "最大值移动数量",
        // type : cc.Node
    })
    countMax: number = 30;

    count : number = 0

    goTag : boolean = false
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,(t)=>{
            // ccLog.log("测试按钮 按下回调调用之前 0 ",this)
            this._clickType = ClickType.按下
            this.count = 0
        },this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(t)=>{

            this._clickType = ClickType.移动
            this.count++

            if (this.goTag == false ) {
                if (this.count>this.countMax) {
                    this.goTag = true
                    ccLog.log("现在都快摸坏了")
                    Emitter.fire("onHua8")
                }
            }

        },this)
        this.node.on(cc.Node.EventType.TOUCH_END,(t)=>{
            this._clickType = ClickType.抬起
            this.count = 0
            this.goTag = false
        },this)
    }

    start () {

    }

    // update (dt) {}
}
