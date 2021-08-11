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
import {SoundType} from "../System/sound/sound";
import ChannelBase, {IChannelBase} from "../channel/channelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOverDialog extends BaseDialog implements IChannelBase {


    // LIFE-CYCLE CALLBACKS:
    data : any = null

    胜利_普通领取实际点击 : cc.Node = null
    胜利_看广告领取实际点击 : cc.Node = null
    胜利_结算 : cc.Node = null
    胜利_吞噬层: cc.Node = null

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
        Emitter.register('onBackLuckGame', this.onBackLuckGame, this)
        Emitter.register('onBackNewSkin', this.onBackNewSkin, this)
    }

    removeEmitter() {
        Emitter.remove('onBackLuckGame', this.onBackLuckGame, this)
        Emitter.remove('onBackNewSkin', this.onBackNewSkin, this)
    }

    onBackLuckGame(){

        ccLog.log("气球回来去做事情"," 是否有100 ",this.newSkin100," 下一关的数据是 ",this.data.data)

        // //气球回来的
        // if (this.newSkin100) {
        //     this.goGetNewSkin()
        // }else{
        //     Emitter.fire("onNextPass",this.data.data)
        //     this.node.destroy()
        //
        // }
        Emitter.fire("onNextPass",this.data.data)
        this.node.destroy()
    }
    onBackNewSkin(){
        this.goLuckGame(this.data.data)
    }

    setData(data) {
        this.data = data
        this.initView()
        this.initOnClick()

        this.initLoad()
        Emitter.fire("onPlaySound",SoundType.胜利界面,1)

    }

    num: number = 0

    _nowPassRubber : any = null

  async  initLoad(){
      this.胜利_吞噬层.active = true
      let nowPassRubber =  UtilsDB.getMyNowPassRubber()

      this._nowPassRubber = nowPassRubber
        ccLog.log("气球数据是",nowPassRubber)

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

    newSkin100 : any = null


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
            ccLog.log("现在要送气球了",data)
            this.newSkin100 = {
                newSkin : data.rubber.name,
                passData : this.data.data
            }


        }

        this.胜利_吞噬层.active = false
    }



    subclassCall(): any {

    }

    initOnClick(){
        this.胜利_普通领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            ccLog.log("要给过去的数据是 0 ",this.data.data)

            Emitter.fire("onPlaySound",SoundType.结算页面按钮点击时,1)
            let  dataItem = {
                self : this,
                rootNode : this.node,
                count : JsonManager.passSettingjson.diamond
            }
            let cllbacks = {
                ItemPreTypesuccessfulCallback: this.ItemPreTypesuccessfulCallback,
                // lookDialogfailureCallback: this.lookDialogfailureCallback
            }
            Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

            this.胜利_吞噬层.active = true
        },this)
        this.胜利_看广告领取实际点击.on(cc.Node.EventType.TOUCH_START,()=>{
            Emitter.fire("onPlaySound",SoundType.结算页面按钮点击时,1)
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

        if (data.data.self.newSkin100) {
            data.data.self.goGetNewSkin()
            let addGemData = {
                type : AssetsType.钻石,
                count : JsonManager.passSettingjson.passGetGem,
                // callbackGem_donthave : this.callbackGem_donthaveAdd,
                // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
                // callbackGem_subsucceed : this.callbackGem_subsucceed
            }
            // Emitter.fire("onEduShowIndex",2)
            UtilsDB.addAssets(addGemData)
        }else{

            // ccLog.log("准备去加钱成功",data.data.self,data.data.self.callbacks.successfulCallback == true)
            // if (data.data.self.callbacks.successfulCallback) {
            //     data.data.self.callbacks.successfulCallback(data.data.self.data.data)
            // }

            let  dataItem = {
                self : data.data.self,
                rootNode : data.data.self.node,
                count : JsonManager.passSettingjson.diamond
            }
            let cllbacks = {
                ItemPreTypesuccessfulCallback: data.data.self.ItemPreTypesuccessfulCallback,
                // lookDialogfailureCallback: this.lookDialogfailureCallback
            }
            Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)

            data.data.self.胜利_吞噬层.active = true
        }





        // data.data.self.node.destroy()
    }
    lookDialogfailureCallback(){

    }


    ItemPreTypesuccessfulCallback(data){

        let addGemData = {
            type : AssetsType.钻石,
            count : JsonManager.passSettingjson.diamond,
            // callbackGem_donthave : this.callbackGem_donthaveAdd,
            // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
            // callbackGem_subsucceed : this.callbackGem_subsucceed
        }
        UtilsDB.addAssets(addGemData)



        if (data.data.self.newSkin100) {
            data.data.self.goGetNewSkin()
        }else{
            // data.data.self.node.destroy()

            data.data.self.goLuckGame(data.data.self.data.data)
        }



    }


    goGetNewSkin(){
        Emitter.fire("onOpenDialog", {name: DialogType.获得新皮肤, zIndex: 100,data : this.newSkin100}, null)

        // let addGemData = {
        //     type : AssetsType.钻石,
        //     count : JsonManager.passSettingjson.diamond,
        //     // callbackGem_donthave : this.callbackGem_donthaveAdd,
        //     // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
        //     // callbackGem_subsucceed : this.callbackGem_subsucceed
        // }
        // UtilsDB.addAssets(addGemData)

        // //关闭自己
        // this.node.destroy()

        // Emitter.fire("onNextPass",this.data.data)
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
        this.node.destroy()
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
           otherData: "结算_送橡皮变化2",
           parentNode: this.node,
       }
       this.结算_送橡皮变化2 = GetNode.getNode(data)
       data = {
           type: GetNodeType.纯查找,
           otherData: "结算_送橡皮底板展示3",
           parentNode: this.node,
       }
       this.结算_送橡皮底板展示3 = GetNode.getNode(data).getComponent(cc.Sprite)
       data = {
           type: GetNodeType.纯查找,
           otherData: "结算_送橡皮底板1",
           parentNode: this.node,
       }
       this.结算_送橡皮底板1 = GetNode.getNode(data).getComponent(cc.Sprite)


        // this.胜利_结算.getComponent(cc.Widget).enabled = true

    }
    channel : ChannelBase
    init(channel: ChannelBase) {
        this.channel = channel
    }

    // update (dt) {}
}
