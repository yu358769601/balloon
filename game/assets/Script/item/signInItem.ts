// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {instance, JoystickType, JoystickTypes} from "../../scripts/Joystick";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import Vec2 = cc.Vec2;
import Size = cc.Size;
import {balloonName, DialogType, ItemPreType} from "../System/Type/enums";
import ItemBase from "./itemBase";
import Utils from "../System/Utils/Utils";
import UtilsNode from "../System/Utils/UtilsNode";
import LoadManage from "../System/Load/LoadManage";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import {SignInDialogType, SignInDialogTypeCheck} from "../dialog/signInDialog";
import JsonManager from "../System/manage/JsonManager";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;


@ccclass
export default class SignInItem extends cc.Component {


    data: any = null

    // @property(
    //     {
    //         type: cc.Enum(SignInDialogType),
    //         displayName: "签到条目类型"
    //     }
    // )
    type: SignInDialogType = SignInDialogType.金币;
    // @property(
    //     {
    //         type: cc.Enum(SignInDialogTypeCheck),
    //         displayName: "签到条目类型"
    //     }
    // )
    typeCheck: SignInDialogTypeCheck = SignInDialogTypeCheck.未领取;

    @property(
        {
            // type: cc.Enum(SignInDialogType),
            displayName: "条目索引"
        }
    )
    index: number = 0

    //
    async setData(data) {
        this.data = data
        // this.type =  this.data.type


        this.initView()

        this.initOnClick()


        this.setType(this.type)


        //  let balloonSkin =  await  LoadManage.getSpriteForName("shopBig_"+data.item.name)
        //  this.条目气球_气球.spriteFrame = balloonSkin
        //
        // this.条目气球_金币.string = this.data.item.gold


    }

    initOnClick() {
    }

    lookDialogsuccessfulCallback(data) {
        ccLog.log("看广告之后", data)
        // Emitter.fire("onShowModel",data.data.self.data.item.name)
        // UtilsDB.addMyRubber(data.data.self.data.item.name)
        // // data.data.self.setType(ItemShopItemType.使用中的)
        // Emitter.fire("onDefultItemShopItem",data.data.self.data.item.name)
        //
        // Emitter.fire("onVictory")
        // UtilsDB.setUseRubber(data.data.self.data.item.name)
        //
        //
        // Emitter.fire("onDefultListItem",data.data.self.data.item.name)
        // Emitter.fire("onSetSkinLine", data.data.self.data.item.name)

    }

    lookDialogfailureCallback(data) {

    }

    callback_donthave() {
        let data = {
            txt: "金币不足 去过关赢取更多的金币吧"
        }
        // let cllbacks = {
        //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        //     failureCallback: this.newSkinDialogfailureCallback
        // }
        Emitter.fire("onOpenToast", {name: ItemPreType.打印吐司, zIndex: 100, data: data}, null)
    }

    callback_subsucceed(data) {
        ccLog.log("买得起", this)
        //保存购买
        // UtilsDB.addMyRubber(data.self.data.item.name)
        // data.self.setType(ItemShopItemType.使用中的)
        // Emitter.fire("onShowModel",data.self.data.item.name)
        //
        // Emitter.fire("onVictory")
        //
        // Emitter.fire("onDefultItemShopItem",data.self.data.item.name)
        //
        // UtilsDB.setUseRubber(data.self.data.item.name)
        //
        //
        // Emitter.fire("onDefultListItem",data.self.data.item.name)
        // Emitter.fire("onSetSkinLine", data.self.data.item.name)


    }

    onSignInItemSetIndex(self,index){
        //自己的小于外面的 就都设置已领取
        ccLog.log(" 进来的数字是多少 ",index," 自己的数字是多少 ",this.index)
        if (this.index<index) {
            this.setGetItem()
        }else{
            // this.setGetItem()
            if (this.index == index) {
                if (this.签到_条目_选中) {
                    UtilsNode.show(this.签到_条目_选中,true)
                }

                //今天领取过来了
                if (UtilsDB.getSignIn().todayGet == true) {
                    this.setGetItem()
                    Emitter.fire("onTodayGet")
                }else{
                    Emitter.fire("onNotTodayGet")
                }

            }
        }

    }

