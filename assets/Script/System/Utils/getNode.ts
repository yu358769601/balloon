// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import menu = cc._decorator.menu;
import Emitter from "../Msg/Emitter";
import Utils from "./Utils";
import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;

//抽卡类型
export enum GetNodeType {
    开始隐藏通过参数显示 = 0,
    纯查找 = 1,
}

@ccclass
@menu("GetNode")
export default class GetNode extends cc.Component {
    @property(
        {
            type: cc.Enum(GetNodeType),
            displayName: "按钮类型"
        }
    )    // call cc.Enum
    public nodeType = GetNodeType.开始隐藏通过参数显示;
    @property(
        {
            type: cc.Integer,
            displayName: "节点层级"
        }
    )    // call cc.Enum
    public nodezIndex = 0;
    @property(
        {
            displayName: "其他参数"
        }
    )    // call cc.Enum
    public otherData: String = "";

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:


    // private static instance: ControlNode;
    // public static getInstance(): ControlNode {
    //     if (!this.instance) {
    //         this.instance = this;
    //     }
    //     return this.instance;
    // }


    onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onControlNodeShow', this.onControlNodeShow, this)
        Emitter.remove('onGetControlNode', this.onGetControlNode, this)
        Emitter.remove('onGetControlNodeByNode', this.onGetControlNodeByNode, this)
    }

    registerEmitter() {
        Emitter.register('onControlNodeShow', this.onControlNodeShow, this)
        Emitter.register('onGetControlNode', this.onGetControlNode, this)
        Emitter.register('onGetControlNodeByNode', this.onGetControlNodeByNode, this)
    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()


        if (this.nodezIndex > 0) {
            this.node.zIndex = this.nodezIndex
        }
        if (this.nodeType == GetNodeType.开始隐藏通过参数显示) {
            this.node.active = false
        }

    }

    start() {

    }

    onControlNodeShow(selfName, data){
        // {
        //     type: 0,
        //     showHide: true
        // }
        if (data) {
            if (data.type == this.nodeType && data.otherData == this.otherData) {
                this.node.active = data.showHide
                ccLog.log("显示吗",data.showHide)
            }
            if (data.callback) {
                data.callback(data,this.node)
            }
        }
    }
    // Emitter.fire("onGetControlNode",{
    // type : ControlNodeType.纯查找,
    // otherData : "扣灯泡提示位置"
    // },(node)=>{
    //     this.扣灯泡提示位置 = node
    // })
    onGetControlNode(selfName,data,callBack){
            // type
            // otherData
            if (data.type == this.nodeType && data.otherData == this.otherData){
                if (callBack) {
                    callBack(this.node)
                }
            }
            // return new Promise <any>((resolve, reject) => {
            //     ccLog.log("现在什么呢 寻找",name,this.node.name)
            //     if (name == this.node.name) {
            //         if (callBack) {
            //             callBack(this.node)
            //         }else{
            //             ccLog.log("现在什么呢 找到",name,this.node.name)
            //             resolve(this.node)
            //         }
            //
            //
            //     }
            // })

    }

    // Emitter.fire("onGetControlNodeByNode",{
    // type : ControlNodeType.纯查找,
    // otherData : "扣灯泡提示位置",
    // node : this.node
    // },(node)=>{
    //     this.扣灯泡提示位置 = node
    // })
    onGetControlNodeByNode(selfName,data,callBack){
        if (data.type == this.nodeType && data.otherData == this.otherData){
            let list = []
            Utils.getNodesBynode(list,data.node)
            let re = Utils.isNodeByUUID(list,this.node)
            if (re == true) {
                if (callBack) {
                    callBack(this.node)
                }
            }
        }
    }


    //     let data = {
    //         type : ControlNodeType.开始隐藏通过参数显示,
    //         otherData : clickitem.otherData,
    //          parentNode : parentNode
    //     }
    // GetNode.getNode(data)
    static getNode(data){
        let controlNodes = data.parentNode.getComponentsInChildren("getNode")

        let returnNodes = []
        for (let i = 0; i <controlNodes.length ; i++) {
            let  controlNode = controlNodes[i]
            let node = controlNode.getControlNode(data)
            if (node != null) {
                // ccLog.log("controlNode",node)
                returnNodes.push(node)
            }
        }
        if (returnNodes.length == 1) {
            return returnNodes[0]
        }else if (returnNodes.length == 0) {
            console.error("定位系统","===>","检测错误","===>","具体内容","===>","没有找到",data)
            return null
        }else if (returnNodes.length > 1) {
            console.error("定位系统","===>","检测错误","===>","具体内容","===>","找到多个",data)
            for (let i = 0; i <returnNodes.length ; i++) {
                console.error("定位系统","===>","检测错误","===>","具体内容","===>","找到多个结果请及时处理",returnNodes[i])
            }

            return null
        }

    }

    show(){
        this.node.active = true
        this.node.opacity = 255
    }


    getControlNode(data){
        // ccLog.log("进来对比的数据"," 进来类型 ",data.type ," 本身类型 ", this.nodeType ," 进来其他数据 ",data.otherData.trim() , " 本身其他数据 ",this.otherData.trim())

        // ccLog.log("疑问比对 0 ","进来的数据是",data.otherData.trim(),data.otherData.trim()==this.otherData.trim())
        if (data.otherData == this.otherData) {
            // ccLog.log("疑问比对 1 "," 进来类型 ",data.type ," 本身类型 ", this.nodeType ," 进来其他数据 ",data.otherData.trim() , " 本身其他数据 ",this.otherData.trim())
        }

        if (data.type == this.nodeType && data.otherData.trim() == this.otherData.trim()){
            // if (this.nodeType == GetNodeType.开始隐藏通过参数显示) {
            //     this.node.opacity = 255
            // }
            return this.node
        }else if (data.type != this.nodeType &&data.otherData.trim() == this.otherData.trim()) {
            console.error("定位系统","===>","检测警告","===>","具体内容","===>","有如下其他数据相同但是类型不同请查找",this.otherData.trim())
        }

        return  null
    }


    //     let data = {
    //         index1 : "",
    //         index2 : "",
    //           component : "",
    //          parentNode : parentNode
    //     }
    // GetNode.getNodeByComponent(data)
    static getNodeByComponent(data){
        let controlNodes = data.parentNode.getComponentsInChildren(data.component)

        let returnNodes = []
        for (let i = 0; i <controlNodes.length ; i++) {
            let  controlNode = controlNodes[i]
            let node = controlNode.getControlNode(data)
            if (node != null) {
                // ccLog.log("controlNode",node)
                returnNodes.push(node)
            }
        }
        if (returnNodes.length == 1) {
            return returnNodes[0]
        }else if (returnNodes.length == 0) {
            console.error("定位系统","===>","检测错误","===>","具体内容","===>","没有找到",data)
            return null
        }else if (returnNodes.length > 1) {
            console.error("定位系统","===>","检测错误","===>","具体内容","===>","找到多个",data)
            for (let i = 0; i <returnNodes.length ; i++) {
                console.error("定位系统","===>","检测错误","===>","具体内容","===>","找到多个结果请及时处理",returnNodes[i])
            }

            return null
        }

    }


    // update (dt) {}
}
