import LoadManage from "./System/Load/LoadManage";
import UIActivity from "./System/Ui/UIActivity";
import UtilsNode from "./System/Utils/UtilsNode";
import Emitter from "./System/Msg/Emitter";
import ccLog from "./System/Log/ccLog";
import {SoundType} from "./System/sound/sound";
import UtilsAction from "./System/Utils/UtilsAction";
import Utils from "./System/Utils/Utils";
import UtilsDB from "./System/Utils/UtilsDB";
import {
    TipsItemResSp,
    TipsItemName,
    DialogType,
    ItemName,
    ActivityType,
    ActivityUIType, ItemPreType, PassItemType, balloonName
} from "./System/Type/enums";
import Api from "./System/api/api";
import GameSetting, {gameModeType} from "./System/mode/gameSetting";
import JsonManager from "./System/manage/JsonManager";
import GetNode, {GetNodeType} from "./System/Utils/getNode";
import Umengstatistics, {maidianType} from "./System/qudao/umengstatistics";
import ChannelHelloWroldByAndroid from "./channel/channelHelloWroldByAndroid";
import ChannelManger from "./System/qudao/channelManger";


const {ccclass, property} = cc._decorator;


@ccclass
export default class Helloworld extends cc.Component {

    // @property(cc.Label)
    label: cc.Label = null;
    // @property(cc.ProgressBar)
    初始界面_进度条: cc.ProgressBar = null;
    // @property(cc.Node)
    主节点: cc.Node = null;
    只有熊: cc.Node = null;
    // @property(cc.Node)
    // LoadNode: cc.Node = null;
    // @property(cc.Camera)
    mainCamera: cc.Camera = null;

    // @property(cc.Node)
    // edu: cc.Node = null;
    // @property
    // text: string = 'hello';

    // @property(cc.Node)
    // DialogRoot: cc.Node = null;
    // @property(cc.Node)
    // clickButtonLayout: cc.Node = null;

    // @property(cc.Sprite)
    tempSprite: cc.Sprite = null;


    loadResNamePath: { [path: string]: string } = null
    loadResNamePoolPath: { [path: string]: string } = null

    static photoframe: { [path: string]: string } = null
    physicsManager = null
    FrameRate: number = 0
    private 专属渠道: ChannelHelloWroldByAndroid;
    private 测试按钮: cc.Node = null;
    private 测试节点: cc.Node = null;


