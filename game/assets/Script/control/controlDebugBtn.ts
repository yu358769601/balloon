// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsAction from "../System/Utils/UtilsAction";
import UtilsNode from "../System/Utils/UtilsNode";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import BaseComponent from "../System/Base/BaseComponent";
import GameSetting, {gameModeType} from "../System/mode/gameSetting";
import Utils from "../System/Utils/Utils";
import menu = cc._decorator.menu;

const {ccclass, property} = cc._decorator;


export enum ControlDebugBtnColor {
    红色 = 0,
    绿色 = 1,
    蓝色 = 2,
    紫色 = 3,
    黄色 = 4,
}
@ccclass
@menu("自动隐藏的测试颜色按钮组件")
export default class ControlDebugBtn extends cc.Component {

    //
    // @property
    // text: string = 'hello';
    @property({
        type: cc.Enum(ControlDebugBtnColor),
        displayName: "颜色",
        tooltip: "颜色",
    })
    public colorIndex : ControlDebugBtnColor = ControlDebugBtnColor.红色
    private colors16: string[] = []
    protected onDestroy(): void {
        // this.removeEmitter()
    }
    // removeEmitter(){
    // }
    // registerEmitter(){
    // }

    private initColor() {
        // 红色 = 0,
        //     绿色 = 1,
        //     蓝色 = 2,
        //     紫色 = 3,
        //     黄色 = 4,
        this.colors16 = []
        this.colors16.push("FF626280")
        this.colors16.push("62FF7880")
        this.colors16.push("6272FF80")
        this.colors16.push("D662FF80")
        this.colors16.push("FFEF6280")
    }


    onLoad () {
        // this.removeEmitter()
        // this.registerEmitter()
        //
        //
        // UtilsAction.actionRepeatForever(this.node,this.time,this.scaleX,this.scaleY,this.offsetX,this.offsetY,null)
        this.initColor()
        if (GameSetting.mode ==gameModeType.正式){
            this.node.getComponent(cc.Sprite).enabled = false
        }else{
            Utils.set16Color( this.node,this.colors16[this.colorIndex])
        }

    }


    start () {
    }


    // update (dt) {}
}
