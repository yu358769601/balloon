import {Channel_ttADCode} from "./channel_tt";
import {qudaoType} from "../Type/enums";

const { ccclass, property } = cc._decorator;

@ccclass
export default class platform_toutiao extends cc.Component {
    static _name : any = qudaoType.TOUTIAO;

    static bannerAdcreate: any = null;
    static videoAdcreate: any = null;
    static _interstitialAd: any = null;
    static _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    static _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    static _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败
    static _recorder: any = null;
    static _recorderTime: any = null;
    static _recorderVideoPath: any = null;
    static _interval: any = null;

    //自动停止不走回调
    static _autoStop: any = false;



    //录屏时间
// 插屏广告     5ehik9mij0731qna24
// 激励式视频   12d3erkpl5u3d5jai9
// banner       k89k14m3mg8f7gq22u


    static initAd() {
        this.createBannerAd();
        this.createVideoAd();
    }

    static createBannerAd() {
        const systemInfo = tt.getSystemInfoSync();
        const screenWidth = systemInfo.windowWidth;
        const screenHeight = systemInfo.windowHeight;
        const targetBannerAdWidth = 200;
        const bannerAd = tt.createBannerAd({
            adUnitId: "k89k14m3mg8f7gq22u",
            adIntervals: 30,
            style: {
                width: targetBannerAdWidth,
                top: screenHeight - (targetBannerAdWidth / 16 * 9),
                left: (screenWidth - targetBannerAdWidth) / 2
            }
        });

        bannerAd.onLoad(function () {

        });
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        bannerAd.onResize(res => {
            bannerAd.style.top = screenHeight - res.height;
            bannerAd.style.left = (screenWidth - res.width) / 2; // 水平居中
        });

        bannerAd.onError(err => {
            console.log(err)
        });

        this.bannerAdcreate = bannerAd
    }

    static showBannerAd() {
        if (this.bannerAdcreate) {
            this.bannerAdcreate
                .show()
                .then(() => {
                    console.log("广告显示成功");
                })
                .catch((err) => {
                    console.log("广告组件出现问题", err);
                });
        } else {
            console.log("没有bannerAdcreate");
        }
    }

    static hideBannerAd() {
        if (this.bannerAdcreate) {
            this.bannerAdcreate.hide();
            console.log("广告隐藏");
        } else {
            console.log("没有bannerAdcreate");
        }

    }

    static createVideoAd() {
        console.log('广告加载成功');
        const videoAd = tt.createRewardedVideoAd({
            adUnitId: "12d3erkpl5u3d5jai9",
        });
        videoAd.onLoad(() => {
            console.log("videoAd广告加载成功");
        });

        videoAd.onError((errMsg) => {
            console.log("激励广告错误：", errMsg);
            if (this._videoAdFailCallback) {
                this._videoAdFailCallback();
            }
            this._videoAdFailCallback = null;
        });

        videoAd.onClose((res) => {
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

        this.videoAdcreate = videoAd
    }

    static showVideoAd(successfulCallback, cancelCallback, failureCallback) {
        console.log('广告显示成功');
        this._videoAdSuccessCallback = successfulCallback;
        this._videoAdCancelCallback = cancelCallback;
        this._videoAdFailCallback = failureCallback;

        this.videoAdcreate.show().then(() => {
                console.log('广告显示成功');
            })
            .catch(err => {
                console.log('广告组件出现问题', err);
                // 可以手动加载一次
                this.videoAdcreate.load().then(() => {
                    console.log("手动加载成功");
                    // 加载成功后需要再显示广告
                    return this.videoAdcreate.show();
                });
            });
    }
    //显示插屏广告
    static showInterstitialAd () {
        const interstitialAd = tt.createInterstitialAd({
            adUnitId: Channel_ttADCode.插屏广告,
        });
        interstitialAd.load()
            .then(() => {
                interstitialAd.show().then(() => {
                    console.log("插屏广告展示成功");
                });
            })
            .catch((err) => {
                console.log(err);
            });

        interstitialAd.onLoad((res)=>{
            console.log("插屏加载成功", res)
        });

        interstitialAd.onError((err)=>{
            console.log("插屏加载失败", err)
        }) 
    }

    static uploadCustomEvent(key, value) {
        // tt.uma.trackEvent("developer_test",{'level':'level_1'});
        if (tt.uma.trackEvent) {
            if(value){
                console.log(`key${key}`);
                console.log(value);
                tt.uma.trackEvent(key,value);
            }else{
                tt.uma.trackEvent(key);
            }
        }
    }
    // 更新计时
    static startCountdown() {
        this._recorderTime = this._recorderTime + this._interval;
    }
    // 获得录屏时间
    static getRecorderTime() {
        return this._recorderTime;
    }
    //录屏
    static startRecorder(duration ?,onStopCallback ?,onErrorCallback ?) {
        let appName = tt.getSystemInfoSync().appName;
        if (appName === "devtools") return;
        let recorder = tt.getGameRecorderManager();
        this._recorder = recorder;
        let _duration = 120
        if (duration != null) {
            _duration = duration
        }


        // this.stopRecorder(false)
        // recorder.onStop(null)


        recorder.onStart((res) => {
            console.log("录屏开始");
            // do somethine;
            this._interval = 1;
            this._recorderTime = 0;
            console.log("录屏开始",this._interval);
            // this.unschedule(this.startCountdown);
            // this.schedule(this.startCountdown, this._interval);
        });





        recorder.onError((res) => {
            console.log("错误信息" + res.errMsg);
            if (onErrorCallback) {
                onErrorCallback()
            }
        });

        recorder.start({
            duration: _duration
        });
        recorder.onStop((res) => {

            console.log(res.videoPath);
            // do somethine;
            this._recorderVideoPath = res.videoPath;
            this._recorder = null;
            console.log("录屏停止",this._recorderVideoPath,"是否允许回调",this._autoStop);
            // if (this._autoStop) {
            //头条录屏结束  qudaoCommon.shareMessage(successCb, cancelCb)
            if (onStopCallback) {
                onStopCallback()
            }
            // }
            this._autoStop = true
            // this.unschedule(this.startCountdown);
        });
    }

    static stopRecorder (b) {
        if (this._recorder) {
            console.log("手动调用停止");
            this._autoStop = b
            this._recorder.stop();

        }
    }

    static shareMessage(successCb, cancelCb) {

        const descStr = [
            "勇气和愚蠢往往只有一线之隔",
            "闲话少说开打吧",
            "我是小恐龙逍遥又自在",
            "是龙是魔，我自己决定",
            "神魔族大气所成",
            "杀人不眨眼，吃魔不放盐",
            "若命运不公，便和它奋斗到底",
            "最强恐龙，来吧变身",
            "不装了，面对疾风吧",
            "我在最强恐龙爽快地打怪兽",
        ];
        let randNum = Utils.random(0,descStr.length - 1);

        tt.shareAppMessage({
            channel: "video",
            title: "最强恐龙",
            desc: descStr[randNum],
            imageUrl: "",
            templateId: "", // 替换成通过审核的分享ID
            query: "",
            extra: {
                videoPath: this._recorderVideoPath, // 可替换成录屏得到的视频地址
                videoTopics: ["最强恐龙"],
                hashtag_list: ["最强恐龙"],
                video_title: descStr[randNum], //生成的默认内容
            },
            success() {
                console.log("分享视频成功");
                successCb && successCb();

            },
            fail(e) {
                console.log("分享视频失败");
                cancelCb && cancelCb();
            }
        });
    }

}