    protected onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onGetCamera', this.onGetCamera, this)
        Emitter.remove('onGetCodeAD', this.onGetCodeAD, this)
    }

    registerEmitter() {
        Emitter.register('onGetCamera', this.onGetCamera, this)
        Emitter.register('onGetCodeAD', this.onGetCodeAD, this)
    }

    onGetCamera(selfName, self, callback) {
        if (callback) {
            callback(self, this.mainCamera)
        }
    }

    async start() {


        // Emitter.fire("onPlay")

        // let eduTip = await UtilsNode.getNode("eduTip",this.edu);

        // NLog.level = 0
        // NLog.print(1,"111","测试")

        // ccLog.log("怎么说",{id : 11})
        // cc.log("确定是走到我这了是吧 0",eduTip)
        // eduTip.getComponent("EduTip").initView()


        this.initView()


        //关闭多点
        //  cc.macro.ENABLE_MULTI_TOUCH = false;
        //css加入
        //html, body {margin:0; padding:0; width:100%; height:100%}


        // cc.game.setFrameRate(60)
        // cc.director.getScheduler().setTimeScale(2);
        // this.physicsManager.FIXED_TIME_STEP = 1 / 20;


        // ccLog.logTag = false
        // init logic
        // this.label.string = this.text;

        this.专属渠道 = this.getComponent("channelHelloWroldByAndroid")
        this.专属渠道.init(this)


    }

    //初始化相框的关联
    //Helloworld.initPhotoframe

    //Helloworld.getPhotoframe(name)
    // static getPhotoframe(name){
    //
    //     return this.loadResNamePath["Photoframe"+name]
    // }

    initJson() {
        let load = {}
        load["passjson"] = "json/pass"
        load["passSettingjson"] = "json/passSetting"
        load["passData"] = "json/passData"
        load["rubberjson"] = "json/rubber"


        // load["passpager"] = "json/passpager"
        // load["rubberjson"] = "json/rubber"
        // load["passGameOver"] = "json/passGameOver"

        return load
    }

    initPre() {
        let load = {}
        // load["testPre"] = "item/testPre"
        load["pass_1"] = "Checkpoint/pass_1"
        load["gameOverDialog"] = "dialog/gameOverDialog"

        // load["newSkinDialog"] = "dialog/newSkinDialog"
        load["tipsDialog"] = "dialog/tipsDialog"
        load["tipsBtn"] = "item/tipsBtn"
        load["luckDialog"] = "dialog/luckDialog"
        //测试选关
        load[DialogType.测试选关] = "dialog/" + DialogType.测试选关
        load[DialogType.翻页选关] = "dialog/" + DialogType.翻页选关
        //选关
        load["SelectLevelDialog"] = "dialog/SelectLevelDialog"
        //橡皮
        // load["rubber"] = "item/rubber"
        //商店
        // load["shopDialog"] = "dialog/shopDialog"
        //得到物品
        load["getItemDialog"] = "dialog/getItemDialog"
        //资源预制体
        load["assetsItem"] = "item/assetsItem"
        //音乐管理器
        load["musicControlDialog"] = "dialog/musicControlDialog"
        //吐司
        load["ToastItem"] = "item/ToastItem"
        //弓箭
        load["arrow"] = "item/arrow"
        //吐司
        load["ADDialog"] = "dialog/ADDialog"
        //提示条目
        load[TipsItemName.提示条目] = "item/tipsItem"
        //蝙蝠怪物
        load["monster_bat"] = "item/monster_bat"
        //哥布林怪物
        load["monster_gebulin"] = "item/monster_gebulin"
        //史莱姆
        load["xiaoxiaole"] = "item/xiaoxiaole"
        //史莱姆
        load["xiaoxiaoleItem"] = "item/xiaoxiaoleItem"
        //关卡购买的提示选项
        load["shopPassItem"] = "item/shopPassItem"
        //看提示1或者2
        load["tips1or2Dialog"] = "dialog/tips1or2Dialog"
        //增加钻石得对话框
        load["addGemDialog"] = "dialog/addGemDialog"

        // load[ItemName.关卡页] = "item/"+ItemName.关卡页
        // load[ItemName.关卡条目] = "item/"+ItemName.关卡条目

        // load["pass_click"] = "Checkpoint/pass_click"
        // load["pass_touchMove"] = "Checkpoint/pass_touchMove"
        // load["pass_clickSelect"] = "Checkpoint/pass_clickSelect"
        // load["pass_clickfindOut"] = "Checkpoint/pass_clickfindOut"

        // load["pass_1"] = "Checkpoint/pass_1"
        // load["pass_2"] = "Checkpoint/pass_2"
        // load["pass_4"] = "Checkpoint/pass_4"
        // load["pass_5"] = "Checkpoint/pass_5"
        // load["pass_6"] = "Checkpoint/pass_6"
        // load["pass_7"] = "Checkpoint/pass_7"
        // load["pass_9"] = "Checkpoint/pass_9"
        // load["pass_10"] = "Checkpoint/pass_10"
        // load["pass_11"] = "Checkpoint/pass_11"
        // load["pass_12"] = "Checkpoint/pass_12"
        // load["pass_13"] = "Checkpoint/pass_13"
        // load["pass_14"] = "Checkpoint/pass_14"
        return load
    }

    initPass() {
        let load = {}

        let list = JsonManager.getPasslists()
        // if (list) {
        //     for (let i = 0; i < list.length; i++) {
        //         //设置关卡名字
        //         load[list[i].componentName] = "pass/" + list[i].componentName
        //         //设置关卡图片
        //         // load[list[i].passSP] = "CheckpointItem/"+list[i].passSP
        //     }
        // }
        for (let passItemType in PassItemType) {
            load[PassItemType[passItemType]] = "pass/" + PassItemType[passItemType]
        }
        return load
    }

    initPassSP() {
        let load = {}

        let list = JsonManager.getPasslists()
        if (list) {
            for (let i = 0; i < list.length; i++) {
                load[list[i].passSP] = "CheckpointItem/" + list[i].passSP
            }
        }

        return load
    }

    initPassPager() {
        let load = {}

        let list = JsonManager.getPassPagerlists()

        ccLog.log("设置头像了呢啊有吗", list)
        if (list) {
            for (let i = 0; i < list.length; i++) {
                //设置主角头像
                load[list[i].src] = "CheckpointItem/" + list[i].src
                ccLog.log("设置头像了呢啊", load[list[i].src])
            }
        }

        return load
    }


    initSound() {
        let load = {}
        // 按钮 = "按钮",
        //     擦除失败 = "擦除失败",
        //     成功音效 = "成功音效",
        //     成人擦除1 = "成人擦除1",
        //     初始擦除音效 = "初始擦除音效",
        //     恶搞擦除音效1 = "恶搞擦除音效1",
        //     恶搞擦除音效2 = "恶搞擦除音效2",
        //     获得奖励 = "获得奖励",
        //     可爱擦除1 = "可爱擦除1",
        //     可爱擦除2 = "可爱擦除2",.
        // 每5关解锁新橡皮 = "每5关解锁新橡皮",
        //     胜利弹出胜利界面时播放 = "胜利弹出胜利界面时播放",
        //     在商店购买到新皮肤时 = "在商店购买到新皮肤时",

        for (let key in SoundType) {
            // ccLog.log("声音",key);
            load["sound_" + key] = "mp3/" + key
        }
        // load["sound_"+SoundType.按钮] = "mp3/"+SoundType.按钮
        // load["sound_"+SoundType.猫叫] = "mp3/"+SoundType.猫叫
        // load["sound_"+SoundType.电话铃声] = "mp3/"+SoundType.电话铃声
        // load["sound_"+SoundType.打开窗户后的风声] = "mp3/"+SoundType.打开窗户后的风声
        // load["sound_"+SoundType.敲门] = "mp3/"+SoundType.敲门
        // load["sound_"+SoundType.狼叫] = "mp3/"+SoundType.狼叫
        // load["sound_"+SoundType.正确] = "mp3/"+SoundType.正确
        // load["sound_"+SoundType.背景音乐] = "mp3/"+SoundType.背景音乐
        // load["sound_"+SoundType.请出示证据] = "mp3/"+SoundType.请出示证据
        // load["sound_"+SoundType.转盘] = "mp3/"+SoundType.转盘
        // load["sound_"+SoundType.错误] = "mp3/"+SoundType.错误
        // load["sound_"+SoundType.胜利界面] = "mp3/"+SoundType.胜利界面


        return load
    }

    initTTF() {
        let load = {}
        // load["华康海报体W12"] = "TF/"+"华康海报体W12"
        load["pangtouyu"] = "TF/" + "pangtouyu"
        return load
    }


    initTips() {
        let load = {}
        load["pass_1_tip_1"] = "passtips/pass_1_tip_1"
        load["pass_2_tip_1"] = "passtips/pass_2_tip_1"
        load["pass_2_tip_2"] = "passtips/pass_2_tip_2"
        load["pass_5_tip_1"] = "passtips/pass_5_tip_1"
        load["pass_7_tip_1"] = "passtips/pass_7_tip_1"
        load["pass_14_tip_1"] = "passtips/pass_14_tip_1"
        load["pass_20_tip_1"] = "passtips/pass_20_tip_1"
        load["pass_25_tip_1"] = "passtips/pass_25_tip_1"
        load["pass_25_tip_2"] = "passtips/pass_25_tip_2"
        load["pass_26_tip_1"] = "passtips/pass_26_tip_1"
        load["pass_26_tip_2"] = "passtips/pass_26_tip_2"
        load["pass_27_tip_1"] = "passtips/pass_27_tip_1"
        load["pass_27_tip_2"] = "passtips/pass_27_tip_2"
        load["pass_30_tip_1"] = "passtips/pass_30_tip_1"
        load["pass_30_tip_2"] = "passtips/pass_30_tip_2"
        load["pass_32_tip_1"] = "passtips/pass_32_tip_1"
        load["pass_32_tip_2"] = "passtips/pass_32_tip_2"
        load["pass_33_tip_1"] = "passtips/pass_33_tip_1"
        load["pass_40_tip_1"] = "passtips/pass_40_tip_1"
        load["pass_40_tip_2"] = "passtips/pass_40_tip_2"
        load["pass_41_tip_1"] = "passtips/pass_41_tip_1"
        load["pass_42_tip_1"] = "passtips/pass_42_tip_1"

        // load["pass_99"] = "Checkpoint/pass_99"


        return load
    }

    initRubber() {
        let load = {}


        load["cr_1"] = "rubber/cr_1"
        load["cr_2"] = "rubber/cr_2"
        load["cr_3"] = "rubber/cr_3"
        load["cr_4"] = "rubber/cr_4"
        load["cr_5"] = "rubber/cr_5"
        load["cr_6"] = "rubber/cr_6"
        load["cr_7"] = "rubber/cr_7"
        load["cr_8"] = "rubber/cr_8"
        load["cr_9"] = "rubber/cr_9"
        load["cr_10"] = "rubber/cr_10"


        load["eg_1"] = "rubber/eg_1"
        load["eg_2"] = "rubber/eg_2"
        load["eg_3"] = "rubber/eg_3"
        load["eg_4"] = "rubber/eg_4"
        load["eg_5"] = "rubber/eg_5"
        load["eg_6"] = "rubber/eg_6"
        load["eg_7"] = "rubber/eg_7"
        load["eg_8"] = "rubber/eg_8"
        load["eg_9"] = "rubber/eg_9"
        load["eg_10"] = "rubber/eg_10"
        load["eg_11"] = "rubber/eg_11"
        load["eg_12"] = "rubber/eg_12"
        load["eg_13"] = "rubber/eg_13"
        load["eg_14"] = "rubber/eg_14"
        load["eg_15"] = "rubber/eg_15"
        load["eg_16"] = "rubber/eg_16"
        load["eg_17"] = "rubber/eg_17"

        load["ka_1"] = "rubber/ka_1"
        load["ka_2"] = "rubber/ka_2"
        load["ka_3"] = "rubber/ka_3"
        load["ka_4"] = "rubber/ka_4"
        load["ka_5"] = "rubber/ka_5"
        load["ka_6"] = "rubber/ka_6"
        load["ka_7"] = "rubber/ka_7"
        load["ka_8"] = "rubber/ka_8"
        load["ka_9"] = "rubber/ka_9"
        load["ka_10"] = "rubber/ka_10"
        load["ka_11"] = "rubber/ka_11"


        load["sj_1"] = "rubber/sj_1"
        load["sj_2"] = "rubber/sj_2"
        load["sj_3"] = "rubber/sj_3"
        load["sj_4"] = "rubber/sj_4"
        load["sj_5"] = "rubber/sj_5"
        load["sj_6"] = "rubber/sj_6"
        load["sj_7"] = "rubber/sj_7"
        load["sj_8"] = "rubber/sj_8"
        load["sj_9"] = "rubber/sj_9"
        load["sj_10"] = "rubber/sj_10"
        load["sj_11"] = "rubber/sj_11"
        load["sj_12"] = "rubber/sj_12"
        load["sj_13"] = "rubber/sj_13"
        load["sj_14"] = "rubber/sj_14"
        load["sj_15"] = "rubber/sj_15"
        load["sj_16"] = "rubber/sj_16"

        load["mr_1"] = "rubber/mr_1"

        // load["pass_99"] = "Checkpoint/pass_99"


        return load
    }

    initGameOverSP() {
        let load = {}

        load["tishi1"] = "gameover/tishi1"
        load["tishi2"] = "gameover/tishi2"

        return load
    }

    initDialog() {
        let load = {}
        // load["GameMenuActivity"] = "activity/GameMenuActivity"
        // load["GameActivity"] = "activity/GameActivity"
        // load["SelectCheckPointActivity"] = "activity/SelectCheckPointActivity"
        for (let dialogTypeKey in DialogType) {
            load[DialogType[dialogTypeKey]] = "dialog/" + DialogType[dialogTypeKey]
        }
        return load
    }

    initItem() {
        let load = {}
        // load["GameMenuActivity"] = "activity/GameMenuActivity"
        // load["GameActivity"] = "activity/GameActivity"
        // load["SelectCheckPointActivity"] = "activity/SelectCheckPointActivity"
        for (let ItemTypeKey in ItemPreType) {
            load[ItemPreType[ItemTypeKey]] = "item/" + ItemPreType[ItemTypeKey]
        }
        return load
    }


    initActivity() {
        let load = {}
        // load["GameMenuActivity"] = "activity/GameMenuActivity"
        // load["GameActivity"] = "activity/GameActivity"
        // load["SelectCheckPointActivity"] = "activity/SelectCheckPointActivity"

        for (let activityUITypeKey in ActivityUIType) {
            load[ActivityUIType[activityUITypeKey]] = "activity/" + ActivityUIType[activityUITypeKey]
        }
        return load
    }

    initAn() {
        let load = {}
        // load["gebulindiyiguan"] = "anim/gebulindiyiguan"
        return load
    }

    initPool() {
        let load = {}
        load["fireworksItem"] = "item/fireworksItem"

        return load
    }

    //第一次加载
    initJsonLoad() {
        let load = {}
        let jsonLoad = this.initJson()
        this.addList(load, jsonLoad)

        return load
    }

    //第一次加载
    initFirstLoad() {
        let load = {}
        let activity = this.initActivity()
        this.addList(load, activity)
        let pass = this.initPass()
        this.addList(load, pass)
        let item = this.initItem()
        this.addList(load, item)


        let dialog = this.initDialog()
        this.addList(load, dialog)

        let itemPreType = this.initItemPreType()
        this.addList(load, itemPreType)

        let initBalloonName = this.initBalloonName()
        this.addList(load, initBalloonName)

        let sound = this.initSound()
        this.addList(load, sound)
        // let an = this.initAn()
        // this.addList(load,an)
        // let tips = this.initTips()
        // this.addList(load,tips)

        return load
    }

    initItemPreType(){
        let load = {}
        // load["GameMenuActivity"] = "activity/GameMenuActivity"
        // load["GameActivity"] = "activity/GameActivity"
        // load["SelectCheckPointActivity"] = "activity/SelectCheckPointActivity"
        for (let itemPreType in ItemPreType) {
            load[ItemPreType[itemPreType]] = "item/" + ItemPreType[itemPreType]
        }
        return load
    }
    initBalloonName(){
        let load = {}
        // load["GameMenuActivity"] = "activity/GameMenuActivity"
        // load["GameActivity"] = "activity/GameActivity"
        // load["SelectCheckPointActivity"] = "activity/SelectCheckPointActivity"
        for (let itemPreType in balloonName) {
            load["lineSkin_"+balloonName[itemPreType]] = "lineSkin/" + balloonName[itemPreType]
            load["shopBig_"+balloonName[itemPreType]] = "shopBig/" + balloonName[itemPreType]
        }
        return load
    }


    //都是图片
    initSp() {
        let load = {}
        // let rubber = this.initRubber()
        // this.addList(load,rubber)
        // let GameOverSP = this.initGameOverSP()
        // this.addList(load,GameOverSP)
        // let res = this.initRes()
        // this.addList(load,res)

        return load
    }

    initRes() {
        let load = {}

        load["放大镜"] = "res/getItem/放大镜"
        load["灯泡"] = "res/getItem/灯泡"
        load["跳过"] = "res/getItem/跳过"
        load[TipsItemResSp.对号] = "itemRes/tickgreen"
        load[TipsItemResSp.红叉] = "itemRes/Xred"
        load[TipsItemResSp.圈出来] = "itemRes/circleSet_0"
        load[TipsItemResSp.证据] = "itemRes/ShowYourEvidencePNG"

        return load
    }

    initLoad() {
        let load = {}
        // let pre = this.initPre()
        // this.addList(load,pre)


        // let ttf = this.initTTF()
        // this.addList(load,ttf)

        // 华康海报体W12
        return load
    }

    initLoadPass() {
        let load = {}
        // let pass = this.initPass()
        // this.addList(load,pass)
        // let passsp = this.initPassSP()
        // this.addList(load,passsp)
        // let passPager = this.initPassPager()
        // this.addList(load,passPager)
        // let tips = this.initTips()
        // this.addList(load,tips)
        // 华康海报体W12
        return load
    }

    initNotLoad() {
        let load = {}
        let pass = this.initPass()
        this.addList(load, pass)

        let sound = this.initSound()
        this.addList(load, sound)
        let pre = this.initPre()
        this.addList(load, pre)
        let passsp = this.initPassSP()
        this.addList(load, passsp)
        let passPager = this.initPassPager()
        this.addList(load, passPager)
        // 华康海报体W12
        return load
    }


    addList(arr1, arr2) {
        for (let item in arr2) {
            arr1[item] = arr2[item]
        }

        return arr1
    }

    结算_送橡皮变化2: cc.Node = null
    结算_送橡皮底板1: cc.Node = null

    initView() {
        let data
        //  data = {
        //     type : GetNodeType.纯查找,
        //     otherData : "结算_送橡皮变化2",
        //     parentNode : this.node
        // }
        // this.结算_送橡皮变化2 = GetNode.getNode(data)
        // data = {
        //     type : GetNodeType.纯查找,
        //     otherData : "结算_送橡皮底板1",
        //     parentNode : this.node
        // }
        // this.结算_送橡皮底板1 = GetNode.getNode(data)

        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "测试按钮",
            parentNode: this.node
        }
        this.测试按钮 = GetNode.getNode(data)

        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "测试节点",
            parentNode: this.node
        }
        this.测试节点 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "ActivityRoot",
            parentNode: this.node
        }
        this.主节点 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "初始界面_进度条",
            parentNode: this.node
        }
        this.初始界面_进度条 = GetNode.getNode(data).getComponent(cc.ProgressBar)

        // if (GameSetting.mode ==gameModeType.测试){
        //     this. 测试节点.active = true
        // }
        if (GameSetting.mode == gameModeType.测试) {
            UtilsNode.show(this.测试按钮,true)
            this.测试按钮.on(cc.Node.EventType.TOUCH_START, () => {
                UtilsNode.show(this.测试节点,true)
            }, this)
        }
        data = {
            type: GetNodeType.纯查找,
            otherData: "只有熊",
            parentNode: this.node
        }
        this.只有熊 = GetNode.getNode(data)
    }

    //别的组件调用的
    async startLoad() {
        UIActivity.initView(this.主节点)
        await LoadManage.starLoad(this.initJsonLoad(), {
            schedule: (currentCount, count) => {
                // cc.log("回调进度",currentCount,"/",count);
                // this.初始界面_进度条.progress = currentCount/count
                // ccLog.log("回调进度", currentCount)
                // this.结算_送橡皮变化2.height = currentCount / count * this.结算_送橡皮底板1.height

            },
            itemCallback: (item) => {
                // ccLog.log("回调进度什么呢", item)
            },
            scheduleEnd: async (currentCount, count) => {
                // this.初始界面_进度条.progress = currentCount/count
            },
        });
        await JsonManager.initJson()
        await LoadManage.starLoad(this.initFirstLoad(), {
            schedule: (currentCount, count) => {
                // cc.log("回调进度",currentCount,"/",count);
                this.初始界面_进度条.progress = currentCount/count
                // ccLog.log("回调进度", currentCount/count)
                // this.结算_送橡皮变化2.height = currentCount / count * this.结算_送橡皮底板1.height

            },
            itemCallback: (item) => {
                // ccLog.log("回调进度什么呢", item)
            },
            scheduleEnd: async (currentCount, count) => {
                this.初始界面_进度条.progress = currentCount/count
            },
        });

       // await Utils.setTimerOnce(this,3)


        UIActivity.startToActivity("GameMenuActivity",
            null
        )



        UtilsNode.show(this.只有熊,false)
        Emitter.fire("onInitMusicSwitch")

        // LoadManage.starNotLoad(this.initNotLoad());
        //
        // LoadManage.starLoad(this.initSp(),{
        //     schedule : (currentCount,count)=>{
        //         // cc.log("回调进度",currentCount,"/",count);
        //         // this.loadbar.progress = currentCount/count
        //
        //     },
        //     itemCallback : async (item)=>{
        //         // cc.log("图片加载完成",item);
        //         this.tempSprite.spriteFrame = await LoadManage.getSpriteForName(item)
        //     },
        //     scheduleEnd : (currentCount,count)=>{
        //
        //     },
        // });
        //
        //
        //
        // let pass = JsonManager.getPassByIndex(UtilsDB.getMyPassSave().index)


        // ccLog.log("开始展示",pass)
        // gameData: {title: "帮他取得游戏机"}
        //     index: 0
        //     itemName: "pass_101"
        //     passName: "pass_101"
        //     tip: "pass_101_tip"


        // await LoadManage.starLoadByName(pass.passName,{
        //     schedule : (currentCount,count)=>{
        //         // cc.log("回调进度",currentCount,"/",count);
        //         // this.loadbar.progress = currentCount/count
        //
        //     },
        //     scheduleEnd : ()=>{
        //
        //         // ccLog.log("都有什么缓存 ",LoadManage._loadResCache)
        //     }
        // });
        //  LoadManage.addPool(this.initPool());
        // await LoadManage.starLoad(this.initPool(),{
        //      schedule : (currentCount,count)=>{
        //          // cc.log("回调进度",currentCount,"/",count);
        //          this.loadbar.progress = currentCount/count
        //
        //      },
        //      itemCallback : async (item)=>{
        //      },
        //      scheduleEnd : (currentCount,count)=>{
        //
        //      },
        //  });

        //
        // if (pass.tip.type == TipsType.图片) {
        //     await LoadManage.starLoadByName(pass.tip.data.src,{
        //         schedule : async (name)=>{
        //             // cc.log("回调进度",currentCount,"/",count);
        //             this.tempSprite.spriteFrame = await LoadManage.getSpriteForName(name)
        //         },
        //         scheduleEnd : ()=>{
        //
        //             // ccLog.log("都有什么缓存 ",LoadManage._loadResCache)
        //         }
        //     });
        // }
        // Umengstatistics.setEventForAndroidCount(maidianType.加载完成的次数)
        //  Emitter.fire("onOpenDialog",{name : DialogType.四格漫画,zIndex : 100,data : {pass : pass},self : this},null)

        // UIActivity.startToActivity("FourGridActivity",{pass : pass})


        // LoadManage.starAllLoad();


        // Emitter.fire("onInitMusicSwitch")
    }

    onGetCodeAD() {
        if (ChannelManger.getInstance().getChannelTypeIsNoAndroid() == true) {
            Api.getAdControlInfo((num) => {
            })
        }
    }

    onDisable() {
        this.removeEmitter()
    }


    async onLoad() {

        let r = window.location.search
        ccLog.log("什么地址呢 ",r)


        cc.director.getCollisionManager().enabled = true;

        // cc.director.getCollisionManager().enabledDebugDraw = true;

        cc.director.getPhysicsManager().enabled = true; // 开启了物理引擎
        let Bits = cc.PhysicsManager.DrawBits; // 这个是我们要显示的类型
        // cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
        // cc.director.getPhysicsManager().gravity = new cc.Vec2(0, -640)
        this.physicsManager = cc.director.getPhysicsManager()
        this.physicsManager.enabledAccumulator = true


        this.removeEmitter()
        this.registerEmitter()
        // UtilsDB.initADtimeTips()


        //编辑器
        // this.initloadResByEdit()

        ccLog.logTag = true
        let channel = ChannelManger.getInstance().getChannel();
        channel.initAd()

        ccLog.log("当前渠道", channel)


        Api.getAdControlInfo((num) => {
            ccLog.log("当前渠道", channel, "广告参数", num)
        })


        // let data = {
        //     httpType : "post",
        //     httpUrl : Api.baseUrl+"/postTest",
        //     async : true,
        //     data : {
        //         username : "122h",
        //         userpassword : "122h213",
        //     }
        // }
        // let callback = {
        //     successful : this.successful,
        //     failure : this.failure,
        // }
        // Api.go(data,callback)

        // let data = {
        //     httpType : "post",
        //     httpUrl : Api.baseUrl+"/setKey",
        //     async : true,
        //     data : {
        //         key : "passData",
        //         value : JSON.stringify({id :1123}),
        //     }
        // }
        // let callback = {
        //     successful : this.successful,
        //     failure : this.failure,
        // }
        // Api.go(data,callback)

        // let data = {
        //     httpType : "post",
        //     httpUrl : Api.baseUrl+"/getKey",
        //     async : true,
        //     data : {
        //         key : "passData",
        //     }
        // }
        // let callback = {
        //     successful : this.successful,
        //     failure : this.failure,
        // }
        // Api.go(data,callback)


        // qudaoCommon.initallAd();
        //

        let listNode = []
        // for (let i = 0; i < 10; i++) {
        //     // ccLog.log("开始跳了吗",i)
        //     let node1 =await UtilsNode.getNodeFromPool("fireworksItem",this.node);
        //     listNode.push(node1)
        // }
        // for (let i = 0; i < listNode.length; i++) {
        //     UtilsAction.gameOverJump(listNode[i],()=>{
        //         UtilsNode.setNodeFromPool("fireworksItem",listNode[i])
        //     })
        //     await Utils.setTimerOnce(this,0.2)
        //     ccLog.log("开始跳了吗",i,listNode[i])
        // }
        // ccLog.log("获取组件名字",cc.js.getClassName(Helloworld))


    }
    successful(result){
        ccLog.log("网络请求 成功 最终",result)

       let jsonData = JSON.parse( result.data[0].v)

        ccLog.log("网络请求 网络回来的完全体",jsonData)
        // ccLog.log("网络请求 本地的对比",jsonData)
    }
    failure(result){
        ccLog.log("网络请求 失败 最终",result)

    }

    update(dt: number): void {
        // let FrameRate = cc.game.getFrameRate()
        //  if (this.FrameRate != FrameRate) {
        //
        //      console.log("获取当前帧率",FrameRate)
        //      // cc.PhysicsManager.FIXED_TIME_STEP=1/FrameRate
        //      this.FrameRate = FrameRate
        //  }
        //  this.physicsManager.enabled = true;
        //  this.physicsManager.update(0.5*dt);
        //  this.physicsManager.enabled = false;
    }

    initListening() {

    }

}
