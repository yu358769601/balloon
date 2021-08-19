// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsNode from "../System/Utils/UtilsNode";
import {DialogType, ItemPreType} from "../System/Type/enums";
import ccLog from "../System/Log/ccLog";
import UtilsAction from "../System/Utils/UtilsAction";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

export enum ItemSuperItemType {
    金币 = 0,
    体力 = 1
}

@ccclass
export default class ItemSuperItem extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    data: any

    type: ItemSuperItemType = ItemSuperItemType.金币

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()
    }

    protected onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onShowItemSuperItemAD', this.onShowItemSuperItemAD, this)
    }

    registerEmitter() {
        Emitter.register('onShowItemSuperItemAD', this.onShowItemSuperItemAD, this)
    }

    onShowItemSuperItemAD(){
        if (this.openTag ==  false) {
            UtilsNode.show(this.超级奖励条目_点击宝箱_广告,true)
        }
        //
    }


    setData(data) {
        this.data = data
        ccLog.log("有报错吗",this.data.type)
        this.type = this.data.type

        this.initView()
        this.initOnClick()
    }

    超级奖励条目_点击宝箱: cc.Node

    超级奖励UI_金币布局: cc.Node
    超级奖励UI_体力布局: cc.Node
    超级奖励条目_点击宝箱_广告: cc.Node

    超级奖励UI_金币数量: cc.Label
    超级奖励UI_体力数量: cc.Label

    openTag : boolean  = false

    initOnClick() {
        //
        this.超级奖励条目_点击宝箱.once(cc.Node.EventType.TOUCH_END, async () => {
            this.openTag = true
            let itemSuperEffects = await UtilsNode.getNode(ItemPreType.超级奖励海胆, this.node);
            Emitter.fire("onAddCountData",this.data)
            itemSuperEffects.getComponent(ItemPreType.超级奖励海胆).setCallBack(()=>{
                this.超级奖励条目_点击宝箱.active =  false
                this.initViewByNode()
            })

        }, this)
        this.超级奖励条目_点击宝箱_广告.on(cc.Node.EventType.TOUCH_END, async () => {
            this.openTag = true

            Emitter.fire("onPlaySound", SoundType.按钮, 1)
            ccLog.log("要给过去的数据是 0 ", this.data.data)
            let data = {
                self: this,
            }
            let cllbacks = {
                lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
                lookDialogfailureCallback: this.lookDialogfailureCallback
            }
            Emitter.fire("onOpenDialog", {name: DialogType.广告, zIndex: 100, data: data}, cllbacks)





        }, this)
    }
    lookDialogfailureCallback(){

    }
   async lookDialogsuccessfulCallback(data) {
        let self = data.data.self

        let itemSuperEffects = await UtilsNode.getNode(ItemPreType.超级奖励海胆, self.node);
        Emitter.fire("onAddCountData",self.data)
        itemSuperEffects.getComponent(ItemPreType.超级奖励海胆).setCallBack(()=>{
            self.超级奖励条目_点击宝箱.active =  false
            self.超级奖励条目_点击宝箱_广告.active =  false
            self.initViewByNode()
        })

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
        //
        // // UtilsDB.addMyRubber(data.data.self.data.data.newSkin)
        // // UtilsDB.setUseRubber(data.data.self.data.data.newSkin)
        // // Emitter.fire("onDefultListItem", data.data.self.data.data.newSkin)
        // // Emitter.fire("onSetSkinLine", data.data.self.data.data.newSkin)
        // data.data.self.node.destroy()
        //
        //
        // data.data.self.sunAddData()
    }



    initViewByNode() {
        let  node
        let data
        switch (this.type) {
            case ItemSuperItemType.金币:
                UtilsNode.show(this.超级奖励UI_金币布局,true)
                node = this.超级奖励UI_金币布局
                data = {
                    type: GetNodeType.纯查找,
                    otherData: "超级奖励UI_金币数量",
                    parentNode: node
                }
                this.超级奖励UI_金币数量 = GetNode.getNode(data).getComponent(cc.Label)

                this.超级奖励UI_金币数量.string =   this.data.count + ""
            break;
            case ItemSuperItemType.体力:
                UtilsNode.show(this.超级奖励UI_体力布局,true)
                node = this.超级奖励UI_体力布局

                data = {
                    type: GetNodeType.纯查找,
                    otherData: "超级奖励UI_体力数量",
                    parentNode: node
                }
                this.超级奖励UI_体力数量 = GetNode.getNode(data).getComponent(cc.Label)

                this.超级奖励UI_体力数量.string =   this.data.count+ ""
                break;
        }





    }


    initView() {
        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "超级奖励条目_点击宝箱",
            parentNode: this.node
        }
        this.超级奖励条目_点击宝箱 = GetNode.getNode(data)

        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "超级奖励UI_金币布局",
            parentNode: this.node
        }
        this.超级奖励UI_金币布局 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "超级奖励UI_体力布局",
            parentNode: this.node
        }
        this.超级奖励UI_体力布局 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "超级奖励条目_点击宝箱_广告",
            parentNode: this.node
        }
        this.超级奖励条目_点击宝箱_广告 = GetNode.getNode(data)


    }

    start() {

    }

    // update (dt) {}
}
