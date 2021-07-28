// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {instance, JoystickType, JoystickTypes} from "../../scripts/Joystick";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import Vec2 = cc.Vec2;
import Size = cc.Size;
import {balloonName, DialogType, ItemPreType} from "../System/Type/enums";
import ItemBase from "./itemBase";
import Utils from "../System/Utils/Utils";
import UtilsNode from "../System/Utils/UtilsNode";
import LoadManage from "../System/Load/LoadManage";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";

const {ccclass, property} = cc._decorator;


export enum ItemShopItemType {
    可使用的 = 0,
    需要购买的 = 1,
    使用中的 = 2,
    需要看广告的 = 3,
}

@ccclass
export default class ItemShopItem extends cc.Component {


    data: any = null

    type : ItemShopItemType = ItemShopItemType.需要购买的
    //
   async setData(data) {
        this.data = data
        this.type =  this.data.type


        this.initView()

        this.initOnClick()




        this.setType(this.type)


        let balloonSkin =  await  LoadManage.getSpriteForName("shopBig_"+data.item.name)
        this.条目气球_气球.spriteFrame = balloonSkin

       this.条目气球_金币.string = this.data.item.gold



    }

    checkGet(){
       let list =  UtilsDB.getMyRubberByAllRubber()
        ccLog.log("所有买过的",list)
        for (let i = 0; i < list.length; i++) {
            if (this.data.item.name ==  list[i].item.name) {
                if (list[i].isCheck == true) {
                    return true
                }
            }
        }
        return false
    }


    initOnClick(){
        this.条目气球_使用.on(cc.Node.EventType.TOUCH_END,()=>{
                ccLog.log("条目气球 点击使用")

            Emitter.fire("onShowModel",this.data.item.name)
            this.setType(ItemShopItemType.使用中的)
            Emitter.fire("onDefultItemShopItem",this.data.item.name)
            UtilsDB.setUseRubber(this.data.item.name)

            Emitter.fire("onDefultListItem",this.data.item.name)
            Emitter.fire("onSetSkinLine", this.data.item.name)


        },this)
        this.条目气球_条目.on(cc.Node.EventType.TOUCH_END,()=>{
            Emitter.fire("onShowModel",this.data.item.name)
            // this.setType(ItemShopItemType.使用中的)
        },this)
        this.条目气球_看广告.on(cc.Node.EventType.TOUCH_END,()=>{

            // this.setType(ItemShopItemType.使用中的)

            let  data = {
                self : this,
            }
            let cllbacks = {
                lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
                lookDialogfailureCallback: this.lookDialogfailureCallback
            }
            Emitter.fire("onOpenDialog",{name : DialogType.广告,zIndex : 100,data:data},cllbacks)
        },this)

        this.条目气球_购买.on(cc.Node.EventType.TOUCH_END,()=>{
            ccLog.log("条目气球 点击购买")


            let addGemData = {
                self : this,
                type : AssetsType.钻石,
                count :    -this.data.item.gold,
                callback_donthave : this.callback_donthave,
                // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
                callback_subsucceed : this.callback_subsucceed
            }
            UtilsDB.addAssets(addGemData)


        },this)



        let  useRubber = UtilsDB.getUseRubber()
        ccLog.log("现在要设置我正在使用的 气球","本条目",this.data.item.name,"正在使用的名字",useRubber)
        if (this.data.item.name ==useRubber.rubber ) {

            Emitter.fire("onShowModel",this.data.item.name)
            this.setType(ItemShopItemType.使用中的)
            Emitter.fire("onDefultItemShopItem",this.data.item.name)
            UtilsDB.setUseRubber(this.data.item.name)
        }



    }

    lookDialogsuccessfulCallback(data){
        ccLog.log("看广告之后",data)
        Emitter.fire("onShowModel",data.data.self.data.item.name)
        UtilsDB.addMyRubber(data.data.self.data.item.name)
        data.data.self.setType(ItemShopItemType.使用中的)
        Emitter.fire("onDefultItemShopItem",data.data.self.data.item.name)

        Emitter.fire("onVictory")
        UtilsDB.setUseRubber(data.data.self.data.item.name)


        Emitter.fire("onDefultListItem",data.data.self.data.item.name)
        Emitter.fire("onSetSkinLine", data.data.self.data.item.name)

    }
    lookDialogfailureCallback(data){

    }

