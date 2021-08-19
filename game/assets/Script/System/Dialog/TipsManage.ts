// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../Msg/Emitter";
import ccLog from "../Log/ccLog";
import UtilsNode from "../Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

export enum TipsItemAddType {
    同时只能有一个出现 = 0,
    多个同时出现 = 1,

}

@ccclass
export default class TipsManage extends cc.Component {



    @property(cc.Node)
    Root : cc.Node = null
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onOpenTips', this.onOpenTips,this)
        Emitter.remove('onCloseTips', this.onCloseTips,this)
        Emitter.remove('onCloseTip', this.onCloseTip,this)
        Emitter.remove('onOpenTipsBySetNode', this.onOpenTipsBySetNode,this)
    }
    registerEmitter(){
        Emitter.register('onOpenTips', this.onOpenTips,this)
        Emitter.register('onCloseTips', this.onCloseTips,this)
        Emitter.register('onCloseTip', this.onCloseTip,this)
        Emitter.register('onOpenTipsBySetNode', this.onOpenTipsBySetNode,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }

    start () {

    }

    // Emitter.fire("onOpenDialog",{name : "",zIndex : 100},successfulCallback, failureCallback)
    async onOpenTips(selfName,data,cllbacks){
        ccLog.log("创建Tips",data,this.Root.children)
        // this.Root.children.forEach((item) => {
        //     if (item) {
        //         ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
        //         if (item.name == data.name) {
        //             return
        //         }
        //     }
        //
        // });
        for (let i = 0; i < this.Root.children.length; i++) {
            let item = this.Root.children[i]
            // ccLog.log("创建Toast 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
            ccLog.log("创建Toast 现在有了吗",item.nodeName ,data.data.addType )
            if (data.data.addType == TipsItemAddType.同时只能有一个出现) {
                if (item.nodeName == data.data.res) {
                    return
                }
            }

        }



        ccLog.log("创建Tips 到我着了吗",data )
        let node = await UtilsNode.getNode(data.name, this.Root);
        // ccLog.log("我觉得有可能",node.getComponent(data.name))
        // node.getComponent(data.name).initCallback(cllbacks)
        node.getComponent(data.name).setData(data)

        if (data.zIndex != null) {
            node.zIndex = data.zIndex
        }else{
            node.zIndex = 100
        }
    }
    async onOpenTipsBySetNode(selfName,data,cllbacks){
        // ccLog.log("创建Tips",data,this.Root.children)
        // this.Root.children.forEach((item) => {
        //     if (item) {
        //         ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
        //         if (item.name == data.name) {
        //             return
        //         }
        //     }
        //
        // });
        for (let i = 0; i < data.data.Root.children.length; i++) {
            let item = data.data.Root.children[i]
            // ccLog.log("创建Toast 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
            ccLog.log("创建Toast 现在有了吗",data.data.addType ,TipsItemAddType.同时只能有一个出现 )
            if (data.data.addType == TipsItemAddType.同时只能有一个出现) {
                if (item.nodeName == data.data.res) {
                    return
                }
            }

        }



        ccLog.log("创建Tips 到我着了吗",data )
        let node = await UtilsNode.getNode(data.name, data.data.Root);
        // ccLog.log("我觉得有可能",node.getComponent(data.name))
        // node.getComponent(data.name).initCallback(cllbacks)
        node.getComponent(data.name).setData(data)

        if (data.zIndex != null) {
            node.zIndex = data.zIndex
        }else{
            node.zIndex = 100
        }
    }
    async onCloseTip(selfName,name){
        // ccLog.log("创建diaolog",data,this.Root.children)
        // this.Root.children.forEach((item) => {
        //     if (item) {
        //         ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
        //         if (item.name == data.name) {
        //             return
        //         }
        //     }
        //
        // });
        for (let i = 0; i < this.Root.children.length; i++) {
            let item = this.Root.children[i]
            // ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
            if (item.name == name) {
                item.destroy()
                return
            }
        }

        //
        //
        // ccLog.log("创建diaolog 到我着了吗" )
        // let node = await UtilsNode.getNode(data.name, this.Root);
        // // ccLog.log("我觉得有可能",node.getComponent(data.name))
        // node.getComponent(data.name).initCallback(cllbacks)
        // node.getComponent(data.name).setData(data)
        //
        // if (data.zIndex != null) {
        //     node.zIndex = data.zIndex
        // }else{
        //     node.zIndex = 100
        // }
    }
    async onCloseTips(selfName,name){
        // ccLog.log("创建diaolog",data,this.Root.children)
        // this.Root.children.forEach((item) => {
        //     if (item) {
        //         ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
        //         if (item.name == data.name) {
        //             return
        //         }
        //     }
        //
        // });
        for (let i = this.Root.children.length-1; i >= 0; i--) {

            let item = this.Root.children[i]
            // ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
                item.destroy()
            ccLog.log("全删除之后 过程",this.Root.children[i],i )
        }

        //
        //
        ccLog.log("全删除之后",this.Root.children )
        // let node = await UtilsNode.getNode(data.name, this.Root);
        // // ccLog.log("我觉得有可能",node.getComponent(data.name))
        // node.getComponent(data.name).initCallback(cllbacks)
        // node.getComponent(data.name).setData(data)
        //
        // if (data.zIndex != null) {
        //     node.zIndex = data.zIndex
        // }else{
        //     node.zIndex = 100
        // }
    }
}
