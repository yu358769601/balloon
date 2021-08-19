// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import UtilsAction from "../System/Utils/UtilsAction";
import LoadManage from "../System/Load/LoadManage";
import BaseDialogNoAd from "./BaseDialogNoAd";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import {DialogType, PrizeType} from "../System/Type/enums";
import UtilsNode from "../System/Utils/UtilsNode";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";

const {ccclass, property} = cc._decorator;

export enum GetItemType {
    钻石 = "钻石",
    橡皮 = "橡皮",
    体力 = "体力",

}
@ccclass
export default class GetItemDialog extends BaseDialogNoAd {

    过关皮肤_确定 : cc.Node = null
    过关皮肤_不要 : cc.Node = null
    如果错过了可能再也没有了 : cc.Node = null
    新皮肤_光 : cc.Node = null
    得到物品_领取奖励 : cc.Node = null
    得到物品_展示 : cc.Sprite = null
    // LIFE-CYCLE CALLBACKS:

    data : any = null

    onDestroy(): void {
      super.onDestroy()
    }
    onLoad () {
        super.onLoad()
        // Emitter.fire("onAssetsShowHide",false)
        UtilsAction.scaleToAndfadeIn(this.node,1,0.7,0.7,1,1,null)
    }

    start () {

    }

    registerEmitter() {
    }

    removeEmitter() {
    }

    胜利_看广告领取实际点击 : cc.Node
    结算_送橡皮底板展示3 : cc.Sprite
    得到_气球尾巴 : cc.Node
    得到_气球部分 : cc.Node
    得到_金币部分 : cc.Node
    得到_体力部分 : cc.Node

