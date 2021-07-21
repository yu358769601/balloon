// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDialog from "../dialog/BaseDialog";
import BaseDialogNoAd from "../dialog/BaseDialogNoAd";
import UtilsAction from "../System/Utils/UtilsAction";
import ccLog from "../System/Log/ccLog";
import Utils from "../System/Utils/Utils";
import GetNode, {GetNodeType} from "../System/Utils/getNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddGemItem extends BaseDialogNoAd {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    private data: any;
    private callbacks: any;
    private 钻石: cc.Node;

    startPoint : cc.Vec2 = null
    endPoint : cc.Vec2 = null

    goldNodeList : cc.Node[] = []

    onLoad () {
        super.onLoad()

        this.initView()
        this.setRandom(this.钻石 )
    }

    start () {
        super.start()
    }

    initCallback(callbacks) {
        this.callbacks = callbacks
        // this.callbacks.ItemPreTypesuccessfulCallback
    }

    registerEmitter() {
    }

    removeEmitter() {
    }
    initView(){
        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "钻石",
            parentNode: this.node,
        }
        this.钻石 = GetNode.getNode(data)
    }
    setData(data) {

    }

    subclassCall(): any {
        return this
    }
    // update (dt) {}






  async  setRandom(node : cc.Node){
      let r =  Utils.random(20,50)/100
        this.钻石.width*=r
        this.钻石.height*=r
        let rr =  Utils.random(0,360)
        this.钻石.angle = rr


      UtilsAction.turnUpRepeatForever(node,1)


       await Utils.setTimerOnce(this,5)
        this.node.destroy()

    }

}
