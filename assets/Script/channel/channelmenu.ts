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
import {ItemPreType} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";
import Vec2 = cc.Vec2;
import ControlCommercial, {
    ControlCommercialItemName,
    ControlCommercialSceneId
} from "../control/controlCommercial";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChannelMenu extends ChannelBase {

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


            if (ControlCommercial.getSceneData(
                ControlCommercialSceneId.游戏首页,
                ControlCommercialItemName.主界面更多游戏图标展示控制) == true) {
                UtilsNode.show(this.bindComponent.菜单_更多精彩, true)
            }
            if (ControlCommercial.getSceneData(
                ControlCommercialSceneId.游戏首页,
                ControlCommercialItemName.主界面添加到桌面控制) == true) {
                UtilsNode.show(this.bindComponent.菜单_添加桌面, true)
            }
            //添加 加钱
           let addGold = ControlCommercial.getSceneData(
                ControlCommercialSceneId.游戏首页,
                ControlCommercialItemName.主界面添加到桌面奖励控制)




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

            let data = {
                // cancelNode : null,
                rootNode: this.node,
                // oppoNativeADToClose :null,
                ADTypeCode: Channel_oppoADType.K原生1280ID,
                // heights : [null,900,950, 970, 1040]
                p: new Vec2(-800, 0),
                orientation: 1,
                ylist: [-500, 500],
                name: ItemPreType.飞的原生广告或者激励视频广告
            }
            // ChannelManger.getInstance().getChannel().showNativeAd(data)
            ChannelManger.getInstance().getChannel().showNativeAdTestFly(data)

        }


        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.oppo) {
            if (ControlCommercial.getSceneData(
                ControlCommercialSceneId.游戏首页,
                ControlCommercialItemName.主界面更多游戏图标展示控制) == true) {
                UtilsNode.show(this.bindComponent.菜单_更多精彩, true)
                UtilsNode.show(this.bindComponent.菜单_添加桌面, true)
            }
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
    openInstallShortcut() {
        ccLog.log("点了添加桌面")
        if (ChannelManger.getInstance().getChannelType() == ChannelMangerType.oppo) {
            ChannelManger.getInstance().getChannel().installShortcut()
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

    registerEmitter() {

        Emitter.register("openBannerByMenu", this.openBannerByMenu, this)
        Emitter.register("closeBannerByMenu", this.closeBannerByMenu, this)
    }

    removeEmitter() {
        Emitter.remove("openBannerByMenu", this.openBannerByMenu, this)
        Emitter.remove("closeBannerByMenu", this.closeBannerByMenu, this)
    }

    // update (dt) {}
}
