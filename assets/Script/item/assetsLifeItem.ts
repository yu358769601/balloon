// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import Utils from "../System/Utils/Utils";
import ccLog from "../System/Log/ccLog";
import Tools from "../System/Utils/Tools";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import UtilsTime from "../System/Utils/UtilsTime";
import JsonManager from "../System/manage/JsonManager";
import UtilsNode from "../System/Utils/UtilsNode";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AssetsLifeItem extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';
    资源_钻石数字: cc.Label = null
    体力_计时: cc.Label = null
    体力_减少: cc.Label = null
    体力_减少P: cc.Vec2 = null

    // LIFE-CYCLE CALLBACKS:
    onDestroy(): void {
        this.removeEmitter()
    }

    registerEmitter() {
        Emitter.register('onAssetsLifeRefresh', this.onAssetsLifeRefresh, this)
        Emitter.register('onAssetsLifeAdd', this.onAssetsLifeAdd, this)
        Emitter.register('onGetAssetsLifeItem', this.onGetAssetsLifeItem, this)
        Emitter.register('onAssetsLifeShowHide', this.onAssetsLifeShowHide, this)
        Emitter.register('onAssetsLifeAddGemGetP', this.onAssetsLifeAddGemGetP, this)
    }

    removeEmitter() {
        Emitter.remove('onAssetsLifeRefresh', this.onAssetsLifeRefresh, this)
        Emitter.remove('onAssetsLifeAdd', this.onAssetsLifeAdd, this)
        Emitter.remove('onGetAssetsLifeItem', this.onGetAssetsLifeItem, this)
        Emitter.remove('onAssetsLifeShowHide', this.onAssetsLifeShowHide, this)
        Emitter.remove('onAssetsLifeAddGemGetP', this.onAssetsLifeAddGemGetP, this)
    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()
        // this.node.opacity = 255
        this.initView()


    }


    initView() {
        // onAssetsShowHide
        // ccLog.log("有没有啊 初始化",this.资源_钻石数字)
        let data = {
            type: GetNodeType.纯查找,
            otherData: "资源_钻石数字",
            parentNode: this.node,
        }
        this.资源_钻石数字 = GetNode.getNode(data).getComponent(cc.Label)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "体力_计时",
            parentNode: this.node,
        }
        this.体力_计时 = GetNode.getNode(data).getComponent(cc.Label)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "体力_减少",
            parentNode: this.node,
        }
        this.体力_减少 = GetNode.getNode(data).getComponent(cc.Label)
        this.体力_减少P = this.体力_减少.node.getPosition()

    }

    onAssetsLifeRefresh() {
        let assets = UtilsDB.getLifeAssets()
        // let gemString = Utils.valueparseInt(assets.life)
        // ccLog.log("有没有啊",gemString,this.node.active)
        this.资源_钻石数字.string = assets.life


        if (this.checkLifeMax() == false) {

            // ccLog.log("怎么说呢",JsonManager.passSettingjson)
            this.startTimeCutDown(JsonManager.passSettingjson.countDownTime)
        }else{
            UtilsNode.show(this.资源_钻石数字,true)
            ccLog.log("为什么不显示呢",this.资源_钻石数字)
        }
    }
    onAssetsLifeAdd(selfName,count) {
        let temp = "+"
        if (count<0) {
            // temp = "-"
            temp = ""
        }
        this.体力_减少.string =temp+ count
        UtilsNode.show(this.体力_减少.node,true)
        UtilsAction.moveByfadeOut(this.体力_减少.node,2,0,100,()=>{

            this.体力_减少.node.setPosition(this.体力_减少P)
            UtilsNode.show(this.体力_减少.node,false)
        })
    }

    //显示资源预制体
    // Emitter.fire("onAssetsLifeShowHide",true)
    onAssetsLifeShowHide(selfName, b) {
        if (b == true) {
            this.node.opacity = 255
            this.onAssetsLifeRefresh()
        } else {
            this.node.opacity = 0
        }

    }

    onGetAssetsLifeItem(selfName) {

    }

    onAssetsLifeAddGemGetP(selfName, self, callBack) {
        let p = Tools.convetOtherNodeSpace(this.资源_钻石数字.node, self.node)
        if (callBack) {
            callBack(self, p)
        }
    }

    start() {
        // this.onAssetsLifeRefresh()

        // if ( this.checkLifeMax() == false) {
        //     this.startTimeCutDown(JsonManager.passSettingjson.countDownTime)
        // }


    }

    timeTag: boolean = false

    // 开始倒计时
    startTimeCutDown(time) {
        ccLog.log("现在去倒计时了吗 0 ",this.timeTag,time)
        if (this.timeTag == false) {
            this.timeTag = true
            // ccLog.log("进来几次",this.timeTag)
            let allTime = time;
            let startOsTime = UtilsTime.getTime();
            // this.timeNode.getComponent(cc.Label).string = allTime;
            this.showTime(allTime,startOsTime)

            let scheduleCallback = () => {
                let newTime = this.showTime(allTime,startOsTime)
                ccLog.log("现在去倒计时了吗 过程中 0 ",newTime)

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
        let lifeAssets = UtilsDB.getLifeAssets()
        let nowOsTime = UtilsTime.getTime();
        let nowTime = allTime - Math.floor((nowOsTime - startOsTime));
        if (lifeAssets.life <= 0) {
            if (this.资源_钻石数字.string !=  lifeAssets.life + "") {
                this.资源_钻石数字.string = lifeAssets.life + ""
            }
            UtilsNode.show(this.体力_计时.node,true)
            UtilsNode.show(this.资源_钻石数字.node,false)
            // this.体力_计时.node.active = true
            let tt = UtilsTime.dateFormat("MM:SS", new Date(nowTime))
            this.体力_计时.string = tt + ""
        }else{
            UtilsNode.show(this.体力_计时.node,false)
            UtilsNode.show(this.资源_钻石数字.node,true)
            // this.体力_计时.node.active = false
        }
        return nowTime
    }


    // 停止倒计时
    stopTimeCutDown() {
        // this.timeNode.getComponent(cc.Label).unscheduleAllCallbacks();
        // this.timeNode.active = false;
        // this.sprShaoDeng.active = false;

        if (this.timeTag == true) {
            this.timeTag = false
            let addGemData = {
                type: AssetsType.体力,
                count: JsonManager.passSettingjson.countDownTimeAddLife,
                // callbackGem_donthave : this.callbackGem_donthaveAdd,
                // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
                // callbackGem_subsucceed : this.callbackGem_subsucceed
            }
            // Emitter.fire("onEduShowIndex",2)
            UtilsDB.addLifeAssets(addGemData)
            let assets = UtilsDB.getLifeAssets()
            // let gemString = Utils.valueparseInt(assets.life)
            // ccLog.log("有没有啊",gemString,this.node.active)
            this.资源_钻石数字.string = assets.life

            if (this.checkLifeMax() == false) {
                ccLog.log("重新开始加体力")
                this.unscheduleAllCallbacks()
                this.timeTag = false
                this.startTimeCutDown(JsonManager.passSettingjson.countDownTime)

            } else {
                this.unscheduleAllCallbacks()
            }
        }


    }

    //检查现在体力 满不满
    checkLifeMax() {
        //         // 体力
        //             life: 20,
        //             //体力最大
        //             lifeMax: 40,
        let lifeAssets = UtilsDB.getLifeAssets()
        if (lifeAssets.life >= lifeAssets.lifeMax) {
            return true
        } else {
            return false
        }


    }


    // update (dt) {}
}
