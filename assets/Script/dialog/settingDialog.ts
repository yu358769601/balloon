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
export default class SettingDialog extends BaseDialog {


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



        this.setOnOffyinxiaoUp(UtilsDB.getSettingSound())
        this.setOnOffyinyueUp(UtilsDB.getSettingMusic())
    }
    setOnOffyinxiao(){
        if (this.设置_音效_开.active == true) {
            this.setOnOffyinxiaoUp(false)
            //关了音效

        }else{

            this.setOnOffyinxiaoUp(true)
        }
    }

    setOnOffyinyue(){
        if (this.设置_音乐_开.active == true) {
            this.setOnOffyinyueUp(false)
            //关了音乐

        }else{

            this.setOnOffyinyueUp(true)
        }
        Emitter.fire("onInitMusicSwitch")
    }
    setOnOffyinxiaoUp(b){
        if (b) {
            // this.音乐管理_音效开关.scaleX = 1
            //开了音效
            this.设置_音效_关.active = false
            this.设置_音效_开.active = true


        }else{

            // this.音乐管理_音效开关.scaleX = -1
            this.设置_音效_关.active = true
            this.设置_音效_开.active = false

        }
        ccLog.log("音状况 "," 设置_音效_开 ",this.设置_音效_开.active)
        ccLog.log("音状况 "," 设置_音效_关 ",this.设置_音效_关.active)
        UtilsDB.setSettingSound(b)
    }
    setOnOffyinyueUp(b){
        if (b) {
            // this.音乐管理_音乐开关.scaleX = 1
            //开了音乐
            this.设置_音乐_关.active = false
            this.设置_音乐_开.active = true
        }else{

            // this.音乐管理_音乐开关.scaleX = -1
            this.设置_音乐_关.active = true
            this.设置_音乐_开.active = false
        }
        UtilsDB.setSettingMusic(b)
        ccLog.log("音状况 "," 设置_音乐_开 ",this.设置_音乐_开.active)
        ccLog.log("音状况 "," 设置_音乐_关 ",this.设置_音乐_关.active)
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

        this.设置_关闭.on(cc.Node.EventType.TOUCH_START,()=>{
            this.node.destroy()
        },this)

        this.设置_音效_开.on(cc.Node.EventType.TOUCH_START,()=>{
            this.setOnOffyinxiao()
        },this)
        this.设置_音效_关.on(cc.Node.EventType.TOUCH_START,()=>{
            this.setOnOffyinxiao()
        },this)
        this.设置_音乐_开.on(cc.Node.EventType.TOUCH_START,()=>{
            this.setOnOffyinyue()
        },this)
        this.设置_音乐_关.on(cc.Node.EventType.TOUCH_START,()=>{
            this.setOnOffyinyue()
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

    设置_音乐_开 : cc.Node
    设置_音乐_关 : cc.Node
    设置_音效_开 : cc.Node
    设置_音效_关 : cc.Node
    设置_关闭 : cc.Node
    initView() {

        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "设置_音乐_开",
            parentNode: this.node,
        }
        this.设置_音乐_开 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "设置_音乐_关",
            parentNode: this.node,
        }
        this.设置_音乐_关 = GetNode.getNode(data)


        data = {
            type: GetNodeType.纯查找,
            otherData: "设置_音效_开",
            parentNode: this.node,
        }
        this.设置_音效_开 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "设置_音效_关",
            parentNode: this.node,
        }
        this.设置_音效_关 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "设置_关闭",
            parentNode: this.node,
        }
        this.设置_关闭 = GetNode.getNode(data)


    }

    // update (dt) {}
}
