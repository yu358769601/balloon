import ChannelAllBase from "./channelAllBase";
import {Ichannel_android} from "./Ichannel_android";
import ccLog from "../Log/ccLog";
import UtilsTime from "../Utils/UtilsTime";
import Api from "../api/api";
import Emitter from "../Msg/Emitter";

const {ccclass, property} = cc._decorator;

export class Channel_web extends ChannelAllBase implements Ichannel_android {

    adnative : [] = null;//原生广告
    adnativedata : []= null;//原生广告数据
    adnativepic : []= null;//原生广告图片


    ADtimesCD :[]=  [
        null,
        10,
        5,
        5,
        0,
    ]
    _createNativeAdTime : number = 0
    _createNativeAdCountMax : number = 2
    _createNativeAdCountMin : number = 0

    constructor() {
        super();
        // this.initAd()

    }
    checkChannel(): boolean {
        return true;
    }
    initAd() {
            ccLog.log("我现在是web")
    }

    createBanner() {
    }

    hideBannerAd() {
    }

    showBannerAd() {
    }

    showInterstitialAd() {
    }

    showVideoAd(successfulCallback, cancelCallback, failureCallback) {

    }

    closeFeedAd(num) {
    }

    fullCancelCallback() {
    }

    fullFailedCallback() {
    }

    fullSuccessCallback() {
    }

    loadFullVideoAd() {
    }

    loadRewardVideoAd() {
    }

    preFeedAd() {
    }

    setQuDaoByAndroid() {
    }

    setQuDaoByAndroidOppo(num) {
    }

    showClDialog() {
    }

    showFeedAd(num) {
    }

    showFullVideoAd(successfulCallback, cancelCallback, failureCallback) {
    }

    videoCancelCallback() {
    }

    videoFailedCallback() {
    }

    videoSuccessCallback() {
    }

    async showNativeAdTest(data){
        let currentTime = UtilsTime.getTime()
        let time = (currentTime - this._createNativeAdTime) / 1000;


        let adCode = Api.getAdCode()
        if (adCode ==4) {
            this._createNativeAdCountMin = 0
        }

        let temptime = 0
        ccLog.log("什么参数啊","adCode",adCode,"延时时间数组",this.ADtimesCD)
        temptime = this.ADtimesCD[adCode]
        if (this._createNativeAdCountMin >= this._createNativeAdCountMax) {
            if (time < temptime) {
                return;
            }
            this._createNativeAdCountMin = 0
        }
        let tempCode =  0
        this.adnativepic = []
        tempCode = data.ADTypeCode
        // this.shownative(tempCode)
        let successfulCallback = () => {
            // this.clicknative(tempCode)
            ccLog.log("点了广告了")
        };

        // let code = adCode
        const h = 0 - cc.winSize.height / 2;
        const pos = cc.v2(0, h);
        // console.log("现在 图呢","所有的图",this.adnativepic,"具体", this.adnativepic[data.ADTypeCode]);
        // let newdata = {
        //     code : adCode,
        //     texture : this.adnativepic[data.ADTypeCode],
        //     height : heightList[adCode]
        // }
         adCode = Api.getAdCode()
        data.adCode = adCode

        let remoteUrl = "https://adsfs.heytapimage.com/ads-material-depot/image/968155e6c0dc59663538c2b9a98a7ea8.jpg"
       await this.getUrlImage(data,remoteUrl)
        let heights = [
           null,900,950, 970, 1040
        ]
        console.log("下载资源图片完成 结果 1 ",this.adnativepic,data.ADTypeCode);
        data.texture = this.adnativepic[data.ADTypeCode]
        data.height = heights[data.adCode]
        console.log("给过去的",data);
        // data.parent
        // data.ADTypeCode
        //data.oppoNativeADToClose

        Emitter.fire('onOpenNativeAdDialog',data, pos,data.parent,successfulCallback)

         currentTime = UtilsTime.getTime()
        // console.log("现在有图 2",currentTime);
        this._createNativeAdTime = currentTime
        // console.log("现在有图 3",this._createNativeAdTime);
        if (adCode !=4) {
            this._createNativeAdCountMin++
        }

        // console.log("现在有图 4",this._createNativeAdCountMin);
        if (this._createNativeAdCountMin>=this._createNativeAdCountMax) {
            // console.log("现在有图 5",this._createNativeAdCountMin,"",this._createNativeAdCountMax);
            this._createNativeAdCountMin = this._createNativeAdCountMax
            // console.log("现在有图 6",this._createNativeAdCountMin,"",this._createNativeAdCountMax);
        }
    }

    async  getUrlImage(data,remoteUrl){
        return new Promise<any>((resolve, reject) => {
            cc.assetManager.loadRemote(remoteUrl, (err, texture) => {
                console.log("下载资源图片完成 有没有错误",err,texture);
                if (texture != null) {
                    // this._nativeAdTexture = texture;
                    console.log("下载资源图片完成",texture);
                    this.adnativepic[data.ADTypeCode] = texture
                    console.log("下载资源图片完成 结果 0 ",this.adnativepic);
                    resolve(0)
                }
                if (err != null) {
                    console.log("现在有错误");
                    reject()
                }
            })

        })

    }


    moreGame() {
    }



}

