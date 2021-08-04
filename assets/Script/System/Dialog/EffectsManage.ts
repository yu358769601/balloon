// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../Msg/Emitter";
import UtilsNode from "../Utils/UtilsNode";
import ccLog from "../Log/ccLog";
import {DialogType, ItemPreType} from "../Type/enums";
import Tools from "../Utils/Tools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EffectsManage extends cc.Component {

    // @property(cc.Node)
    // Root : cc.Node = null
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onOpenEffects', this.onOpenEffects,this)
        // Emitter.remove('onOpenItem', this.onOpenItem,this)
        // Emitter.remove('onCloseDialog', this.onCloseDialog,this)
        // Emitter.remove('onOpenNativeAdDialog', this.onOpenNativeAdDialog,this)
    }
    registerEmitter(){
        Emitter.register('onOpenEffects', this.onOpenEffects,this)
        // Emitter.register('onOpenItem', this.onOpenItem,this)
        // Emitter.register('onCloseDialog', this.onCloseDialog,this)
        // Emitter.register('onOpenNativeAdDialog', this.onOpenNativeAdDialog,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }

    start () {

    }

    // Emitter.fire("onOpenEffects",{name : DialogType.限时礼包,zIndex : 100,data:data},null)
    async onOpenEffects(selfName,data,cllbacks){
        ccLog.log("创建特效",data)
        // this.Root.children.forEach((item) => {
        //     if (item) {
        //         ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
        //         if (item.name == data.name) {
        //             return
        //         }
        //     }
        //
        // });
        // for (let i = 0; i < this.Root.children.length; i++) {
        //    let item = this.Root.children[i]
        //     ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
        //     if (item.name == data.name) {
        //         return
        //     }
        // }

        let root = this.node

        if (data.data.root) {
            root = data.data.root
        }
        let node = await UtilsNode.getNode(data.name,root);
        // ccLog.log("我觉得有可能"," 组件有没有 0 ",node)
        // ccLog.log("我觉得有可能"," 组件有没有 1 ",node.getComponent(data.name)," 组件名字 ",data.name," 节点 ",node)
        node.getComponent(data.name).initCallback(cllbacks)
        node.getComponent(data.name).setData(data)

        if (data.data.nodeP) {
            let vec2 = Tools.convetOtherNodeSpace(data.data.nodeP,this.node);
            ccLog.log("设定位置是",vec2)
            node.setPosition(vec2)
        }else if (data.data.P) {
            node.setPosition(data.data.P)
        }



        if (data.zIndex != null) {
            node.zIndex = data.zIndex
        }else{
            node.zIndex = 100
        }
    }

    // update (dt) {}
}
