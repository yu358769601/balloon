import BaseDialogNoAd from "./BaseDialogNoAd";
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

const {ccclass, property} = cc._decorator;

@ccclass
export default class NativeAdDialog extends BaseDialogNoAd {


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
        Emitter.remove('onkanyuanshengguanggao', this.onkanyuanshengguanggao, this)
        Emitter.remove('onLoadSP', this.onLoadSP, this)
        Emitter.remove('onCodeBtnClickByNativeAdDialog', this.onCodeBtnClickByNativeAdDialog, this)

    }

    registerEmitter() {
        Emitter.register('onkanyuanshengguanggao', this.onkanyuanshengguanggao, this)
        Emitter.register('onLoadSP', this.onLoadSP, this)
        Emitter.register('onCodeBtnClickByNativeAdDialog', this.onCodeBtnClickByNativeAdDialog, this)

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


            this.onCodeBtnClickByNativeAdDialog("")


        });

        this.btn_close.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.destroy();
            this.finshNo()
        })

    }

    //代码调用关闭
    onCodeBtnClickByNativeAdDialog(selfName){
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

    onLoadSP(selfName,num,sp){
        console.log("我重新再更换图片", num , this.data.ADTypeCode  ,sp);
        if (this.data.ADTypeCode == num ) {
            let sprite = new cc.SpriteFrame(sp);
            this.btn_bg.getComponent(cc.Sprite).spriteFrame = sprite;
        }
    }



    async setData(data, p) {
        console.log("展示原生广告的地方", data);
        this.data = data;
        this.p = p;
        // this.newData = {}
        ccLog.log("现在我的坐标是 0 ",this.node.getPosition())
        // ccLog.log("现在我的坐标是 1 ",data.cancelNode.getPosition())
        if (data.texture != null) {
            let sprite = new cc.SpriteFrame(data.texture);
            this.btn_bg.getComponent(cc.Sprite).spriteFrame = sprite;
        }else{
            this.node.destroy()
        }
        if (data.cancelNode) {
            let newP = Tools.convetOtherNodeSpace(data.cancelNode,this.node)
            ccLog.log("现在我的坐标是 2 ",newP)
        }

        if (data.debug ) {
            if (data.debug == true) {
                if (this.btn_click) {
                    this.btn_click.getComponent(cc.Sprite).enabled = true
                }
                if (this.btn_close) {
                    this.btn_close.getComponent(cc.Sprite).enabled = true
                }
            }
        }

        if (data.closedSize != null ) {
            if (this.btn_close) {
                this.btn_close.width = data.closedSize
                this.btn_close.height = data.closedSize
            }
        }

        // data.height = Utils.getADNativeHeight(Api.adCode,data.cancelNode,this.node,data.oppoNativeADToClose)

        ccLog.log("设置高度是多少原生广告oppo 1",data.height ,"现在广告版本是",data.adCode)
        if (data.height != null) {
            this.btn_click.height = data.height

            let boxCollider =  this.btn_click.getComponent(cc.BoxCollider)
            boxCollider.offset = new Vec2(0,this.btn_click.height/2)
            boxCollider.size = new Size(this.btn_click.width,this.btn_click.height)
        }
        // this.node.setPosition(p)

        console.log("高度呢",this.btn_click.height)
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


    subclassCall(): any {
        return
    }

}