    itemData : any

    //设置 已领取的样子
    setGetItem(){
        UtilsNode.show(this.签到_条目_已领取,true)
        if (this.签到_条目_选中) {
            UtilsNode.show(this.签到_条目_选中,false)
        }
        if (this.签到_条目) {
            this.签到_条目.opacity = 100
        }

    }


    onLoad() {
        this.removeEmitter()
        this.registerEmitter()



        this.setData(null)
    }

    protected onDestroy(): void {
        this.removeEmitter()
    }

    签到_条目_已领取: cc.Node
    签到_条目_选中: cc.Node
    签到_条目_气球: cc.Sprite
    签到_条目: cc.Node

    initView() {
        let data
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "签到_条目_已领取",
            parentNode: this.node
        }
        this.签到_条目_已领取 = GetNode.getNode(data)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "签到_条目_选中",
            parentNode: this.node
        }
        this.签到_条目_选中 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "签到_条目",
            parentNode: this.node
        }
        this.签到_条目 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "签到_条目_气球",
            parentNode: this.node
        }
        let qiqiu = GetNode.getNode(data)
        if (qiqiu) {
            this.签到_条目_气球 = qiqiu.getComponent(cc.Sprite)
        }



    }


   async setType(type) {
        this.type = type

        // ccLog.log("商品条目容易什么呢 我是商品条目",this.data)
        //
        // // item:
        // //     gold: 200
        // //     isAd: false
        // //     name: "ma_1"
        // //     shopPingType: 1
        // //     type: 0
        //
        // //如果我买了
        // let b =  this.checkGet()
        // if (b) {
        //     //我买了 此时此刻是设置可使用的
        //
        //
        //
        //     if (this.type != ItemShopItemType.使用中的 ) {
        //         this.type =  ItemShopItemType.可使用的
        //     }
        // }else{
        //     //如果我没买
        //     if (this.data.item.isAd == true) {
        //         this.type = ItemShopItemType.需要看广告的
        //         ccLog.log("这条我没买我设置看广告 按钮",this.data)
        //     }else{
        //         this.type = ItemShopItemType.需要购买的
        //     }
        // }
        //
        let  list =  JsonManager.passSettingjson.signInData
        this.itemData = list[this.index]

        ccLog.log("签到条目每条 1",this.index ,this.itemData )

        switch (this.index) {
            // {
            //     "type": 0,
            //     "count": 1000
            // },
            case 0:

                break
            // {
            //     "type": 1,
            //     "count": 10
            // },
            case 1:


            // {
            //     "type": 2,
            //     "count": 1
            // },

                break

            case 2:
                ccLog.log("签到条目每条 2",this.签到_条目_气球)
                if (this.签到_条目_气球) {
                    let rubber =  UtilsDB.getNotRubber()
                    ccLog.log("获取一个橡皮",rubber)
                    this.签到_条目_气球.spriteFrame = await  LoadManage.getSpriteForName("shopBig_"+rubber.item.name)

                    Emitter.fire("onSp2",rubber.item.name)
                }
                break
            // {
            //     "type": 0,
            //     "count": 3000
            // },
            case 3:

                break
            // {
            //     "type": 1,
            //     "count": 15
            // },
            case 4:

                break
            // {
            //     "type": 0,
            //     "count": 5000
            // },
            case 5:

                break
            // {
            //     "type": 2,
            //     "count": 1
            // }
            case 6:
                if (this.签到_条目_气球) {
                    let rubber =  UtilsDB.getNotRubber()
                    ccLog.log("获取一个橡皮",rubber)
                    this.签到_条目_气球.spriteFrame = await  LoadManage.getSpriteForName("shopBig_"+rubber.item.name)
                    Emitter.fire("onSp6",rubber.item.name)
                }
                break
        }
        // ccLog.log("现在设置的类型是",type , this)
    }


    removeEmitter() {
        Emitter.remove('onSignInItemSetIndex', this.onSignInItemSetIndex, this)

    }

    registerEmitter() {
        Emitter.register('onSignInItemSetIndex', this.onSignInItemSetIndex, this)

    }


    start() {

    }


    update(dt) {

    }


}