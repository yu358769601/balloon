// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GetNode, {GetNodeType} from "../System/Utils/getNode";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import ItemBase from "./itemBase";
import UtilsNode from "../System/Utils/UtilsNode";
import {EffectsType, ItemPreType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemPoint extends ItemBase {
//节点

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';
    isStart : boolean = false
    // LIFE-CYCLE CALLBACKS:
    @property({
        displayName: "本身编号",
        tooltip: "本身编号",
        // type: cc.Integer
    })
    index : string = ""


    @property({
        displayName: "允许进出的编号",
        tooltip: "允许进出的编号",
        type: cc.String
    })
    allowInOutIndexs : string[] = []


    // @property({
    //     displayName: "允许出去的编号",
    //     tooltip: "允许出去的编号",
    //     type: cc.Integer
    // })
    // allowOutIndexs : number[] = []



    //记录
    allowInIndexsSet : number[] = []
    private 标记: cc.Node;

    private 点数字提示: cc.Label;


    //index
    onEndNodeShow(selfName,data){
        if (data.index2 != null) {
            UtilsNode.show(this.标记,false)
            //让下一个 可以 移动的点 发亮
            for (let i = 0; i < this.allowInOutIndexs.length; i++) {
                if (this.allowInOutIndexs[i] ==data.index2 ) {
                    UtilsNode.show(this.标记,true)
                    break
                }
            }
        }


    }



    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

    }

    private initView() {
        let  data
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "标记",
            parentNode: this.node,
        }
        this.标记 = GetNode.getNode(data)

        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "点数字提示",
            parentNode: this.node,
        }
        this.点数字提示 = GetNode.getNode(data).getComponent(cc.Label)
    }

    onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onEndNodeShow', this.onEndNodeShow, this)
    }

    registerEmitter() {
        Emitter.register('onEndNodeShow', this.onEndNodeShow, this)
    }

    setData(data){
        this.data = data
        this.initView()

        this.initNode()
    }
    setEdit(editData){
        this.addComponent("controlMaterial").setData(editData)
        // //编辑点的时候要有 图片
        this.getComponent(cc.Sprite).enabled = true

        UtilsNode.show(this.点数字提示.node,true)
    }
   async setEditData(editData){
        this.editData = editData
       this.initView()
        ccLog.log("编辑数据位置",editData)
        this.addComponent("controlMaterial").setData(editData)


        // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
        // node.getComponent(ItemPreType.具体编辑条目提示).setData(data)

       //编辑点的时候要有 图片
       this.getComponent(cc.Sprite).enabled = true

       UtilsNode.show(this.点数字提示.node,true)

       //新创建的
       let data = {
            typeName : ItemPreType.点,
           allowInOutIndexs : [],
           index : 0,
           isStart : false,
           x: editData.position.x,
           y: editData.position.y,
           zIndex : 0
       }
        this.data = data
       this.initNode()
    }

    openEffects(){

        this.node.scale = 3

        //特效
        let dataEffects = {
            nodeP : this.node
        }
        Emitter.fire("onOpenEffects",{name : EffectsType.关卡接上掉金币,zIndex : 100,data:dataEffects},null)
    }

    initNode(){
        // allowInOutIndexs: Array(3)
        // 0: "2"
        // 1: "4"
        // 2: "1"
        // length: 3
        // __proto__: Array(0)
        // index: 0
        // isStart: true
        // typeName: "itemPoint"
        // x: -266.818
        // y: 228.048
        ccLog.log("点数据",this.data)
        this.allowInOutIndexs = this.data.allowInOutIndexs
        this.index = this.data.index

        this.isStart = this.data.isStart

        if (this.isStart == true) {
            this.addComponent("itemStart")
        }else{
            UtilsNode.removeComponent(this.node, "itemStart")
        }

        this.node.zIndex = this.data.zIndex
        this.node.setPosition(this.data.x,this.data.y)
        this.点数字提示.string = this.data.index+""
        ccLog.log("点数字提示",this.点数字提示)
    }
    start () {

    }

    // update (dt) {}
}
