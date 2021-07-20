// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../Msg/Emitter";
import UtilsNode from "../Utils/UtilsNode";
import ccLog from "../Log/ccLog";
import {DialogType} from "../Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogManage extends cc.Component {

    @property(cc.Node)
    Root : cc.Node = null
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onOpenDialog', this.onOpenDialog,this)
        Emitter.remove('onOpenItem', this.onOpenItem,this)
        Emitter.remove('onCloseDialog', this.onCloseDialog,this)
        Emitter.remove('onOpenNativeAdDialog', this.onOpenNativeAdDialog,this)
    }
    registerEmitter(){
        Emitter.register('onOpenDialog', this.onOpenDialog,this)
        Emitter.register('onOpenItem', this.onOpenItem,this)
        Emitter.register('onCloseDialog', this.onCloseDialog,this)
        Emitter.register('onOpenNativeAdDialog', this.onOpenNativeAdDialog,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }

    start () {

    }

    // Emitter.fire("onOpenDialog",{name : "",zIndex : 100},successfulCallback, failureCallback)
    async onOpenDialog(selfName,data,cllbacks){
        ccLog.log("创建diaolog",data,this.Root.children)
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
            ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
            if (item.name == data.name) {
                return
            }
        }



        ccLog.log("创建diaolog 到我着了吗" )
        let node = await UtilsNode.getNode(data.name, this.Root);
        ccLog.log("我觉得有可能"," 组件有没有 0 ",node)
        ccLog.log("我觉得有可能"," 组件有没有 1 ",node.getComponent(data.name)," 组件名字 ",data.name," 节点 ",node)
        node.getComponent(data.name).initCallback(cllbacks)
        node.getComponent(data.name).setData(data)

        if (data.zIndex != null) {
            node.zIndex = data.zIndex
        }else{
            node.zIndex = 100
        }
    }
    async onOpenItem(selfName,data,cllbacks){
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
        for (let i = 0; i < data.data.rootNode.children.length; i++) {
            let item = data.data.rootNode.children[i]
            ccLog.log("创建diaolog 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
            if (item.name == data.name) {
                return
            }
        }
        let node = await UtilsNode.getNode(data.name, data.data.rootNode);
        ccLog.log("我觉得有可能"," 组件有没有 ",node.getComponent(data.name)," 组件名字 ",data.name," 节点 ",node)
        node.getComponent(data.name).initCallback(cllbacks)
        node.getComponent(data.name).setData(data)

        if (data.zIndex != null) {
            node.zIndex = data.zIndex
        }else{
            node.zIndex = 100
        }
    }
    async onOpenNativeAdDialog(selfName, data, p,parent,successfulCallback) {
        console.log("走了没要展示自己的广告了",data);
        let node = await UtilsNode.getNode(DialogType.自渲染广告小游戏渠道, parent);
        node.getComponent(DialogType.自渲染广告小游戏渠道).setData(data,p)
        node.getComponent(DialogType.自渲染广告小游戏渠道).initCallback(successfulCallback)
        // node.getComponent("goBossDialog").setCallback(self,callback)

        node.zIndex = 100



        // node.getComponent("ADgetFastGame").setOnClickGetCountListen((reData)=>{
        //     // UtilsDB.setFastCount(reData)
        //     // Emitter.fire("onRefreshFastGameCount")
        // })
    }


    async onCloseDialog(selfName,name){
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
    // update (dt) {}
}
