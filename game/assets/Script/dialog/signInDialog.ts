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
import Utils from "../System/Utils/Utils";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import JsonManager from "../System/manage/JsonManager";
import {DialogType, ItemPreType} from "../System/Type/enums";
import ControlGoLuckGame from "../control/controlGoLuckGame";
import LoadManage from "../System/Load/LoadManage";
import Tween from "../System/Utils/Tween";
import {ItemShopItemType} from "../item/itemShopItem";
import {SoundType} from "../System/sound/sound";
import UtilsNode from "../System/Utils/UtilsNode";
import ChannelBase, {IChannelBase} from "../channel/channelBase";
import Tools from "../System/Utils/Tools";

const {ccclass, property} = cc._decorator;

export enum SignInDialogType {
    金币 = 0 ,
    体力 = 1,
    气球 = 2
}
export enum SignInDialogTypeCheck {
    已领取 = 0 ,
    未领取 = 1
}

@ccclass
export default class SignInDialog extends BaseDialog implements IChannelBase{


    // LIFE-CYCLE CALLBACKS:
    data : any = null

    签到_普通领取 : cc.Node = null
    签到_普通领取实际点击 : cc.Node = null

    签到_看广告领取 : cc.Node = null
    签到_看广告领取实际点击 : cc.Node = null

    签到_结算 : cc.Node = null
    签到_吞噬层: cc.Node = null

    签到_关闭: cc.Node = null
    签到_今日已领取: cc.Node = null
    签到_今日已领取实际点击: cc.Node = null

    引导_小手指: cc.Node = null
    失败_看广告按钮: cc.Node = null


    //领取倍数
    adCount : number = 2


    onLoad () {
        super.onLoad()
    }
    onDestroy() {
        super.onDestroy();
    }
    start () {

        Emitter.fire("onSignInItemSetIndex",this.index)
    }

    initCallback(callbacks) {

    }
    removeEmitter() {
        Emitter.remove('onTodayGet', this.onTodayGet, this)
        Emitter.remove('onNotTodayGet', this.onNotTodayGet, this)
        Emitter.remove('onSp2', this.onSp2, this)
        Emitter.remove('onSp6', this.onSp6, this)
    }
    registerEmitter() {
        Emitter.register('onTodayGet', this.onTodayGet, this)
        Emitter.register('onNotTodayGet', this.onNotTodayGet, this)
        Emitter.register('onSp2', this.onSp2, this)
        Emitter.register('onSp6', this.onSp6, this)
    }

    onTodayGet(){
            UtilsNode.show(this.签到_今日已领取,true)
            UtilsNode.show(this.签到_看广告领取,false)
            UtilsNode.show(this.签到_普通领取,false)
    }
    onNotTodayGet(){
        UtilsNode.show(this.签到_今日已领取,false)
        UtilsNode.show(this.签到_看广告领取,true)
        UtilsNode.show(this.签到_普通领取,true)
    }
    index : number = 0


    sp2 : string = ""
    sp6 : string = ""


    onSp2(self,sp){
        this.sp2 = sp
    }
    onSp6(self,sp){
        this.sp6 = sp
    }

   async setData(data) {
        this.data = data
        this.initView()
        this.initOnClick()

        // this.initLoad()

        this.index  = UtilsDB.getSignIn().index
        // this.结算_送橡皮底板展示3.spriteFrame = await LoadManage.getSpriteForName("lineSkinItem_"+this.data.data.newSkin)

       //找到所有条目
       this.show()
    }


    show(){
        // JsonManager.passSettingjson.signInData
        // switch (this.index) {
        //
        // }

    }



    num: number = 0

    _nowPassRubber : any = null

