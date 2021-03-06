// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {ClickType} from "./clickmoveitem";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {NewNet} from "../System/api/newNet";
import Utils from "../System/Utils/Utils";
import ChannelManger from "../System/qudao/channelManger";
import {ItemPreType} from "../System/Type/enums";
import UtilsTime from "../System/Utils/UtilsTime";

const {ccclass, property} = cc._decorator;

export enum ControlCommercialSceneId {
    签到 = "sqqq_qd",
    限时礼包 = "sqqq_xslb",
    皮肤试用 = "sqqq_pfsy",
    盲盒 = "sqqq_mh",
    盲盒结算 = "sqqq_mhjs",

    获得皮肤 = "sqqq_hdpf",
    结算 = "sqqq_js",
    转盘 = "sqqq_zp",
    游戏首页 = "sqqq_ui",
    漂浮窗 = "sqqq_pfc",
    独立分享 = "sqqq_dlfx",
}
export enum ControlCommercialSceneIdHuabi {
    游戏首页 = "jyhb_ui",
}
export enum ControlCommercialItemName {
    小手指引导 = "a01",
    按钮缩放 = "a02",
    奖励倍数 = "a03",
    独立分享是否展示控制 = "a04",
    独立分享页面展示间隔控制 = "a05",
    独立分享页面分享图标展示控制 = "a06",
    游戏弹窗ui按钮变更 = "a07",
    主界面更多游戏图标展示控制 = "a08",
    主界面添加到桌面控制 = "a09",
    主界面添加到桌面奖励控制 = "a10",
    限时礼包开关控制 = "a16",
    限时礼包奖励时间范围控制 = "a17",
    限时礼包主动展示 = "a18",
    特殊按钮2开关控制 = "a27",
    特殊按钮2展示概率控制 = "a28",
    特殊按钮2展示间隔控制 = "a29",
    特殊按钮2点击区域大小 = "a30",
    插屏广告展示 = "c01",
    插屏展示间隔 = "c02",
    插屏延迟展示 = "c03",
    插屏广告概率控制 = "c04",

    盒子广告展示 = "h01",
    盒子广告延迟展示控制 = "h02",
    盒子广告展示间隔控制 = "h03",
    激励广告点击区域开关控制 = "j02",
    激励广告点击区域参数控制 = "j03",
    激励广告点击区域时间间隔控制 = "j04",
    激励广告点击区域次数控制 = "j05",
    激励视频图标展示 = "j07",
    积木广告展示 = "jm01",
    积木广告延迟展示 = "jm02",
    积木广告位置变更 = "jm03",
    积木广告位置变更概率控制 = "jm04",


    开屏广告是否展示 = "k01",
    开屏广告展示关卡间隔控制 = "k02",
    开屏广告展示时间间隔控制 = "k03",

    全屏视频广告时间间隔 = "q01",
    全屏视频广告延迟展示 = "q02",

    测试开关 = "test",

    原生广告展示 = "y01",
    原生广告展示次数 = "y02",
    原生广告点击区域开关控制 = "y04",
    原生广告点击区域大小控制 = "y05",
    原生广告点击区域时间间隔控制 = "y06",
    原生广告点击区域次数控制 = "y07",
    原生广告关闭按钮点击区域 = "y09",
    原生广告延迟展示 = "y10",
    原生广告概率控制 = "y11",
    原生广告初始展示间隔控制 = "y12",
    原生广告展示间隔控制 = "y13",

}





//商业化控制类
@ccclass
export default class ControlCommercial {

    static netData  : {[name: string]: Object} = {}
    static  netDataNoNet  : {[name: string]: Object} = {}

    static itemNameTime : {[name: string]: number} = {}
    static itemNameCount : {[name: string]: number} = {}


    // ControlCommercial.key
    static key : string = "ksgamesqqq"
    // static key : string = "ksgamejyhb"

