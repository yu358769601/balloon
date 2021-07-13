// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GetNode, {GetNodeType} from "../System/Utils/getNode";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemPoint extends cc.Component {
//节点

    data : any = null
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


    //index
    onEndNodeShow(selfName,data){
        if (data.index2 != null) {
            this.标记.active = false
            //让下一个 可以 移动的点 发亮
            for (let i = 0; i < this.allowInOutIndexs.length; i++) {
                if (this.allowInOutIndexs[i] ==data.index2 ) {
                    this.标记.active = true
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
        }

        this.node.setPosition(this.data.x,this.data.y)

    }
    start () {

    }

    // update (dt) {}
}
