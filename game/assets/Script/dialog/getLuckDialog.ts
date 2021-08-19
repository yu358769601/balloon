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
import {SoundType} from "../System/sound/sound";
import UtilsNode from "../System/Utils/UtilsNode";
import {ItemSuperItemType} from "../item/itemSuperItem";
import LoadManage from "../System/Load/LoadManage";
import ChannelBase, {IChannelBase} from "../channel/channelBase";

const {ccclass, property} = cc._decorator;

export enum GetLuckDialogType {
    金币= 0,
    金币_体力= 1,
    体力= 2,
    气球= 3,
}






@ccclass
export default class GetLuckDialog extends BaseDialog implements IChannelBase {


    // LIFE-CYCLE CALLBACKS:
    data : any = null

    type : GetLuckDialogType = GetLuckDialogType.金币

    过关 : cc.Node = null
    失败_看广告跳过实际点击 : cc.Node = null
    失败_重新开始实际点击 : cc.Node = null

    限时福利_金币 : cc.Node = null
    限时福利_金币_体力 : cc.Node = null
    限时福利_体力 : cc.Node = null
    限时福利_气球 : cc.Node = null
    引导_小手指 : cc.Node = null
    失败_看广告按钮 : cc.Node = null

    限时福利_气球_气球 : cc.Sprite = null


    balloonName : string = ""


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

        this.type = this.data.data.type
        // Emitter.fire("onPlaySound",SoundType.失败)
        ccLog.log("限时奖励 0 ",this.type , this.data)

        this.initViewByNode()
    }

  async  initViewByNode() {
        let  node
        let data
        switch (this.type) {
            case GetLuckDialogType.金币:
                UtilsNode.show(this.限时福利_金币,true)
                ccLog.log("限时奖励 1 ",this.限时福利_金币)
                break;
            case GetLuckDialogType.金币_体力:
                UtilsNode.show(this.限时福利_金币_体力,true)
                break;
            case GetLuckDialogType.体力:
                UtilsNode.show(this.限时福利_体力,true)
                break;
            case GetLuckDialogType.气球:
                //获取一个没有的气球
                let data = UtilsDB.getNotRubber()
                ccLog.log("限时奖励 气球 ",data)


                let dataNode = {
                    type: GetNodeType.纯查找,
                    otherData: " 限时福利_气球_气球",
                    parentNode: this.限时福利_气球,
                }
                this.限时福利_气球_气球 = GetNode.getNode(dataNode).getComponent(cc.Sprite)
                //如果都有就随机一个
                let balloonSkin =  await  LoadManage.getSpriteForName("shopBig_"+data.item.name)
                this.限时福利_气球_气球.spriteFrame = balloonSkin

                UtilsNode.show(this.限时福利_气球,true)
                this.balloonName = data.item.name



                break;
        }





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
            // Emitter.fire("onSetPassByName", this.data.data)

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

        let self = data.data.self




        switch (self.type) {
            case GetLuckDialogType.金币:
                // ccLog.log("限时奖励 1 ",this.限时福利_金币)
                let  dataItem = {
                    self : self,
                    rootNode : self.node,
                    count : JsonManager.passSettingjson.getLuckDialogData[self.type]
                }
                let cllbacks = {
                    ItemPreTypesuccessfulCallback: self.ItemPreTypesuccessfulCallback,
                    // lookDialogfailureCallback: this.lookDialogfailureCallback
                }
                Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

                break;
            case GetLuckDialogType.金币_体力:
                let  dataItem = {
                    self : self,
                    rootNode : self.node,
                    count : JsonManager.passSettingjson.getLuckDialogData[self.type]
                }
                let cllbacks = {
                    ItemPreTypesuccessfulCallback: self.ItemPreTypesuccessfulCallback,
                    // lookDialogfailureCallback: this.lookDialogfailureCallback
                }
                Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

                let addLifeData = {
                    type: AssetsType.体力,
                    count: JsonManager.passSettingjson.getLuckDialogData[self.type].life,
                    show : true
                }
                // Emitter.fire("onEduShowIndex",2)
                UtilsDB.addLifeAssets(addLifeData)

                break;
            case GetLuckDialogType.体力:
                let addLifeData = {
                    type: AssetsType.体力,
                    count: JsonManager.passSettingjson.getLuckDialogData[self.type].life,
                    show : true
                }
                // Emitter.fire("onEduShowIndex",2)
                UtilsDB.addLifeAssets(addLifeData)
                self.node.destroy()
                break;
            case GetLuckDialogType.气球:
                UtilsDB.setRubber(self.balloonName)
                self.node.destroy()
                break;

            // data.data.self.胜利_吞噬层.active = true
            // Emitter.fire("onOpenDialog", {name: DialogType.结算界面, zIndex: 100,data : data.data.self.data.data}, null)

            // data.data.self.node.destroy()

        }


    }
    lookDialogfailureCallback(){

    }

    ItemPreTypesuccessfulCallback(data){
        let self = data.data.self

        let addGemData = {
            type : AssetsType.钻石,
            count : data.data.count.gold,
            // callbackGem_donthave : this.callbackGem_donthaveAdd,
            // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
            // callbackGem_subsucceed : this.callbackGem_subsucceed
        }
        UtilsDB.addAssets(addGemData)
        self.node.destroy()
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

        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: " 限时福利_金币",
            parentNode: this.node,
        }
        this.限时福利_金币 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: " 限时福利_金币_体力",
            parentNode: this.node,
        }
        this.限时福利_金币_体力 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: " 限时福利_体力",
            parentNode: this.node,
        }
        this.限时福利_体力 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: " 限时福利_气球",
            parentNode: this.node,
        }
        this.限时福利_气球 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: " 引导_小手指",
            parentNode: this.node,
        }
        this.引导_小手指 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: " 失败_看广告按钮",
            parentNode: this.node,
        }
        this.失败_看广告按钮 = GetNode.getNode(data)

    }


    channel : ChannelBase
    init(channel: ChannelBase) {
        this.channel = channel
    }




    // update (dt) {}
}
