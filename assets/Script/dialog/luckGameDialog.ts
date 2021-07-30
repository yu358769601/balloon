// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDialog from "./BaseDialog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {DialogType, ItemPreType} from "../System/Type/enums";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import JsonManager from "../System/manage/JsonManager";
import UtilsNode from "../System/Utils/UtilsNode";
import Utils from "../System/Utils/Utils";
import UtilsTime from "../System/Utils/UtilsTime";
import UtilsAction from "../System/Utils/UtilsAction";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LuckGameDialog extends BaseDialog {


    // LIFE-CYCLE CALLBACKS:
    data : any = null

    listSetPs : cc.Vec2[] = []


    onLoad () {
        super.onLoad()
    }
    onDestroy() {
        super.onDestroy();
    }
    start () {

    }

    initCallback(callbacks) {

    }

    registerEmitter() {
        Emitter.register('onItemBalloonBoom', this.onItemBalloonBoom, this)
    }

    removeEmitter() {
        Emitter.remove('onItemBalloonBoom', this.onItemBalloonBoom, this)
    }

    clickCount : number = 0



   async onItemBalloonBoom(selfName,itemBalloon){
        let position = itemBalloon.node.getPosition();

       if (this.clickCount == 0) {
            this.startTime()
       }
       this.clickCount++

       //掉皮皮
       let tempList =  Utils.getCirclePoints(1000,new cc.Vec2(0,0),Utils.random(6,10),1000)
       Emitter.fire("onPlaySound",SoundType.气球爆了扎气球时,1)
       for (let i = 0; i < tempList.length; i++) {
           let item =  await UtilsNode.getNode(ItemPreType.爆炸条目,this.扎气球_金币区)
           // item.setPosition(temp[i])
           let addGemItem = item.getComponent(ItemPreType.爆炸条目)
           addGemItem.setData({type :itemBalloon.type })
           addGemItem.node.setPosition(position)
           addGemItem.startAction(tempList[i])
       }

       Emitter.fire("onPlaySound",SoundType.超级奖励金币向上飞的时候2跟在1后播放,1)


        //掉金币
        for (let i = 0; i < 5; i++) {
            let item =  await UtilsNode.getNode(ItemPreType.金币条目,this.扎气球_金币区)
            // item.setPosition(temp[i])
            let addGemItem = item.getComponent(ItemPreType.金币条目)
            addGemItem.setData({})
            addGemItem.node.setPosition(position)
            addGemItem.startAction(this.扎气球_金币下限Y)
          await  Utils.setTimerOnce(this,0.02)
        }
       Emitter.fire("onPlaySound",SoundType.超级奖励金币向上飞的时候1,1)
       this.isItemBalloons()

    }

    isTime : boolean = true


    startTime(){
        let countDownCb = () =>{
            if (this.isTime == false) {
                return
            }
            this.CountdownTime-=1
            if (this.isTime == false) {
                return
            }
                if (this.CountdownTime <= 0) {
                    // let tt =  UtilsTime.dateFormat("MM:SS", new Date(data.timeEnd - time))
                    // this.倒计时文本.string = tt
                    //
                    // this.data.tt1 = tt.split(":")[0]
                    // this.data.tt2 = tt.split(":")[1]

                    // Emitter.fire("onGetOnlineGiftBagData",{
                    //     type : this.runType ,
                    //     tt : tt ,
                    // })

                    this.setTime()

                    if (this.isTime == false) {
                        return
                    }
                    this.unschedule(countDownCb)
                    this.isTime =false
                    this.endLuckGame()
                }else{

                    this.setTime()
                }




            }



        this.schedule(countDownCb,1)
    }

    CountdownTime :number = 0


    async endLuckGame(){
        this.扎气球_吞噬.active = true
        let golds : cc.Node[] = []
        let listComponents =  this.扎气球_金币区.getComponentsInChildren("itemGold")
        for (let i = 0; i <listComponents.length ; i++) {
            let item =  listComponents[i]
            golds.push(item.node)
            UtilsAction.moveTo(item.node,1,this.扎气球_金币显示.x,this.扎气球_金币显示.y,null)
        }

      await  Utils.setTimerOnce(this,1)

        for (let i = 0; i <listComponents.length ; i++) {
            let item =  listComponents[i]
            item.node.destroy()
        }

       let gold = this.clickCount*JsonManager.passSettingjson.GoLuckGameGold

        this.扎气球_得到金币.string = gold+""





        let addGemData = {
            type : AssetsType.钻石,
            count : gold,
            // callbackGem_donthave : this.callbackGem_donthaveAdd,
            // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
            // callbackGem_subsucceed : this.callbackGem_subsucceed
        }
        UtilsDB.addAssets(addGemData)

        let cllbacks = {
            // self : this,
            successfulCallback: this.successfulCallback,
            // failureCallback: this.failureCallback
        }
        let data = {
            self : this,
            gold : gold
        }

        Emitter.fire("onOpenDialog", {name: DialogType.扎气球得到奖励, zIndex: 100,data : data}, cllbacks)
        // await  Utils.setTimerOnce(this,5)
        ccLog.log("扎气球游戏完毕")
        // this.node.destroy()
        // Emitter.fire("onNextPass",this.data.data)

    }


    successfulCallback(self){
        // this.node.destroy()
        // Emitter.fire("onNextPass",this.data.data)

        self.node.destroy()

    }


    setData(data) {
        this.data = data
        this.initView()
        this.initOnClick()

        this.CountdownTime = JsonManager.passSettingjson.GoLuckGameCountdown
        this.setTime()
        // GoLuckGameCountdown

        this.addItem()

        Emitter.fire("onAssetsShowHide",false)
        Emitter.fire("onAssetsLifeShowHide",false)

    }

    setTime(){
        this.扎气球_倒计时时间.string =   this.CountdownTime+""
    }


   async addItem(){
        for (let i = 0; i < this.listSetPs.length; i++) {
            let item =  await UtilsNode.getNode(ItemPreType.扎气球条目,this.扎气球_操作区)
            // item.setPosition(temp[i])
            let addGemItem = item.getComponent(ItemPreType.扎气球条目)
            addGemItem.setData({})
            addGemItem.node.setPosition(this.listSetPs[i])
            addGemItem.startAction()
        }
    }


    isItemBalloons (){
        let listComponents =  this.扎气球_操作区.getComponentsInChildren("itemBalloon")
        if (listComponents.length == 0) {
            if (this.isTime == true) {
                this.isTime = false
                this.endLuckGame()
            }
            return false
        }else{
            return  true
        }
    }



    subclassCall(): any {

    }
    initOnClick(){
        // this.过关.on(cc.Node.EventType.TOUCH_START,()=>{
        //     ccLog.log("要给过去的数据是 0 ",this.data.data)
        //     // Emitter.fire("onNextPass",this.data.data)
        //     this.node.destroy()
        //     Emitter.fire("onSetPassByName", this.data.data)
        //
        // },this)

        this.扎气球_关闭.on(cc.Node.EventType.TOUCH_START,()=>{
            this.node.destroy()
        },this)
    }

    扎气球_关闭 : cc.Node
    扎气球_得到金币 : cc.Label
    扎气球_倒计时时间 :cc.Label
    扎气球_位置区 : cc.Node
    扎气球_操作区 : cc.Node
    扎气球_金币区 : cc.Node
    扎气球_金币下限Y : cc.Node
    扎气球_金币显示 : cc.Node
    扎气球_吞噬 : cc.Node
    initView() {

        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球_关闭",
            parentNode: this.node,
        }
        this.扎气球_关闭 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球_得到金币",
            parentNode: this.node,
        }
        this.扎气球_得到金币 = GetNode.getNode(data).getComponent(cc.Label)


        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球_倒计时时间",
            parentNode: this.node,
        }
        this.扎气球_倒计时时间 = GetNode.getNode(data).getComponent(cc.Label)


        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球_位置区",
            parentNode: this.node,
        }
        this.扎气球_位置区 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球_操作区",
            parentNode: this.node,
        }
        this.扎气球_操作区 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球_金币区",
            parentNode: this.node,
        }
        this.扎气球_金币区 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球_金币下限Y",
            parentNode: this.node,
        }
        this.扎气球_金币下限Y = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "扎气球_金币显示",
            parentNode: this.node,
        }
        this.扎气球_金币显示 = GetNode.getNode(data)

        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "扎气球_吞噬",
            parentNode: this.node,
        }
        this.扎气球_吞噬 = GetNode.getNode(data)




        let listComponents =  this.扎气球_位置区.getComponentsInChildren("itemGetPostion")

        for (let i = 0; i <listComponents.length ; i++) {
           let item =  listComponents[i]
            this.listSetPs.push(item.node.getPosition())
        }


        ccLog.log("要设置的位置是",this.listSetPs)


    }

    // update (dt) {}
}
