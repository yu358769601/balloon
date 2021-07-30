// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsNode from "../System/Utils/UtilsNode";
import {ItemPreType} from "../System/Type/enums";
import ccLog from "../System/Log/ccLog";

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
        // Emitter.remove('onDefultItemShopItem', this.onDefultItemShopItem, this)
    }

    registerEmitter() {
        // Emitter.register('onDefultItemShopItem', this.onDefultItemShopItem, this)
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

    超级奖励UI_金币数量: cc.Label
    超级奖励UI_体力数量: cc.Label

    initOnClick() {
        //
        this.超级奖励条目_点击宝箱.once(cc.Node.EventType.TOUCH_END, async () => {
            let itemSuperEffects = await UtilsNode.getNode(ItemPreType.超级奖励海胆, this.node);
            Emitter.fire("onAddCountData",this.data)
            itemSuperEffects.getComponent(ItemPreType.超级奖励海胆).setCallBack(()=>{
                this.超级奖励条目_点击宝箱.active =  false
                this.initViewByNode()
            })

        }, this)
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


    }

    start() {

    }

    // update (dt) {}
}
