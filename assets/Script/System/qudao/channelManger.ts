// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChannelAllBase from "./channelAllBase";
import {Channel_web} from "./channel_web";
import {Channel_android} from "./channel_android";
import {Channel_android_oppo} from "./channel_android_oppo";
import {Channel_android_mi} from "./channel_android_mi";
import {Channel_oppo} from "./channel_oppo";
import {Channel_vivo} from "./channel_vivo";
import {Channel_meizu} from "./channel_meizu";
import {Channel_tt} from "./channel_tt";
import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;

export enum ChannelMangerType {
    web = 0,
    oppo = 1,
    vivo = 2,
    meizu = 3,
    Android = 4,
    Android_oppo = 5,
    Android_mi = 6,
    qq = 7,
    tt = 8,

}

@ccclass
export default class ChannelManger {


    //     游戏id：qdddqhzl
    // 渠道id：oppo
    // 广告位id：test


    // ChannelManger.getInstance().ADCodeData[ChannelManger.getInstance().channelMangerType]
    ADCodeData = {
        appid: "qdddqhzl",
        ChannelList: [
            {
                cnid: "oppo",
                postid: "test",
            },

            {
                cnid: "oppo",
                postid: "test",
            },

            {
                cnid: "vivo",
                postid: "test",
            },
            {
                cnid: "meizu",
                postid: "test",
            },
            null,
            null,
            null,
            {
                cnid: "qq",
                postid: "test",
            },
            {
                cnid: "tt",
                postid: "test",
            },
        ]
    }

// @property({
//         type: cc.Enum(ChannelMangerType),
//         displayName: "当前平台管理",
//         tooltip: "当前平台管理",
//     })
    //平台管理 当前渠道
    channelMangerType = ChannelMangerType.Android;
    // LIFE-CYCLE CALLBACKS:
    list: ChannelAllBase[] = [
        new Channel_web(),
        new Channel_oppo(),
        new Channel_vivo(),
        new Channel_meizu(),
        new Channel_android(),
        new Channel_android_oppo(),
        new Channel_android_mi(),
        null,
        new Channel_tt(),
    ]
    static instance: ChannelManger = null

    // ChannelManger.getInstance()
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new ChannelManger()
        }
        return this.instance
    }

    //获取当前渠道参数
    // ChannelManger.getInstance().getMyChannelData()
    getMyChannelData() {
        ccLog.log("有什么参数", this.ADCodeData)
        let item = this.ADCodeData.ChannelList[this.channelMangerType]
        if (item == null) {
            return null
        }
        let data = {
            appid: this.ADCodeData.appid,
            cnid: item.cnid,
            postid: item.postid,
        }
        return data
    }


    // ccLog.log("全局获取通道管理",ChannelManger.getInstance().getChannel())

    // onLoad() {
    //     ChannelManger.instance = this
    //
    //
    // }
    //设置渠道
    setChannelType(channelMangerType) {
        this.channelMangerType = channelMangerType
    }

    //获取渠道
    // ChannelManger.getInstance().getChannelType()
    getChannelType() {
        return this.channelMangerType
    }

    //判断是不是安卓相关渠道
    getChannelTypeIsAndroid() {
        let channelType = ChannelManger.getInstance().getChannelType();
        if (channelType == ChannelMangerType.Android ||
            channelType == ChannelMangerType.Android_oppo ||
            channelType == ChannelMangerType.Android_mi
        ) {
            return true
        }


        return false
    }

    getChannelTypeIsNoAndroid() {
        let channelType = ChannelManger.getInstance().getChannelType();
        if (channelType == ChannelMangerType.Android ||
            channelType == ChannelMangerType.Android_oppo ||
            channelType == ChannelMangerType.Android_mi
        ) {
            return false
        }


        return true
    }


    forcedWEB(qg){
        // ccLog.log("进来的",qg)
        if (qg == true) {
            return true
        }
        return false
    }
    //获取当前渠道
    // ChannelManger.getInstance().getChannel()
    getChannel(): ChannelAllBase {
        let b = this.list[this.channelMangerType].checkChannel();
        if (b) {
            return this.list[this.channelMangerType]
        }  else{
            ChannelManger.getInstance().setChannelType(ChannelMangerType.web)
            return this.list[ChannelMangerType.web]
        }
    }
    //头条录像开始
    // ChannelManger.getInstance().startRecorder()
     startRecorder() {
         let channelType = ChannelManger.getInstance().getChannelType();
         if (channelType == ChannelMangerType.tt) {
             ChannelManger.getInstance().getChannel().startRecorder(null, ()=>{
                 // this.goldNum.string  = data.goldvalueStr
                 // this.gemNum.string  = data.gem
                 // this.gemCard.string  = data.card
                 // let data = {
                 //     gold : MonsterAttr.setting.json.ShareTheGiftBagGold,
                 //     gem : MonsterAttr.setting.json.ShareTheGiftBagGem,
                 //     card : MonsterAttr.setting.json.ShareTheGiftBagCard
                 // }
                 // Emitter.fire("onOpenShareTheGiftBagDialog",null,data,()=>{
                 //
                 // },()=>{
                 //
                 // })
             },()=>{
                 // Emitter.fire('onTipsShow',{txt: "录屏失败"})
                 // console.log("录像 失败")

             });
         }
    }
    //停止录像
    // ChannelManger.getInstance().stopRecorder(true)
     stopRecorder(b) {
        let channelType = ChannelManger.getInstance().getChannelType();
        if (channelType == ChannelMangerType.tt) {
            ChannelManger.getInstance().getChannel().stopRecorder(b);
        }
    }

      shareMessage(successCb, cancelCb){
        let channelType = ChannelManger.getInstance().getChannelType();
        if (channelType == ChannelMangerType.tt) {
            ChannelManger.getInstance().getChannel().shareMessage(successCb, cancelCb);
        }
    }

    start() {

    }

    // update (dt) {}
}
