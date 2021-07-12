// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemLuckKey extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';
    @property({
        displayName: "本身编号",
        tooltip: "本身编号",
        // type: cc.Integer
    })
    index : string = ""
    // LIFE-CYCLE CALLBACKS:
    //钥匙
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        this.initView()
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


    }
    initView(){

    }

    start () {

    }

    // update (dt) {}
}
