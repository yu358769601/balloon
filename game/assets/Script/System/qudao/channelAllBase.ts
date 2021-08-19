const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class ChannelAllBase  {
//所有渠道的父类
    public  _haveBannerAd:any = false;
    public   _haveFeedAd: any = false;
    public   _haveFeedAdCount: number = 0;
    public  _haveFeedAdCountMax: number = 2;



    public  _videoAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    public  _videoAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    public   _videoAdFailCallback: any = null;     //激励视频观看失败回调---获取失败

    public  _fullAdSuccessCallback: any = null;  //激励视频观看完毕回调---看完
    public   _fullAdCancelCallback: any = null;    //激励视频观看取消回调---取消
    public  _fullAdFailCallback: any = null;     //激励视频观看失败回调---获取失败

    abstract  checkChannel() : boolean

    abstract  initAd()

    abstract  createBanner()

    abstract  showBannerAd()

    abstract  hideBannerAd()

    abstract showVideoAd(successfulCallback, cancelCallback, failureCallback)

    abstract showInterstitialAd()

    abstract moreGame()

}

