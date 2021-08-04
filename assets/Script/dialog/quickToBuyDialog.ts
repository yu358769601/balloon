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

const {ccclass, property} = cc._decorator;

@ccclass
export default class QuickToBuyDialog extends BaseDialog {


    // LIFE-CYCLE CALLBACKS:
    data : any = null

    胜利_普通领取实际点击 : cc.Node = null
    胜利_看广告领取实际点击 : cc.Node = null
    胜利_结算 : cc.Node = null
    胜利_吞噬层: cc.Node = null
    皮肤试用_关闭: cc.Node = null

    结算_送橡皮变化2: cc.Node = null
    结算_送橡皮底板展示3: cc.Sprite = null
    结算_送橡皮底板1: cc.Sprite = null

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

    }

    removeEmitter() {

    }

   async setData(data) {
        this.data = data
        this.initView()
        this.initOnClick()

        // this.initLoad()

       ccLog.log("免费领取 进来的数据是 ", this.data.data)
       if (this.data) {

           this.结算_送橡皮底板展示3.spriteFrame = await LoadManage.getSpriteForName("shopBig_"+this.data.data.name)
       }


    }

    num: number = 0

    _nowPassRubber : any = null

  async  initLoad(){
      this.胜利_吞噬层.active = true
      let nowPassRubber =  UtilsDB.getMyNowPassRubber()

      this._nowPassRubber = nowPassRubber


        let myheight = this.结算_送橡皮底板展示3.node.height
      //   // this.结算_过关广告领取钻石.string = JsonManager.passSettingjson.json.passGetGem
      //   //
      //   // ccLog.log("游戏结束进来的数据是什么呢", data)
      //
      //
        this.结算_送橡皮底板1.spriteFrame = await LoadManage.getSpriteForName("lineSkinItem_"+nowPassRubber.rubber.name)
        this.结算_送橡皮底板展示3.spriteFrame = await LoadManage.getSpriteForName("lineSkinItem_"+nowPassRubber.rubber.name)
      //
        let startB = nowPassRubber.rubber.index
        // let endC = 100 - startB
        let endC = JsonManager.passSettingjson.nowPassRubberIndex
      //
      //
      //c 最终结局
      let b = startB, c = endC, d = 100, t = 0, s = 2;
      let countDownCb = () => {
          if (t < d) {
              t++
              let num = Tween.Tweens.Linear(t, b, c, d)
              // ccLog.log("当前是什么呢",num)
              // this.string = Math.ceil(num)
              // this.结算_新皮肤进度.string = Math.ceil(num)

              this.结算_送橡皮变化2.height = num / 100 * myheight
              this.num = num
          } else {
              this.unschedule(countDownCb)
              this.lvMaxCallback()
          }

      }

      this.schedule(countDownCb, 0.01)


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

        this.胜利_吞噬层.active = false
    }



    subclassCall(): any {

    }

    initOnClick(){
        this.胜利_普通领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("要给过去的数据是 0 ",this.data.data)
            Emitter.fire("onPlaySound",SoundType.按钮,1)
            this.胜利_吞噬层.active = true
            this.node.destroy()
        },this)
        this.胜利_看广告领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
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

        data.data.self.胜利_吞噬层.active = true


        let name = data.data.self.data.data.name
        // UtilsDB.addMyRubberTemp(name)
        UtilsDB.addMyRubber(name)
        UtilsDB.setUseRubber(name)
        Emitter.fire("onDefultListItem",name)
        Emitter.fire("onSetSkinLine", name)
        data.data.self.node.destroy()



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
            otherData: "胜利_普通领取实际点击",
            parentNode: this.node,
        }
        this.胜利_普通领取实际点击 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "胜利_看广告领取实际点击",
            parentNode: this.node,
        }
        this.胜利_看广告领取实际点击 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "胜利_结算",
            parentNode: this.node,
        }
        this.胜利_结算 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "胜利_吞噬层",
            parentNode: this.node,
        }
        this.胜利_吞噬层 = GetNode.getNode(data)


       data = {
           type: GetNodeType.纯查找,
           otherData: "结算_送橡皮底板展示3",
           parentNode: this.node,
       }
       this.结算_送橡皮底板展示3 = GetNode.getNode(data).getComponent(cc.Sprite)
       // data = {
       //     type: GetNodeType.纯查找,
       //     otherData: "结算_送橡皮底板1",
       //     parentNode: this.node,
       // }
       // this.结算_送橡皮底板1 = GetNode.getNode(data).getComponent(cc.Sprite)


        // this.胜利_结算.getComponent(cc.Widget).enabled = true

    }

    // update (dt) {}
}
