// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDialog from "./BaseDialog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import ccLog from "../System/Log/ccLog";
import {ItemPreType} from "../System/Type/enums";
import Utils from "../System/Utils/Utils";
import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DetailedSettingDialog extends BaseDialog {

    data : any = null
    // LIFE-CYCLE CALLBACKS:

    编辑器详情_关闭 : cc.Node


    编辑器详情_保存 : cc.Node
    编辑器详情_删除 : cc.Node


    编辑器详情_点布局 : cc.Node

    编辑器详情_线布局 : cc.Node
    编辑器详情_钥匙布局 : cc.Node
    编辑器详情_操作棍布局 : cc.Node




    onDestroy() {
        super.onDestroy();
    }

    onLoad () {
        super.onLoad()
    }

    start () {

    }
    callbacks : any
    initCallback(callbacks) {
        this.callbacks = callbacks
    }

    initView() {
        let data

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器详情_关闭",
            parentNode: this.node
        }
        this.编辑器详情_关闭 = GetNode.getNode(data)


        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "编辑器详情_点布局",
            parentNode: this.node
        }
        this.编辑器详情_点布局 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "编辑器详情_线布局",
            parentNode: this.node
        }
        this.编辑器详情_线布局 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "编辑器详情_钥匙布局",
            parentNode: this.node
        }
        this.编辑器详情_钥匙布局 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "编辑器详情_操作棍布局",
            parentNode: this.node
        }
        this.编辑器详情_操作棍布局 = GetNode.getNode(data)



    }

    编辑器详情_编号 : cc.EditBox
    编辑器详情_X位置 : cc.EditBox
    编辑器详情_Y位置 : cc.EditBox
    编辑器详情_层级 : cc.EditBox


    编辑器详情_点布局_允许进入 : cc.EditBox
    编辑器详情_点布局_是否起点 : cc.Toggle

    编辑器详情_线布局_从 : cc.EditBox
    编辑器详情_线布局_到 : cc.EditBox
    编辑器详情_线布局_角度 : cc.EditBox
    编辑器详情_线布局_角度数字 : cc.EditBox
    编辑器详情_线布局_组 : cc.EditBox

    编辑器详情_钥匙_从 : cc.EditBox
    编辑器详情_钥匙_到 : cc.EditBox

    编辑器详情_操作棍布局_角度数字 : cc.EditBox

    编辑器详情_线布局_角度拉动条 : cc.Slider
    saveRemoveNode(node,name){
        let data

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器详情_保存",
            parentNode: node
        }
        this.编辑器详情_保存 = GetNode.getNode(data)
        if ( this.编辑器详情_保存) {
            this.编辑器详情_保存.on(cc.Node.EventType.TOUCH_END,()=>{
                this.setDataByName(name)
                let  data = {
                    txt : "关于点的属性保存了"
                }
                // let cllbacks = {
                //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                //     failureCallback: this.newSkinDialogfailureCallback
                // }
                Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
            },this)
        }

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器详情_删除",
            parentNode: node
        }
        this.编辑器详情_删除 = GetNode.getNode(data)
        if (this.编辑器详情_删除) {
            this.编辑器详情_删除.on(cc.Node.EventType.TOUCH_END,()=>{
                ccLog.log("有啥啊",this.callbacks)

                this.data.data.editData.node.destroy()
                this.finshNo()
                let  data = {
                    txt : "删除节点成功"
                }
                // let cllbacks = {
                //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                //     failureCallback: this.newSkinDialogfailureCallback
                // }
                Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
            },this)
        }


        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器详情_编号",
            parentNode: node
        }
        if ( GetNode.getNode(data)) {
            this.编辑器详情_编号 = GetNode.getNode(data).getComponent(cc.EditBox)
        }

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器详情_X位置",
            parentNode: node
        }
        if ( GetNode.getNode(data)){
            this.编辑器详情_X位置 = GetNode.getNode(data).getComponent(cc.EditBox)
        }

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器详情_Y位置",
            parentNode: node
        }
        if ( GetNode.getNode(data)){
            this.编辑器详情_Y位置 = GetNode.getNode(data).getComponent(cc.EditBox)
        }
        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器详情_层级",
            parentNode: node
        }
        if ( GetNode.getNode(data)){
            this.编辑器详情_层级 = GetNode.getNode(data).getComponent(cc.EditBox)
        }


    }


    initViewByName(name){
        let data

        switch (name){
            case ItemPreType.点:
                UtilsNode.show(this.编辑器详情_点布局,true,150)
                this.saveRemoveNode(this.编辑器详情_点布局,name)



                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_点布局_允许进入",
                    parentNode: this.编辑器详情_点布局
                }
                this.编辑器详情_点布局_允许进入 = GetNode.getNode(data).getComponent(cc.EditBox)
                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_点布局_是否起点",
                    parentNode: this.编辑器详情_点布局
                }
                this.编辑器详情_点布局_是否起点 = GetNode.getNode(data).getComponent(cc.Toggle)


                this.getDataByName(name)
            break;

            case ItemPreType.线:
                UtilsNode.show(this.编辑器详情_线布局,true,150)
                this.saveRemoveNode(this.编辑器详情_线布局,name)
                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_线布局_从",
                    parentNode: this.编辑器详情_线布局
                }
                this.编辑器详情_线布局_从 = GetNode.getNode(data).getComponent(cc.EditBox)
                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_线布局_到",
                    parentNode: this.编辑器详情_线布局
                }
                this.编辑器详情_线布局_到 = GetNode.getNode(data).getComponent(cc.EditBox)
                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_线布局_角度数字",
                    parentNode: this.编辑器详情_线布局
                }
                this.编辑器详情_线布局_角度数字 = GetNode.getNode(data).getComponent(cc.EditBox)
                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_线布局_组",
                    parentNode: this.编辑器详情_线布局
                }
                this.编辑器详情_线布局_组 = GetNode.getNode(data).getComponent(cc.EditBox)
                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_线布局_角度拉动条",
                    parentNode: this.编辑器详情_线布局
                }
                this.编辑器详情_线布局_角度拉动条 = GetNode.getNode(data).getComponent(cc.Slider)

                this.getDataByName(name)
                break;


            case ItemPreType.钥匙:
                UtilsNode.show(this.编辑器详情_钥匙布局,true,150)
                this.saveRemoveNode(this.编辑器详情_钥匙布局,name)

                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_钥匙_从",
                    parentNode: this.编辑器详情_钥匙布局
                }
                this.编辑器详情_钥匙_从 = GetNode.getNode(data).getComponent(cc.EditBox)
                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_钥匙_到",
                    parentNode: this.编辑器详情_钥匙布局
                }
                this.编辑器详情_钥匙_到 = GetNode.getNode(data).getComponent(cc.EditBox)

                this.getDataByName(name)
                break;
            case ItemPreType.操作棍:
                UtilsNode.show(this.编辑器详情_操作棍布局,true,150)
                this.saveRemoveNode(this.编辑器详情_操作棍布局,name)

                data = {
                    type: GetNodeType.纯查找,
                    otherData: "编辑器详情_操作棍布局_角度数字",
                    parentNode: this.编辑器详情_操作棍布局
                }
                this.编辑器详情_操作棍布局_角度数字 = GetNode.getNode(data).getComponent(cc.EditBox)


                this.getDataByName(name)
                break;

        }
    }

    getDataByName(name){
        switch (name){
            case ItemPreType.点:

               let itemPoint = this.data.data.editData.node.getComponent(name)

                ccLog.log("这个数组", itemPoint.data.allowInOutIndexs)


                this.编辑器详情_点布局_允许进入.string =  Utils.arrToStr(itemPoint.data.allowInOutIndexs )
                this.编辑器详情_点布局_是否起点.isChecked = itemPoint.data.isStart

                this.编辑器详情_编号.string = itemPoint.data.index+""
                this.编辑器详情_X位置.string = itemPoint.data.x
                this.编辑器详情_Y位置.string = itemPoint.data.y
                this.编辑器详情_层级.string = itemPoint.data.zIndex
                break;
            case ItemPreType.线:

               let itemLineBG = this.data.data.editData.node.getComponent(name)
                //新创建的
                // let data = {
                // index : 0,
                //     group : 5,
                //     indexStart : 0,
                //     indexEnd : 0,
                //     rotation : 0,
                //     x: editData.position.x,
                //     y: editData.position.y,
                //     zIndex : 0
                // }


                this.编辑器详情_线布局_组.string = itemLineBG.data.group
                this.编辑器详情_线布局_角度数字.string = itemLineBG.data.rotation

                this.编辑器详情_线布局_角度拉动条.progress =360/ itemLineBG.data.rotation


                this.编辑器详情_线布局_从.string = itemLineBG.data.indexStart
                this.编辑器详情_线布局_到.string = itemLineBG.data.indexEnd

                this.编辑器详情_X位置.string = itemLineBG.data.x
                this.编辑器详情_Y位置.string = itemLineBG.data.y
                this.编辑器详情_层级.string = itemLineBG.data.zIndex




                break;
            case ItemPreType.钥匙:

                let itemLuckKey = this.data.data.editData.node.getComponent(name)

                this.编辑器详情_编号.string = itemLuckKey.data.index+""
                // this.编辑器详情_钥匙_从.string = itemLuckKey.data.index1+""
                // this.编辑器详情_钥匙_到.string = itemLuckKey.data.index2+""
                this.编辑器详情_X位置.string = itemLuckKey.data.x
                this.编辑器详情_Y位置.string = itemLuckKey.data.y
                this.编辑器详情_层级.string = itemLuckKey.data.zIndex
                break;

            case ItemPreType.操作棍:

                let itemLine = this.data.data.editData.node.getComponent(name)

                this.编辑器详情_编号.string = itemLine.data.index+""
                this.编辑器详情_操作棍布局_角度数字.string = itemLine.data.rotation
                // this.编辑器详情_X位置.string = itemLine.data.x
                // this.编辑器详情_Y位置.string = itemLine.data.y
                this.编辑器详情_层级.string = itemLine.data.zIndex
                break;
        }
    }

    setDataByName(name){
        switch (name){
            case ItemPreType.点:

                let itemPoint = this.data.data.editData.node.getComponent(name)
                // let data = {
                //     allowInOutIndexs : [],
                //     index : 0,
                //     isStart : false,
                //     x: this.node.x,
                //     y: this.node.y
                // }

                ccLog.log("这个数组", itemPoint.data.allowInOutIndexs)

                  itemPoint.data.index =Number(this.编辑器详情_编号.string)
                itemPoint.data.allowInOutIndexs =  Utils.strToArr(this.编辑器详情_点布局_允许进入.string )
                    itemPoint.data.isStart =  this.编辑器详情_点布局_是否起点.isChecked
                itemPoint.data.x =  Number(this.编辑器详情_X位置.string)
                itemPoint.data.y = Number(this.编辑器详情_Y位置.string )

                itemPoint.data.zIndex = Number(this.编辑器详情_层级.string)

                itemPoint.initNode()
                break;
            case ItemPreType.线:

                let itemLineBG = this.data.data.editData.node.getComponent(name)
                // let data = {
                // index : 0,
                //     group : 5,
                //     indexStart : 0,
                //     indexEnd : 0,
                //     rotation : 0,
                //     x: editData.position.x,
                //     y: editData.position.y,
                //     zIndex : 0
                // }


                itemLineBG.data.x =  Number(this.编辑器详情_X位置.string)
                itemLineBG.data.y = Number(this.编辑器详情_Y位置.string )
                itemLineBG.data.zIndex = Number(this.编辑器详情_层级.string)

                itemLineBG.data.group = Number(this.编辑器详情_线布局_组.string)
                itemLineBG.data.rotation = Number(this.编辑器详情_线布局_角度数字.string)
                itemLineBG.data.indexStart = Number(this.编辑器详情_线布局_从.string)
                itemLineBG.data.indexEnd = Number(this.编辑器详情_线布局_到.string)

                itemLineBG.initNode()
                break;
            case ItemPreType.钥匙:

                let itemLuckKey = this.data.data.editData.node.getComponent(name)
                // let data = {
                //     allowInOutIndexs : [],
                //     index : 0,
                //     isStart : false,
                //     x: this.node.x,
                //     y: this.node.y
                // }
                // this.编辑器详情_钥匙_从.string = itemLuckKey.data.index1+""
                // this.编辑器详情_钥匙_到.string = itemLuckKey.data.index2+""
                itemLuckKey.data.index =Number(this.编辑器详情_编号.string)
                // itemLuckKey.data.index1 =Number(this.编辑器详情_钥匙_从.string)
                // itemLuckKey.data.index2 =Number(this.编辑器详情_钥匙_到.string)
                itemLuckKey.data.x =  Number(this.编辑器详情_X位置.string)
                itemLuckKey.data.y = Number(this.编辑器详情_Y位置.string )

                itemLuckKey.data.zIndex = Number(this.编辑器详情_层级.string)

                itemLuckKey.initNode()
                break;
            case ItemPreType.操作棍:

                let itemLine = this.data.data.editData.node.getComponent(name)
                // let data = {
                //     allowInOutIndexs : [],
                //     index : 0,
                //     isStart : false,
                //     x: this.node.x,
                //     y: this.node.y
                // }

                // this.编辑器详情_编号.string = itemLine.data.index+""
                // this.编辑器详情_操作棍布局_角度数字.string = itemLine.data.rotation
                // // this.编辑器详情_X位置.string = itemLine.data.x
                // // this.编辑器详情_Y位置.string = itemLine.data.y
                // this.编辑器详情_层级.string = itemLine.data.zIndex

                itemLine.data.index =Number(this.编辑器详情_编号.string)
                itemLine.data.rotation = Number(this.编辑器详情_操作棍布局_角度数字.string)
                itemLine.data.zIndex = Number(this.编辑器详情_层级.string)

                itemLine.initNode()
                break;
        }
    }


    registerEmitter() {

    }
    removeEmitter() {
    }

    setData(data) {
        this.data = data
        ccLog.log("详细按钮布局数据是",data)
        this.initView()


        this.initViewByName( this.data.data.editData.itemName)


        this.initOnClick()

    }
    initOnClick(){
        this.编辑器详情_关闭.on(cc.Node.EventType.TOUCH_START, () => {
            if ( this.callbacks.successfulCallback) {
                this.callbacks.successfulCallback(this.data)
            }
            ccLog.log("有啥啊",this.callbacks)
            this.finshNo()
        }, this)
    }
    subclassCall(): any {
        return this
    }

    //线布局拉动条目
    onSliderLineLa(){
        let itemLineBG = this.data.data.editData.node.getComponent(ItemPreType.线)
        itemLineBG.data.rotation = this.编辑器详情_线布局_角度拉动条.progress*360
        this.编辑器详情_线布局_角度数字.string = itemLineBG.data.rotation
        itemLineBG.initNode()
    }



    // update (dt) {}
}