  async  initLoad(){
      // this.胜利_吞噬层.active = true
      // let nowPassRubber =  UtilsDB.getMyNowPassRubber()
      //
      // this._nowPassRubber = nowPassRubber
      //
      //
      //   let myheight = this.结算_送橡皮底板展示3.node.height
      // //   // this.结算_过关广告领取钻石.string = JsonManager.passSettingjson.json.passGetGem
      // //   //
      // //   // ccLog.log("游戏结束进来的数据是什么呢", data)
      // //
      // //
      //   this.结算_送橡皮底板1.spriteFrame = await LoadManage.getSpriteForName("lineSkinItem_"+nowPassRubber.rubber.name)
      //   this.结算_送橡皮底板展示3.spriteFrame = await LoadManage.getSpriteForName("lineSkinItem_"+nowPassRubber.rubber.name)
      // //
      //   let startB = nowPassRubber.rubber.index
      //   // let endC = 100 - startB
      //   let endC = JsonManager.passSettingjson.nowPassRubberIndex
      // //
      // //
      // //c 最终结局
      // let b = startB, c = endC, d = 100, t = 0, s = 2;
      // let countDownCb = () => {
      //     if (t < d) {
      //         t++
      //         let num = Tween.Tweens.Linear(t, b, c, d)
      //         // ccLog.log("当前是什么呢",num)
      //         // this.string = Math.ceil(num)
      //         // this.结算_新皮肤进度.string = Math.ceil(num)
      //
      //         this.结算_送橡皮变化2.height = num / 100 * myheight
      //         this.num = num
      //     } else {
      //         this.unschedule(countDownCb)
      //         this.lvMaxCallback()
      //     }
      //
      // }
      //
      // this.schedule(countDownCb, 0.01)


    }
    lvMaxCallback() {
        // ccLog.log("进度条变动结束", this.num, "要保存的一些数据", this.data.data.myNowPassRubber)
        // 进度条变动结束 40 要保存的一些数据
        // {rubber: {…}, list: {…}}
        // list: {}
        // rubber:
        //     index: 20
        //     name: "sj_1"
        // this.结算_点击吞噬层.active = false


        let data = this._nowPassRubber
        data.rubber.index = this.num
        UtilsDB.setMyNowPassRubber(data)


        if (this.num >= JsonManager.passSettingjson.nowPassRubberIndexMax) {
            //在这个页面满了
            // this.data.IndexMax = true
            // this.data.newSkin100 = data.rubber.name
            ccLog.log("现在要送气球了")
            

        }

        this.签到_吞噬层.active = false
    }



    subclassCall(): any {

    }

    toGet(data,num){
        ccLog.log("获取到了什么呢  ",data)

        switch (data.type) {
            // {
            //     "type": 0,
            //     "count": 1000
            // },
            case 0:
            case 3:
            case 5:
                let addGemData = {
                    type : AssetsType.钻石,
                    count : data.count*num,
                    // callbackGem_donthave : this.callbackGem_donthaveAdd,
                    // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
                    // callbackGem_subsucceed : this.callbackGem_subsucceed
                }
                // Emitter.fire("onEduShowIndex",2)
                UtilsDB.addAssets(addGemData)

                let  dataToast = {
                    txt : "领取了"+ data.count*num + "金币"
                }
                // let cllbacks = {
                //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                //     failureCallback: this.newSkinDialogfailureCallback
                // }
                Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:dataToast},null)


                break
            // {
            //     "type": 1,
            //     "count": 10
            // },
            case 1:
            case 4:
                let addLifeData = {
                    type: AssetsType.体力,
                    count: data.count*num,
                    show : true
                }
                UtilsDB.addLifeAssets(addLifeData)

