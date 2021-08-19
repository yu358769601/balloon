// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import UtilsAction from "../System/Utils/UtilsAction";
import UtilsNode from "../System/Utils/UtilsNode";
import GetNode, {GetNodeType} from "../System/Utils/getNode";

const {ccclass, property} = cc._decorator;


@ccclass
export default class ToastItem extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    吐司_文本内容 : cc.Label = null
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        // Emitter.remove('onOpenToast', this.onOpenToast,this)
        Emitter.remove('onCloseToast', this.onCloseToast,this)
    }
    registerEmitter(){
        // Emitter.register('onOpenToast', this.onOpenToast,this)
        Emitter.register('onCloseToast', this.onCloseToast,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()


        this.initView()

    }
    initCallback(callBack){

    }

     initView() {

         let data

         data = {
             type: GetNodeType.纯查找,
             otherData: "吐司_文本内容",
             parentNode: this.node
         }
         this.吐司_文本内容 = GetNode.getNode(data).getComponent(cc.Label)

    }

    start () {

    }
    // onOpenToast(selfName,data){
    //     // this.node.opacity = 255
    //     //
    //     // // this.label.node.opacity = 255
    //     // // this.bg.opacity = 140
    //     // this.label.string = showData.txt
    //     // UtilsAction.scaleToAndfadeIn(this.node,0.7,2,2,1,1,()=>{
    //     //     UtilsAction.fadeOut(this.node,1.5,()=>{
    //     //         UtilsNode.setNodeFromPool(this.node.name,this.node)
    //     //         // this.node.destroy()
    //     //     })
    //     // })
    //     ccLog.log("数据是 ",data)
    //     this.node.destroy()
    // }

    setData(data){
        ccLog.log("数据是 ",data)
        this.initView()
        // data: {txt: "进入游戏"}
        // name: "ToastItem"
        // zIndex: 100
        this.吐司_文本内容.string = data.data.txt
            UtilsAction.scaleToAndfadeIn(this.node,0.7,2,2,1,1,()=>{
                UtilsAction.fadeOut(this.node,1.5,()=>{
                    this.node.destroy()
                })
            })

        // this.node.destroy()
    }

    onCloseToast(){

    }
    // update (dt) {}
}
