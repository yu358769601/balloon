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
import SelectCheckPointViewPagerDialog from "./SelectCheckPointViewPagerDialog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShoppingDialog extends BaseDialog {


    // LIFE-CYCLE CALLBACKS:
    data : any = null


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

        this.商店_viewPager.setData({})

    }
    subclassCall(): any {

    }
    initOnClick(){
        // this.过关.on(cc.Node.EventType.TOUCH_START,()=>{
        //     ccLog.log("要给过去的数据是 0 ",this.data.data)
        //     // Emitter.fire("onNextPass",this.data.data)
        //     this.node.destroy()
        //     Emitter.fire("onSetPassByName", this.data.data)
        //
        // },this)

        this.商店_关闭.on(cc.Node.EventType.TOUCH_START,()=>{
            this.node.destroy()
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

    商店_条目类型0 : cc.Node
    商店_条目类型1 : cc.Node
    商店_关闭 : cc.Node
    商店_viewPager : SelectCheckPointViewPagerDialog
    initView() {

        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_条目类型0",
            parentNode: this.node,
        }
        this.商店_条目类型0 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_条目类型1",
            parentNode: this.node,
        }
        this.商店_条目类型1 = GetNode.getNode(data)



        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_关闭",
            parentNode: this.node,
        }
        this.商店_关闭 = GetNode.getNode(data)



        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_viewPager",
            parentNode: this.node,
        }
        this.商店_viewPager = GetNode.getNode(data).getComponent(DialogType.翻页选关)

    }

    // update (dt) {}
}