    callback_donthave(){
        let  data = {
            txt : "金币不足 去过关赢取更多的金币吧"
        }
        // let cllbacks = {
        //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        //     failureCallback: this.newSkinDialogfailureCallback
        // }
        Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
    }
    callback_subsucceed(data){
        ccLog.log("买得起",this)
        //保存购买
        UtilsDB.addMyRubber(data.self.data.item.name)
        data.self.setType(ItemShopItemType.使用中的)
        Emitter.fire("onShowModel",data.self.data.item.name)

        Emitter.fire("onVictory")

        Emitter.fire("onDefultItemShopItem",data.self.data.item.name)

        UtilsDB.setUseRubber(data.self.data.item.name)


        Emitter.fire("onDefultListItem",data.self.data.item.name)
        Emitter.fire("onSetSkinLine", data.self.data.item.name)


    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()
    }

    protected onDestroy(): void {
        this.removeEmitter()
    }

    条目气球_气球 : cc.Sprite
    条目气球_使用中 : cc.Node
    条目气球_使用 : cc.Node
    条目气球_购买 : cc.Node
    条目气球_条目 : cc.Node
    条目气球_看广告 : cc.Node

    条目气球_金币 : cc.Label


    initView() {
        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "条目气球_气球",
            parentNode: this.node
        }
        this.条目气球_气球 = GetNode.getNode(data).getComponent(cc.Sprite)

        data = {
            type: GetNodeType.纯查找,
            otherData: "条目气球_使用中",
            parentNode: this.node
        }
        this.条目气球_使用中 = GetNode.getNode(data)


        data = {
            type: GetNodeType.纯查找,
            otherData: "条目气球_使用",
            parentNode: this.node
        }
        this.条目气球_使用 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "条目气球_购买",
            parentNode: this.node
        }
        this.条目气球_购买 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "条目气球_金币",
            parentNode: this.node
        }
        this.条目气球_金币 = GetNode.getNode(data).getComponent(cc.Label)
        data = {
            type: GetNodeType.纯查找,
            otherData: "条目气球_条目",
            parentNode: this.node
        }
        this.条目气球_条目 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "条目气球_看广告",
            parentNode: this.node
        }
        this.条目气球_看广告 = GetNode.getNode(data)


    }

    onDefultItemShopItem(selfName,name){
        if (name == this.data.item.name) {
            this.setType(ItemShopItemType.使用中的)
        }else{
            this.setType(ItemShopItemType.可使用的)
        }

    }

    setType(type){
        this.type = type

        ccLog.log("商品条目容易什么呢 我是商品条目",this.data)

        // item:
        //     gold: 200
        //     isAd: false
        //     name: "ma_1"
        //     shopPingType: 1
        //     type: 0

        //如果我买了
        let b =  this.checkGet()
        if (b) {
            //我买了 此时此刻是设置可使用的



            if (this.type != ItemShopItemType.使用中的 ) {
                this.type =  ItemShopItemType.可使用的
            }
        }else{
            //如果我没买
            if (this.data.item.isAd == true) {
                this.type = ItemShopItemType.需要看广告的
                ccLog.log("这条我没买我设置看广告 按钮",this.data)
            }else{
                this.type = ItemShopItemType.需要购买的
            }
        }







        switch (this.type){
            case ItemShopItemType.需要购买的:
                UtilsNode.show(this.条目气球_使用中,false)
                UtilsNode.show(this.条目气球_使用,false)
                UtilsNode.show(this.条目气球_看广告,false)

                UtilsNode.show(this.条目气球_购买,true)
            break
            case ItemShopItemType.可使用的:
                UtilsNode.show(this.条目气球_使用中,false)
                UtilsNode.show(this.条目气球_购买,false)
                UtilsNode.show(this.条目气球_看广告,false)

                UtilsNode.show(this.条目气球_使用,true)
                break
            case ItemShopItemType.使用中的:
                UtilsNode.show(this.条目气球_购买,false)
                UtilsNode.show(this.条目气球_使用,false)
                UtilsNode.show(this.条目气球_看广告,false)

                UtilsNode.show(this.条目气球_使用中,true)
                break
            case ItemShopItemType.需要看广告的:
                UtilsNode.show(this.条目气球_购买,false)
                UtilsNode.show(this.条目气球_使用,false)
                UtilsNode.show(this.条目气球_使用中,false)

                UtilsNode.show(this.条目气球_看广告,true)



                break
        }
        ccLog.log("现在设置的类型是",type , this)
    }




    removeEmitter() {
        Emitter.remove('onDefultItemShopItem', this.onDefultItemShopItem, this)

    }

    registerEmitter() {
        Emitter.register('onDefultItemShopItem', this.onDefultItemShopItem, this)

    }


    start() {

    }


    update(dt) {
    }


}