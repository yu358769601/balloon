
const {ccclass, property} = cc._decorator;

export   interface Ichannel_android {
    /**
     * 显示全屏广告视频
     * @param successfulCallback
     * @param cancelCallback
     * @param failureCallback
     */
    showFullVideoAd(successfulCallback, cancelCallback, failureCallback)

    /**
     * 全屏广告视频完成
     */
    fullSuccessCallback()
    /**
     * 全屏广告视频失败
     */
    fullFailedCallback()
    /**
     * 全屏广告视频取消
     */
    fullCancelCallback()

    /**
     * 预加载全屏视频
     */
    loadFullVideoAd()

    /**
     * 预加载激励视频
     */
    loadRewardVideoAd()

    /**
     * 设置android渠道
     */
    setQuDaoByAndroid()

    /**
     * 设置特殊渠道
     * @param num
     */
    setQuDaoByAndroidOppo(num)

    /**
     * 预加载信息流广告
     */
    preFeedAd()

    /**
     * 显示信息流广告
     */
    showFeedAd(num)

    /**
     * 关闭信息流广告
     */
    closeFeedAd(num)

    /**
     * 隐私协议
     */
    showClDialog()

    //激励视频失败
    videoFailedCallback()

    videoSuccessCallback()

    videoCancelCallback()



}

