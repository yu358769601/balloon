// import BaseComponent from "../System/Base/BaseComponent";

import {qudaoType} from "../Type/enums";

const {ccclass, property} = cc._decorator;

export enum Platform_oppoADCode {
    K激励视频ID = "310528",
    K原生640ID = "310530",
    K原生620ID = "310531",
    K原生三张ID = "310532",
}



@ccclass
export default class Platform_oppo extends cc.Component {
// export default class toutiao extends BaseComponent {
    static _name : any = qudaoType.OPPO;

    static bannerAdcreate: any = null;
    static videoAdcreate: any = null;
    static interstitialAdcreate: any = null;
    static nativeAdcreate: any = null;
    static _nativeCurrentAd: any = null;
    static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败
    static _createBannerTime: any = null;
    static js:  any = null;
    static _nativeAdTexture: any = null;

    static _createNativeAdTime : number = 0
    static _createNativeAdCountMax : number = 2
    static _createNativeAdCountMin : number = 0

    static adnative : [] = null;//原生广告
    static adnativedata : []= null;//原生广告数据
    static adnativepic : []= null;//原生广告图片


    static createnative(){//创建原生广告，只调用一次
        let tempnativeid = [];
        console.log("现在是 oppo",cc.sys.platform == cc.sys.OPPO_GAME);
        if(cc.sys.platform == cc.sys.OPPO_GAME){
            tempnativeid.push(Platform_oppoADCode.K原生640ID);
            tempnativeid.push(Platform_oppoADCode.K原生620ID);
            tempnativeid.push(Platform_oppoADCode.K原生三张ID);
        }
        else if(cc.sys.platform == cc.sys.VIVO_GAME){
            tempnativeid.push("原生广告ID1");
            tempnativeid.push("原生广告ID2");
            tempnativeid.push("原生广告ID3");
        }
        this.adnative = [];
        this.adnativedata = [];
        this.adnativepic = [];
        // if(this.adnative == null)
        // {
        //     this.adnative = [];
        //     this.adnativedata = [];
        //     this.adnativepic = [];
        // }
        for(let i in tempnativeid)
        {
            // if(!this.adnative[i] && tempnativeid[i] != "")
            // {
                this.adnativepic[i] = null;
                if(cc.sys.platform == cc.sys.OPPO_GAME){
                    console.log("加载oppo原生广告"+i,"参数是",tempnativeid[i]);
                    this.adnative[i] = qg.createNativeAd({
                        adUnitId: tempnativeid[i]
                    });
                }
                else if(cc.sys.platform == cc.sys.VIVO_GAME){
                    this.adnative[i] = qg.createNativeAd({
                        posId: tempnativeid[i]
                    });
                }
                this.adnative[i].onLoad((res) => {
                    if (res && res.adList){
                        console.log("原生广告完成"+i);
                        this.adnativedata[i] = res.adList.pop();
                        this.loadnativepic(i);
                    }
                });
                this.adnative[i].onError(err => {
                    console.log("原生广告加载异常"+i, err);
                });
                this.adnative[i].load();
            // }
        }
    }
    static createnativeByIndex(index){//创建原生广告，只调用一次
        if (index == null) {
            this.createnative()
            return
        }
        let tempnativeid = [];
        console.log("现在是 oppo",cc.sys.platform == cc.sys.OPPO_GAME);
        if(cc.sys.platform == cc.sys.OPPO_GAME){
            tempnativeid.push(Platform_oppoADCode.K原生640ID);
            tempnativeid.push(Platform_oppoADCode.K原生620ID);
            tempnativeid.push(Platform_oppoADCode.K原生三张ID);
        }
        else if(cc.sys.platform == cc.sys.VIVO_GAME){
            tempnativeid.push("原生广告ID1");
            tempnativeid.push("原生广告ID2");
            tempnativeid.push("原生广告ID3");
        }
        // this.adnative = [];
        // this.adnativedata = [];
        // this.adnativepic = [];
        // if(this.adnative == null)
        // {
        //     this.adnative = [];
        //     this.adnativedata = [];
        //     this.adnativepic = [];
        // }

        if (this.adnativepic[index] == null) {
            if(cc.sys.platform == cc.sys.OPPO_GAME){
                console.log("加载oppo原生广告"+index,"参数是",tempnativeid[index]);
                this.adnative[index] = qg.createNativeAd({
                    adUnitId: tempnativeid[index]
                });
            }
            else if(cc.sys.platform == cc.sys.VIVO_GAME){
                this.adnative[index] = qg.createNativeAd({
                    posId: tempnativeid[index]
                });
            }
            this.adnative[index].onLoad((res) => {
                if (res && res.adList){
                    console.log("原生广告完成"+index);
                    this.adnativedata[index] = res.adList.pop();
                    this.loadnativepic(index);
                }
            });
            this.adnative[index].onError(err => {
                console.log("原生广告加载异常"+index, err);
            });
            this.adnative[index].load();
        }


        // for(let i in tempnativeid)
        // {
        //     // if(!this.adnative[i] && tempnativeid[i] != "")
        //     // {
        //         this.adnativepic[i] = null;
        //         if(cc.sys.platform == cc.sys.OPPO_GAME){
        //             console.log("加载oppo原生广告"+i,"参数是",tempnativeid[i]);
        //             this.adnative[i] = qg.createNativeAd({
        //                 adUnitId: tempnativeid[i]
        //             });
        //         }
        //         else if(cc.sys.platform == cc.sys.VIVO_GAME){
        //             this.adnative[i] = qg.createNativeAd({
        //                 posId: tempnativeid[i]
        //             });
        //         }
        //         this.adnative[i].onLoad((res) => {
        //             if (res && res.adList){
        //                 console.log("原生广告完成"+i);
        //                 this.adnativedata[i] = res.adList.pop();
        //                 this.loadnativepic(i);
        //             }
        //         });
        //         this.adnative[i].onError(err => {
        //             console.log("原生广告加载异常"+i, err);
        //         });
        //         this.adnative[i].load();
        //     // }
        // }
    }
    static loadnative(num){//加载原生广告
        if(this.adnative[num] && this.adnative[num] != null)
        {
            this.adnative[num].load();
        }
    }
    static loadnativepic(num){//预加载原生广告的图片,需要显示原生广告时，直接引用图片对象adnativepic
        let self = this;
        // this.adnativepic[num] = null;
        let temppath = Utils.getStr(this.adnativedata[num].imgUrlList[0],0,"?")
        console.log("现在 下载图 路径 ",temppath);
        if(temppath != "")
        {

            cc.assetManager.loadRemote(temppath,  (err, tex)=> {
                if(err)
                {
                    console.log("现在 有错误 ",err);
                }
                else
                {
                    console.log("loadnativepicok "+num);
                    // let sp = new cc.SpriteFrame(tex,new cc.Rect(0, 0, tex.width, tex.height));
                    let sp = tex;
                    console.log("现在 有图 ",sp);
                    console.log("现在 渠道名字 ",this._name);
                    this.adnativepic[num] = sp;
                    console.log("现在 放进去了吗 ",this.adnativepic);
                    console.log("现在 下载资源图片完成",tex);
                    Emitter.fire('onSetTempSprite',sp)
                }
            });
        }
    }
    static shownative(num){//上报显示
        let self = this;
        if(this.adnative[num] != null && this.adnativedata[num] != null)
        {
            this.adnative[num].reportAdShow({ adId: this.adnativedata[num].adId });
        }
    }
    static clicknative(num){//上报点击
        let self = this;
        if(this.adnative[num] != null && this.adnativedata[num] != null)
        {
            this.adnative[num].reportAdClick({ adId: this.adnativedata[num].adId });
            this.loadnative(num);
        }else{
            this.loadnative(num);
        }

    }

