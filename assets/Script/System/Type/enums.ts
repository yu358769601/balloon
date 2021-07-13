// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import Tips from "../../tips/Tips";

const {ccclass, property} = cc._decorator;

//抽卡类型
export enum BoxLotteryType {
    JJC = 0,
    STAGE = 1,
    FRIEND_PK = 2,
    GUIDE_BATTLE = 3,
    NORMAL = 10,
}

//战斗类型
export enum BattleType {
    GUIDE_BATTLE = 0,
    STAGE = 1,
    JJC = 2,
    FRIEND_PK = 3,
    FBOSS = 4,
    PEAK_ROAD = 5,
}

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

export enum TeamSkillShowType {
    ALL = -1,
    ATK = 0,
    DEF = 1,
    CON = 2
}

export enum HeroShowType {
    ALL = -1,
    FORWARD = 1,
    MIDFIELD = 2,
    BACK = 3,
    GK = 4,
}

export enum TalentType {
    ATK = 0,
    DEF = 1,
    CON = 2
}

export enum CostResourceType {
    GB = "gb",
    ZB = "zb",
    EXP = "exp",
    POWER = "power",
    LV = "lv",
    VIP = "vip",
    NULL = 'null',
}

//道具品质
export enum ITEMQUALITY {
    MIN = 0,
    WHITE = 1,//白
    GREEN = 2,//绿
    BLUE = 3,//蓝
    PURPLE = 4,//紫
    ORANGE = 5,//橙
    RED = 6,//红
    RED_1 = 7,//红+1
    MAX = 8,
}

export enum AttType {
    ALL = 0,//全属性
    SLAM = 1,//扣篮
    NORMAL = 2,//中距离
    FAR = 3,//远距离
    GAN_RAO = 4,//干扰
    STEAL = 5,//抢断
    BLOCK = 6,//封盖
    KONG_QIU = 7,//控球
    PASS = 8,//传球
    LAN_BAN = 9,//篮板
    TILI = 10,//体力
    SPEED = 11,//速度
    POWER = 12,//力量
    JUMP_HIT = 13,//跳球成功率
    SLAM_RATE = 14,//扣篮几率
    SLAM_HIT = 15,//扣篮成功率
    UP_RATE = 16,//上篮几率
    UP_HIT = 17,//上篮成功率
    SHOT_RATE = 18,//投篮几率
    SHOT_HIT = 19,//投篮命中率
    BREAK_RATE = 20,//突破几率
    BREAK_HIT = 21,//突破陈功率
    PASS_RATE = 22,//传球几率
    GET_RATE = 23,//接球几率
    YUN_QIU_RATE = 24,//运球几率
    BLOCK_RATE = 25,//盖帽几率
    BLOCK_HIT = 26,//盖帽成功率
    LAN_BAN_HIT = 27,//篮板成功率
    STEAL_RATE = 28,//抢断几率
    STEAL_HIT = 29,//抢断成功率
    TWO_RATE = 30,//两分投篮几率
    THREE_RATE = 31,//三分投篮几率
    TWO_HIT = 32,//两分命中率
    THREE_HIT = 33,//三分命中率
    BLOCK_FAIL_GAN_RAO = 34,//盖帽失败后干扰效果
    ALL_SKILL_COLD_TIME = 35,//所有技能冷却时间
    MOVE_SPEED = 36,//移动速度
    LAN_JIE_RATE = 37,//拦截几率
    LAN_JIE_HIT = 38,//拦截成功率
    BE_LAN_JIE_RATE = 39,//被拦截几率
    BE_LAN_JIE_HIT = 40,//被拦截成功率
    BE_BLOCK_RATE = 41,//被封盖几率
    BE_BLOCK_HIT = 42,//被封盖成功率
    BE_STEAL_RATE = 43,//被抢断几率
    BE_STEAL_HIT = 44,//被抢断成功率
    BE_BREAK_RATE = 45,//被突破几率
    BE_BREAK_HIT = 46,//被突破成功率
    GAN_RAO_AREA_OFFSET = 47,//干扰范围缩放
    YAN_HU_TIME_OFFSET = 48,//掩护冻结时间缩放
    FANG_SHOU_YAN_CHI_OFFSET = 49,//防守延迟时间缩放
    JIE_QIU_JRATE = 50,//接球几率
    POINT_ADD = 51,//进球后得分附加
    SLAM_NOW = 52,//立刻扣篮
    SHOT_NOW = 53,//立刻投篮
    STUN = 54,//晕眩
    SHOT_NO_GANRAO = 55,//投篮无视干扰
    SHOT_NO_BLOCK = 56,//投篮无视盖帽
    POINT_MUL = 57,//进球后得分乘积
    CHU_FA_ZS = 58,//触发战术
    GOD_STEAL = 59,//直接抢断且成功
    GOD_BLOCK = 60,//直接封盖且成功
    TILI_COST_SPEED = 61,//体力消耗速度
    SHOT_NO_TILI = 62,//投篮无视体力消耗
    DANG_AREA_ADD = 63,//阻挡范围增加
    BU_LAN = 64,//补篮
    DAO_DI = 65,//倒地
    FAR_SHOT_AREA_ADD = 66,//扩展远投距离
    HOT_SPEED = 67,//火热手感速度
    HUI_FU_TILI = 68,//恢复体力
    KONG_JIE_PASS = 69,//空接传球
    KUAI_GONG_PASS = 70,//快攻传球
    KUAI_GONG_FAQI = 71,//快攻发起
    KONG_JIE_FAQI = 72,//空接发起
    SLAM_AREA_ADD = 73,//扩展扣篮距离
    UP_AREA_ADD = 74,//扩展上篮距离
    DANG_CHAI_AREA_ADD = 75,//挡拆半径增加
    BU_KOU = 76,//补扣
    STEAL_AREA_ADD = 77,//抢断范围增加
    BLOCK_AREA_ADD = 78,//封盖范围增加
    NO_STEAL = 79,//无视抢断
    CD_SUO_JIAN = 80,//冷却缩减
    TI_BU_SHI_TILI_HUIFU = 81,//替补时体力恢复
    SLAM_NO_BLOCK = 82,//扣篮无视封盖
    CHEN_MO = 83,//沉默
    CD_RESET = 84,//重置CD
    PENG_CI = 85,//碰瓷大师
    DO_STEAL_NOW = 86,//立刻执行一次抢断
    DO_BLOCK_NOW = 87,//立刻执行一次封盖
    HIT_RATE_FIX = 88,//命中率修正
    DO_BREAK_NOW = 89,//立刻突破
    DO_UP_NOW = 90,//立刻上篮
}

