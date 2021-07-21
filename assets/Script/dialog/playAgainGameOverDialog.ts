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
import {DialogType, ItemPreType} from "../System/Type/enums";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import JsonManager from "../System/manage/JsonManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayAgainGameOverDialog extends BaseDialog {


    // LIFE-CYCLE CALLBACKS:
    data : any = null

    过关 : cc.Node = null
    失败_看广告跳过实际点击 : cc.Node = null
    失败_重新开始实际点击 : cc.Node = null

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
        this.过关.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("要给过去的数据是 0 ",this.data.data)
            // Emitter.fire("onNextPass",this.data.data)
            this.node.destroy()
            Emitter.fire("onSetPassByName", this.data.data)

        },this)

        this.失败_看广告跳过实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            let  data = {
                self : this,
            }
            let cllbacks = {
                lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
                lookDialogfailureCallback: this.lookDialogfailureCallback
            }
            Emitter.fire("onOpenDialog",{name : DialogType.广告,zIndex : 100,data:data},cllbacks)
        },this)
        this.失败_重新开始实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            this.node.destroy()
            Emitter.fire("onSetPassByName", this.data.data)
        },this)


    }
    lookDialogsuccessfulCallback(data){
        // let addGemData = {
        //     type : AssetsType.钻石,
        //     count : JsonManager.passSettingjson.passGetGem,
        //     // callbackGem_donthave : this.callbackGem_donthaveAdd,
        //     // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
        //     // callbackGem_subsucceed : this.callbackGem_subsucceed
        // }
        // // Emitter.fire("onEduShowIndex",2)
        // UtilsDB.addAssets(addGemData)
        // // ccLog.log("准备去加钱成功",data.data.self,data.data.self.callbacks.successfulCallback == true)
        // // if (data.data.self.callbacks.successfulCallback) {
        // //     data.data.self.callbacks.successfulCallback(data.data.self.data.data)
        // // }
        //
        // let  dataItem = {
        //     self : data.data.self,
        //     rootNode : data.data.self.node,
        //     count : JsonManager.passSettingjson.diamond
        // }
        // let cllbacks = {
        //     ItemPreTypesuccessfulCallback: data.data.self.ItemPreTypesuccessfulCallback,
        //     // lookDialogfailureCallback: this.lookDialogfailureCallback
        // }
        // Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)




        // data.data.self.胜利_吞噬层.active = true
        Emitter.fire("onOpenDialog", {name: DialogType.结算界面, zIndex: 100,data : data.data.self.data.data}, null)

        data.data.self.node.destroy()
    }
    lookDialogfailureCallback(){

    }

    initView() {
        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "过关",
            parentNode: this.node,
        }
        this.过关 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "失败_看广告跳过实际点击",
            parentNode: this.node,
        }
        this.失败_看广告跳过实际点击 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "失败_重新开始实际点击",
            parentNode: this.node,
        }
        this.失败_重新开始实际点击 = GetNode.getNode(data)




    }

    // update (dt) {}
}