    static initAd() {
        // this._bannerAdId = "227067";
        // this._nativeAdid = "283365";
        // this._videoAdId = "283347";
        // this.createBannerAd();
        // oppo广告参数
        // 疯狂橡皮擦ID: 30511249
        // 《疯狂橡皮擦》K开屏广告ID: 310527
        // 《疯狂橡皮擦》K激励视频ID: 310528
        // 《疯狂橡皮擦》K原生640ID: 310530
        // 《疯狂橡皮擦》K原生620ID: 310531
        // 《疯狂橡皮擦》K原生三张ID: 310532
        // 疯狂橡皮擦-互推浮层ID: 310526
        this.createVideoAd();
        // this.initNativeAd();
        this.createnative()
    }

    static createBannerAd() {
        // const bannerAd = qg.createBannerAd({
        //     adUnitId: "227067",
        //     style: {
        //         top: 300,
        //         left: 0,
        //         width: 900,
        //         height: 300,
        //     }
        // });
    
        // bannerAd.onError(err => {
        //     console.log("banner广告加载失败", err);
        // });
    
        // bannerAd.onHide(function () {
        //     console.log('banner 广告隐藏')
        // });
    
        // bannerAd.onLoad(function () {
        //     console.log("banner 广告加载成功");
        // });
    
        // bannerAd.onResize(res => {
        //     console.log('banner 宽度：' + obj.width + ', banner 高度：' + obj.height)
        // });
    
        // this.bannerAdcreate = bannerAd;
    }

