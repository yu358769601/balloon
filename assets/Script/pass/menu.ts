// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import UtilsDB from "../System/Utils/UtilsDB";
import JsonManager from "../System/manage/JsonManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    data : any
    onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter() {
        Emitter.remove('onInitPass', this.onInitPass, this)
        Emitter.remove('onNextPass', this.onNextPass, this)
    }

    registerEmitter() {
        Emitter.register('onInitPass', this.onInitPass, this)
        Emitter.register('onNextPass', this.onNextPass, this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        // this.随机橡皮_图片
    }
    onInitPass(selfName,data){
        this.data = data
        ccLog.log("游戏关卡开始",data)


        // ccLog.log("shopPass",this.shopPass)
        // this.shopPass.setData(data.pass,this.passItemPs)



        // pass:
        //     gameData: {title: "寻找公主"}
        //     index: 0
        //     itemName: "pass_104"
        //     passName: "pass_104"
        //     tip: "pass_104_tip"
        // this.关卡标题.string = "任务"+ (data.pass.index)
        // this.关卡副标题.string = data.pass.gameData.title



    }

   async onNextPass(selfName,data){
        ccLog.log("要给过去的数据是 1 ",data)
        let index = data.index


        // UtilsDB.addCheckpointRecords(returnData.data.itemName)
        index++
        ccLog.log("下一关数据 index",index)

        let pass = JsonManager.getPassByIndex(index)
        ccLog.log("下一关数据",pass)
        let passData =await JsonManager.getPassDataByName(pass.passName,false)

        // UtilsDB.addCheckpointRecords(pass.itemName,SelectCheckPointType.已解锁未通关)

        if (pass == null) {
            index = 0
            pass = JsonManager.getPassByIndex(index)

            ccLog.log("下一关数据吗",pass)
            Emitter.fire("onSetPassByName", passData)
        }else{
            Emitter.fire("onSetPassByName", passData)
        }
    }



    start () {

    }

    // update (dt) {}
}