    static initData(){
        let data = {}
        data[ControlCommercialItemName.小手指引导] = true
        data[ControlCommercialItemName.按钮缩放] = true
        data[ControlCommercialItemName.奖励倍数] = 2
        data[ControlCommercialItemName.独立分享是否展示控制] = false
        data[ControlCommercialItemName.独立分享页面展示间隔控制] = 0
        data[ControlCommercialItemName.独立分享页面分享图标展示控制] = false
        data[ControlCommercialItemName.游戏弹窗ui按钮变更] = false
        data[ControlCommercialItemName.主界面更多游戏图标展示控制] = true
        data[ControlCommercialItemName.主界面添加到桌面控制] = true
        data[ControlCommercialItemName.主界面添加到桌面奖励控制] = 0
        data[ControlCommercialItemName.限时礼包开关控制] = true
        data[ControlCommercialItemName.限时礼包奖励时间范围控制] = 300
        data[ControlCommercialItemName.限时礼包主动展示] = true
        data[ControlCommercialItemName.特殊按钮2开关控制] = true
        data[ControlCommercialItemName.特殊按钮2展示概率控制] = 1
        data[ControlCommercialItemName.特殊按钮2展示间隔控制] = 0
        data[ControlCommercialItemName.特殊按钮2点击区域大小] = 100
        data[ControlCommercialItemName.插屏广告展示] = false
        data[ControlCommercialItemName.插屏展示间隔] = 30
        data[ControlCommercialItemName.插屏延迟展示] = 0
        data[ControlCommercialItemName.插屏广告概率控制] = 100
        data[ControlCommercialItemName.盒子广告展示] = false
        data[ControlCommercialItemName.盒子广告延迟展示控制] = 0
        data[ControlCommercialItemName.盒子广告展示间隔控制] = 30
        data[ControlCommercialItemName.激励广告点击区域开关控制] = true
        data[ControlCommercialItemName.激励广告点击区域参数控制] = 100
        data[ControlCommercialItemName.激励广告点击区域时间间隔控制] = 30
        data[ControlCommercialItemName.激励广告点击区域次数控制] = 1
        data[ControlCommercialItemName.激励视频图标展示] = 1
        data[ControlCommercialItemName.积木广告展示] = true
        data[ControlCommercialItemName.积木广告延迟展示] = 0
        data[ControlCommercialItemName.积木广告位置变更] = false
        data[ControlCommercialItemName.积木广告位置变更概率控制] = 1
        data[ControlCommercialItemName.开屏广告是否展示] = false
        data[ControlCommercialItemName.开屏广告展示关卡间隔控制] = 5
        data[ControlCommercialItemName.开屏广告展示时间间隔控制] = 60
        data[ControlCommercialItemName.全屏视频广告时间间隔] = 60
        data[ControlCommercialItemName.全屏视频广告延迟展示] = 0
        data[ControlCommercialItemName.测试开关] = false
        data[ControlCommercialItemName.原生广告展示] = true
        data[ControlCommercialItemName.原生广告展示次数] = 0
        data[ControlCommercialItemName.原生广告点击区域开关控制] = true
        data[ControlCommercialItemName.原生广告点击区域大小控制] = 0
        data[ControlCommercialItemName.原生广告点击区域时间间隔控制] = 0
        data[ControlCommercialItemName.原生广告点击区域次数控制] = 0
        data[ControlCommercialItemName.原生广告关闭按钮点击区域] = 0
        data[ControlCommercialItemName.原生广告延迟展示] = 0
        data[ControlCommercialItemName.原生广告概率控制] = 1
        data[ControlCommercialItemName.原生广告初始展示间隔控制] = 60
        data[ControlCommercialItemName.原生广告展示间隔控制] = 30

        return data

    }
    static initDataTest(){
        let data = {}
        data[ControlCommercialItemName.小手指引导] = true
        data[ControlCommercialItemName.按钮缩放] = true
        data[ControlCommercialItemName.奖励倍数] = 2
        data[ControlCommercialItemName.独立分享是否展示控制] = false
        data[ControlCommercialItemName.独立分享页面展示间隔控制] = 0
        data[ControlCommercialItemName.独立分享页面分享图标展示控制] = false
        data[ControlCommercialItemName.游戏弹窗ui按钮变更] = false
        data[ControlCommercialItemName.主界面更多游戏图标展示控制] = true
        data[ControlCommercialItemName.主界面添加到桌面控制] = true
        data[ControlCommercialItemName.主界面添加到桌面奖励控制] = 50
        data[ControlCommercialItemName.限时礼包开关控制] = true
        data[ControlCommercialItemName.限时礼包奖励时间范围控制] = 300
        data[ControlCommercialItemName.限时礼包主动展示] = true
        data[ControlCommercialItemName.特殊按钮2开关控制] = true
        data[ControlCommercialItemName.特殊按钮2展示概率控制] = 1
        data[ControlCommercialItemName.特殊按钮2展示间隔控制] = 0
        data[ControlCommercialItemName.特殊按钮2点击区域大小] = 200
        data[ControlCommercialItemName.插屏广告展示] = false
        data[ControlCommercialItemName.插屏展示间隔] = 30
        data[ControlCommercialItemName.插屏延迟展示] = 0
        data[ControlCommercialItemName.插屏广告概率控制] = 100
        data[ControlCommercialItemName.盒子广告展示] = false
        data[ControlCommercialItemName.盒子广告延迟展示控制] = 0
        data[ControlCommercialItemName.盒子广告展示间隔控制] = 30
        data[ControlCommercialItemName.激励广告点击区域开关控制] = true
        data[ControlCommercialItemName.激励广告点击区域参数控制] = 0
        data[ControlCommercialItemName.激励广告点击区域时间间隔控制] = 30
        data[ControlCommercialItemName.激励广告点击区域次数控制] = 1
        data[ControlCommercialItemName.激励视频图标展示] = 1
        data[ControlCommercialItemName.积木广告展示] = true
        data[ControlCommercialItemName.积木广告延迟展示] = 0
        data[ControlCommercialItemName.积木广告位置变更] = false
        data[ControlCommercialItemName.积木广告位置变更概率控制] = 1
        data[ControlCommercialItemName.开屏广告是否展示] = false
        data[ControlCommercialItemName.开屏广告展示关卡间隔控制] = 5
        data[ControlCommercialItemName.开屏广告展示时间间隔控制] = 60
        data[ControlCommercialItemName.全屏视频广告时间间隔] = 60
        data[ControlCommercialItemName.全屏视频广告延迟展示] = 0
        data[ControlCommercialItemName.测试开关] = true
        data[ControlCommercialItemName.原生广告展示] = true
        data[ControlCommercialItemName.原生广告展示次数] = 999
        data[ControlCommercialItemName.原生广告点击区域开关控制] = true
        data[ControlCommercialItemName.原生广告点击区域大小控制] = 0
        data[ControlCommercialItemName.原生广告点击区域时间间隔控制] = 0
        data[ControlCommercialItemName.原生广告点击区域次数控制] = 999
        data[ControlCommercialItemName.原生广告关闭按钮点击区域] = 0
        data[ControlCommercialItemName.原生广告延迟展示] = 0
        data[ControlCommercialItemName.原生广告概率控制] = 1
        data[ControlCommercialItemName.原生广告初始展示间隔控制] = 0
        data[ControlCommercialItemName.原生广告展示间隔控制] = 2

        return data

    }
    // ControlCommercial.init()
    static async init() {





        let newMyChannelData = ChannelManger.getInstance().getNewMyChannelData();


        let data = {
            setData : {
                version: newMyChannelData.version,
                channelId: newMyChannelData.channelId,
                controlIds: [
                    ControlCommercialSceneId.签到,
                    ControlCommercialSceneId.限时礼包,
                    ControlCommercialSceneId.皮肤试用,
                    ControlCommercialSceneId.盲盒,
                    ControlCommercialSceneId.盲盒结算,
                    ControlCommercialSceneId.获得皮肤,
                    ControlCommercialSceneId.结算,
                    ControlCommercialSceneId.转盘,
                    ControlCommercialSceneId.游戏首页,
                    ControlCommercialSceneId.漂浮窗,
                    ControlCommercialSceneId.独立分享,
                    // ControlCommercialSceneIdHuabi.游戏首页
                ],

                userId: "qqq"+Utils.getTime(),
                sookie: {}
            },

            obj : newMyChannelData,
        }

        // {
        //     "params": {
        //     "sqqq_qd": {
        //         "a01": true,
        //             "a02": true,
        //             "a03": 2,
        //             "j02": true,
        //             "j03": 100,
        //             "j04": 60,
        //             "c01": false,
        //             "c02": 0,
        //             "c03": 0,
        //             "h01": false,
        //             "h02": 0.1,
        //             "j05": 5,
        //             "y02": 10,
        //             "y06": 1,
        //             "y09": 30,
        //             "y01": true,
        //             "y05": 100,
        //             "y08": 1,
        //             "y04": true,
        //             "y07": 10,
        //             "y10": 0,
        //             "jm01": true,
        //             "jm02": 0.1,
        //             "h03": 20,
        //             "c04": 0,
        //             "jm03": true,
        //             "jm04": 0.1,
        //             "y11": 1,
        //             "j07": 1,
        //             "y12": 30,
        //             "y13": 10
        //     },
        //     "sqqq_xslb": {
        //         "a01": false,
        //             "a02": true,
        //             "a03": 2,
        //             "j02": true,
        //             "j03": 100,
        //             "j04": 60,
        //             "c01": false,
        //             "c02": 0,
        //             "c03": 0,
        //             "h01": false,
        //             "h02": 0.1,
        //             "j05": 5,
        //             "y02": 10,
        //             "y06": 1,
        //             "y09": 30,
        //             "y01": true,
        //             "y05": 100,
        //             "y08": 1,
        //             "y04": true,
        //             "y07": 10,
        //             "y10": 0,
        //             "jm01": true,
        //             "jm02": 0.1,
        //             "h03": 20,
        //             "c04": 0,
        //             "jm03": true,
        //             "jm04": 0.1,
        //             "y11": 1,
        //             "j07": 1,
        //             "y12": 30,
        //             "y13": 10
        //     },
        //     "sqqq_pfsy": {
        //         "a01": false,
        //             "a02": true,
        //             "a03": 2,
        //             "j02": true,
        //             "j03": 100,
        //             "j04": 60,
        //             "c01": false,
        //             "c02": 0,
        //             "c03": 0,
        //             "h01": false,
        //             "h02": 0,
        //             "j05": 5,
        //             "y02": 10,
        //             "y06": 1,
        //             "y09": 30,
        //             "y01": true,
        //             "y05": 100,
        //             "y08": 1,
        //             "y04": true,
        //             "y07": 10,
        //             "y10": 0,
        //             "jm01": true,
        //             "jm02": 0,
        //             "h03": 20,
        //             "c04": 0,
        //             "jm03": true,
        //             "jm04": 0,
        //             "y11": 1,
        //             "j07": 1,
        //             "y12": 30,
        //             "y13": 10
        //     },
        //     "sqqq_mh": {
        //         "c01": false,
        //             "c02": 0,
        //             "c03": 0,
        //             "h01": false,
        //             "h02": 0.1,
        //             "y02": 10,
        //             "y06": 1,
        //             "y09": 30,
        //             "y01": true,
        //             "y05": 100,
        //             "y08": 1,
        //             "y04": true,
        //             "y07": 10,
        //             "y10": 0,
        //             "jm01": true,
        //             "jm02": 0.1,
        //             "h03": 20,
        //             "c04": 0,
        //             "jm03": true,
        //             "jm04": 0.1,
        //             "y11": 1,
        //             "y12": 30,
        //             "y13": 10,
        //             "a27": false,
        //             "a28": 0.1,
        //             "a29": 10,
        //             "a30": 100
        //     },
        //     "sqqq_mhjs": {
        //         "a01": false,
        //             "a02": true,
        //             "a03": 2,
        //             "j02": true,
        //             "j03": 100,
        //             "j04": 60,
        //             "c01": false,
        //             "c02": 0,
        //             "c03": 0,
        //             "h01": false,
        //             "h02": 0,
        //             "j05": 5,
        //             "y02": 10,
        //             "y06": 1,
        //             "y09": 30,
        //             "y01": true,
        //             "y05": 100,
        //             "y08": 1,
        //             "y04": true,
        //             "y07": 10,
        //             "y10": 0,
        //             "jm01": true,
        //             "jm02": 0,
        //             "h03": 20,
        //             "c04": 0,
        //             "jm03": true,
        //             "jm04": 0,
        //             "y11": 1,
        //             "j07": 1,
        //             "y12": 30,
        //             "y13": 10,
        //             "a27": false,
        //             "a28": 0.1,
        //             "a29": 10,
        //             "a30": 100
        //     },
        //     "sqqq_hdpf": {
        //         "a01": false,
        //             "a02": true,
        //             "a03": 2,
        //             "j02": true,
        //             "j03": 100,
        //             "j04": 60,
        //             "c01": false,
        //             "c02": 0,
        //             "c03": 0,
        //             "h01": false,
        //             "h02": 0,
        //             "j05": 5,
        //             "y02": 10,
        //             "y06": 1,
        //             "y09": 30,
        //             "y01": true,
        //             "y05": 100,
        //             "y08": 1,
        //             "y04": true,
        //             "y07": 10,
        //             "y10": 0,
        //             "jm01": true,
        //             "jm02": 0,
        //             "h03": 20,
        //             "c04": 0,
        //             "jm03": true,
        //             "jm04": 0,
        //             "y11": 1,
        //             "j07": 1,
        //             "y12": 30,
        //             "y13": 10
        //     },
        //     "sqqq_js": {
        //         "a01": false,
        //             "a02": true,
        //             "a03": 2,
        //             "j02": true,
        //             "j03": 100,
        //             "j04": 60,
        //             "c01": false,
        //             "c02": 0,
        //             "c03": 0,
        //             "h01": false,
        //             "h02": 0,
        //             "k01": true,
        //             "k02": 5,
        //             "k03": 60,
        //             "j05": 5,
        //             "y02": 10,
        //             "y06": 1,
        //             "y09": 30,
        //             "y01": true,
        //             "y05": 100,
        //             "y08": 1,
        //             "y04": true,
        //             "y07": 10,
        //             "y10": 0,
        //             "jm01": true,
        //             "jm02": 0,
        //             "h03": 20,
        //             "c04": 0,
        //             "jm03": true,
        //             "jm04": 0,
        //             "y11": 1,
        //             "j07": 1,
        //             "q01": 0,
        //             "q02": 0,
        //             "y12": 30,
        //             "y13": 10
        //     },
        //     "sqqq_zp": {
        //         "a01": false,
        //             "a02": true,
        //             "j02": true,
        //             "j03": 100,
        //             "j04": 60,
        //             "c01": false,
        //             "c02": 0,
        //             "c03": 0,
        //             "h01": false,
        //             "h02": 0,
        //             "j05": 5,
        //             "y02": 10,
        //             "y06": 1,
        //             "y09": 30,
        //             "y01": true,
        //             "y05": 100,
        //             "y08": 1,
        //             "y04": true,
        //             "y07": 10,
        //             "y10": 0,
        //             "h03": 20,
        //             "c04": 0,
        //             "y11": 1,
        //             "j07": 1,
        //             "y12": 30,
        //             "y13": 10
        //     },
        //     "sqqq_ui": {
        //         "a08": false,
        //             "a09": false,
        //             "a10": 50,
        //             "a16": false,
        //             "a17": 300,
        //             "a18": true
        //     },
        //     "sqqq_pfc": {
        //         "a27": false,
        //             "a28": 0.1,
        //             "a29": 10,
        //             "a30": 100
        //     },
        //     "sqqq_dlfx": {
        //         "a04": "",
        //             "a05": 20,
        //             "a06": false
        //     }
        // },
        //     "sookie": {
        //     "uid": "e1bb08d37669e4d506"
        // },
        //     "isDefault": false
        // }

        for (let itemPreType in ControlCommercialSceneId) {
            let s :string = ControlCommercialSceneId[itemPreType];

            ccLog.log("有多少应用场景啊",s)

            this.netData[s] = this.initData()
        }



        let netData =  await NewNet.getServerData(data)
        if (netData) {
           let listData =  netData.data.params

            ccLog.log("有多少应用场景啊 要放的数据",listData)



            for (let itemPreType in listData) {
                if (itemPreType) {
                    let s  = listData[itemPreType];
                    ccLog.log("增量更新 0 ",itemPreType,s)
                    // this.netData[s] = this.initDataTest()
                    for (let itemPreTypeitem in s) {
                        if (itemPreTypeitem) {
                            let ss  = s[itemPreTypeitem];
                            ccLog.log("增量更新 1 ",itemPreTypeitem,ss)
                            // this.netData[s] = this.initDataTest()
                            this.netData[itemPreType][itemPreTypeitem] = ss
                        }
                    }
                    // this.netData[itemPreType] = this.initDataTest()
                }
            }
            //增量更新
            // this.netData = listData


            // ccLog.log("有多少应用场景啊 要放的数据",listData)




            //没有网络
            for (let itemPreType in ControlCommercialSceneId) {
                let s :string = ControlCommercialSceneId[itemPreType];

                ccLog.log("有多少应用场景啊",s)

                // this.netData[s] = this.initDataTest()
                this.netDataNoNet[s] = this.initData()
            }


            ccLog.log("真实数据 有网络",this.netData)
            ccLog.log("真实数据 没网络",this.netDataNoNet)

        }else{
            //没有网络
            for (let itemPreType in ControlCommercialSceneId) {
                let s = ControlCommercialSceneId[itemPreType];

                ccLog.log("有多少应用场景啊",s)

                this.netData[s] = this.initDataTest()
            }
            ccLog.log("真实数据 没网络",this.netData)
            console.log("真实数据 没网络",this.netData)
        }

    }

