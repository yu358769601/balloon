// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import GetNode, {GetNodeType} from "../Utils/getNode";
import UtilsDB from "../Utils/UtilsDB";
import Emitter from "../Msg/Emitter";
import {ItemPreType} from "../Type/enums";
import Api from "../api/api";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DebugNode extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    private 测试节点关闭: cc.Node;
    private 测试广告code_1: cc.Node;
    private 测试广告code_2: cc.Node;
    private 测试广告code_3: cc.Node;
    private 测试广告code_4: cc.Node;
    private 假装过了一天: cc.Node;

    onLoad () {
        this.initView()
    }

    start () {

    }
    initView(){
        let data
         data = {
            type : GetNodeType.纯查找,
            otherData : "测试节点关闭",
            parentNode : this.node
        }
        this.测试节点关闭 = GetNode.getNode(data)

        this.测试节点关闭.on(cc.Node.EventType.TOUCH_START,()=>{
                this.node.active = false
        },this)


        data = {
            type : GetNodeType.纯查找,
            otherData : "测试广告code_1",
            parentNode : this.node
        }
        this.测试广告code_1 = GetNode.getNode(data)
        this.测试广告code_1.on(cc.Node.EventType.TOUCH_START,()=>{
                this.setTestADCode(1)
        },this)
        data = {
            type : GetNodeType.纯查找,
            otherData : "测试广告code_2",
            parentNode : this.node
        }
        this.测试广告code_2 = GetNode.getNode(data)
        this.测试广告code_2.on(cc.Node.EventType.TOUCH_START,()=>{
            this.setTestADCode(2)
        },this)
        data = {
            type : GetNodeType.纯查找,
            otherData : "测试广告code_3",
            parentNode : this.node
        }
        this.测试广告code_3 = GetNode.getNode(data)
        this.测试广告code_3.on(cc.Node.EventType.TOUCH_START,()=>{
            this.setTestADCode(3)
        },this)
        data = {
            type : GetNodeType.纯查找,
            otherData : "测试广告code_4",
            parentNode : this.node
        }
        this.测试广告code_4 = GetNode.getNode(data)
        this.测试广告code_4.on(cc.Node.EventType.TOUCH_START,()=>{
            this.setTestADCode(4)
        },this)
        data = {
            type : GetNodeType.纯查找,
            otherData : "假装过了一天",
            parentNode : this.node
        }
        this.假装过了一天 = GetNode.getNode(data)
        this.假装过了一天.on(cc.Node.EventType.TOUCH_START,()=>{
            UtilsDB.testOnlineGiftBag()
            Emitter.fire("onCheckOnlineGiftBag")
            let  data = {
                txt : "我现在过了一天和过一天有关的重置了"
            }
            // let cllbacks = {
            //     successfulCallback: this.newSkinDialogsuccessfulCallback,
            //     failureCallback: this.newSkinDialogfailureCallback
            // }
            Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
        },this)


    }


    setTestADCode(num) {
            Api.adCodeTest = num
        let  data = {
            txt : "现在测试广告code是"+ Api.adCodeTest
        }
        // let cllbacks = {
        //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        //     failureCallback: this.newSkinDialogfailureCallback
        // }
        Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
    }
    // update (dt) {}
}
