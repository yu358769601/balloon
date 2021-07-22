// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDialog from "./BaseDialog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import Utils from "../System/Utils/Utils";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import JsonManager from "../System/manage/JsonManager";
import {DialogType, ItemPreType} from "../System/Type/enums";
import ControlGoLuckGame from "../control/controlGoLuckGame";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOverDialog extends BaseDialog {


    // LIFE-CYCLE CALLBACKS:
    data : any = null

    胜利_普通领取实际点击 : cc.Node = null
    胜利_看广告领取实际点击 : cc.Node = null
    胜利_结算 : cc.Node = null
    胜利_吞噬层: cc.Node = null

    onLoad () {
        super.onLoad()
    }
    onDestroy() {
        super.onDestroy();
    }
    start () {

    }

    initCallback(callbacks) {

    }

    registerEmitter() {

    }

    removeEmitter() {

    }

    setData(data) {
        this.data = data
        this.initView()
        this.initOnClick()
    }

    subclassCall(): any {

    }

    initOnClick(){
        this.胜利_普通领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("要给过去的数据是 0 ",this.data.data)
            Emitter.fire("onNextPass",this.data.data)
            let addGemData = {
                type : AssetsType.钻石,
                count : JsonManager.passSettingjson.diamond,
                // callbackGem_donthave : this.callbackGem_donthaveAdd,
                // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
                // callbackGem_subsucceed : this.callbackGem_subsucceed
            }
            UtilsDB.addAssets(addGemData)
            let  dataItem = {
                self : this,
                rootNode : this.node,
                count : JsonManager.passSettingjson.diamond
            }
            let cllbacks = {
                ItemPreTypesuccessfulCallback: this.ItemPreTypesuccessfulCallback,
                // lookDialogfailureCallback: this.lookDialogfailureCallback
            }
            Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

            this.胜利_吞噬层.active = true
        },this)
        this.胜利_看广告领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("要给过去的数据是 0 ",this.data.data)
            let  data = {
                self : this,
            }
            let cllbacks = {
                lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
                lookDialogfailureCallback: this.lookDialogfailureCallback
            }
            Emitter.fire("onOpenDialog",{name : DialogType.广告,zIndex : 100,data:data},cllbacks)






        },this)
    }

    lookDialogsuccessfulCallback(data){
        let addGemData = {
            type : AssetsType.钻石,
            count : JsonManager.passSettingjson.passGetGem,
            // callbackGem_donthave : this.callbackGem_donthaveAdd,
            // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
            // callbackGem_subsucceed : this.callbackGem_subsucceed
        }
        // Emitter.fire("onEduShowIndex",2)
        UtilsDB.addAssets(addGemData)
        // ccLog.log("准备去加钱成功",data.data.self,data.data.self.callbacks.successfulCallback == true)
        // if (data.data.self.callbacks.successfulCallback) {
        //     data.data.self.callbacks.successfulCallback(data.data.self.data.data)
        // }

        let  dataItem = {
            self : data.data.self,
            rootNode : data.data.self.node,
            count : JsonManager.passSettingjson.diamond
        }
        let cllbacks = {
            ItemPreTypesuccessfulCallback: data.data.self.ItemPreTypesuccessfulCallback,
            // lookDialogfailureCallback: this.lookDialogfailureCallback
        }
        Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

        data.data.self.胜利_吞噬层.active = true


        // data.data.self.node.destroy()
    }
    lookDialogfailureCallback(){

    }


    ItemPreTypesuccessfulCallback(data){
        data.data.self.node.destroy()

        data.data.self.goLuckGame(data.data.self.data.data)


    }


    //先判断去扎气球
    goLuckGame(data){
        // getitemNames: Array(4)
        // 0: "itemPoint"
        // 1: "itemLineBG"
        // 2: "itemLuckKey"
        // 3: "itemLine"
        // length: 4
        // __proto__: Array(0)
        // index: 1
        // isPlay: true
        // itemName: "pass_1"
        
        let list = JsonManager.passSettingjson.GoLuckGameIndexs
        
        for (let i = 0; i <list.length ; i++) {
           let item =  list[i]
            if (data.index == item) {
                Emitter.fire("onOpenDialog", {name: DialogType.扎气球, zIndex: 100,data : data}, null)
                return
            }
        }
        
        ccLog.log("扎气球数据 ",data)
        Emitter.fire("onNextPass",data)
    }

   async initView() {
        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "胜利_普通领取实际点击",
            parentNode: this.node,
        }
        this.胜利_普通领取实际点击 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "胜利_看广告领取实际点击",
            parentNode: this.node,
        }
        this.胜利_看广告领取实际点击 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "胜利_结算",
            parentNode: this.node,
        }
        this.胜利_结算 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "胜利_吞噬层",
            parentNode: this.node,
        }
        this.胜利_吞噬层 = GetNode.getNode(data)


        // this.胜利_结算.getComponent(cc.Widget).enabled = true

    }

    // update (dt) {}
}
