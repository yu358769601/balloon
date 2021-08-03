// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;
export enum ClickitemActive {
    显示 = 0,
    隐藏 = 1,
}
@ccclass
export default abstract class BaseClickItem extends cc.Component {

    @property(
        {
            displayName: "其他参数"
        }
    )    // call cc.Enum
    public otherData : String  = "" ;

    //外面进来设置的参数
    data : any = null

    @property(
        {
            displayName: "是否可以被点击"
        }
    )
    clickTag : boolean = true

    @property(
        {
            type: cc.Enum(ClickitemActive),
            displayName: "显示类型"
        }
    )    // call cc.Enum
    public itemActive = ClickitemActive.显示;


    //调用者
    selfCall : any = null;


    removeBaseEmitter(){
        // Emitter.remove('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)
        // Emitter.remove('onEnterCheckPointStart', this.onEnterCheckPointStart,this)
    }
    registerBaseEmitter(){
        // Emitter.register('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)
        // Emitter.register('onEnterCheckPointStart', this.onEnterCheckPointStart,this)
    }
    onLoad () {
        this.initView()
        this.removeEmitter()
        this.removeBaseEmitter()
        this.registerEmitter()
        this.registerBaseEmitter()


        if (this.itemActive == ClickitemActive.隐藏) {
            this.node.active = false
        }
    }
    onDestroy(): void {
        // ccLog.log("清除")
        this.removeEmitter()
        this.removeBaseEmitter()
    }
    abstract removeEmitter()
    abstract registerEmitter()
    abstract subclassCall(): any;
    abstract initView()
    abstract setListener(listener)
    abstract setData(data)
    start () {

    }

    // update (dt) {}
}
