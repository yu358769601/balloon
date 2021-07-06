import {qudaoType} from "../Type/enums";
import Emitter from "../Msg/Emitter";

const { ccclass, property } = cc._decorator;
export enum Platform_meizuADCode {
    横幅 = "wERlXjzx",
    激励视频 = "xviNfjyC",
    插屏 = "E4gsGHwh",
}
@ccclass
export default class platform_meizu extends cc.Component {
    static _name: any = qudaoType.MEIZU;

    static bannerAdcreate: any = null;
    static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败


    static initAd() {
        // 魅族
        // 游戏名：疯狂橡皮擦
        // 包名：com.ks.fkdxpc.kyx.mz
        // 广告参数
        // 媒体ID：2503
        // dc6brIRv   横幅
        // gB3MRI28   激励视频
        // n8SgGGl1   插屏
    }

    static showBannerAd(data) {
            const screenHeight = qg.getSystemInfoSync().screenHeight;
            const screenWidth = qg.getSystemInfoSync().screenWidth;
            const bannerAd = qg.createBannerAd({
                adUnitId: Platform_meizuADCode.横幅,
                style: {
                    left: 0,
                    top: screenHeight - screenWidth / 6.7,
                    width: screenWidth,    // 设置banner需要的宽度，横屏游戏宽度建议使用参考值1440，必须设置
                    height: screenWidth / 6.7    // 广告期望高度，在onResize里面可以根据广告的高度重
                }
            });

            bannerAd.onError((err) => {
                console.log("banner错误信息" + JSON.stringify(err));
            });

            bannerAd.onLoad(() => {
                console.log("banner广告加载成功");
                bannerAd.show()
            });

            bannerAd.onResize(res => {
                console.log("banner onResize:", res.width, ",", res.height);
                bannerAd.style.top = screenHeight - res.height; //确定左上角位置，为底部位置
                bannerAd.style.left = 0;
                bannerAd.style.width = res.width;
                bannerAd.style.height = res.height;
            });

            this.bannerAdcreate = bannerAd;


        Api.getAdControlInfoByAll((newCode)=>{
            //时光回转这里开始
                //设置按钮高度
                let codeData = {
                    code : newCode
                }
                Emitter.fire('onLookADBtnHeight',codeData)
                // Emitter.fire('onOpenNativeAdDialog',data, pos,node,successfulCallback)
        })



    }

    static hideBannerAd() {
        if (this.bannerAdcreate) {
            this.bannerAdcreate.hide();
            this.bannerAdcreate.destroy();
            this.bannerAdcreate = null;
        } else {
            cc.log("bannerAdcreate失败")
        }
    }

    static showVideoAd(successfulCallback, cancelCallback, failureCallback) {
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;

        const videoAd = qg.createRewardedVideoAd({
            adUnitId: Platform_meizuADCode.激励视频,
        });

        videoAd.onError((err) => {
            console.log("激励视频错误信息" + JSON.stringify(err));
        });

        videoAd.load();
        videoAd.onLoad(function () {
            console.log("激励视频加载成功");
            videoAd.show().then(() => {
                console.log('激励视频广告展示完成');
            }).catch((err) => {
                console.log('激励视频广告展示失败', JSON.stringify(err));
            }); //展示广告，可以提前调用load，在需要的时候调用show
        });

        videoAd.onClose(() => {
            console.log('视频广告关闭回调');
            this._videoAdSuccessCallback && this._videoAdSuccessCallback();
            this._videoAdSuccessCallback = null;
        })
    }
    //插屏
    static showInterstitialAd() {
        const insertAd = qg.createInsertAd({
            adUnitId: Platform_meizuADCode.插屏,
        });

        insertAd.load();

        insertAd.onLoad(() => {
            console.log("插屏广告加载成功");
            insertAd.show();
        });

        insertAd.onError((err) => {
            console.log("插屏广告错误信息" + JSON.stringify(err));
        });
    }
}
