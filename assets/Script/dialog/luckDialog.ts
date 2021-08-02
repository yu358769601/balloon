// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDialog from "./BaseDialog";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {DialogType, InType, PrizeType} from "../System/Type/enums";
import Utils from "../System/Utils/Utils";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import LoadManage from "../System/Load/LoadManage";
import {SoundType} from "../System/sound/sound";
import {GetItemType} from "./getItemDialog";
import GameSetting, {gameModeType} from "../System/mode/gameSetting";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import JsonManager from "../System/manage/JsonManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LuckDialog extends BaseDialog {

    oldIndex: number = 0;
    _inTurning: boolean = false;

    // LIFE-CYCLE CALLBACKS:
    private data: any;
    private callbacks: any;

    onDestroy(): void {
        super.onDestroy()
    }

    async onLoad() {
        super.onLoad()
        // Emitter.fire("onAssetsShowHide",false)


    }

    lists: [] = []
    listRubber: cc.Sprite[] = []

    //转盘橡皮数据
    listsLuckData: any = []


    async start() {
        // await Utils.setTimerOnce(this,0.01)

        // 转盘_看视频转盘
    }

    转盘_关闭: cc.Node = null
    转盘_看视频转盘: cc.Node = null
    转盘_盘子底子: cc.Node = null

    转盘_橡皮1: cc.Sprite = null
    转盘_橡皮2: cc.Sprite = null
    转盘_橡皮3: cc.Sprite = null


    结算: cc.Node = null
    底子: cc.Node = null
    标题: cc.Node = null

    initOnClick() {
        this.转盘_关闭.on(cc.Node.EventType.TOUCH_END, () => {

            if (this.clickOn) {
                // successfulCallback : this.successfulCallbackLuck,
                //     failureCallback : this.successfulCallbackLuck
                if (this.callbacks) {
                    if (this.callbacks.failureCallback) {
                        this.callbacks.failureCallback(this.data)
                    }
                }
                this.node.destroy()
                Emitter.fire("onAssetsShowHide", true)
                Emitter.fire("onPlaySound", SoundType.按钮)
                // Emitter.fire("onShowBlockAd")
                //
                // Emitter.fire("onAutoOpenDialogClose")

            }

        }, this)
        this.转盘_看视频转盘.on(cc.Node.EventType.TOUCH_END, () => {
            ccLog.log("看视频转转盘")
            if (this.clickOn) {

                let data = {
                    self: this,

                }
                let cllbacks = {
                    lookDialogsuccessfulCallback: this.lookDialogsuccessfulCallback,
                    lookDialogfailureCallback: this.lookDialogfailureCallback
                }
                Emitter.fire("onOpenDialog", {
                    name: DialogType.广告,
                    zIndex: 100,
                    data: data
                }, cllbacks)
            }

        }, this)
    }

    initView() {

        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "转盘_关闭",
            parentNode: this.node,
        }
        this.转盘_关闭 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "转盘_看视频转盘",
            parentNode: this.node,
        }
        this.转盘_看视频转盘 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "转盘_盘子底子",
            parentNode: this.node,
        }
        this.转盘_盘子底子 = GetNode.getNode(data)


        data = {
            type: GetNodeType.纯查找,
            otherData: "转盘_橡皮1",
            parentNode: this.node,
        }
        this.转盘_橡皮1 = GetNode.getNode(data).getComponent(cc.Sprite)

        data = {
            type: GetNodeType.纯查找,
            otherData: "转盘_橡皮2",
            parentNode: this.node,
        }
        this.转盘_橡皮2 = GetNode.getNode(data).getComponent(cc.Sprite)


        data = {
            type: GetNodeType.纯查找,
            otherData: "转盘_橡皮1",
            parentNode: this.node,
        }
        this.转盘_橡皮1 = GetNode.getNode(data).getComponent(cc.Sprite)

        this.listRubber.push(this.转盘_橡皮1)
        this.listRubber.push(this.转盘_橡皮2)
        ccLog.log("什么照片 0", this.listRubber)

        // data = {
        //     type: GetNodeType.开始隐藏通过参数显示,
        //     otherData: "结算",
        //     parentNode: this.node,
        // }
        // this.结算 = GetNode.getNode(data)


        // data = {
        //     type: GetNodeType.纯查找,
        //     otherData: "失败_看广告跳过实际点击",
        //     parentNode: this.node,
        // }
        // this.失败_看广告跳过实际点击 = GetNode.getNode(data)

        // data = {
        //     type: GetNodeType.纯查找,
        //     otherData: "标题",
        //     parentNode: this.node,
        // }
        // this.标题 = GetNode.getNode(data)

        // Utils.getTime()
    }


    lookDialogsuccessfulCallback(data) {
        data.data.self.clickLucky()
        Emitter.fire("onPlaySound", SoundType.按钮)

    }

    lookDialogfailureCallback(data) {
        Emitter.fire("onAutoOpenDialogClose")
        data.data.self.node.destroy()
    }


    async setLists() {
        this.listsLuckData = []
        let temp = UtilsDB.getNotRubberList(2)
        ccLog.log("挺好的什么呢 原始", temp)
        if (temp.length > 2) {
            this.lists = Utils.sjszgetNumberByNum(temp.length, 2)
            ccLog.log("什么照片 11 ", this.lists)
            for (let i = 0; i < this.listRubber.length; i++) {
                // this.lists[i]
                let t = temp[this.lists[i]]
                // ccLog.log("什么照片 1 ",this.lists[i])
                // ccLog.log("什么照片 2 ",temp)
                ccLog.log("什么照片 3 ", t)
                this.listRubber[i].spriteFrame = await LoadManage.getSpriteForName("shopBig_" + t.item.name)
                this.listsLuckData.push(t)
            }
            ccLog.log("挺好的什么呢", this.lists)
        }
        // Emitter.fire("onRefreshTheSkin")
    }

    initCallback(callbacks) {
        this.callbacks = callbacks
    }

    registerEmitter() {
        // Emitter.register('onMyAndroidDrawCallBack', this.onMyAndroidDrawCallBack, this)
    }

    removeEmitter() {
        // Emitter.remove('onMyAndroidDrawCallBack', this.onMyAndroidDrawCallBack, this)
    }

    setData(data) {
        this.data = data
        this.initView()

        this.setLists()
        this.initOn()

        this.initOnClick()

    }

    clickOn: boolean = false

    subclassCall(): any {
        return this
    }

    initOn() {
        this.clickOn = true


        // this.setImgVideo()
    }

    initOff() {
        this.clickOn = false
    }

    async clickLucky() {
        // this.turnTable();
        this._inTurning = true;
        this.initOff()
        // cc.userInfo.addLuckyNum(+1);
        // this.showLuckyWheelNum();
        // 0-100随机数
        let randNum = Utils.random(0, 100);
        // 位置
        let index = 0;
        let prizeType = "";
        let value = null;
        let miaoshu = "";
        let valueStr = "";
        // 10
        if (randNum > 0 && randNum <= 40) {
            index = 5;
            miaoshu = "橡皮";
            // let randhpNum = Utils.random(10000, 20000);
            // let randhpNum = 5000;
            valueStr = this.listsLuckData[0]
            value = 5;
            prizeType = PrizeType.橡皮;
        }
        // 15
        else if (randNum > 40 && randNum <= 45) {
            index = 4;
            value = JsonManager.passSettingjson.luckIndexs[4];
            prizeType = PrizeType.体力;
        }
        // 10
        else if (randNum > 45 && randNum <= 50) {
            // index = 3;
            // value = 10;
            // miaoshu = "橡皮";
            //
            // valueStr = this.listsLuckData[1]
            // prizeType = PrizeType.橡皮;

            index = 3;

            // let randmaxhpNum = Utils.random(50000000, 100000000);
            // let randmaxhpNum = 30;
            valueStr = 30 + "";
            value = JsonManager.passSettingjson.luckIndexs[3];
            miaoshu = "钻石" + value;
            prizeType = PrizeType.钻石;

        }
        // 15
        else if (randNum > 50 && randNum <= 90) {
            index = 2;
            miaoshu = "橡皮";
            value = 5000;
            valueStr = this.listsLuckData[1]
            prizeType = PrizeType.橡皮;
        }
        // 15
        else if (randNum > 90 && randNum <= 95) {
            index = 1;
            miaoshu = "体力";
            value = JsonManager.passSettingjson.luckIndexs[1];
            prizeType = PrizeType.体力;
        }
        // 20
        else if (randNum > 95 && randNum <= 100) {
            index = 0;
            value = JsonManager.passSettingjson.luckIndexs[0];
            miaoshu = "钻石" + value;
            // let randmaxhpNum = Utils.random(50000000, 100000000);
            // let randmaxhpNum = 10;
            // valueStr = Utils.valueparseInt(randmaxhpNum);
            valueStr = 50 + ""

            prizeType = PrizeType.钻石;
        }
        // 15
        // else
        //     if (randNum > 90 && randNum <= 100) {
        //     index = 0;
        //
        //     miaoshu = "大量精粹";
        //     value = 10000;
        //     valueStr = Utils.valueparseInt(value);
        //     prizeType = PrizeType.Gold;
        //
        // }

        let turnIndex = 0;

        if (this.oldIndex == 0) {
            turnIndex = index;
        } else {
            turnIndex = 6 - this.oldIndex + index;
        }

        this.oldIndex = index;

        ccLog.log("描述--->" + miaoshu + "index===>" + index + "value===>" + value, prizeType);

        let time = 2; //旋转时间
        let circle = 5; //旋转圈数
        let degree = 360 / 6 * turnIndex; // 旋转停止的角度

        cc.tween(this.转盘_盘子底子)
            .by(time, {angle: -(360 * circle + degree)}, {easing: 'sineInOut'})
            .call(async () => {
                this._inTurning = false;
                let isOpenPrize = false;
                // cd.log('This is a callback')
                switch (prizeType) {
                    case PrizeType.钻石:
                        isOpenPrize = true;
                        break;
                    case PrizeType.橡皮:
                        isOpenPrize = true;
                        break;
                    case PrizeType.体力:
                        isOpenPrize = true;
                        break;
                    // case PrizeType.Hp:
                    //     isOpenPrize = true;
                    //     break;
                    // case PrizeType.fragment:
                    //     isOpenPrize = true;
                    //     break;
                }

                if (isOpenPrize == true) {
                    // cc.public_popup.showView({
                    //     //  prefabName: "Alert", parent: this.node, agrs: { sureCb: null, text: tipText } });
                    //     prefabName: "LuckyPrize", parent: null, agrs: { prizeType: prizeType, value: value, miaoshu: miaoshu }
                    // });
                    ccLog.log("转盘 ", miaoshu, " 个数 ", value, " 现在索引是 ", index)
                    // if (UtilsDB.getPlayer() == null) {
                    //     UtilsDB.initPlayer()
                    // }
                    // let player = UtilsDB.getPlayer()
                    //加经验
                    // for (let i = 0; i < player.myMonster.length; i++) {
                    //     if (reData.monster.id == player.myMonster[i].id) {
                    //         player.myMonster[i].exp += addExp
                    //         break
                    //     }
                    // }
                    ccLog.log("现在停的是啥类型", prizeType)

                    switch (prizeType) {
                        case PrizeType.钻石:


                            //加钱
                            // Emitter.fire('onAddGold',value)
                            // Emitter.fire('onTipsShow',{txt: "加钱"+valueStr})
                            // Emitter.fire('onOpenGetItemDialog', {
                            //     type: prizeType,
                            //     value: value,
                            //     valueStr: Utils.valueparseInt(value),
                            // }, () => {
                            //     Emitter.fire('onOpenLuckyWheelDialog')
                            // }, () => {
                            //     Emitter.fire('onOpenLuckyWheelDialog')
                            // })
                            let data = {
                                self: this,
                                inType: GetItemType.钻石,
                                src: "钻石",
                                value: value
                            }
                            // let cllbacks = {
                            //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                            //     failureCallback: this.newSkinDialogfailureCallback
                            // }
                            Emitter.fire("onOpenDialog", {
                                name: DialogType.得到物品,
                                zIndex: 100,
                                data: data
                            }, null)
                            break;
                        case PrizeType.橡皮:
                            ccLog.log("现在得到的是 橡皮", valueStr)

                            // item: {index: 38, isPass: false, type: 2, name: "cr_4"}
                            // valueStr.item


                            let data = {
                                self: this,
                                inType: GetItemType.橡皮,
                                src: valueStr.item.name,
                                value: value
                            }
                            let cllbacks = {
                                successfulCallback: () => {
                                    this.setLists()
                                },
                                // failureCallback: this.newSkinDialogfailureCallback
                            }
                            Emitter.fire("onOpenDialog", {
                                    name: DialogType.得到物品,
                                    zIndex: 100,
                                    data: data
                                },
                                cllbacks)

                            // await  Utils.setTimerOnce(this,0.5)
                            //     this.setLists()
                            // UtilsDB.addFastCount({fastCount : value})
                            // Emitter.fire("onRefreshFastGameCount")
                            // Emitter.fire('onTipsShow',{txt: "加快速游戏次数 "+value+" 次"})
                            // Emitter.fire('onOpenGetItemDialog', {
                            //     type: prizeType,
                            //     value: value,
                            //     valueStr: value
                            // }, () => {
                            //     Emitter.fire('onOpenLuckyWheelDialog')
                            // }, () => {
                            //     Emitter.fire('onOpenLuckyWheelDialog')
                            // })
                            break;
                        case PrizeType.体力:

                            ccLog.log("现在得到的是 体力", valueStr, value)

                            let data = {
                                self: this,
                                inType: GetItemType.体力,
                                // src: valueStr.item.name,
                                value: value
                            }
                            // let cllbacks = {
                            //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                            //     failureCallback: this.newSkinDialogfailureCallback
                            // }
                            Emitter.fire("onOpenDialog", {
                                name: DialogType.得到物品,
                                zIndex: 100,
                                data: data
                            }, null)


                            // Emitter.fire('onAddGem',value)
                            // Emitter.fire('onTipsShow',{txt: "加精粹"+valueStr})
                            // Emitter.fire('onOpenGetItemDialog', {
                            //     type: prizeType,
                            //     value: value,
                            //     valueStr: valueStr
                            // }, () => {
                            //     Emitter.fire('onOpenLuckyWheelDialog')
                            // }, () => {
                            //     Emitter.fire('onOpenLuckyWheelDialog')
                            // })
                            break;
                        case PrizeType.fragment:
                            // Emitter.fire('onAddGem',value)
                            // Emitter.fire('onTipsShow',{txt: "加精粹"+valueStr})
                            // let returnNum = UtilsDB.getCard()
                            // if (returnNum != -1) {
                            //     if (returnNum == 1) {
                            //         Emitter.fire('onOpenGetItemDialog',{
                            //             type : PrizeType.fragment1,
                            //             value : value,
                            //             valueStr : value
                            //         })
                            //     }else
                            //     if (returnNum == 2) {
                            //         Emitter.fire('onOpenGetItemDialog',{
                            //             type : PrizeType.fragment2,
                            //             value : value,
                            //             valueStr : value
                            //         })
                            //     }
                            //     // this.CardSprite.spriteFrame = this.bgtu[returnNum]
                            //     // this.CardCount.string = sendBoss.chip
                            //     // this.sendData.cardType = returnNum
                            //     // this.sendData.cardCount = sendBoss.chip
                            //
                            //     // UtilsAction.scaleToAndfadeIn(this.jingcuitips,1,4,4,1,1,null)
                            //     // UtilsAction.scaleToAndfadeIn(this.suipiantips,1,4,4,1,1,null)
                            // }else{
                            //
                            // }
                            // Emitter.fire('onOpenGetItemDialog', {
                            //     type: PrizeType.fragment,
                            //     value: value,
                            //     valueStr: value
                            // }, () => {
                            //     Emitter.fire('onOpenLuckyWheelDialog')
                            // }, () => {
                            //     Emitter.fire('onOpenLuckyWheelDialog')
                            // })

                            // PrizeType.fragment1
                            // PrizeType.fragment2
                            // Emitter.fire('onOpenGetItemDialog',{
                            //     type : prizeType,
                            //     value : value,
                            //     valueStr : value
                            // })
                            break;
                    }
                    // //加钱
                    // Emitter.fire('onAddGold',addGold)
                    // //加钻石
                    // Emitter.fire('onAddGem',addGem)

                    // UtilsDB.setPlayer(player)
                    // Emitter.fire('onTipsShow',{txt: "加钱加钻石加经验"})

                    // Umengstatistics.setEventForAndroidCount(maidianType.zhuanpanjiangli)

                    this.initOn()
                    // this.node.destroy()
                    // this.finshNo()
                }
            })
            .start()
    }

    // update (dt) {}
}