export enum AttBType {
    NULL = 0,
    ATTACK = 1,
    DEFENCE = 2,
    AWARE = 3,
    QUALITY = 4,
    MAX,
}

export enum MonsterType {
    //走
    WALK = 0,
    //攻击
    ATTACK = 1,
    //死亡
    DIE = 2,
    //原地不动 复活之后
    GHOST = 3,
    //搜索
    SEARCH = 4,
    //停止
    STOP = 5,
    //回家状态
    BACKHOME = 6,

    //走 背景也走
    WALKMOVE = 7,
}

export enum MonsterTeam {
    //玩家队伍
    PLAYER = 0,
    //怪物队伍
    MONSTER = 1,

}

export enum MonsterAttack {
    //一般攻击
    GENERAL = 0,
    //技能攻击
    SKILL = 1,

}


export enum SkillID {
    //技能1
    Skill1 = 0,
    //技能2
    Skill2 = 1,

}

export enum SkillType {
    //公共技能
    PUBLIC = 10000,
    //恐龙1
    Skill1 = 1,

}

export enum SkillName {
    //公共技能
    skills_public_1 = "skills_public_1",
    //恐龙1
    skills_public_2 = "skills_public_2",
    //恐龙1
    skills_kehuan_1 = "skills_kehuan_1",
    //恐龙1
    skills_kehuan_2 = "skills_kehuan_2",
    //恐龙1
    skills_kehuan_3 = "skills_kehuan_3",
    //恐龙1
    skills_kehuan_4 = "skills_kehuan_4",
    //攻击
    AT = "AT",
    //生化牙 SkillName.skills_shenghua_1
    skills_shenghua_1 = "skills_shenghua_1",
    skills_shenghua_4 = "skills_shenghua_4",

    skills_tishenggongji = "skills_tishenggongji",

}

export enum SkillXiaoguai {
    //公共技能
    F_9001 = "F_9001",
    //恐龙1
    F_9002 = "F_9002",
    //恐龙1
    F_9003 = "F_9003",
    //恐龙1
    F_9004 = "F_9004",
    //恐龙1
    F_9005 = "F_9005",
    //恐龙1
    F_9006 = "F_9006",

