// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import qudaoCommon from "./qudaoCommon";
import platform_Android_oppo from "./platform_Android_oppo";
import platform_Android_mi from "./platform_Android_mi";
import ChannelManger from "./channelManger";
import UtilsDB from "../Utils/UtilsDB";

const {ccclass, property} = cc._decorator;
//埋点类型
export enum maidianType
{
    加载完成的次数 = 1,
    过场动画完成的次数 = 2,
    游戏中观看提示1的次数 = 3,
    游戏中观看提示2的次数 = 4,
    结算页面出现的次数 = 5,
    结算页面出现点击多倍奖励的次数 = 6,
    结算页面出现点击继续的次数 = 7,
    解锁艾美丽剧情的次数 = 8,
    解锁夏聪明剧情的次数 = 9,
    新增玩家点击所有激励广告的次数 = 10,
    活跃玩家点击所有激励广告的次数 = 11,

}

@ccclass
export default class Umengstatistics extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    }

    start() {

    }

    static getLvFortypeId(lv) {
        let typeId = 0
        let typeIdMin = 50
        if (lv >= 2) {

            typeId = typeIdMin + lv
        }


        // //恐龙到达2级的次数
        // dengji2 = 52,
        //     //恐龙到达3级的次数
        //     dengji3 = 53,
        //     //恐龙到达3级的次数
        //     dengji4 = 54,
        //     //恐龙到达2级的次数
        //     dengji5 = 55,
        //     //恐龙到达2级的次数
        //     dengji6 = 56,
        //     //恐龙到达2级的次数
        //     dengji7 = 57,
        //     //恐龙到达2级的次数
        //     dengji8 = 58,
        //     //恐龙到达2级的次数
        //     dengji9 = 59,
        //     //恐龙到达2级的次数
        //     dengji10 = 60,
        //     //恐龙到达2级的次数
        //     dengji11 = 61,
        //     //恐龙到达2级的次数
        //     dengji12 = 62,
        //     //恐龙到达2级的次数
        //     dengji13 = 63,
        //     //恐龙到达2级的次数
        //     dengji14 = 64,
        //     //恐龙到达2级的次数
        //     dengji15 = 65,
        //     //恐龙到达2级的次数
        //     dengji16 = 66,
        //     //恐龙到达2级的次数
        //     dengji17 = 67,
        //     //恐龙到达2级的次数
        //     dengji18 = 68,
        //     //恐龙到达2级的次数
        //     dengji19 = 69,
        //     //恐龙到达2级的次数
        //     dengji20 = 70,
        //     //恐龙到达2级的次数
        //     dengji21 = 71,
        //     //恐龙到达2级的次数
        //     dengji22 = 72,
        //     //恐龙到达2级的次数
        //     dengji23 = 73,
        //     //恐龙到达2级的次数
        //     dengji24 = 74,
        //     //恐龙到达2级的次数
        //     dengji25 = 75,
        //     //恐龙到达2级的次数
        //     dengji26 = 76,
        //     //恐龙到达2级的次数
        //     dengji27 = 77,
        //     //恐龙到达2级的次数
        //     dengji28 = 78,
        //     //恐龙到达2级的次数
        //     dengji29 = 79,
        //     //恐龙到达2级的次数
        //     dengji30 = 80,
        //     //恐龙到达2级的次数
        //     dengji31 = 81,
        //     //恐龙到达2级的次数
        //     dengji32 = 82,
        //     //恐龙到达2级的次数
        //     dengji33 = 83,
        //     //恐龙到达2级的次数
        //     dengji34 = 84,
        //     //恐龙到达2级的次数
        //     dengji35 = 85,
        //     //恐龙到达2级的次数
        //     dengji36 = 86,
        //     //恐龙到达2级的次数
        //     dengji37 = 87,
        //     //恐龙到达2级的次数
        //     dengji38 = 88,
        //     //恐龙到达2级的次数
        //     dengji39 = 89,
        //     //恐龙到达2级的次数
        //     dengji40 = 90,
        //     //恐龙到达2级的次数
        //     dengji41 = 91,
        //     //恐龙到达2级的次数
        //     dengji42 = 92,
        //     //恐龙到达2级的次数
        //     dengji43 = 93,
        //     //恐龙到达2级的次数
        //     dengji44 = 94,
        //     //恐龙到达2级的次数
        //     dengji45 = 95,
        //     //恐龙到达2级的次数
        //     dengji46 = 96,
        //     //恐龙到达2级的次数
        //     dengji47 = 97,
        //     //恐龙到达2级的次数
        //     dengji48 = 98,
        //     //恐龙到达2级的次数
        //     dengji49 = 99,
        //     //恐龙到达2级的次数
        //     dengji50 = 100,
        return typeId
    }

    static getguaiLvFortypeId(lv) {
        let typeId = 0
        let typeIdMin = 50
        if (lv >= 2) {
            // typeId = maidianType.hecheng2
            switch (lv) {
                case 2:
                    typeId = maidianType.hecheng2
                break;
                case 3:
                    typeId = maidianType.hecheng3
                break;
                case 4:
                    typeId = maidianType.hecheng4
                break;
                case 5:
                    typeId = maidianType.hecheng5
                break;
                case 6:
                    typeId = maidianType.hecheng6
                break;
                case 7:
                    typeId = maidianType.hecheng7
                break;
                case 8:
                    typeId = maidianType.hecheng8
                break;
                case 9:
                    typeId = maidianType.hecheng9
                break;
                case 10:
                    typeId = maidianType.hecheng10
                break;

                    // if ( UtilsDB.addGuaiLv(lv)) {
                    //
                    // }  else{
                    //     typeId = null
                    // }
            }

        }


        return typeId
    }



    //正常计数
    // Umengstatistics.setEventForAndroidCount(maidianType.加载进入到游戏主界面的次数)
    static setEventForAndroidCount(typeId) {
        if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
            // ccLog.log("我去调用了吗")
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", typeId);
        }
        // if (qudaoCommon.qudao == platform_Android
        //     || qudaoCommon.qudao == platform_Android_oppo
        //     || qudaoCommon.qudao ==  platform_Android_mi) {
        //     ccLog.log("我去调用了吗")
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", typeId);
        // }

    }
    //等级相关计数
    // Umengstatistics.setEventForAndroidCount(lv)
    static setEventForAndroidCountByLv(lv) {
        if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
            // ccLog.log("我去调用了吗")
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", lvc);
        }
        // if (qudaoCommon.qudao == platform_Android
        //     || qudaoCommon.qudao == platform_Android_oppo
        //     || qudaoCommon.qudao ==  platform_Android_mi) {
        //     let lvc = this.getLvFortypeId(lv)
        //     if (lvc != null) {
        //         jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", lvc);
        //     }
        // }
    }
    // Umengstatistics.setEventForAndroidCountByguaiLv(lv)
    static setEventForAndroidCountByguaiLv(lv) {
        if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
            // ccLog.log("我去调用了吗")
            let lvc = this.getguaiLvFortypeId(lv)
            if (lvc != null) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", lvc);
            }
        }
        // if (qudaoCommon.qudao == platform_Android
        //     || qudaoCommon.qudao == platform_Android_oppo
        //     || qudaoCommon.qudao ==  platform_Android_mi) {
        //     let lvc = this.getguaiLvFortypeId(lv)
        //     if (lvc != null) {
        //         jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", lvc);
        //     }
        // }
    }
    //看广告的时候
    // Umengstatistics.setEventForAndroidCountADByRecordPlayer()
    static setEventForAndroidCountADByRecordPlayer() {
        if (ChannelManger.getInstance().getChannelTypeIsAndroid() == true) {
            let recordPlayer =UtilsDB.getRecordPlayer()
            if (recordPlayer.count > 1) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", maidianType.活跃玩家点击所有激励广告的次数);
            }else if (recordPlayer.count <=1) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", maidianType.新增玩家点击所有激励广告的次数);
            }
        }
        // if (qudaoCommon.qudao == platform_Android
        //     || qudaoCommon.qudao == platform_Android_oppo
        //     || qudaoCommon.qudao ==  platform_Android_mi) {
        //     let recordPlayer =UtilsDB.getRecordPlayer()
        //     if (recordPlayer.count > 1) {
        //         jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", maidianType.活跃玩家点击所有激励广告的次数);
        //     }else if (recordPlayer.count <=1) {
        //         jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameMainActivity", "setEvent", "(Ljava/lang/String;)V", maidianType.新增玩家点击所有激励广告的次数);
        //     }
        // }
    }

    // update (dt) {}
}
