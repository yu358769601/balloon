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
import {DialogType, ItemPreType} from "../System/Type/enums";
import ItemBase from "./itemBase";
import Utils from "../System/Utils/Utils";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;


enum ItemShopItemType {
    可使用的 = 0,
    需要购买的 = 1,
    使用中的 = 2,
}

@ccclass
export default class ItemShopItem extends cc.Component {


    data: any = null

    type : ItemShopItemType = ItemShopItemType.需要购买的
    //
    setData(data) {
        this.data = data
        // this.type = 0
        this.initView()

        this.initOnClick()

        this.setType(this.type)




    }

    initOnClick(){
        this.条目气球_使用.on(cc.Node.EventType.TOUCH_END,()=>{
                ccLog.log("条目气球 点击使用")
        },this)
        this.条目气球_购买.on(cc.Node.EventType.TOUCH_END,()=>{
            ccLog.log("条目气球 点击购买")
        },this)
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


    initView() {
        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "条目气球_气球",
            parentNode: this.node
        }
        this.条目气球_气球 = GetNode.getNode(data).getComponent(cc.Sprite)

        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "条目气球_使用中",
            parentNode: this.node
        }
        this.条目气球_使用中 = GetNode.getNode(data)


        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "条目气球_使用",
            parentNode: this.node
        }
        this.条目气球_使用 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "条目气球_购买",
            parentNode: this.node
        }
        this.条目气球_购买 = GetNode.getNode(data)


    }
    

    setType(type){
        this.type = type

        switch (type){
            case ItemShopItemType.需要购买的:
                UtilsNode.show(this.条目气球_使用中,false)
                UtilsNode.show(this.条目气球_使用,false)

                UtilsNode.show(this.条目气球_购买,true)
            break
            case ItemShopItemType.可使用的:
                UtilsNode.show(this.条目气球_使用中,false)
                UtilsNode.show(this.条目气球_购买,false)

                UtilsNode.show(this.条目气球_使用,true)
                break
            case ItemShopItemType.使用中的:
                UtilsNode.show(this.条目气球_购买,false)
                UtilsNode.show(this.条目气球_使用,false)

                UtilsNode.show(this.条目气球_使用中,true)
                break
        }

    }

    
    
    

    removeEmitter() {
        // Emitter.remove('onLineAngleLeft', this.onLineAngleLeft, this)

    }

    registerEmitter() {
        // Emitter.register('onLineAngleLeft', this.onLineAngleLeft, this)

    }


    start() {

    }


    update(dt) {
    }


}