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
import ChannelBase, {IChannelBase} from "../channel/channelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LuckGameGetGoldDialog extends BaseDialog implements IChannelBase {


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
    callbacks : any
    initCallback(callbacks) {
        this.callbacks = callbacks
    }

    registerEmitter() {

    }

    removeEmitter() {

    }
    index : number = 0
    setData(data) {
        this.data = data
        this.initView()
        this.initOnClick()
        ccLog.log("要设置的呢 ",this.data)
        ccLog.log("要设置的呢下一关 ",this.data.data.self.data.data.index)
        this.index = this.data.data.self.data.data.index

        this.气球获得_获得奖励.string =  this.data.data.gold
        Emitter.fire("onAssetsShowHide",true)
        Emitter.fire("onAssetsLifeShowHide",true)
    }



    subclassCall(): any {

    }

    initOnClick(){
        this.气球获得_普通领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("要给过去的数据是 我是奖励给的 ",this.data.data)



            this.addGold = this.data.data.gold

            let  dataItem = {
                self : this,
                rootNode : this.node,
                count :  this.data.data.gold
            }
            let cllbacks = {
                ItemPreTypesuccessfulCallback: this.ItemPreTypesuccessfulCallback,
                // lookDialogfailureCallback: this.lookDialogfailureCallback
            }
            Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

            this.气球获得_吞噬层.active = true
        },this)
        this.气球获得_看广告领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("要给过去的数据是 0 ",this.data.data)

            // Emitter.fire("onNextPass",this.data.data.self.data.index)

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

    addGold : number = 0

    lookDialogsuccessfulCallback(data){

        data.data.self.addGold = data.data.self.data.data.gold*2


        // ccLog.log("准备去加钱成功",data.data.self,data.data.self.callbacks.successfulCallback == true)
        // if (data.data.self.callbacks.successfulCallback) {
        //     data.data.self.callbacks.successfulCallback(data.data.self.data.data)
        // }

        let  dataItem = {
            self : data.data.self,
            rootNode : data.data.self.node,
            count :  data.data.self.data.data.gold*2
        }
        let cllbacks = {
            ItemPreTypesuccessfulCallback: data.data.self.ItemPreTypesuccessfulCallback,
            // lookDialogfailureCallback: this.lookDialogfailureCallback
        }
        Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

        data.data.self.气球获得_吞噬层.active = true


        // data.data.self.node.destroy()
    }
    lookDialogfailureCallback(){

    }


    ItemPreTypesuccessfulCallback(data){
        ccLog.log("回来什么呢加钱结束",data)
        let addGemData = {
            type : AssetsType.钻石,
            count : data.data.self.addGold,
            // callbackGem_donthave : this.callbackGem_donthaveAdd,
            // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
            // callbackGem_subsucceed : this.callbackGem_subsucceed
        }
        UtilsDB.addAssets(addGemData)

        // data.data.self.goLuckGame(data.data.self.data.data)

        if (data.data.self.callbacks) {
            if (data.data.self.callbacks.successfulCallback) {
                data.data.self.callbacks.successfulCallback(data.data.self.data.data.self)
            }
        }
        data.data.self.node.destroy()

        // Emitter.fire("onNextPass",data.data.self.index)

        Emitter.fire("onBackLuckGame")

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
        
        // let list = JsonManager.passSettingjson.GoLuckGameIndexs
        //
        // for (let i = 0; i <list.length ; i++) {
        //    let item =  list[i]
        //     if (data.index == item) {
        //         Emitter.fire("onOpenDialog", {name: DialogType.扎气球, zIndex: 100,data : data}, null)
        //         return
        //     }
        // }
        //
        // ccLog.log("扎气球数据 ",data)
        // Emitter.fire("onNextPass",data)
    }

    气球获得_普通领取实际点击 : cc.Node = null
    气球获得_看广告领取实际点击 : cc.Node = null
    气球获得_结算 : cc.Node = null
    气球获得_吞噬层: cc.Node = null
    气球获得_获得奖励: cc.Label = null

    引导_小手指: cc.Node = null
    胜利_看广告领取样子: cc.Node = null
    气球获得_广告节点: cc.Node = null


   async initView() {
        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "气球获得_普通领取实际点击",
            parentNode: this.node,
        }
        this.气球获得_普通领取实际点击 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "气球获得_看广告领取实际点击",
            parentNode: this.node,
        }
        this.气球获得_看广告领取实际点击 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "气球获得_结算",
            parentNode: this.node,
        }
        this.气球获得_结算 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "气球获得_吞噬层",
            parentNode: this.node,
        }
        this.气球获得_吞噬层 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "气球获得_获得奖励",
            parentNode: this.node,
        }
        this.气球获得_获得奖励 = GetNode.getNode(data).getComponent(cc.Label)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "引导_小手指",
            parentNode: this.node,
        }
        this.引导_小手指 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "胜利_看广告领取样子",
            parentNode: this.node,
        }
        this.胜利_看广告领取样子 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "气球获得_广告节点",
            parentNode: this.node,
        }
        this.气球获得_广告节点 = GetNode.getNode(data)


        // this.胜利_结算.getComponent(cc.Widget).enabled = true

    }
    channel : ChannelBase
    init(channel: ChannelBase) {
        this.channel = channel
    }

    // update (dt) {}
}
