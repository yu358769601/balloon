import UtilsNode from "../System/Utils/UtilsNode";
import ccLog from "../System/Log/ccLog";
import LoadManage from "../System/Load/LoadManage";
import Emitter from "../System/Msg/Emitter";
import {DialogType} from "../System/Type/enums";
import Utils from "../System/Utils/Utils";
import Api from "../System/api/api";
import Tools from "../System/Utils/Tools";
import GameSetting, {gameModeType, passModeType} from "../System/mode/gameSetting";
import Vec2 = cc.Vec2;
import Size = cc.Size;
import BaseDialogNoAd from "../dialog/BaseDialogNoAd";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemFlyAD extends BaseDialogNoAd {


    @property(cc.Node)
    btn_click: cc.Node = null;
    @property(cc.Node)
    btn_bg: cc.Node = null;
    @property(cc.Node)
    btn_close: cc.Node = null;

    _clickFun: any = null;
    data: any = null;
    p: any = null;

    removeEmitter() {
        // Emitter.remove('onkanyuanshengguanggao', this.onkanyuanshengguanggao, this)
        // Emitter.remove('onLoadSP', this.onLoadSP, this)
        Emitter.remove('onCodeBtnClickByItemFlyAD', this.onCodeBtnClickByItemFlyAD, this)

    }

    registerEmitter() {
        // Emitter.register('onkanyuanshengguanggao', this.onkanyuanshengguanggao, this)
        // Emitter.register('onLoadSP', this.onLoadSP, this)
        Emitter.register('onCodeBtnClickByItemFlyAD', this.onCodeBtnClickByItemFlyAD, this)

    }

    public onDestroy(): void {
        // cc.log(" 现在删不掉吗 ","PK");
        this.removeEmitter()
        // this.node.off(cc.Node.EventType.TOUCH_END)
    }

    onLoad() {
        GameSetting.setPassMode(passModeType.暂停)
        this.removeEmitter()
        this.registerEmitter()


        this.btn_click.on(cc.Node.EventType.TOUCH_START, () => {
            // let  data = {
            //     txt : "我点了看广告 0 "+(this.successfulCallback == null)
            // }
            // // let cllbacks = {
            // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
            // //     failureCallback: this.newSkinDialogfailureCallback
            // // }
            // Emitter.fire("onOpenToast",{name : ItemLoad.打印吐司,zIndex : 100,data:data},null)
            // this._clickFun && this._clickFun();


            this.onCodeBtnClickByItemFlyAD("")


        });

        if (this.btn_close) {
            this.btn_close.on(cc.Node.EventType.TOUCH_END, () => {
                this.node.destroy();
                this.finshNo()
            })
        }


    }

    //代码调用关闭
    onCodeBtnClickByItemFlyAD(selfName) {
        if (this.successfulCallback) {
            this.successfulCallback(this)
        }
        this.finshNo()
    }


    onkanyuanshengguanggao(self) {
        if (this.successfulCallback) {
            this.successfulCallback()
        }
    }


    init({texture: texture, clickFun: clickFun}) {
        let sprite = new cc.SpriteFrame(texture);
        this.btn_bg.getComponent(cc.Sprite).spriteFrame = sprite;
        this._clickFun = clickFun;
    }

    onLoadSP(selfName, num, sp) {
        console.log("我重新再更换图片", num, this.data.ADTypeCode, sp);
        if (this.data.ADTypeCode == num) {
            let sprite = new cc.SpriteFrame(sp);
            this.btn_bg.getComponent(cc.Sprite).spriteFrame = sprite;
        }
    }


    async setData(data, p) {
        console.log("展示原生广告的地方", data);
        this.data = data;
        this.p = p;
        // this.newData = {}
        ccLog.log("现在我的坐标是 0 ", this.node.getPosition())
        // ccLog.log("现在我的坐标是 1 ",data.cancelNode.getPosition())
        if (data.texture != null) {
            let sprite = new cc.SpriteFrame(data.texture);
            this.btn_bg.getComponent(cc.Sprite).spriteFrame = sprite;
        } else {
            this.node.destroy()
        }
        if (data.cancelNode) {
            let newP = Tools.convetOtherNodeSpace(data.cancelNode, this.node)
            ccLog.log("现在我的坐标是 2 ", newP)
        }


        // data.height = Utils.getADNativeHeight(Api.adCode,data.cancelNode,this.node,data.oppoNativeADToClose)

        ccLog.log("设置高度是多少原生广告oppo 1", data.height, "现在广告版本是", data.adCode)
        if (data.height != null) {
            this.btn_click.height = data.height

            let boxCollider = this.btn_click.getComponent(cc.BoxCollider)
            boxCollider.offset = new Vec2(0, this.btn_click.height / 2)
            boxCollider.size = new Size(this.btn_click.width, this.btn_click.height)
        }
        // this.node.setPosition(p)

        console.log("高度呢", this.btn_click.height)




        if (data.p != null) {
            this.node.setPosition(data.p)
        }
        if (data.orientation != null) {
            this.startAction(data.orientation,data.ylist)
        }


        // let  data1 = {
        //     txt : "创建了吗"
        // }
        // // let cllbacks = {
        // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
        // //     failureCallback: this.newSkinDialogfailureCallback
        // // }
        // Emitter.fire("onOpenToast",{name : ItemLoad.打印吐司,zIndex : 100,data:data1},null)
    }

    successfulCallback(self) {
    }

    failureCallback(newself, newdata) {
    }

    initCallback(successfulCallback) {
        this.successfulCallback = successfulCallback
    }

    orientation = 1
    ylist: number[] = []

    startAction(orientation, ylist) {
        this.orientation = orientation
        this.ylist = ylist


        this.fiyADCallBack1()


    }

    fiyADCallBack1() {
        let random = Utils.random(this.ylist[0], this.ylist[1])
        let p = this.node.getPosition()
        this.node.setPosition(p.x, random)

        let duration0 = 3
        let duration1 = 1
        let duration2 = 1
        let duration3 = 1

        let x = 1600 * this.orientation
        let y = 0
        let offSetY1 = 100
        let offSetY2 = -200
        let offSetY3 = 100
        UtilsAction.fiyAD(this.node, duration0, x, y, duration1, offSetY1, duration2, offSetY2, duration3, offSetY3,this, this.fiyADCallBack2)
    }


    fiyADCallBack2(self) {
        // ccLog.log("动画回调",this)
        self.orientation*=-1
        self.fiyADCallBack1()
    }


    subclassCall(): any {
        return
    }

}
