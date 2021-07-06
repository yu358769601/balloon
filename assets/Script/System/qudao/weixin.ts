const weixin = {

    _bannerAd: null,

    init() {
        this.createBanner();
    },

    createBanner() {
        const systemInfo = tt.getSystemInfoSync();
        const screenWidth = systemInfo.windowWidth;
        const screenHeight = systemInfo.windowHeight;
        let targetBannerAdWidth = 200;
        let bannerAd = tt.createBannerAd({
            adUnitId: "dk17dah769ak94g6sc",
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
        this._bannerAd = bannerAd;
    },

    // update (dt) {}
    showbanner(_bannerAd ?) {

        this._bannerAd.show()
            .then(() => {
                console.log('banner 广告显示成功');
            })
            .catch(err => {
                console.log('banner 广告组件出现问题', err);
            })
    }

};
export default weixin;