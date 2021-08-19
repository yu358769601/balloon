// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsNode from "../System/Utils/UtilsNode";
import {ItemPreType} from "../System/Type/enums";
import Emitter from "../System/Msg/Emitter";
import {ItemShopItemType} from "./itemShopItem";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemShopLayou extends cc.Component {

    data : any = null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {

    }

    setData(data){
        this.data = data
        this.initView()

        this.addNode()
    }


    商品页_条目 : cc.Layout


    initView(){
        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "商品页_条目",
            parentNode: this.node
        }
        this.商品页_条目 = GetNode.getNode(data).getComponent(cc.Layout)
    }
   async addNode(){
       // itemPassPager: 0
       // list: Array(1)
       // 0:
       //     gold: 200
       //     name: "ma_1"
       //     shopPingType: 0
       //     type: 0
       ccLog.log("商品条目容易什么呢 我是商品页",this.data.list)
        for (let i = 0; i < this.data.list.length; i++) {
            let itemPager = await UtilsNode.getNodeNoParent(ItemPreType.商品页条目);

            itemPager.getComponent(ItemPreType.商品页条目).setData({
                item : this.data.list[i],
                type : this.data.list[i].shopPingType,
                itemPassPager : i
            })

            this.商品页_条目.node.addChild(itemPager)

        }
       this.商品页_条目.updateLayout()
    }





    // update (dt) {}
}
