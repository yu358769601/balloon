// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../Msg/Emitter";
import UtilsNode from "../Utils/UtilsNode";
import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ToastManage extends cc.Component {

    @property(cc.Node)
    Root : cc.Node = null
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onOpenToast', this.onOpenToast,this)
        Emitter.remove('onCloseToast', this.onCloseToast,this)
    }
    registerEmitter(){
        Emitter.register('onOpenToast', this.onOpenToast,this)
        Emitter.register('onCloseToast', this.onCloseToast,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }

    start () {

    }

    // Emitter.fire("onOpenDialog",{name : "",zIndex : 100},successfulCallback, failureCallback)
    async onOpenToast(selfName,data,cllbacks){
        ccLog.log("创建Toast",data,this.Root.children)
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
        //     ccLog.log("创建Toast 现在有了吗",item.name,data.name , "结果",item.name ==data.name )
        //     if (item.name == data.name) {
        //         return
        //     }
        // }



        ccLog.log("创建Toast 到我着了吗" )
        let node = await UtilsNode.getNode(data.name, this.Root);
        // ccLog.log("我觉得有可能",node.getComponent(data.name))
        node.getComponent(data.name).initCallback(cllbacks)
        node.getComponent(data.name).setData(data)

        if (data.zIndex != null) {
            node.zIndex = data.zIndex
        }else{
            node.zIndex = 100
        }
    }
    async onCloseToast(selfName,name){
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
