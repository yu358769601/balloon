// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {instance} from "../../scripts/Joystick";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import Vec2 = cc.Vec2;
import Size = cc.Size;
import ItemBase from "./itemBase";
import {ItemPreType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemLineBG extends ItemBase {
//下面的临时点

    // LIFE-CYCLE CALLBACKS:
    // @property({
    //     displayName: "本身编号",
    //     tooltip: "本身编号",
    //     // type: cc.Integer
    // })
    index : string = ""

    // data : any = null


    // LIFE-CYCLE CALLBACKS:
    @property({
        displayName: "从几号",
        tooltip: "从几号",
        // type: cc.Integer
    })
    index1 : string = ""

    @property({
        displayName: "到几号",
        tooltip: "到几号",
        // type: cc.Integer
    })
    index2 : string = ""

    @property({
        displayName: "起点节点",
        tooltip: "起点节点",
        type: cc.Node
    })
    startNode : cc.Node = null
    @property({
        displayName: "终点节点",
        tooltip: "终点节点",
        type: cc.Node
    })
    endNode : cc.Node = null


    @property({
        displayName: "长度有多少组",
        tooltip: "长度有多少组",
        // type: cc.Node
    })
    group : number = 1
    @property({
        displayName: "每组有多长",
        tooltip: "每组有多长",
        // type: cc.Node
    })
        //默认 高32 宽52
    groupWidthLength : number =52

    @property({
        displayName: "每组有多宽",
        tooltip: "每组有多宽",
        // type: cc.Node
    })
        //默认 高32 宽52
    groupHeightLength : number =32


    中距离: cc.Node = null
    中皮肤: cc.Node = null

    线数字提示1 : cc.Label = null
    线数字提示2 : cc.Label = null


    private moveDir: cc.Vec2;


    onSetWideth(selfName,data){
        if (data) {
            this.groupWidthLength = data.width
            this.groupHeightLength = data.height
        }
        ccLog.log("中距离有吗", this.中距离)

        this.中距离.width = this.groupWidthLength*this.group
        this.中皮肤.width = this.groupWidthLength*this.group
        this.中距离.height = this.groupHeightLength
        ccLog.log("中距离设置多长",this.data,this.中距离.width)

        let boxCollider = this.中距离.getComponent(cc.BoxCollider)
        boxCollider.offset = new Vec2(this.中距离.width/2,0)
        boxCollider.size = new Size(this.中距离.width,this.中距离.height)

        this.中距离.opacity = 250


    }


    showNode(){
        if (this.中距离.opacity == 250) {
            this.中距离.opacity = 255
        }else if (this.中距离.opacity == 255) {
            ccLog.log("中距离设置多长该爆炸了")

            Emitter.fire("onGameOverCall")
        }
    }


    setData(data){
        this.data = data
        this.initView()
        this.initNode()


    }
    initNode(){
        ccLog.log("线数据",this.data)
        // group: 4
        // indexEnd: 2
        // indexStart: 0
        // rotation: 93
        // typeName: "itemLineBG"
        // x: -266.896
        // y: 236.985

        this.group = this.data.group
        this.index1 = this.data.indexStart+""
        this.index2 = this.data.indexEnd+""
        this.node.angle = this.data.rotation

        this.node.setPosition(this.data.x,this.data.y)

        this.onSetWideth(null,null)

        this.线数字提示1.string = this.data.indexStart+""
        this.线数字提示2.string = this.data.indexEnd+""

    }
    setEdit(editData){
        this.addComponent("controlMaterial").setData(editData)
        // //编辑点的时候要有 图片
        this.getComponent(cc.Sprite).enabled = true

        this.线数字提示1.node.active = true
        this.线数字提示2.node.active = true
    }
    setEditData(editData) {
        this.editData = editData
        this.initView()
        this.addComponent("controlMaterial").setData(editData)
        // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
        // node.getComponent(ItemPreType.具体编辑条目提示).setData(data)

        //编辑点的时候要有 图片
        this.getComponent(cc.Sprite).enabled = true
        this.线数字提示1.node.active = true
        this.线数字提示2.node.active = true
        // this.group = this.data.group
        // this.index1 = this.data.indexStart+""
        // this.index2 = this.data.indexEnd+""
        // this.node.angle = this.data.rotation


        //新创建的
        let data = {
            typeName : ItemPreType.线,
            group : 5,
            indexStart : 0,
            indexEnd : 0,
            rotation : 0,
            x: editData.position.x,
            y: editData.position.y,
            zIndex : 0
        }
        this.data = data
        this.initNode()
    }


    onLoad() {
        this.removeEmitter()
        this.registerEmitter()



        // ccLog.log("我的参数",this.node.rotation)



    }

    onTouchStart(event: cc.Event.EventTouch, data) {
        Emitter.fire("onLineTOUCH_START")

    }

    onTouchMove(event: cc.Event.EventTouch, data) {
        // this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
    }

    onTouchEnd(event: cc.Event.EventTouch, data) {
        // this._speedType = data.speedType;
        Emitter.fire("onLineTOUCH_END")
    }

    protected onDestroy(): void {
        this.removeEmitter()
    }

    initView(){
        let data
         data = {
            type : GetNodeType.纯查找,
            otherData : "中距离",
            parentNode : this.node
        }
        this.中距离 = GetNode.getNode(data)
         data = {
            type : GetNodeType.纯查找,
            otherData : "中皮肤",
            parentNode : this.node
        }
        this.中皮肤 = GetNode.getNode(data)

        this.中距离.on(cc.Node.EventType.TOUCH_END,()=>{
            ccLog.log("点击的数据是 我是背景棍子 ",this.data)
        },this)


        data = {
            type : GetNodeType.开始隐藏通过参数显示,
            otherData : "线数字提示1",
            parentNode : this.node
        }
        this.线数字提示1 = GetNode.getNode(data).getComponent(cc.Label)

        data = {
            type : GetNodeType.开始隐藏通过参数显示,
            otherData : "线数字提示2",
            parentNode : this.node
        }
        this.线数字提示2 = GetNode.getNode(data).getComponent(cc.Label)

    }


    removeEmitter() {
    }

    registerEmitter() {
    }

    start() {

    }
    getControlNode(data){
        ccLog.log("进来对比的数据"," 本身类型 "," 进来其他数据 ",data)

        // ccLog.log("疑问比对 0 ","进来的数据是",data.otherData.trim(),data.otherData.trim()==this.otherData.trim())
        // if (data.otherData == this.otherData) {
        //     // ccLog.log("疑问比对 1 "," 进来类型 ",data.type ," 本身类型 ", this.nodeType ," 进来其他数据 ",data.otherData.trim() , " 本身其他数据 ",this.otherData.trim())
        // }

        if (data.index2!=null) {

            if (data.index1!=null) {
                if (data.index1 == this.index1 && data.index2 == this.index2 ) {
                    return this.node
                }else if (data.index1 == this.index2 && data.index2== this.index1) {
                    return this.node
                }
            }else{
                ccLog.log("走了很多回吗",this.node ,data.index1 ,data.index2 )
                return this.node
            }


            console.error("定位系统","===>","检测警告","===>","具体内容","===>","有如下其他数据相同但是类型不同请查找",data.index1 ,data.index2 ,"我本身",this.index1, this.index2 )

        }
        return  null
        // if (data.index1 == this.index1 && data.otherData.trim() == this.otherData.trim()){
        //     return this.node
        // }else if (data.type != this.nodeType &&data.otherData.trim() == this.otherData.trim()) {
        //     console.error("定位系统","===>","检测警告","===>","具体内容","===>","有如下其他数据相同但是类型不同请查找",this.otherData.trim())
        // }
    }


    update(dt) {
    }

}