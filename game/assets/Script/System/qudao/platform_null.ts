import {qudaoType} from "../Type/enums";

const { ccclass, property } = cc._decorator;

@ccclass
export default class platform_null extends cc.Component {
    static _name : any = qudaoType.NULL;

    static initAd() {
        console.log("无平台,不展示广告")
    }

    //创建banner广告
    static createBannerAd() {
        return;
        console.log("无平台,不展示广告")
    }
    //显示banner广告
    static showBannerAd() {

    }
    //隐藏banner广告
    static hideBannerAd() {
        return;
        console.log("无平台,不展示广告")
    }
    //创建激励视频广告
    static createVideoAd() {
        return;
        console.log("无平台,不展示广告")
    }
    //显示激励视频广告
    static showVideoAd(successfulCallback, cancelCallback, failureCallback) {
        return;
        console.log("无平台,不展示广告")
    }
    //创建插屏广告
    static createInterstitialAd() {
        return;
        console.log("无平台,不展示广告")
    }
    //显示插屏广告
    static showInterstitialAd() {
        return;
        console.log("无平台,不展示广告")
    }

    //注意:需要真机才能看到
    static createBlockAd() {
        return;
        console.log("无平台,不展示广告")
    }
    //创建积木广告
    static showBlockAd() {
        return;
        console.log("无平台,不展示广告")
    }
    //隐藏积木广告
    static hideBlockAd() {
        return;
        console.log("无平台,不展示广告")
    }
    //创建盒子广告
    static createAppBox() {
        return;
        console.log("无平台,不展示广告")
    }
    //显示盒子广告
    static showAppBox() {
        return;
        console.log("无平台,不展示广告")
    }
    static moreGame() {
        return;
        console.log("moreGame")
    }


    static showNativeAd(node) {
        // code1：点击区域占按钮的1/3，10秒内展示2次；
        // code2：点击区域占按钮的1/3，5秒内展示2次；激励视频的点击区域靠近下一关
        // code3：点击区域占按钮的一半，5秒内展示2次；激励视频的点击区域占下一关按钮的顶部
        // code4：点击区域占按钮的一半，展示次数无限制；激励视频的点击区域占下一关按钮的顶部

        //模拟oppo

        let heightList = []
        heightList[1] = 750
        heightList[2] = 750
        heightList[3] = 820
        heightList[4] = 820
        let code = 1
        const h = 0 - cc.winSize.height / 2;
        const pos = cc.v2(0, h);
        ccLog.log("高度是",cc.winSize.height,"设置在什么位置呢",h)
        let data = {
            code : code,
            texture : null,
            height : heightList[code]
        }
        Emitter.fire('onOpenNativeAdDialog',data, pos,node,null)
        //设置按钮高度
        let codeData = {
            code : code
        }
        Emitter.fire('onLookADBtnHeight',codeData)

        ccLog.log("设置高度 ")



    };

    static closeNativeAd() {

    }
}