    static showBannerAd() {
        // var currentTime = (new Date).getTime();
        // var time = (currentTime - this._startTime) / 1000;
        // if (time <= 60) {
        //     return;
        // }
        // if (this.bannerAdcreate) {
            // this.bannerAdcreate.show();
        // } else {
        //     console.log("bannerAdcreate广告加载失败");
        // }
    }
    
    static hideBannerAd() {
        // if (this.bannerAdcreate) {
            // this.bannerAdcreate.hide()
        // } else {
        //     console.log("bannerAdcreate广告加载失败");
        // }
    }

    static createVideoAd() {
        // if (cc.sys.platform != cc.sys.OPPO_GAME) {
        //     return
        // }
        // if (qg == null) {
        //    return
        // }
        const videoAd = qg.createRewardedVideoAd({
            //激励视频
            adUnitId: Platform_oppoADCode.K激励视频ID,
        });

        videoAd.onError(err => {
            console.log("激励视频广告加载失败", err);
            if (this._videoAdFailCallback) {
                this._videoAdFailCallback();
            }
            this._videoAdFailCallback = null;
        });

        videoAd.onClose(res => {
            if (res && res.isEnded || res === undefined) {
                console.log("视频观看成功");
                if (this._videoAdSuccessCallback) {
                    this._videoAdSuccessCallback();
                }
            } else {
                console.log("视频观看取消");
                if (this._videoAdCancelCallback) {
                    this._videoAdCancelCallback();
                }
            }
            this._videoAdSuccessCallback = null;
            this._videoAdCancelCallback = null;
        });
        this.videoAdcreate = videoAd;
    };

    //显示激励视频广告
    static showVideoAd(successfulCallback, cancelCallback, failureCallback) {
        if (this.videoAdcreate) {
            this._videoAdSuccessCallback = successfulCallback;
            this._videoAdCancelCallback = cancelCallback;
            this._videoAdFailCallback = failureCallback;
            this.videoAdcreate.load()                   //激励视频加载
                .then(() => this.videoAdcreate.show())
                .catch(err => {
                    // console.log(err.errMsg);
                    this.videoAdcreate.load().then(() => {
                        console.log("手动加载成功");
                        // 加载成功后需要再显示广告
                        return this.videoAdcreate.show();
                    });
                });
        }
    }

    static showInterstitialAd() {

    }