    initView(){

        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "胜利_看广告领取实际点击",
            parentNode: this.node
        }
        this.胜利_看广告领取实际点击 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "结算_送橡皮底板展示3",
            parentNode: this.node
        }
        this.结算_送橡皮底板展示3 = GetNode.getNode(data).getComponent(cc.Sprite)
        data = {
            type: GetNodeType.纯查找,
            otherData: "得到_气球尾巴",
            parentNode: this.node
        }
        this.得到_气球尾巴 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "得到_气球部分",
            parentNode: this.node
        }
        this.得到_气球部分 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "得到_金币部分",
            parentNode: this.node
        }
        this.得到_金币部分 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "得到_体力部分",
            parentNode: this.node
        }
        this.得到_体力部分 = GetNode.getNode(data)


        // Emitter.fire("onGetNode", "过关皮肤_不要", (node) => {
        //     this.过关皮肤_不要 = node
        //     this.过关皮肤_不要.on(cc.Node.EventType.TOUCH_END,()=>{
        //         ccLog.log("放弃领取新皮肤",this.data)
        //         if (this.failureCallback) {
        //             this.failureCallback(this.data)
        //         }
        //         this.node.destroy()
        //         Emitter.fire("onAssetsShowHide",true)
        //         Emitter.fire("onPlaySound",SoundType.按钮)
        //     },this)
        // })
        // Emitter.fire("onGetNode", "如果错过了可能再也没有了", (node) => {
        //     this.如果错过了可能再也没有了 = node
        // })



        // Emitter.fire("onGetNode", "过关皮肤_皮肤展示", (node) => {
        //     this.过关皮肤_皮肤展示 = node.getComponent(cc.Sprite)
        // })





    }
    subclassCall(): any {
        return this
    }

    successfulCallback(data) {

    }

    failureCallback(data) {

    }
    // let cllbacks = {
    //     successfulCallback : this.successfulCallback,
    //     failureCallback : this.failureCallback
    // }
    initCallback(callbacks) {
        if (callbacks) {
            this.successfulCallback = callbacks.successfulCallback
            this.failureCallback = callbacks.failureCallback
        }

    }
    async setData(data) {
        this.data = data
        this.initView()

        // let  data = {
        //     self : this,
        //     inType : GetItemType.橡皮,
        //     src : valueStr.item.name,
        //     value : value
        // }
        // let  data = {
        //     self : this,
        //     inType : GetItemType.钻石,
        //     src : "钻石",
        //     value : value
        // }
        ccLog.log("怎么说呢",data)
        // if (data.data.inType == GetItemType.橡皮) {
        //     this.得到物品_展示.spriteFrame = await LoadManage.getSpriteForName(data.data.src)
        // }else if (data.data.inType == GetItemType.钻石) {
        //     this.得到物品_展示.spriteFrame = await LoadManage.getSpriteForName(data.data.src)
        // }
        // data:
        //     inType: "橡皮"
            // self: LuckDialog {_super: null, _name: "", _objFlags: 122881, node: null, __scriptAsset: false, …}
            // src: "ma_2"

        this.setView()



        // if (data.data.inType == InType.随机橡皮进入) {
        //     this.如果错过了可能再也没有了.active = false
        //     this.过关皮肤_皮肤展示.spriteFrame = await LoadManage.getSpriteForName(data.data.newSkin)
        // } else if (data.data.inType == InType.结算进入) {
        //     this.过关皮肤_皮肤展示.spriteFrame = await LoadManage.getSpriteForName(data.data.newSkin)
        //
        //     Emitter.fire("onPlaySound",SoundType.每5关解锁新橡皮)
        // }
        // this.tempSprite.spriteFrame = await LoadManage.getSpriteForName(item)


        this.initOnClick()

    }
    initOnClick(){
        this.胜利_看广告领取实际点击.on(cc.Node.EventType.TOUCH_END, () => {
            switch (this.data.data.inType){
                case PrizeType.橡皮:

                    UtilsDB.addMyRubber(this.data.data.src)
                    UtilsDB.setUseRubber(this.data.data.src)
                    break
                case PrizeType.钻石:
                    // data:
                    //     inType: "钻石"
                    // self: LuckDialog {_super: null, _name: "", _objFlags: 122881, node: null, __scriptAsset: false, …}
                    // src: "钻石"
                    // value:
                    //     count: 1000
                    let addGemData = {
                        type : AssetsType.钻石,
                        count : Number(this.data.data.value.count),
                        // callbackGem_donthave : this.callbackGem_donthaveAdd,
                        // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
                        // callbackGem_subsucceed : this.callbackGem_subsucceed
                    }
                    UtilsDB.addAssets(addGemData)
                    break
                case PrizeType.体力:
                    let addLifeData = {
                        type: AssetsType.体力,
                        count: Number(this.data.data.value.count),
                        show : true
                    }
                    UtilsDB.addLifeAssets(addLifeData)
                    break
            }

            if ( this.successfulCallback) {
                this.successfulCallback(null)
            }
            this.node.destroy()
        }, this)
    }
    async setView(){
        // this.得到_气球尾巴.active = false
        ccLog.log("展示得到的数据是",this.data)
        switch (this.data.data.inType){
            case PrizeType.橡皮:

                // UtilsDB.addMyRubber(valueStr.item.name)
                // UtilsDB.setUseRubber(valueStr.item.name)
                if (this.data.data.src) {
                    this.结算_送橡皮底板展示3.spriteFrame = await LoadManage.getSpriteForName("shopBig_"+this.data.data.src)
                    // this.得到_气球尾巴.active = true
                    UtilsNode.show(this.得到_气球部分,true)
                }
                break
            case PrizeType.钻石:
                // let addGemData = {
                //     type : AssetsType.钻石,
                //     count : value,
                //     // callbackGem_donthave : this.callbackGem_donthaveAdd,
                //     // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
                //     // callbackGem_subsucceed : this.callbackGem_subsucceed
                // }
                // UtilsDB.addAssets(addGemData)
                UtilsNode.show(this.得到_金币部分,true)
                break
            case PrizeType.体力:
                UtilsNode.show(this.得到_体力部分,true)
                break
        }
    }




    // update (dt) {}
}