                let  dataToast = {
                    txt : "领取了"+ data.count*num + "体力"
                }
                // let cllbacks = {
                //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                //     failureCallback: this.newSkinDialogfailureCallback
                // }
                Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:dataToast},null)
                break
            // {
            //     "type": 2,
            //     "count": 1
            // },
            case 2:
            case 6:

                // ccLog.log("签到条目每条 2",this.签到_条目_气球)
                // if (this.签到_条目_气球) {
                //     let rubber =  UtilsDB.getNotRubber()
                //     ccLog.log("获取一个橡皮",rubber)
                //     this.签到_条目_气球.spriteFrame = await  LoadManage.getSpriteForName("shopBig_"+rubber.item.name)
                // }

                if (this.sp2 != "") {
                    UtilsDB.addMyRubber(this.sp2)
                    UtilsDB.setUseRubber(this.sp2)
                    let  dataToast = {
                        txt : "领取了" + "漂亮气球"+data.count*num+"个"
                    }
                    // let cllbacks = {
                    //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                    //     failureCallback: this.newSkinDialogfailureCallback
                    // }
                    Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:dataToast},null)
                    return
                }

                if (this.sp6 != "") {
                    UtilsDB.addMyRubber(this.sp6)
                    UtilsDB.setUseRubber(this.sp6)
                    let  dataToast = {
                        txt : "领取了" + "漂亮气球"+data.count*num+"个"
                    }
                    // let cllbacks = {
                    //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                    //     failureCallback: this.newSkinDialogfailureCallback
                    // }
                    Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:dataToast},null)
                    return
                }
                break
            // {
            //     "type": 0,
            //     "count": 3000
            // },
            // case 3:
            //
            //     break
            // {
            //     "type": 1,
            //     "count": 15
            // },
            // case 4:
            //
            //     break
            // {
            //     "type": 0,
            //     "count": 5000
            // },
            // case 5:
            //
            //     break
            // {
            //     "type": 2,
            //     "count": 1
            // }
            // case 6:
            //     if (this.签到_条目_气球) {
            //         let rubber =  UtilsDB.getNotRubber()
            //         ccLog.log("获取一个橡皮",rubber)
            //         this.签到_条目_气球.spriteFrame = await  LoadManage.getSpriteForName("shopBig_"+rubber.item.name)
            //     }
            //     break
        }


    }


    initOnClick(){
        this.签到_普通领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("要给过去的数据是 0 ",this.data.data)
            // Emitter.fire("onNextPass",this.data.data.passData)
            Emitter.fire("onPlaySound",SoundType.按钮,1)
            // let addGemData = {
            //     type : AssetsType.钻石,
            //     count : JsonManager.passSettingjson.diamond,
            //     // callbackGem_donthave : this.callbackGem_donthaveAdd,
            //     // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
            //     // callbackGem_subsucceed : this.callbackGem_subsucceed
            // }
            // UtilsDB.addAssets(addGemData)
            // let  dataItem = {
            //     self : this,
            //     rootNode : this.node,
            //     count : JsonManager.passSettingjson.diamond
            // }
            // let cllbacks = {
            //     ItemPreTypesuccessfulCallback: this.ItemPreTypesuccessfulCallback,
            //     // lookDialogfailureCallback: this.lookDialogfailureCallback
            // }
            // Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

            UtilsDB.addSignIn()


            this.签到_吞噬层.active = true

            this.node.destroy()

            ccLog.log("领取的什么呢"," 参数 ",this.index," 具体参数 ",JsonManager.passSettingjson.signInData[this.index])

            this.toGet(JsonManager.passSettingjson.signInData[this.index],1)
            // Emitter.fire("onBackNewSkin")


        },this)
        this.签到_看广告领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            Emitter.fire("onPlaySound",SoundType.按钮,1)
            ccLog.log("要给过去的数据是 0 ",this.data.data)
            let  data = {
                self : this,
            }
            let cllbacks = {
                lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
                lookDialogfailureCallback: this.lookDialogfailureCallback
            }
            Emitter.fire("onOpenDialog",{name : DialogType.广告,zIndex : 100,data:data},cllbacks)
        },this)
        this.签到_今日已领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            this.node.destroy()
        },this)

        this.签到_关闭.on(cc.Node.EventType.TOUCH_START,()=>{
            Emitter.fire("onPlaySound",SoundType.按钮,1)
        this.node.destroy()
        },this)
    }

    lookDialogsuccessfulCallback(data){
        // let addGemData = {
        //     type : AssetsType.钻石,
        //     count : JsonManager.passSettingjson.passGetGem,
        //     // callbackGem_donthave : this.callbackGem_donthaveAdd,
        //     // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
        //     // callbackGem_subsucceed : this.callbackGem_subsucceed
        // }
        // // Emitter.fire("onEduShowIndex",2)
        // UtilsDB.addAssets(addGemData)
        // // ccLog.log("准备去加钱成功",data.data.self,data.data.self.callbacks.successfulCallback == true)
        // // if (data.data.self.callbacks.successfulCallback) {
        // //     data.data.self.callbacks.successfulCallback(data.data.self.data.data)
        // // }
        //
        // let  dataItem = {
        //     self : data.data.self,
        //     rootNode : data.data.self.node,
        //     count : JsonManager.passSettingjson.diamond
        // }
        // let cllbacks = {
        //     ItemPreTypesuccessfulCallback: data.data.self.ItemPreTypesuccessfulCallback,
        //     // lookDialogfailureCallback: this.lookDialogfailureCallback
        // }
        // Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

        // data.data.self.胜利_吞噬层.active = true

        // UtilsDB.addMyRubber(data.data.self.data.data.newSkin)
        // UtilsDB.setUseRubber(data.data.self.data.data.newSkin)
        // Emitter.fire("onDefultListItem",data.data.self.data.data.newSkin)
        // Emitter.fire("onSetSkinLine", data.data.self.data.data.newSkin)
        UtilsDB.addSignIn()
        data.data.self.toGet(JsonManager.passSettingjson.signInData[data.data.self.index],this.adCount)

        data.data.self.node.destroy()

        // Emitter.fire("onBackNewSkin")
    }
    lookDialogfailureCallback(){

    }


    ItemPreTypesuccessfulCallback(data){
        data.data.self.node.destroy()

        data.data.self.goLuckGame(data.data.self.data.data)


    }


    //先判断去扎气球
    goLuckGame(data){
        // getitemNames: Array(4)
        // 0: "itemPoint"
        // 1: "itemLineBG"
        // 2: "itemLuckKey"
        // 3: "itemLine"
        // length: 4
        // __proto__: Array(0)
        // index: 1
        // isPlay: true
        // itemName: "pass_1"
        
        let list = JsonManager.passSettingjson.GoLuckGameIndexs
        
        for (let i = 0; i <list.length ; i++) {
           let item =  list[i]
            if (data.index == item) {
                Emitter.fire("onOpenDialog", {name: DialogType.扎气球, zIndex: 100,data : data}, null)
                return
            }
        }
        
        ccLog.log("扎气球数据 ",data)
        Emitter.fire("onNextPass",data)
    }

   async initView() {
        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "签到_普通领取",
            parentNode: this.node,
        }
        this.签到_普通领取 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "签到_普通领取实际点击",
            parentNode: this.node,
        }
        this.签到_普通领取实际点击 = GetNode.getNode(data)

       data = {
           type: GetNodeType.纯查找,
           otherData: "签到_看广告领取",
           parentNode: this.node,
       }
       this.签到_看广告领取 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "签到_看广告领取实际点击",
            parentNode: this.node,
        }
        this.签到_看广告领取实际点击 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "签到_结算",
            parentNode: this.node,
        }
        this.签到_结算 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "签到_吞噬层",
            parentNode: this.node,
        }
        this.签到_吞噬层 = GetNode.getNode(data)
       data = {
           type: GetNodeType.纯查找,
           otherData: "签到_关闭",
           parentNode: this.node,
       }
       this.签到_关闭 = GetNode.getNode(data)
       data = {
           type: GetNodeType.纯查找,
           otherData: "签到_今日已领取",
           parentNode: this.node,
       }
       this.签到_今日已领取 = GetNode.getNode(data)

       data = {
           type: GetNodeType.纯查找,
           otherData: "签到_今日已领取实际点击",
           parentNode: this.node,
       }
       this.签到_今日已领取实际点击 = GetNode.getNode(data)


       data = {
           type: GetNodeType.开始隐藏通过参数显示,
           otherData: "引导_小手指",
           parentNode: this.node,
       }
       this.引导_小手指 = GetNode.getNode(data)

       data = {
           type: GetNodeType.纯查找,
           otherData: "失败_看广告按钮",
           parentNode: this.node,
       }
       this.失败_看广告按钮 = GetNode.getNode(data)



       // data = {
       //     type: GetNodeType.纯查找,
       //     otherData: "结算_送橡皮变化2",
       //     parentNode: this.node,
       // }
       // this.结算_送橡皮变化2 = GetNode.getNode(data)
       // data = {
       //     type: GetNodeType.纯查找,
       //     otherData: "结算_送橡皮底板展示3",
       //     parentNode: this.node,
       // }
       // this.结算_送橡皮底板展示3 = GetNode.getNode(data).getComponent(cc.Sprite)
       // data = {
       //     type: GetNodeType.纯查找,
       //     otherData: "结算_送橡皮底板1",
       //     parentNode: this.node,
       // }
       // this.结算_送橡皮底板1 = GetNode.getNode(data).getComponent(cc.Sprite)


        // this.胜利_结算.getComponent(cc.Widget).enabled = true

    }
    channel : ChannelBase
    init(channel: ChannelBase) {
        this.channel = channel
    }
    // update (dt) {}
}
