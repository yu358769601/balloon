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
import {balloonType, DialogType, ItemPreType, PassItemType} from "../System/Type/enums";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import JsonManager from "../System/manage/JsonManager";
import SelectCheckPointViewPagerDialog from "./SelectCheckPointViewPagerDialog";
import LoadManage from "../System/Load/LoadManage";

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
        Emitter.register('onShowModel', this.onShowModel,this)
    }

    removeEmitter() {
        Emitter.remove('onShowModel', this.onShowModel,this)
    }

   async onShowModel(selfName,name){
        this.商店_展示气球.spriteFrame = await  LoadManage.getSpriteForName("shopBig_"+name)
    }



    setData(data) {
        this.data = data
        this.initView()
        this.initOnClick()

        // this.data = [
        //     {
        //         name : "ma_1",
        //         type : 0,
        //         gold : 200,
        //         isAd : false
        //     },
        //     {
        //         name : "ma_2",
        //         type : 0,
        //         gold : 200,
        //         isAd : false
        //     },
        //     {
        //         name : "ma_3",
        //         type : 0,
        //         gold : 200,
        //         isAd : false
        //     },
        //     {
        //         name : "ma_4",
        //         type : 0,
        //         gold : 200,
        //         isAd : false
        //     },
        //     {
        //         name : "ma_5",
        //         type : 0,
        //         gold : 200,
        //         isAd : false
        //     },
        //     {
        //         name : "ma_6",
        //         type : 0,
        //         gold : 200,
        //         isAd : false
        //     },
        //     {
        //         name : "ma_7",
        //         type : 0,
        //         gold : 200,
        //         isAd : false
        //     },
        //     {
        //         name : "ma_8",
        //         type : 0,
        //         gold : 200,
        //         isAd : false
        //     },
        //     {
        //         name : "ma_9",
        //         type : 0,
        //         gold : 200,
        //         isAd : false
        //     },
        //
        //     {
        //         name : "fan_1",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_2",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_3",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_4",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_5",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_6",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_7",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_8",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_9",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_10",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_11",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_12",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        //     {
        //         name : "fan_13",
        //         type : 1,
        //         gold : 200,
        //         isAd : true
        //     },
        // ]


        this.data = JsonManager.getRubbers()

        // Emitter.fire("onVictory")
        //订单写入
        for (let i = 0; i <this.data.length ; i++) {
            this.data[i].shopPingType = 1
        }

        let datass = []

        let count = 0
        ccLog.log("二维数组现在呢 balloonType",balloonType)
        for (let item in balloonType) {

            datass[count] = []
            count++

        }

        ccLog.log("二维数组现在呢",datass)


        for (let i = 0; i <this.data.length ; i++) {
            let item = this.data[i]

            if (balloonType.马卡龙 == item.type) {
                datass[balloonType.马卡龙].push(item)
                continue
            }
            if (balloonType.凡尔赛 == item.type) {
                datass[balloonType.凡尔赛].push(item)
                continue
            }
        }



        this.商店_viewPager.setData({data : null,list : datass})

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
        this.商店_向左.on(cc.Node.EventType.TOUCH_START,()=>{
            // Emitter.fire("onRemoveAllPages")
            Emitter.fire("onJumpAddIndex",-1,0.3)
        },this)
        this.商店_向右.on(cc.Node.EventType.TOUCH_START,()=>{
            Emitter.fire("onJumpAddIndex",1,0.3)
        },this)

        this.商店_条目类型0_选择.on(cc.Node.EventType.TOUCH_END,()=>{
            ccLog.log("点击条目 ",0)
                this.showTab(0)
        },this)
        this.商店_条目类型1_选择.on(cc.Node.EventType.TOUCH_END,()=>{
            ccLog.log("点击条目 ",1)
            this.showTab(1)
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

    showTab(index){
        for (let i = 0; i < this.listNode.length; i++) {
            this.listNode[i].zIndex = 0
        }
        this.listNode[index].zIndex = 1

        this.商店_viewPager.setPagerView(index)

        // for (let i = 0; i < this.listNodeBT.length; i++) {
        //     this.listNodeBT[i].active = false
        // }
        // this.listNodeBT[index].active = true


    }
    listNode : cc.Node [] = []
    listNodeBT : cc.Node [] = []


    商店_条目类型0 : cc.Node
    商店_条目类型1 : cc.Node
    商店_条目类型0_选择 : cc.Node
    商店_条目类型1_选择 : cc.Node
    商店_关闭 : cc.Node
    商店_向左 : cc.Node
    商店_向右 : cc.Node
    商店_展示气球 : cc.Sprite
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
            otherData: "商店_条目类型0_选择",
            parentNode: this.node,
        }
        this.商店_条目类型0_选择 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_条目类型1_选择",
            parentNode: this.node,
        }
        this.商店_条目类型1_选择 = GetNode.getNode(data)

        this.listNodeBT.push(this.商店_条目类型0_选择)
        this.listNodeBT.push(this.商店_条目类型1_选择)


        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_关闭",
            parentNode: this.node,
        }
        this.商店_关闭 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_向左",
            parentNode: this.node,
        }
        this.商店_向左 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_向右",
            parentNode: this.node,
        }
        this.商店_向右 = GetNode.getNode(data)


        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_展示气球",
            parentNode: this.node,
        }
        this.商店_展示气球 = GetNode.getNode(data).getComponent(cc.Sprite)





        data = {
            type: GetNodeType.纯查找,
            otherData: "商店_viewPager",
            parentNode: this.node,
        }
        this.商店_viewPager = GetNode.getNode(data).getComponent(DialogType.翻页选关)




        this.listNode.push(this.商店_条目类型0)
        this.listNode.push(this.商店_条目类型1)



    }

    // update (dt) {}
}