    F_9007 = "F_9007"

}

export enum SkillXiaoguaiHECHENG {
    //公共技能
    F_9001 = "F_9002",
    //恐龙1
    F_9002 = "F_9003",
    //恐龙1
    F_9003 = "F_9004",
    //恐龙1
    F_9004 = "F_9005",
    //恐龙1
    F_9005 = "F_9006",
    //恐龙1
    F_9006 = "F_9007",

    F_9007 = ""

}

export enum SkillName_time {
    skills_public_1 = "skills_public_1_time",
    //恐龙1
    skills_kehuan_3 = "skills_kehuan_3_time",
    //攻击
    AT = "AT_time"

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

export enum EduType {
    //设置两波怪物 第一波一只 第二波两只
    TASK_1 = 0,
    //右面怪物入场在停止位 停止一下 点击屏幕才能继续
    TASK_2 = 1,
    //点击屏幕继续
    TASK_3 = 2,
    //点击屏幕继续
    TASK_4 = 3,
    //点击屏幕继续
    TASK_5 = 4,
    TASK_6 = 5,
    TASK_6_1 = 501,
    TASK_7 = 6,
    TASK_8 = 7,
    TASK_9 = 8,
    TASK_10 = 9,

    TASK_11 = 10,
    TASK_12 = 11,
    TASK_13 = 12,
    TASK_14 = 13,
    TASK_15 = 14,
    TASK_16 = 15,
    TASK_17 = 16,
    TASK_18 = 17,
    TASK_19 = 18,

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

//玩家的模式
export enum playerType {
    // Stone: "stone", //  灵石
    // Essence: "Essence",  // 精粹
    shizhang = 0,//  灵石
    canzhang = 1,// 精粹
}

//玩家的模式
export enum checkOutType {
    // Stone: "stone", //  灵石
    // Essence: "Essence",  // 精粹
    扶手电梯楼梯下楼 = "扶手电梯楼梯下楼",//  灵石
    canzhang = 1,// 精粹
}


//玩家骨骼样式
export enum playerSpType {
    shizhang_zhengchang = 0,
    shizhang_weixian = 1,
    shizhang_che = 2,
    shizhang_happy = 3,
    shizhang_move = 4,
    shizhang_brake = 5,
    shizhang_stop = 6,

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

//时机
//交互的時機
export enum clickPOPTypeNode {
    第一关电梯,
    第三关工作人员,
    第三关电梯,
    第四關地鐵門,
    第四關工作人員,
    天橋老闆,
    等車的人,
    專用車位,
    主角問路邊攤檔店員1,
    主角問路邊攤檔店員2,
    天橋升降梯,
    天橋升降梯2,
}


export enum chengfaPOPType {
    koushijian = 0,

}

//提示文字
export enum tipsText {
    beichezhuang = "我被車撞了",
    mudidi = "先生目的地已經到了",
    ceshijieshu = "本次測試結束",
    shunlidaoda = "順利到達",
    shijianwanle = "你遲到了",
    chonglai = "重來",

}

//碰撞类型
export enum Collisiontype {
    //錯誤的
    che,
    meishi,
    shigong,
    xiepo,
    lajitong,
    xiaohai,
    luzhang,
    shui,
    louti,
    shangchanglouti,
    huapo,

    shuinidi,


    //正確的
    zhengquexiepo,
    //提示性的
    tishihonglvdeng,

    //正確的天橋
    zhengquetianqiao,

    zhengquebashizhankaishi,


    商場電梯提醒只有上完廁所才會有提醒,

    茶餐廳樓梯,
    茶餐廳滑梯,
    茶餐廳入口,
    活動地點結束,

    //代碼提示性的
    tishichumen,
    tishishangchang,

    tishixishoujian,

    活動現場施工,
    活動現場上樓梯,

    等車的人,
    專用車位,
    活動現場施工1,

    移动NPC,

    盲人地铁上车

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

//玩家的模式
export enum MapName {
    // Stone: "stone", //  灵石
    // Essence: "Essence",  // 精粹
    门口 = "Pre_shizhang_0",//  灵石
    街道 = "Pre_shizhang_1",//  灵石
    商場 = "Pre_shizhang_2",// 精粹
    站台 = "Pre_shizhang_3",// 精粹
    天桥 = "Pre_shizhang_4",//  灵石
    等车 = "Pre_shizhang_5",//  灵石
    饭店 = "Pre_shizhang_6",// 精粹
    活动现场 = "Pre_shizhang_7",// 精粹
}

//对话样子
export enum TalkListType {
    玩家出门 = "MAP1_0",


