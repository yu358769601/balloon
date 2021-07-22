// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import Utils from "../System/Utils/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlGoLuckGame extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    // 4、14、24、34关，胜利界面后，出现气球奖励，与超级奖励冲突时先弹出超级奖励
    onLoad() {

    }

    start() {

    }

    // update (dt) {}
}
