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
import {DialogType, ItemPreType} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;




@ccclass
export default class ItemMaterialBtn extends cc.Component {
//棍子
    data : any = null
    //
    private 编辑器工具箱_条目: cc.Node;
    private 编辑器工具箱_名字: cc.Label;

    nameLists : {}  = null


    setData(data) {
        this.data = data
        ccLog.log("本关所有内容 杆子",data)
        this.initView()
        
        this.initOnClick()





        this.initUI()
    }
    initUI(){
        // ItemPreType.点, ItemPreType.线, ItemPreType.钥匙,ItemPreType.操作棍
        this.nameLists = {}
        this.nameLists[ItemPreType.点] = "点"
        this.nameLists[ItemPreType.线] = "线"
        this.nameLists[ItemPreType.钥匙] = "钥匙"
        this.nameLists[ItemPreType.操作棍] = "操作棍"

        this.编辑器工具箱_名字.string = this.nameLists[this.data.name]

    }



    onLoad() {
        this.removeEmitter()
        this.registerEmitter()

    }


    protected onDestroy(): void {
        this.removeEmitter()
    }

    initView(){
        let data
         data = {
            type : GetNodeType.纯查找,
            otherData : "编辑器工具箱_条目",
            parentNode : this.node
        }
        this.编辑器工具箱_条目 = GetNode.getNode(data)

         data = {
            type : GetNodeType.纯查找,
            otherData : "编辑器工具箱_名字",
            parentNode : this.node
        }
        this.编辑器工具箱_名字 = GetNode.getNode(data).getComponent(cc.Label)
    }


    removeEmitter() {
        Emitter.remove('onSwitchItemMaterialBtn', this.onSwitchItemMaterialBtn, this)
        Emitter.remove('onNoSwitchItemMaterialBtn', this.onNoSwitchItemMaterialBtn, this)
    }

    registerEmitter() {
        Emitter.register('onSwitchItemMaterialBtn', this.onSwitchItemMaterialBtn, this)
        Emitter.register('onNoSwitchItemMaterialBtn', this.onNoSwitchItemMaterialBtn, this)
    }

    start() {

    }


    onSwitchItemMaterialBtn(selfName,data){
        if (data.name != this.data.name) {
           this.onNoSwitchItemMaterialBtn()
        }
    }

    onNoSwitchItemMaterialBtn(selfName,data){
            this.编辑器工具箱_条目.stopAllActions()
            this.编辑器工具箱_条目.opacity = 255
    }



    private initOnClick() {
        this.编辑器工具箱_条目.on(cc.Node.EventType.TOUCH_END,()=>{
                UtilsAction.fadeOutToInRepeatForever(this.编辑器工具箱_条目,0.5,0.25,null)
            //发给其他人
            Emitter.fire("onSwitchItemMaterialBtn",this.data)
            //发给游乐场
            Emitter.fire("onSetSelectItemMaterialBtn",this.data)

        },this)

    }
}