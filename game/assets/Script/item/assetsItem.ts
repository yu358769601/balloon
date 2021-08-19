// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import UtilsDB from "../System/Utils/UtilsDB";
import Utils from "../System/Utils/Utils";
import ccLog from "../System/Log/ccLog";
import Tools from "../System/Utils/Tools";
import GetNode, {GetNodeType} from "../System/Utils/getNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AssetsItem extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';
    资源_钻石数字 : cc.Label = null
    // LIFE-CYCLE CALLBACKS:
    onDestroy(): void {
        this.removeEmitter()
    }
    registerEmitter() {
        Emitter.register('onAssetsRefresh', this.onAssetsRefresh,this)
        Emitter.register('onGetAssetsItem', this.onGetAssetsItem,this)
        Emitter.register('onAssetsShowHide', this.onAssetsShowHide,this)
        Emitter.register('onAssetsAddGemGetP', this.onAssetsAddGemGetP,this)
    }

    removeEmitter() {
        Emitter.remove('onAssetsRefresh', this.onAssetsRefresh,this)
        Emitter.remove('onGetAssetsItem', this.onGetAssetsItem,this)
        Emitter.remove('onAssetsShowHide', this.onAssetsShowHide,this)
        Emitter.remove('onAssetsAddGemGetP', this.onAssetsAddGemGetP,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
        this.node.opacity = 255
        this.initView()

        this.onAssetsRefresh()
    }
    initView(){
        // onAssetsShowHide
        // ccLog.log("有没有啊 初始化",this.资源_钻石数字)
       let data = {
            type: GetNodeType.纯查找,
            otherData: "资源_钻石数字",
            parentNode: this.node,
        }
        this.资源_钻石数字 = GetNode.getNode(data).getComponent(cc.Label)

    }
    onAssetsRefresh(){
        let assets = UtilsDB.getAssets()
        let gemString = Utils.valueparseInt(assets.gem)
        ccLog.log("有没有啊",gemString,this.node.active)
        this.资源_钻石数字.string = gemString
    }
    //显示资源预制体
    // Emitter.fire("onAssetsShowHide",true)
    onAssetsShowHide(selfName,b){
        if (b == true) {
            this.node.opacity = 255
            this.onAssetsRefresh()
        }else{
            this.node.opacity = 0
        }

    }

    onGetAssetsItem(selfName){

    }

    onAssetsAddGemGetP(selfName,self,callBack){
      let p =  Tools.convetOtherNodeSpace(this.资源_钻石数字.node,self.node)
        if (callBack) {
            callBack(self,p)
        }
    }

    start () {
    }

    // update (dt) {}
}
