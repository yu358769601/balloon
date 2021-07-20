// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Helloworld from "../Helloworld";
import Utils from "../System/Utils/Utils";
import ChannelBase from "./channelBase";
import ccLog from "../System/Log/ccLog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChannelHelloWroldByAndroid extends ChannelBase {


    // LIFE-CYCLE CALLBACKS:
    private hello: Helloworld;
    private 忠告: cc.Node;

    async init(hello: Helloworld) {
        this.hello = hello
        this.initView()
        // ccLog.log("现在我是什么渠道", qudaoCommon.qudao._name)
        // if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
        //     this.忠告.active = true
        //     ccLog.log("现在我是什么渠道 亮起来", this.忠告)
        //     await Utils.setTimerOnce(this, 5)
        //     this.忠告.active = false
        //     this.hello.startLoad()
        // } else {
        //     this.hello.startLoad()
        // }

        UtilsNode.show(this.忠告,true)
        ccLog.log("现在我是什么渠道 亮起来", this.忠告)
        await Utils.setTimerOnce(this, 0.5)
        UtilsNode.show(this.忠告,false)
        this.hello.startLoad()
    }

    async onLoad() {
    }

    initView() {
        let data
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "忠告",
            parentNode: this.node
        }
        this.忠告 = GetNode.getNode(data)
    }

    start() {

    }

    registerEmitter() {
    }

    removeEmitter() {
    }

    // update (dt) {}
}