    玩家在石堆下去 = "MAP2_1",
    玩家在石堆下去盲人 = "MAP2_100",
    玩家在樓梯下去 = "MAP2_2",
    正確的斜坡下去 = "MAP2_3",
    玩家在紅綠燈前 = "MAP2_4",
    玩家碰到路障 = "MAP2_5",
    玩家碰到垃圾桶 = "MAP2_6",
    玩家被车撞 = "MAP2_10",

    主角到了商場 = "MAP3_0",
    玩家碰到水灘 = "MAP3_1",
    玩家遇到在玩的小朋友 = "MAP3_2",
    想去洗手間 = "MAP3_3",
    提示要去月台 = "MAP3_4",

    玩家在商場樓梯下去 = "MAP3_5",
    玩家在扶手電梯下去 = "MAP3_6",
    玩家在電梯下去 = "MAP3_7",
    正確使用電梯 = "MAP3_8",
    要先去厕所 = "MAP3_30",
    衛生間已經到了 = "MAP3_40",

    請問洗手間在哪 = "MAP3_20",

    列車到了 = "MAP4_0",
    我們不可以這樣勉強上車的 = "MAP4_1",
    玩家在工作人員附近按鍵 = "MAP4_2",
    玩家在工作人員附近按鍵视障 = "MAP4_10",
    我們不可以這樣勉強上車的视障 = "MAP4_11",
    // 請問洗手間在哪 = "MAP3_20",


    接下來要去巴士站轉車 = "MAP5_0",
    在店面老板附近按鍵 = "MAP5_1",

    主角過天橋完成 = "MAP5_2",
    主角過天橋完成盲人 = "MAP5_20",
    主角到達巴士站指示牌下 = "MAP5_3",
    //自動
    主角出了港鐵站 = "MAP6_0",
    //進入
    主角踏進工地 = "MAP6_1",

    主角到了巴士站 = "MAP6_2",
    上车绑定 = "MAP6_ANI",

    主角在巴士站下車 = "MAP7_0",
    主角問路邊攤檔店員 = "MAP7_1",
    主角經過斜坡上茶餐廳 = "MAP7_2",
    主角上樓梯 = "MAP7_3",
    主角下樓梯 = "MAP7_4",
    主角吃完飯 = "MAP8_0",
    // 主角小心穿過人群 = "MAP8_1",
    主角小心穿過公園到達目的地 = "MAP8_2",


    chumen = "talk_chumen",

    盲人碰小朋友 = "MAP3_50",
}

//电梯类型
export enum ElevatorType {
    家门口电梯 = 0,
    商场下楼电梯 = 1,
    天桥左面 = 10,
    天桥右面 = 11,

    港铁左面 = 20,
    港铁右面 = 21,
}

export enum NPCType {
    商店女导购 = 0,
    地铁男工作人员 = 1,
    天桥老板 = 2,
    施工栅栏 = 3,
    垃圾桶 = 4,
    水泥地 = 5,
    水桶 = 6,
    活动现场施工 = 7,
    司机下车放板子 = 8,
    车上轮椅人 = 9,


    车站让路路人A = 10,
    车站让路路人B = 11,

    移动的NPC = 100,
}

export enum spActiconType {
    闲置 = "idle",
    运动 = "run",
    说话 = "speak",
    挨撞 = "hit",
    让路 = "way",
    帮助 = "help",
    司机下车放板子 = "help_1",
    司机车上固定 = "help_2",
    空 = "",
}

export enum ItemType {
    正确答案条目类型 = 0,
    假答案条目类型 = 1,
    错误答案条目类型 = 2,
}

export enum DialogType {
    结算界面 = "gameOverDialog",
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
}
export enum ItemPreType {
    打印吐司 = "ToastItem",

    加钱 = "addGem",
    资产 = "assetsItem",
    关卡页 = "pageCheckPointItem",
    关卡条目 = "checkPointItemguan",
    图文提示条目 = "imageTextItem",

    操作棍 = "itemLine",
    点 = "itemPoint",
    线 = "itemLineBG",
    钥匙 = "itemLuckKey",
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