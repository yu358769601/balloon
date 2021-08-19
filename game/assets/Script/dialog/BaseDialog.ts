// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import UtilsAction from "../System/Utils/UtilsAction";
import BaseComponent from "../System/Base/BaseComponent";
import Utils from "../System/Utils/Utils";
import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";
import UtilsDB from "../System/Utils/UtilsDB";
import GameSetting, {passModeType} from "../System/mode/gameSetting";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class BaseDialog extends cc.Component {

    index_: number = 0


    subclass: any = null;


    // LIFE-CYCLE CALLBACKS:


    // onLoad() {
    //
    //
    //     // UtilsAction.scaleToAndfadeInTime(this.node,0.5,2,2,1,1,1.5,null)
    //     // UtilsAction.dialogOpen(this.node, 0.5, 0, 0, 400, 1, null)
    //     // if (qudaoCommon.qudao._name == qudaoType.MEIZU) {
    //     //
    //     // } else {
    //     //     //这里调用
    //     //     qudaoCommon.openDialogAd(this.node);
    //     // }
    //     //
    //     // if (qudaoCommon.qudao._name == qudaoType.MEIZU) {
    //     //     let randNum = Utils.random(0, 100);
    //     //     if (randNum <= 35) {
    //     //         console.log("二级弹窗35概率插屏");
    //     //         qudaoCommon.openInAd();
    //     //     }
    //     // }
    //
    //
    // }

    finsh() {
        UtilsAction.scaleToAndfadeOut(this.node,1,1,1,0.5,0.5,()=>{
            this.node.destroy()
        })
        // UtilsAction.scaleToAndfadeOutTime(this.node,0.2,1,1,0.8,0.8,1.5,()=>{
        // UtilsAction.dialogClose(this.node, 0.5, -45, 0, -200, 1, () => {
        //     if (qudaoCommon.qudao._name == qudaoType.MEIZU) {
        //
        //     } else {
        //         qudaoCommon.closeDialogAd();
        //     }
        //
        //     this.node.destroy()
        // })

    }

    finshNo() {
        this.node.destroy()
    }

    setIndex_(index) {
        this.index_ = index

    }

    // onLoad () {}

    setSubclassCall(subclass) {
        this.subclass = subclass
    }

    onDestroy(): void {
        // ccLog.log("清除")
        // GameSetting.setPassMode(passModeType.恢复)
        this.removeEmitter()
        this.removeBaseEmitter()
    }

    removeBaseEmitter() {
        // Emitter.remove('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)
    }

    registerBaseEmitter() {
        // Emitter.register('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)

    }

    onLoad() {
        this.removeEmitter()
        this.removeBaseEmitter()
        this.registerEmitter()
        this.registerBaseEmitter()

        this.subclass = this.subclassCall()

        // Emitter.fire("onCheckOnlineGiftBag")

        // GameSetting.setPassMode(passModeType.暂停)

    }

    abstract removeEmitter()

    abstract registerEmitter()
    abstract initView()

    start() {

    }

    async onEnterCheckPointEnd(selfName, PreName, otherData) {


        // if (this.EnterCheckPointEnd_1 == false) {
        //     this.EnterCheckPointEnd_1 = true
        //
        // }
        ccLog.log("过关")

        Emitter.fire("onGetGameActivity", this, async (self, node) => {
            // ccLog.log("第一关过关 换关",node)
            // this.scheduleOnce(async()=>{
            //
            // },0)
            Emitter.fire("onTransitions", true, async () => {
                self.node.destroy()
                let Pre_shizhang_1 = await UtilsNode.getNode(PreName, node.RootNode)
                // await self.setTimerOnce(0.1)
                // node.data.type =2
                await Pre_shizhang_1.getComponent(PreName).setData(node.data, otherData)
                // Emitter.fire("onShowMaskUI",true)
                ccLog.log("过关之後呢")

                // await this.setTimerOnce(1)
                Emitter.fire("onTransitions", false, async () => {


                })

            })


        })

    }



    abstract subclassCall(): any;

    // update (dt) {}

    abstract setData(data);

    abstract initCallback(callbacks);
}

//特殊布局
export interface IDialogLayout {
    setLayoutDefault()

    initViewChannelNode(node : cc.Node)
}