    // ControlCommercial.getSceneData()
    static getSceneData(sceneId,itemName){
        let item = this.netData[sceneId][itemName]
        ccLog.log("得到了什么呢",sceneId,itemName,item)
        return item
    }



    //调用了之后多长时间之后再调用要判断间隔时间
// ControlCommercial.getItemNameTime(sceneId,itemName)
    static getItemNameTime(sceneId,itemName,is){
        let item = this.netData[sceneId][itemName]
        let itemTime = this.itemNameTime[itemName]
        let  time = UtilsTime.getTime()
        ccLog.log("对比的是什么呢",itemName)
        if (itemTime) {
            switch (itemName){
                // case ControlCommercialItemName.限时礼包奖励时间范围控制 :
                case ControlCommercialItemName.激励广告点击区域时间间隔控制 :
                case ControlCommercialItemName.盒子广告展示间隔控制 :
                case ControlCommercialItemName.原生广告点击区域时间间隔控制 :
                case ControlCommercialItemName.原生广告展示间隔控制 :
                case ControlCommercialItemName.原生广告初始展示间隔控制 :
                case ControlCommercialItemName.特殊按钮2展示间隔控制 :

                    // ccLog.log("间隔呢","当前时间",time,"间隔时间",itemTime,"对比时间",item*1000)
                    ccLog.log("间隔呢 0 ",itemName)
                    if (time-itemTime>item*1000) {
                        if (is == false) {
                            this.itemNameTime[itemName] = time
                        }
                        // ccLog.log("间隔呢",this.itemNameTime[itemName])

                        return true
                    }
                    // break
            }
        }else{
            if (is == false) {
                this.itemNameTime[itemName] = time
            }
            return true
        }


        return false

    }

