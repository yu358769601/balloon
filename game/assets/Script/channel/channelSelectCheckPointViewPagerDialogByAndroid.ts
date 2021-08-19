// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Helloworld from "../Helloworld";
import Utils from "../System/Utils/Utils";
import ChannelManger from "../System/qudao/channelManger";
import GetNode, {GetNodeType} from "../System/Utils/getNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChannelSelectCheckPointViewPagerDialogByAndroid extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    private hello: Helloworld;
    private 隐私协议: cc.Node;

   async onLoad () {
       // this.hello =  this.node.parent.getComponent("Helloworld")
        this.initView()

       if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
           this.隐私协议.active = true
           this.隐私协议.on(cc.Node.EventType.TOUCH_START,()=>{
               // qudaoCommon.showClDialog()
               ChannelManger.getInstance().getChannel().showClDialog()
           },this)
       }
        // if (qudaoCommon.qudao == platform_Android ||
        //     qudaoCommon.qudao == platform_Android_oppo ||
        //     qudaoCommon.qudao ==platform_Android_mi
        // ) {
        //     this.隐私协议.active = true
        //     this.隐私协议.on(cc.Node.EventType.TOUCH_START,()=>{
        //         qudaoCommon.showClDialog()
        //     },this)
        // }else{
        //
        // }
    }
    initView(){
        let data
        data = {
            type : GetNodeType.开始隐藏通过参数显示,
            otherData : "隐私协议",
            parentNode : this.node.parent
        }
        this.隐私协议 =  GetNode.getNode(data)


    }
    start () {

    }

    // update (dt) {}
}
