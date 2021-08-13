// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ControlCommercial, {
    ControlCommercialItemName,
    ControlCommercialSceneId
} from "../control/controlCommercial";
import Emitter from "../System/Msg/Emitter";
import {DialogType} from "../System/Type/enums";
import ccLog from "../System/Log/ccLog";
import UtilsTime from "../System/Utils/UtilsTime";
import UtilsDB from "../System/Utils/UtilsDB";
import UtilsNode from "../System/Utils/UtilsNode";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemGetLuckBtn extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    限时礼包_时间计时 : cc.Label = null
    限时礼包_图标 : cc.Node = null


    onLoad () {

        this.initView()

    }

    initView(){
        let data
         data = {
            type : GetNodeType.纯查找,
            otherData : "限时礼包_时间计时",
            parentNode : this.node
        }
        this.限时礼包_时间计时 = GetNode.getNode(data).getComponent(cc.Label)
         data = {
            type : GetNodeType.纯查找,
            otherData : "限时礼包_图标",
            parentNode : this.node
        }
        this.限时礼包_图标 = GetNode.getNode(data)
    }
    startA(){
        this.lifeTime = ControlCommercial.getSceneData(
            ControlCommercialSceneId.游戏首页,
            ControlCommercialItemName.限时礼包奖励时间范围控制)

        this.startTimeCutDown(this.lifeTime*1000)



        UtilsAction.huangdongyongyuan( this.限时礼包_图标,null)
    }

    lifeTime : number = 0
    start () {





    }
    timeTag : boolean = false

    // 开始倒计时
    startTimeCutDown(time) {
        if (this.timeTag == false) {
            this.timeTag = true
            // ccLog.log("进来几次",this.timeTag)

            let startOsTime = UtilsTime.getTime();
            let allTime = time+startOsTime;
            // this.timeNode.getComponent(cc.Label).string = allTime;
            this.showTime(allTime,startOsTime)

            let scheduleCallback = () => {
                let newTime = this.showTime(allTime,startOsTime)
                // ccLog.log("现在去倒计时了吗 过程中 0 ",newTime)

                if ( newTime<= 0) {
                    this.stopTimeCutDown();
                }
                // this.timeNode.getComponent(cc.Label).string = nowTime;

            };
            // this.timeNode.active = true;
            // this.sprShaoDeng.active = true;
            this.schedule(scheduleCallback, 0.98);
        }


    }
    showTime(allTime,startOsTime) {
        let nowOsTime = UtilsTime.getTime();
        let nowTime = allTime - nowOsTime;

        let tt = UtilsTime.dateFormat("MM:SS", new Date(nowTime))
        this.限时礼包_时间计时.string = tt + ""

        return nowTime
    }

    stopTimeCutDown(){
        this.node.destroy()
    }

    // update (dt) {}
}
