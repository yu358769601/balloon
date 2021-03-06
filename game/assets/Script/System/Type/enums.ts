// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;


//UI 层级
export enum ViewLayer {
    ViewLayer1 = 'ViewLayer1',      //全屏View
    //ViewLayer2 = 'ViewLayer2',      //遮罩层
    ViewLayer3 = 'ViewLayer3',      //弹出View
    ViewLayer4 = 'ViewLayer4'      //dialog view
}

//类型
export enum ActivityType {
    activity,      //全屏View
    fragment,      //弹出View
    dialog      //dialog view
}



export enum GameState {
    //正在进行
    RUN = 0,
    //停止
    STOP = 1,
    //等待开始下一句
    WAITINGSTART = 2,
    //暂停
    PAUSE = 3
}

export enum GameCurrentRound {
    //回合进行
    CURRENTROUNDRUN = 0,
    //回合结束
    CURRENTROUNDEND = 1,

}

export enum MonsterAI {
    //定位模式
    POSITIONING = 0,
    //战斗模式
    FIGHTING = 1,

}


export enum eduType {
    DIANJI = 0,
    JIXU = 1,
    TUODONG = 2,
    BUDONG = 3,
}

export enum PrizeType
{
    // Stone: "stone", //  灵石
    // Essence: "Essence",  // 精粹
    Gold = 0,//  灵石
    GoldTips = "精粹用于购买魔物",
    Hp = 1,// 精粹
    HpTips = "龙魂用于进化",// 精粹
    Accelerate = 2,//  加速
    AccelerateTips = "boss决斗跳过",
    Exp = 3,//  加速,
    fragment = 5,//  碎片,
    fragmentTips = "神秘恐龙碎片用于兑换恐龙",


    钻石 = "钻石",
    橡皮 = "橡皮",
    体力 = "体力",




    跳过 = "跳过",
    灯泡 = "灯泡",
    放大镜 = "放大镜",


    //
    // fragment1 = 4,//  碎片,
    // fragment1Tips = "神秘恐龙碎片用于兑换恐龙",
    // //
    // fragment2 = 5,//  碎片,
    // fragment2Tips = "神秘恐龙碎片用于兑换恐龙",
}


//玩家游戏状态
export enum PlayerGameType {
    zhengchang = 0,
    wudi = 1,

}

export enum wantType {
    duzitong = 0,
    xunwenqucesuo = 1,
    genwolai = 2,

}

export enum clickPOPType {
    提示点我或者按空格 = 0,
    人对话 = 1,

}


//层级
export enum ZindexType {
    zhencghang = 10,
    jin = 1,
    weigan = 9,
    taizi = 21,
    挺高的 = 9999999,

    自动层级 = 100,

    普通 = 0
}


export enum DialogType {
    结算界面 = "gameOverDialog",
    获得新皮肤 = "getNewSkin",
    重玩界面 = "playAgainGameOverDialog",
    提示对话框 = "tipsDialog",
    转盘 = "luckDialog",
    测试选关 = "SelectCheckPointDialog",
    // 商店 = "shopDialog",
    音乐控制 = "musicControlDialog",
    得到物品 = "getItemDialog",
    广告 = "ADDialog",
    选关 = "SelectLevelDialog",
    提示1or2 = "tips1or2Dialog",
    跳关 = "jumpPassDialog",
    增加钻石 = "addGemDialog",
    翻页选关 = "SelectCheckPointViewPagerDialog",
    四格漫画 = "FourGridDialog",
    图文提示 = "ImageTextDialog",
    自渲染广告小游戏渠道 = "NativeAdDialog",
    在线礼包弹窗 = "onlineGiftBagDialog",
    头条分享 = "ttfenxiangDialog",
    详细设置 = "detailedSettingDialog",
    设置 = "settingDialog",
    扎气球 = "luckGameDialog",
    扎气球得到奖励 = "luckGameGetGoldDialog",
    商店 = "shoppingDialog",
    超级奖励 = "superGetDialog",
    限时礼包 = "getLuckDialog",
    签到 = "signInDialog",
    皮肤试用 = "skinTrialDialog",
    免费领取 = "quickToBuyDialog",

}
export enum ItemPreType {
    打印吐司 = "ToastItem",
    扎气球条目 = "itemBalloon",
    商品页布局 = "itemShopLayou",
    商品页条目 = "itemShopItem",
    金币条目 = "itemGold",
    爆炸条目 = "itemBoom",
    加钱 = "addGem",
    加钱条目 = "addGemItem",
    资产 = "assetsItem",
    关卡页 = "pageCheckPointItem",
    关卡条目 = "checkPointItemguan",
    图文提示条目 = "imageTextItem",

    操作棍 = "itemLine",
    点 = "itemPoint",
    线 = "itemLineBG",
    钥匙 = "itemLuckKey",

    工具箱材料按钮 = "itemMaterialBtn",

    具体编辑条目提示 = "itemEditTip",
    特效条目 = "itemEffects",
    超级奖励条目 = "itemSuperItem",
    超级奖励海胆 = "itemSuperEffects",
    全按屏幕点击块 = "allClickItem",
    飞的原生广告或者激励视频广告 = "itemFlyAD",



}
export enum EffectsType {
    关卡接上掉金币 = "goldEffects",
    关卡接上掉金币条目 = "goldEffectsItemBoom",
}


//视窗
export enum ActivityUIType {
    目录视窗 = "GameMenuActivity",
}



export enum ItemName {

}
export enum TipsItemName {
    提示条目 = "tipsItem",
}
export enum TipsItemResSp {
    对号 = "tickgreen",
    红叉 = "Xred",
    圈出来 = "circleSet_0",
    证据 = "ShowYourEvidencePNG",
}
export enum InType {
    随机橡皮进入 = "随机橡皮进入",
    结算进入 = "结算进入",

}

export enum PassType {
    暂时不用 = 0


}

export enum RubberType {
    恶搞 = 0,
    可爱 = 1,
    成人 = 2,

}

//进入类型
export enum qudaoType
{
    TOUTIAO = "TOUTIAO",
    OPPO = "OPPO",
    MEIZU = "MEIZU",
    BAIDU = "BAIDU",
    VIVO = "VIVO",
    QQ = "QQ",
    NULL = "NULL",
    notjingyan = "notjingyan",
    ANDROID = "ANDROID",
    ANDROID_oppo = "ANDROID_oppo",
    Ios = "Ios",
    ANDROID_mi = "mi"
}


export enum PassItemType {
    关卡 = "pass",
    编辑关卡 = "passEditor",
}

export enum balloonName {
    fan_1= "fan_1",
    fan_2= "fan_2",
    fan_3= "fan_3",
    fan_4= "fan_4",
    fan_5 ="fan_5",
    fan_6= "fan_6",
    fan_7= "fan_7",
    fan_8= "fan_8",
    fan_9= "fan_9",
    fan_10= "fan_10",
    fan_11= "fan_11",
    fan_12= "fan_12",
    fan_13= "fan_13",


    ma_1= "ma_1",
    ma_2= "ma_2",
    ma_3= "ma_3",
    ma_4= "ma_4",
    ma_5= "ma_5",
    ma_6= "ma_6",
    ma_7= "ma_7",
    ma_8= "ma_8",
    ma_9= "ma_9",

}
export enum balloonType {
   马卡龙 = "0",
   凡尔赛 = "1",
}




