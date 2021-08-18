// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChannelBase, {ChannelBaseType} from "./channelBase";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import ChannelManger, {ChannelMangerType} from "../System/qudao/channelManger";
import Menu from "../pass/menu";
import Utils from "../System/Utils/Utils";
import Api from "../System/api/api";
import {Channel_oppoADType} from "../System/qudao/channel_oppo";
import UtilsNode from "../System/Utils/UtilsNode";
import {DialogType, ItemPreType} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";
import Vec2 = cc.Vec2;
import ControlCommercial, {
    ControlCommercialItemName,
    ControlCommercialSceneId
} from "../control/controlCommercial";
import UtilsDB, {AssetsType} from "../System/Utils/UtilsDB";
import JsonManager from "../System/manage/JsonManager";

const {ccclass, property} = cc._decorator;


export interface IChannelMenu {
    主界面更多游戏图标展示控制()
    主界面添加到桌面控制()
    主界面添加到桌面奖励控制()
    限时礼包开关控制()
    限时礼包奖励时间范围控制()
    限时礼包主动展示()

    特殊按钮2开关控制()
    特殊按钮2展示概率控制()
    特殊按钮2展示间隔控制(is)
    特殊按钮2点击区域大小()
}

@ccclass
export default class ChannelMenu extends ChannelBase implements IChannelMenu{
    主界面更多游戏图标展示控制() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.游戏首页,
            ControlCommercialItemName.主界面更多游戏图标展示控制) == true) {
            ccLog.log("更多精彩出来了吗",)
            UtilsNode.show(this.bindComponent.菜单_更多精彩, true)
        }
    }
    主界面添加到桌面控制() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.游戏首页,
            ControlCommercialItemName.主界面添加到桌面控制) == true) {
            UtilsNode.show(this.bindComponent.菜单_添加桌面, true)
        }
    }
    主界面添加到桌面奖励控制() {
        //添加 加钱
        let addGold = ControlCommercial.getSceneData(
            ControlCommercialSceneId.游戏首页,
            ControlCommercialItemName.主界面添加到桌面奖励控制)


        if (addGold<=0) {
            return
        }

        let  dataItem = {
            self : this,
            rootNode : this.node,
            count : addGold
        }
        let cllbacks = {
            ItemPreTypesuccessfulCallback: this.ItemPreTypesuccessfulCallback,
            // lookDialogfailureCallback: this.lookDialogfailureCallback
        }
        Emitter.fire("onOpenToast",{name : ItemPreType.加钱,zIndex : 100,data:dataItem},cllbacks)


    }

    ItemPreTypesuccessfulCallback(data){
        let addGemData = {
            type : AssetsType.钻石,
            count : data.data.count,
            // callbackGem_donthave : this.callbackGem_donthaveAdd,
            // callbackGem_addsucceed : this.callbackGem_addsucceedAdd,
            // callbackGem_subsucceed : this.callbackGem_subsucceed
        }
        UtilsDB.addAssets(addGemData)
    }


    限时礼包开关控制() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.游戏首页,
            ControlCommercialItemName.限时礼包开关控制) == true) {
            UtilsNode.show(this.bindComponent.菜单_限时礼包, true)
            ccLog.log("限时礼包 显示",this.bindComponent.菜单_限时礼包)
            this.bindComponent.菜单_限时礼包.getComponent("itemGetLuckBtn").startA()



        }
        ccLog.log("限时礼包 不显示",this.bindComponent.菜单_限时礼包)
    }
    限时礼包奖励时间范围控制() {

    }
    限时礼包主动展示() {

    }

    特殊按钮2开关控制() {
        if (ControlCommercial.getSceneData(
            ControlCommercialSceneId.漂浮窗,
            ControlCommercialItemName.特殊按钮2开关控制) == true) {
            // UtilsNode.show(this.bindComponent.引导_小手指,true)
            // UtilsAction.hand(this.bindComponent.引导_小手指)
            ccLog.log("判断是否出现广告","特殊按钮2开关控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","特殊按钮2开关控制",false)
        return false
    }

    特殊按钮2展示概率控制() {
        if (ControlCommercial.getRandom(
            ControlCommercialSceneId.漂浮窗,
            ControlCommercialItemName.特殊按钮2展示概率控制) == true) {
            ccLog.log("判断是否出现广告","特殊按钮2展示概率控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","特殊按钮2展示概率控制",false)
        return false
    }

    特殊按钮2展示间隔控制(is) {
        if (ControlCommercial.getItemNameTime(
            ControlCommercialSceneId.漂浮窗,
            ControlCommercialItemName.特殊按钮2展示间隔控制,is) == true) {
            ccLog.log("判断是否出现广告","特殊按钮2展示间隔控制",true)
            return true
        }
        ccLog.log("判断是否出现广告","特殊按钮2展示间隔控制",false)
        return false
    }

    特殊按钮2点击区域大小() {
        if (
            Utils.allTrueOrFalseByAllItem(true,[
                this.特殊按钮2开关控制(),
                this.特殊按钮2展示概率控制(),
                this.特殊按钮2展示间隔控制(true),
            ])
        ) {
            this.特殊按钮2展示间隔控制(false)
            let ControlNum =  ControlCommercial.getSceneData(
                ControlCommercialSceneId.漂浮窗,
                ControlCommercialItemName.特殊按钮2点击区域大小)
            // if (ControlNum == null) {
            //     ControlNum = 100
            // }
            // this.bindComponent.失败_看广告跳过实际点击.height += ControlNum
            //根据渠道不同展示广告
            //先留着
            if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.web) {
                let data = {
                    // cancelNode : null,
                    rootNode: this.node,
                    // oppoNativeADToClose :null,
                    ADTypeCode: Channel_oppoADType.K原生1280ID,
                    // heights : [null,900,950, 970, 1040]
                    p: new Vec2(-800, 0),
                    orientation: 1,
                    ylist: [200, 600],
                    name: ItemPreType.飞的原生广告或者激励视频广告,
                    debug : ControlCommercial.getSceneData(
                        ControlCommercialSceneId.游戏首页,
                        ControlCommercialItemName.测试开关),
                    withHeight : [ControlNum/100, ControlNum/100],

                    self : this,
                    startCallBack : this.startCallBack
                }
                // ChannelManger.getInstance().getChannel().showNativeAd(data)
                ChannelManger.getInstance().getChannel().showNativeAdTestFly(data)

            }
            if (ChannelManger.getInstance().getChannelType() ==  ChannelMangerType.oppo) {
                let data = {
                    // cancelNode : null,
                    rootNode: this.node,
                    // oppoNativeADToClose :null,
                    ADTypeCode: Channel_oppoADType.K512,
                    // heights : [null,900,950, 970, 1040]
                    p: new Vec2(-800, 0),
                    orientation: 1,
                    ylist: [-300, 300],
                    name: ItemPreType.飞的原生广告或者激励视频广告,
                    debug  : ControlCommercial.getSceneData(
                        ControlCommercialSceneId.游戏首页,
                        ControlCommercialItemName.测试开关),
                    withHeight : [ControlNum/100, ControlNum/100],
                    self : this,
                    startCallBack : this.startCallBack
                }
                // ChannelManger.getInstance().getChannel().showNativeAd(data)
                ChannelManger.getInstance().getChannel().showNativeAdFly(data)

            }
        }
    }
    fiyADNode : any
    startCallBack(data,item){
        ccLog.log("飞得参数是啥",data,item)
        data.fiyADNode = item
    }
    onReMoveFiyADNode(){
        ccLog.log("飞得参数是啥 删除飞的", this.fiyADNode)
        if ( this.fiyADNode != null) {
            if (this.fiyADNode.node) {
                this.fiyADNode.node.destroy()
            }

        }
    }



    @property(
        {
            type: Menu,
            displayName: "Menu放这里"
        }
    )    // call cc.Enum
    bindComponent: Menu = null

    // LIFE-CYCLE CALLBACKS:
    async init() {
        // this._menu = menu
        this.bindComponent.init(this)
        //这里的原生广告开始有60秒要不显示
        ControlCommercial.getItemNameTimeByFirst(
            ControlCommercialSceneId.限时礼包,
            ControlCommercialItemName.原生广告初始展示间隔控制)
        ControlCommercial.getItemNameTimeByFirst(
            ControlCommercialSceneId.皮肤试用,
            ControlCommercialItemName.原生广告初始展示间隔控制)

        // switch (this.channelType){
        //     case ChannelBaseType.Android:
        //
        //         break;
        // }

        // switch (qudaoCommon.qudao) {
        //     case platform_Android:
        //
        //         break;
        //     case platform_Android:
        //
        //         break;
        // }


        // if (qudaoCommon.qudao == platform_Android_oppo ||qudaoCommon.qudao == platform_qq ) {
        //     menu.更多精彩.active = true;
        //
        // }else{
        //     menu.更多精彩.active = false
        // }

        // let channelMangerType = ChannelManger.getInstance().getChannelType()
        // if (channelMangerType == ChannelMangerType.Android_oppo ||channelMangerType == ChannelMangerType.qq ) {
        //     menu.更多精彩.active = true;
        // }else{
        //     menu.更多精彩.active = false
        // }


        //
        //


        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.web) {

            this.主界面更多游戏图标展示控制()
            this.主界面添加到桌面控制()
            // this.主界面添加到桌面奖励控制()
            this.限时礼包开关控制()


            // this._gameOverDialog.initViewChannelNode(this._gameOverDialog.居中布局 )
            // Api.adCode = 4
            //设置 激励视频按钮和取消的入侵程度
            // let height =  Utils.getADBtnHeight(
            //     Api.getAdCode(),
            //     // 4,
            //     this._gameOverDialog.结算多倍按钮实际点击,
            //     this._gameOverDialog.结算继续按钮实际点击,
            //     this.oppoADToClose)
            //
            // this._gameOverDialog.结算多倍按钮实际点击.height = height

            // data.parent
            // data.ADTypeCode
            //data.oppoNativeADToClose


            // let data = {
            //     cancelNode : null,
            //     parent : this.node,
            //     oppoNativeADToClose :null,
            //     ADTypeCode : Channel_oppoADType.K原生1280ID,
            //     heights : [null,900,950, 970, 1040]
            // }
            // // ChannelManger.getInstance().getChannel().showNativeAd(data)
            // ChannelManger.getInstance().getChannel().showNativeAdTest(data)
            // //飞原生广告
            // let ItemFlyAD = await UtilsNode.getNode(ItemPreType.飞的原生广告或者激励视频广告, data.parent);
            // ccLog.log("飞的广告",ItemFlyAD)
            // ItemFlyAD.setPosition(data.p)
            // ItemFlyAD.getComponent(ItemPreType.飞的原生广告或者激励视频广告).startAction(1,[-500,500])
            // ItemFlyAD.getComponent(ItemPreType.飞的原生广告或者激励视频广告).initCallback()

            // let data = {
            //     // cancelNode : null,
            //     rootNode: this.node,
            //     // oppoNativeADToClose :null,
            //     ADTypeCode: Channel_oppoADType.K原生1280ID,
            //     // heights : [null,900,950, 970, 1040]
            //     p: new Vec2(-800, 0),
            //     orientation: 1,
            //     ylist: [-500, 500],
            //     name: ItemPreType.飞的原生广告或者激励视频广告
            // }
            // // ChannelManger.getInstance().getChannel().showNativeAd(data)
            // ChannelManger.getInstance().getChannel().showNativeAdTestFly(data)

        }


        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.oppo) {
            this.主界面更多游戏图标展示控制()
            this.主界面添加到桌面控制()

            this.限时礼包开关控制()
            ChannelManger.getInstance().getChannel().showBannerAd()
        }


    }

    onLoad() {
        super.onLoad()
        // ccLog.log("检测先后顺序 ChannelgameOverDialog onLoad")
    }

    onDestroy() {
        super.onDestroy();


        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.oppo) {
            ChannelManger.getInstance().getChannel().hideBannerAd()
        }

    }

    //更多精彩
    openMoreWonderful() {
        ccLog.log("点了更多精彩了")
        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.oppo) {
            ChannelManger.getInstance().getChannel().moreGame()
        }
    }

    //点了添加桌面
    openInstallShortcut(success) {
        ccLog.log("点了添加桌面")
        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.oppo) {
            ChannelManger.getInstance().getChannel().installShortcut(()=>{
                if (UtilsDB.addOppoZhuomian() == true) {
                    this.主界面添加到桌面奖励控制()
                }
            })
        }
    }

    // Emitter.fire("openBannerByMenu")
    //显示广告
    openBannerByMenu() {
        if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
            ChannelManger.getInstance().getChannel().showBannerAd()
        }

        // switch (qudaoCommon.qudao) {
        //     case platform_Android:
        //     case platform_Android_mi:
        //     case platform_Android_oppo:
        //         // Emitter.fire("closeBannerByMenu")
        //         //打开原生广告
        //         qudaoCommon.openBannerAd()
        //         break;
        //
        // }
    }

    // Emitter.fire("closeBannerByMenu")
    //关闭广告
    closeBannerByMenu() {
        if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
            ChannelManger.getInstance().getChannel().hideBannerAd()
        }
        // switch (qudaoCommon.qudao) {
        //     case platform_Android:
        //     case platform_Android_mi:
        //     case platform_Android_oppo:
        //         // Emitter.fire("openBannerByMenu")
        //         //打开原生广告
        //         qudaoCommon.closeBannerAd()
        //         break;

    }

    start() {
        this.init()
    }
    flyAd(){
        this.特殊按钮2点击区域大小()
    }

    getLuckDialogTime : number = 0

    onOpenDialogByGetLuckDialog(selfName,data){
        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.web) {
            // if (ControlCommercial.getItemNameTime(
            //     ControlCommercialSceneId.游戏首页,
            //     ControlCommercialItemName.限时礼包奖励时间范围控制) == true) {
            //
            //
            // }

            if (ControlCommercial.getSceneData(
                ControlCommercialSceneId.游戏首页,
                ControlCommercialItemName.限时礼包主动展示) == true) {
                Emitter.fire("onOpenDialog",{name : DialogType.限时礼包,zIndex : 100,data:data},null)
            }


        }
        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.oppo) {
            // if (ControlCommercial.getItemNameTime(
            //     ControlCommercialSceneId.游戏首页,
            //     ControlCommercialItemName.限时礼包奖励时间范围控制) == true) {
            //
            //
            // }

            if (ControlCommercial.getSceneData(
                ControlCommercialSceneId.游戏首页,
                ControlCommercialItemName.限时礼包主动展示) == true) {
                Emitter.fire("onOpenDialog",{name : DialogType.限时礼包,zIndex : 100,data:data},null)
            }


        }
    }



    registerEmitter() {

        Emitter.register("openBannerByMenu", this.openBannerByMenu, this)
        Emitter.register("closeBannerByMenu", this.closeBannerByMenu, this)
        Emitter.register("onOpenDialogByGetLuckDialog", this.onOpenDialogByGetLuckDialog, this)
        Emitter.register("onReMoveFiyADNode", this.onReMoveFiyADNode, this)
    }

    removeEmitter() {
        Emitter.remove("openBannerByMenu", this.openBannerByMenu, this)
        Emitter.remove("closeBannerByMenu", this.closeBannerByMenu, this)
        Emitter.remove("onOpenDialogByGetLuckDialog", this.onOpenDialogByGetLuckDialog, this)
        Emitter.remove("onReMoveFiyADNode", this.onReMoveFiyADNode, this)
    }

    // update (dt) {}
}
