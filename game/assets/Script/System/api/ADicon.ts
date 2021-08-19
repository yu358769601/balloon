// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LoadManage from "../Load/LoadManage";
import ccLog from "../Log/ccLog";
import qudaoCommon from "../qudao/qudaoCommon";
import platform_toutiao from "../qudao/platform_toutiao";

const {ccclass, property} = cc._decorator;
export enum AdType
{
    黑  = 0,
    白  = 1,
    黄  = 2,


}
@ccclass
export default class ADicon extends cc.Component {
    @property({type: cc.Enum(AdType)})    // call cc.Enum
    public activityType = AdType.黑;
    // @property
    // type = 0;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:





   async onLoad () {
        let shuzu = [
            "ttAD",
            "ttAD2",
            "ttAD3",
        ]



        // ttAD
        if (qudaoCommon.qudao == platform_toutiao) {
        // if (qudaoCommon.qudao == platform_null) {
            let mySpriteFrame = await LoadManage.getSpriteForName(shuzu[this.activityType])
            // this.itemBG.spriteFrame = mySpriteFrame
            ccLog.log("youmeiyou",mySpriteFrame,"bianhao ",this.activityType,shuzu)
            this.getComponent(cc.Sprite).spriteFrame = mySpriteFrame
            this.node.width = 38*1.7
            this.node.height = 28*1.7
        }else{
            let mySpriteFrame = await LoadManage.getSpriteForName("advo")
            // this.itemBG.spriteFrame = mySpriteFrame
            this.getComponent(cc.Sprite).spriteFrame = mySpriteFrame
            this.node.width = 50
            this.node.height = 50
            ccLog.log("为啥不显示呢",mySpriteFrame)
        }

    }

    start () {

    }

    // update (dt) {}
}