    static async initNativeAd(code ?) {
        return new Promise <any>((resolve, reject) => {
            let tempCode =  Platform_oppoADCode.K原生640ID
            if (code != null) {
                tempCode = code
            }
            const nativeAd = qg.createNativeAd({
                adUnitId: tempCode,
            });

            nativeAd.load();
            nativeAd.onLoad(async(res) => {
                // Emitter.fire('onTipsShow',{txt: "onload触发"+JSON.stringify(res)})
                console.log('原生广告加载完成-onload触发', JSON.stringify(res));
                let nativeCurrentAd;
                if (res && res.adList) {
                    nativeCurrentAd = res.adList[0];
                    // const remoteUrl = nativeCurrentAd.iconUrlList[0];
                    const remoteUrl = nativeCurrentAd.imgUrlList[0];
                    console.log("下载资源图片完成"+remoteUrl);

                    this._nativeCurrentAd = nativeCurrentAd;
                    // Emitter.fire('onTipsShow',{txt: "下载资源图片完成"+remoteUrl})
                    // https://adsfs.heytapimage.com/ads-material-depot/image/c264bd4465aa08f0b7516dc6a1c06328.jpg?region=cn-north-1&x-ocs-process=image%2fresize%2cm_fix%2cw_640%2ch_320%2ffallback
                    cc.assetManager.loadRemote(remoteUrl, async(err, texture) => {


                        console.log("下载资源图片完成 有没有错误",err);

                        if (texture != null) {
                            this._nativeAdTexture = texture;
                            // console.log("下载资源图片完成",texture);
                            resolve()
                        }
                        if (err != null) {
                            console.log("现在有错误");
                            resolve()
                        }


                    })

                }
            });

            nativeAd.onError(err => {
                console.log("原生广告加载异常", err);
                resolve()
            });
            this.nativeAdcreate = nativeAd;

        })


    };
    static async showNativeAd(node ,code?) {
        console.log("现在 有没有图","所有的图",this.adnativepic,"具体", this.adnativepic[code]);

        if (this.adnativepic[code] == null) {
            this.createnativeByIndex(code)
            return
        }


        let heightList = []
        heightList[1] = 750
        heightList[2] = 750
        heightList[3] = 820
        heightList[4] = 820
        // if (cc.sys.platform != cc.sys.OPPO_GAME) {
        //     return
        // }
        // oppo原生广告策略
        // this.nativeAdcreate = null;
        //  await this.initNativeAd(code)

        let currentTime = UtilsTime.getTime()
        let time = (currentTime - this._createNativeAdTime) / 1000;
        await Api.getAdControlInfoByOppo(async(newCode)=>{
            let myCode = newCode
            // let myCode = 4
            if (myCode ==4) {
                this._createNativeAdCountMax = 0
            }



            //时光回转这里开始
            // code1   60秒内展示2次原生广告
            // code2   40秒内展示2次原生广告
            // code3   20秒内展示2次原生广告
            // code4   不限制，只要调用即展示
            // Emitter.fire('onTipsShow',{txt: "先访问网络回来了"+code})
            if (code!=null) {
                let temptime = 0
                temptime = Api.OppoApiData.times[myCode]
                if (this._createNativeAdCountMin >= this._createNativeAdCountMax) {
                    if (time < temptime) {
                        return;
                    }
                    this._createNativeAdCountMin = 0
                }

                // let texture = this._nativeAdTexture;
                // let  data1 = {
                //     txt : "现在上交"+code
                // }
                // // let cllbacks = {
                // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                // //     failureCallback: this.newSkinDialogfailureCallback
                // // }
                // Emitter.fire("onOpenToast",{name : DialogType.打印吐司,zIndex : 100,data:data1},null)

                let tempCode =  0
                // if (code != null) {
                //     tempCode = code
                // }
                tempCode = code
                this.shownative(tempCode)
                let successfulCallback = () => {
                    this.clicknative(tempCode)
                    // let  data1 = {
                    //     txt : "点完"+code
                    // }
                    // // let cllbacks = {
                    // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                    // //     failureCallback: this.newSkinDialogfailureCallback
                    // // }
                    // Emitter.fire("onOpenToast",{name : DialogType.打印吐司,zIndex : 100,data:data1},null)
                    // this.nativeAdcreate.reportAdClick({ adId: this._nativeCurrentAd.adId.toString() })
                    // this.initNativeAd()
                    // let  data = {
                    //     txt : "我点了看广告 2 "+this._nativeCurrentAd.interactionType
                    // }
                    // // let cllbacks = {
                    // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                    // //     failureCallback: this.newSkinDialogfailureCallback
                    // // }
                    // Emitter.fire("onOpenToast",{name : DialogType.打印吐司,zIndex : 100,data:data},null)
                    // this._nativeCurrentAd = null
                };

                // let code = myCode
                const h = 0 - cc.winSize.height / 2;
                const pos = cc.v2(0, h);
                console.log("现在 图呢","所有的图",this.adnativepic,"具体", this.adnativepic[code]);
                // let  data1 = {
                //     txt : "现在要显示图"+this.adnativepic[code]
                // }
                // // let cllbacks = {
                // //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                // //     failureCallback: this.newSkinDialogfailureCallback
                // // }
                // Emitter.fire("onOpenToast",{name : DialogType.打印吐司,zIndex : 100,data:data1},null)
                let data = {
                    code : myCode,
                    texture : this.adnativepic[code],
                    height : heightList[myCode]
                }
                Emitter.fire('onOpenNativeAdDialog',data, pos,node,successfulCallback)
                //设置按钮高度
                let codeData = {
                    code : myCode
                }
                Emitter.fire('onLookADBtnHeight',codeData)






                // if (this.nativeAdcreate) {
                //     if (this._nativeCurrentAd == null) {
                //         return
                //     }
                //     this.nativeAdcreate.reportAdShow({ adId: this._nativeCurrentAd.adId.toString() });
                //     let successfulCallback = () => {
                //         this.nativeAdcreate.reportAdClick({ adId: this._nativeCurrentAd.adId.toString() })
                //         // this.initNativeAd()
                //         let  data = {
                //             txt : "我点了看广告 2 "+this._nativeCurrentAd.interactionType
                //         }
                //         // let cllbacks = {
                //         //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                //         //     failureCallback: this.newSkinDialogfailureCallback
                //         // }
                //         Emitter.fire("onOpenToast",{name : DialogType.打印吐司,zIndex : 100,data:data},null)
                //         this._nativeCurrentAd = null
                //     };
                //
                //     let code = myCode
                //     const h = 0 - cc.winSize.height / 2;
                //     const pos = cc.v2(0, h);
                //
                //     let data = {
                //         code : myCode,
                //         texture : texture,
                //         height : heightList[code]
                //     }
                //     Emitter.fire('onOpenNativeAdDialog',data, pos,node,successfulCallback)
                //     //设置按钮高度
                //     let codeData = {
                //         code : myCode
                //     }
                //     Emitter.fire('onLookADBtnHeight',codeData)
                // }

                // Emitter.fire('onOpenNativeAdDialog',data, pos,node,successfulCallback)

                let currentTime = UtilsTime.getTime()
                // console.log("现在有图 2",currentTime);
                this._createNativeAdTime = currentTime
                // console.log("现在有图 3",this._createNativeAdTime);
                if (myCode !=4) {
                    this._createNativeAdCountMin++
                }

                // console.log("现在有图 4",this._createNativeAdCountMin);
                if (this._createNativeAdCountMin>=this._createNativeAdCountMax) {
                    // console.log("现在有图 5",this._createNativeAdCountMin,"",this._createNativeAdCountMax);
                    this._createNativeAdCountMin = this._createNativeAdCountMax
                    // console.log("现在有图 6",this._createNativeAdCountMin,"",this._createNativeAdCountMax);
                }

            }
        })
    };


    static closeNativeAd() {
        // if (this.nativeAdcreate != null) {
        //     this.nativeAdcreate.offLoad(null)
        //     this.nativeAdcreate.destroy();
        //     this.nativeAdcreate = null
        //     this._nativeCurrentAd = null
        //     // this.initNativeAd()
        //
        // }else {
        //
        // }
        // for(let i in this.adnative){
        //     if (i != null){
        //         i.destroy();
        //     }
        // }
        // for (let i = 0; i < this.adnative.length; i++) {
        //     this.adnative[i].destroy();
        // }

    }

}
