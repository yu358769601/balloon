const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class QudaoBase{

    abstract  initAd()

    abstract  createBanner()

    abstract  showBannerAd()

    abstract  hideBannerAd()

    abstract  loadFullVideoAd()

    abstract  showFullVideoAd()

    abstract  loadRewardVideoAd()
}