    static getItemNameTimeByFirst(sceneId,itemName){
        let item = this.netData[sceneId][itemName]
        let itemTime = this.itemNameTime[itemName]
        let  time = UtilsTime.getTime()
        ccLog.log("得到了什么呢",item)
        if (itemTime) {
            switch (itemName){
                // case ControlCommercialItemName.限时礼包奖励时间范围控制 :
                // case ControlCommercialItemName.激励广告点击区域时间间隔控制 :
                // case ControlCommercialItemName.盒子广告展示间隔控制 :
                // case ControlCommercialItemName.原生广告点击区域时间间隔控制 :
                case ControlCommercialItemName.原生广告初始展示间隔控制 :
                // case ControlCommercialItemName.原生广告展示间隔控制 :
                //     if (time-itemTime>item*1000) {
                        this.itemNameTime[itemName] = time
                        return true
                    // }
                    // break
            }
        }else{
            ccLog.log("初始间隔 0 ","当前时间",time,itemName)
            this.itemNameTime[itemName] = time
            return true
        }


        return false

    }




    //减少使用次数
    // ControlCommercial.getItemNameCount(sceneId,itemName)
    static getItemNameCount(sceneId,itemName,is){
        let item = this.netData[sceneId][itemName]
        if (item<=0) {

            this.netData[sceneId][itemName] = 0

            switch (itemName){
                case ControlCommercialItemName.激励广告点击区域次数控制 :
                case ControlCommercialItemName.原生广告点击区域次数控制 :
                    return false
                    break
            }
        }else{
            if (is == false) {
                this.netData[sceneId][itemName]-=1
            }
            ccLog.log("减少了次数"," sceneId ",sceneId," itemName ",itemName,this.netData[sceneId][itemName])
            return true
        }
        return false
    }



    // ControlCommercial.getRandom(sceneId,itemName)
    static getRandom(sceneId,itemName){
            let ControlNum = this.netData[sceneId][itemName]

        switch (itemName) {
            case ControlCommercialItemName.原生广告概率控制 :
            case ControlCommercialItemName.特殊按钮2展示概率控制 :
                let random = Utils.random(0,100)
                if (ControlNum*100 > random) {
                    return true
                }else{
                    return false
                }
                break
        }

        return false

    }


}
