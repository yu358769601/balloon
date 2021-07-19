// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import ItemBase from "./itemBase";
import {ItemPreType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemLuckKey extends ItemBase {

    // @property(cc.Label)
    // label: cc.Label = null;
    data : any = null
    // @property
    // text: string = 'hello';
    @property({
        displayName: "本身编号",
        tooltip: "本身编号",
        // type: cc.Integer
    })
    index : string = ""


    index1: string = ""
    index2: string = ""
    // LIFE-CYCLE CALLBACKS:
    //钥匙
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

    }

    removeEmitter() {
        Emitter.remove('onGetKey', this.onGetKey, this)
    }

    registerEmitter() {
        Emitter.register('onGetKey', this.onGetKey, this)
    }
    //index
    onGetKey(selfName,data){

        // ccLog.log("到这里了吗",data)
        if (data.index!= null) {

            if (data.index == this.index) {

                data.callBack(data,this)
            }
        }
        // if (data.index1 == this.index1 && data.index2 == this.index2 ) {
        //     data.callBack(data,this)
        // }else if (data.index1 == this.index2 && data.index2== this.index1) {
        //     data.callBack(data,this)
        // }

    }
    setData(data){
        this.data = data

        this.initView()

        this.initNode()
    }
    initNode(){
        ccLog.log("钥匙数据",this.data)
        // index: 2
        // typeName: "itemLuckKey"
        // x: -436.747
        // y: -241.279
      this.index = this.data.index

        this.index1 = this.data.index1
        this.index2 = this.data.index2


        this.node.setPosition(this.data.x,this.data.y)

        this.node.zIndex = this.data.zIndex
    }

    initView(){

    }

    start () {

    }
    setEdit(editData){
        this.addComponent("controlMaterial").setData(editData)
        // //编辑点的时候要有 图片
        this.getComponent(cc.Sprite).enabled = true
    }
    setEditData(editData) {
        this.editData = editData
        this.initView()
        this.addComponent("controlMaterial").setData(editData)

        //编辑点的时候要有 图片
        this.getComponent(cc.Sprite).enabled = true

        //新创建的
        let data = {
            typeName : ItemPreType.钥匙,
            index : 0,
            index1 : 0,
            index2 : 0,
            x: editData.position.x,
            y: editData.position.y,
            zIndex : 0
        }
        this.data = data
        this.initNode()
    }

    // update (dt) {}
}
