import Integer = cc.Integer;
import {GameCurrentRound, GameState, MonsterTeam, PrizeType} from "../Type/enums";
import Emitter from "../Msg/Emitter";
import Utils from "./Utils";
import ccLog from "../Log/ccLog";
import LoadManage from "../Load/LoadManage";
import UtilsTime from "./UtilsTime";
import JsonManager from "../manage/JsonManager";

const {ccclass, property} = cc._decorator;

//资源类型
export enum AssetsType {
    钻石 = "钻石",
    放大镜 = "放大镜",
    跳过 = "跳过",
}

@ccclass
export default class UtilsDB extends cc.Component {


    static selectedNode: cc.Node = null

    static skills: any[] = []


    static gameName: string = "balloon_"

    static setJson(key: string, json: {}) {
        if (json == null) {
            cc.sys.localStorage.setItem(this.gameName + key, null);
        } else {
            cc.sys.localStorage.setItem(this.gameName + key, JSON.stringify(json));
        }

    }

    static getJson(key: string) {
        if (cc.sys.localStorage.getItem(this.gameName + key)) {
            let userData = JSON.parse(cc.sys.localStorage.getItem(this.gameName + key));
            return userData
        }
        return null
        // let userData = JSON.parse(cc.sys.localStorage.getItem(key));
        // return userData
        //深拷贝
        // JSON.parse(JSON.stringify(obj))
    }

    //深拷贝
    //UtilsDB.deepCopy(obj)
    static deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    static setStr(key: string, value: string) {
        cc.sys.localStorage.setItem(key, value);
    }

    static getStr(key: string) {
        let userData = cc.sys.localStorage.getItem(key);
        return userData
    }

    static setInt(key: string, value: number) {
        cc.sys.localStorage.setItem(key, String(value));
    }

    static getInt(key: string) {
        return parseInt(cc.sys.localStorage.getItem(key))
    }

    static remove(key: string) {
        cc.sys.localStorage.removeItem(key)
    }


    /**
     * 加钱或者减钱
     * @param gold 增加或者减少
     * @param callbackGold_donthave
     * @param callbackGold_addsucceed
     * @param callbackGold_subsucceed
     */
    // UtilsDB.addGold(gold)
    static addGold(gold: number, callbackGold_donthave, callbackGold_addbefore, callbackGold_addsucceed, callbackGold_subsucceed) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let myGold = player.assets.gold
        if (gold < 0) {
            if (myGold + gold < 0) {
                // 钱不够
                if (callbackGold_donthave) {
                    callbackGold_donthave()
                }
            } else {
                // 扣钱
                if (callbackGold_addbefore) {
                    callbackGold_addbefore()
                    return
                }

                myGold += gold
                player.assets.gold = myGold
                this.setJson("player", player)
                Emitter.fire("onAssetsManagerRefresh")
                //扣钱结束
                if (callbackGold_subsucceed) {
                    callbackGold_subsucceed(myGold)
                }
            }
        } else {
            //加钱结束
            myGold += gold
            player.assets.gold = myGold
            this.setJson("player", player)
            Emitter.fire("onAssetsManagerRefresh")
            if (callbackGold_addsucceed) {
                callbackGold_addsucceed(myGold)
            }
        }

    }


    // UtilsDB.addExp(addExp)
    static addExp(addExp) {
        if (UtilsDB.getPlayer() == null) {
            UtilsDB.initPlayer()
        }
        let player = UtilsDB.getPlayer()

        for (let i = 0; i < player.myMonsterNow.length; i++) {
            let myMonsterNow = player.myMonsterNow[i]
            for (let x = 0; x < player.myMonsterNow.length; x++) {
                if (myMonsterNow.id == player.myMonsterNow[x]) {
                    player.myMonster[i].exp += addExp
                }
            }
        }
        Emitter.fire('onTipsShow', {txt: "目前场上的每个都加了" + addExp + "经验"})
    }

    // UtilsDB.getGem()
    static getGem() {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let myGem = player.assets.gem
        return myGem
    }

    // UtilsDB.getGold()
    static getGold() {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        // cc.log("初始化得钱吗",player)
        let myGold = player.assets.gold
        return myGold
    }

    //UtilsDB.setFastCount()
    static setFastCount(data) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()

        player.assets.fastCount = 5
        this.setJson("player", player)
    }

    //UtilsDB.addFastCount({fastCount : 1})
    static addFastCount(data) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()

        player.assets.fastCount += data.fastCount
        this.setJson("player", player)
    }

    // 设置db
    // UtilsDB.initSetting()
    static initSetting() {
        this.setJson("Setting", {
            sound: true,
            music: true,
        })

    }

    // UtilsDB.getSetting()
    static getSetting() {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        return setting
    }

    //设置声音
    // UtilsDB.setSettingSound(true)
    static setSettingSound(b) {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        setting.sound = b
        this.setJson("Setting", setting)
    }

    // UtilsDB.getSettingSound()
    static getSettingSound() {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        return setting.sound
    }

    // UtilsDB.setSettingMusic(true)
    static setSettingMusic(b) {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        setting.music = b
        this.setJson("Setting", setting)
    }

    // UtilsDB.getSettingMusic()
    static getSettingMusic() {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        return setting.music
    }

    // UtilsDB.getFastCount()
    static getFastCount() {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let fastCount = player.assets.fastCount
        return fastCount
    }

    // UtilsDB.useFastCount(callback_donthave, callback_subsucceed)
    static useFastCount(callback_donthave, callback_subsucceed) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let fastCount = player.assets.fastCount

        if (fastCount <= 0) {
            fastCount = 0
            player.assets.fastCount = fastCount
            this.setJson("player", player)
            if (callback_donthave) {
                callback_donthave()
                return
            }
        } else {
            fastCount = player.assets.fastCount - 1
            player.assets.fastCount = fastCount
            cc.log("快速游戏数据库几个 ", player.assets.fastCount)
            this.setJson("player", player)
            if (callback_subsucceed) {
                callback_subsucceed(player.assets.fastCount)

                return
            }
        }


        // return fastCount
    }


    //离开的时候
    //UtilsDB.initOffLineTime()
    static initOffLineTime() {
        let time = new Date().getTime()
        this.setJson("OffLineTime", {
            timeInterva: 10,
            getGold: 100,
            getGoldMax: 5 * 10000,
            time: time,
        })
    }


    //露面的时候
    //UtilsDB.getOffLineTime()
    static getOffLineTime() {
        let time = new Date().getTime()
        let OffLineTime = this.getJson("OffLineTime")
        if (OffLineTime != null) {
            ccLog.log("进入后台 计算 低保", " 当前时间 ", time, " 之前的时间 ", OffLineTime.time)
            if (time - OffLineTime.time > 1000 * OffLineTime.timeInterva) {
                let times = (time - OffLineTime.time) / OffLineTime.timeInterva / 1000

                ccLog.log("低保 ", "几个计算单位 ", times)
                let gold = times * OffLineTime.getGold
                ccLog.log("低保 ", "原本多少钱 ", gold)
                if (gold <= OffLineTime.getGoldMax) {

                } else {
                    gold = OffLineTime.getGoldMax
                }


                ccLog.log("低保 ", "最后给多少钱 ", Utils.get2Double(gold))
                Emitter.fire('onOffLineDialog', {
                    type: PrizeType.Gold,
                    value: Utils.get2Double(gold),
                    valueStr: Utils.valueparseInt(Utils.get2Double(gold))
                })

                // Emitter.fire('onOpenADDialog',this,{add :gold },this.successfulCallback,this.failureCallback)


                return true
            } else {
                return false
            }
            // this.setJson("OffLineTime", {
            //     time: time,
            // })
        }
        return false
    }

    // static successfulCallback(self,data){
    //     cc.log("领取奖励 正常领取",data);
    //     // self.getPrize()
    //     // let returnData = UtilsDB.updataPlayerMonsterUpLvZhijie(self.data)
    //     // if (returnData != null ) {
    //     //     this.setData(returnData)
    //     //     Emitter.fire('onTipsShow',{txt: "直接升级"})
    //     //
    //     // }
    //     UtilsDB.addGold(data.add*3,null,null,(myGold)=>{
    //         // UtilsDB.setMysteryShopTimeBuyType(this.index)
    //         Emitter.fire('onTipsShow',{txt: "离线收益 "+Utils.valueparseInt(data.add*3)})
    //
    //         // Emitter.fire("onUpDataMysteryShopDialog")
    //     },(myGoldnew)=>{
    //         // cc.log("我们更新的",myGoldnew);
    //         // Emitter.fire('onAddGoldString',myGoldnew)
    //
    //
    //         // Emitter.fire("onUpDataMysteryShopDialog")
    //
    //
    //     })
    //
    // }
    // static failureCallback(self,data){
    //     cc.log("领取奖励 不能领取",data);
    //     Emitter.fire('onTipsShow',{txt: "不看广告没法领取"})
    // }
    //神秘商店 初始化
    //UtilsDB.initMysteryShop()
    static initMysteryShop() {
        let time = new Date().getTime()
        let list = []

        list = this.getRefreshMysteryShop()
        this.setJson("MysteryShop", {
            list: list,
            time: time,
            count: 1,
            // getTime : time+(1000*5)
            getTime: time + (1000 * 5)
        })
    }

    // 获取一个不带时间的随机购买的列表
    static getRefreshMysteryShop() {
        let list = []
        // type 0 金币
        // type 1 精粹
        // type 2 经验

        // 10个	1000-3000经验

        list.push({
            goods: {
                type: PrizeType.Exp,
                count: Utils.random(1000, 3001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 10
            },
            buyType: false
        })


        // 10个	10000-50000金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: Utils.random(10000, 50001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 10
            },
            buyType: false
        })

        // 20个	2000-5000 经验
        list.push({
            goods: {
                type: PrizeType.Exp,
                count: Utils.random(2000, 5001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 20
            },
            buyType: false
        })
        // 20 个	100000-500000 金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: Utils.random(100000, 500001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 20
            },
            buyType: false
        })

        // 40 个	5000-8000 经验
        list.push({
            goods: {
                type: PrizeType.Exp,
                count: Utils.random(5000, 8001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 40
            },
            buyType: false
        })

        // 40 个	1000000-5000000 金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: Utils.random(1000000, 5000001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 40
            },
            buyType: false
        })
        // 60 个	8000-10000 经验
        list.push({
            goods: {
                type: PrizeType.Exp,
                count: Utils.random(8000, 10001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 60
            },
            buyType: false
        })
        // 60 个	10000000-50000000 金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: Utils.random(10000000, 50000001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 60
            },
            buyType: false
        })
        // 80 个	10000 经验
        list.push({
            goods: {
                type: PrizeType.Exp,
                count: 10000
            },
            buy: {
                type: PrizeType.Hp,
                count: 80
            },
            buyType: false
        })
        // 80 个	50000000 金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: 50000000
            },
            buy: {
                type: PrizeType.Hp,
                count: 80
            },
            buyType: false
        })
        let newlist = []
        let newsjsz = Utils.sjsz(3)
        for (let i = 0; i < newsjsz.length; i++) {
            newlist.push(list[newsjsz[i]])
        }
        return newlist
    }

    //买了其中一个之后
    // UtilsDB.setMysteryShopTimeBuyType(index)
    static setMysteryShopTimeBuyType(index) {
        let MysteryShop = this.getJson("MysteryShop")
        MysteryShop.list[index].buyType = true
        this.setJson("MysteryShop", MysteryShop)
    }


    // 获取一个带时间的随机购买的列表
    static refreshMysteryShopTime() {
        let time = new Date().getTime()

        let list = []

        list = this.getRefreshMysteryShop()

        this.setJson("MysteryShop", {
            count: 0,
            list: list,
            time: time,
            // getTime : time+(1000*5)
            getTime: time + (1000 * 5)
        })
    }

    // UtilsDB.getMysteryShop()
    static getMysteryShop() {
        let MysteryShop = this.getJson("MysteryShop")
        if (MysteryShop == null) {
            this.initMysteryShop()
        }
        return this.getJson("MysteryShop")
    }


    // UtilsDB.addMysteryShop({count : 1})
    static addMysteryShop(data) {
        let MysteryShop = this.getJson("MysteryShop")
        if (MysteryShop == null) {
            this.initMysteryShop()
        }
        let list = []
        list = this.getRefreshMysteryShop()
        let time = new Date().getTime()
        MysteryShop.count = MysteryShop.count + data.count
        MysteryShop.list = list
        MysteryShop.time = time
        MysteryShop.getTime = time + (1000 * 5)

        this.setJson("MysteryShop", MysteryShop)
    }

    // UtilsDB.getMysteryShopTime(callbackNow, callbackEnd)
    static getMysteryShopTime(callbackNow, callbackEnd) {
        let MysteryShop = this.getJson("MysteryShop")
        if (MysteryShop == null) {
            this.initMysteryShop()
        }
        let MysteryShopnew = this.getJson("MysteryShop")
        let time = new Date().getTime()
        let newTime = MysteryShopnew.getTime - time
        // cc.log("现在 商店", newTime);
        if (newTime > 0) {
            if (callbackNow) {
                callbackNow(newTime / 1000)
            }
        } else {
            if (callbackEnd) {
                callbackEnd(0)
            }
        }
    }

    static getMysteryShopTimeNoCallBack() {
        let MysteryShop = this.getJson("MysteryShop")
        if (MysteryShop == null) {
            this.initMysteryShop()
        }
        let MysteryShopnew = this.getJson("MysteryShop")
        let time = new Date().getTime()
        let newTime = MysteryShopnew.getTime - time
        // cc.log("现在", newTime);
        if (newTime > 0) {
            return newTime / 1000
        } else {
            return 0
        }
        // return this.getJson("giftBagLuck")
    }


    //初始化神秘礼包时间
    //UtilsDB.initGiftBagLuck()
    static initGiftBagLuck() {

        let time = new Date().getTime()
        this.setJson("giftBagLuck", {
            count: 0,
            time: time,
            getTime: time + (1000 * 5)
            // getTime: time
        })
    }

    // UtilsDB.setGiftBagLuck(data)
    static setGiftBagLuck(data) {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        let time = new Date().getTime()
        giftBagLuck.count = data.count
        giftBagLuck.time = time
        giftBagLuck.getTime = time + (1000 * 5)

        this.setJson("giftBagLuck", giftBagLuck)
    }

    // UtilsDB.addGiftBagLuck(data)
    static addGiftBagLuck(data) {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        let time = new Date().getTime()
        giftBagLuck.count = giftBagLuck.count + data.count
        giftBagLuck.time = time
        giftBagLuck.getTime = time + (1000 * 5)

        this.setJson("giftBagLuck", giftBagLuck)
    }

    // UtilsDB.getGiftBagLuck()
    static getGiftBagLuck() {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        return this.getJson("giftBagLuck")
    }

    // UtilsDB.getGiftBagLuckTime()
    static getGiftBagLuckTime(callbackNow, callbackEnd) {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        let giftBagLucknew = this.getJson("giftBagLuck")
        let time = new Date().getTime()
        let newTime = giftBagLucknew.getTime - time
        // cc.log("现在", newTime);
        if (newTime > 0) {
            if (callbackNow) {
                callbackNow(newTime / 1000)
            }
        } else {
            if (callbackEnd) {
                callbackEnd(0)
            }
        }
    }

    static getGiftBagLuckTimeNoCallBack() {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        let giftBagLucknew = this.getJson("giftBagLuck")
        let time = new Date().getTime()
        let newTime = giftBagLucknew.getTime - time
        ccLog.log("现在", newTime);
        if (newTime > 0) {
            return newTime / 1000
        } else {
            return 0
        }
        // return this.getJson("giftBagLuck")
    }

    //初始化游戏存档
    static initPlayer() {
        this.setJson("player", {
            playerId: 0,

            //资产
            assets: {
                // 金币
                // gold: 1990,
                gold: 10000,
                //钻石
                gem: 100,
                //快速游戏 次数
                fastCount: 5,
                //转盘次数
                luckCount: 5,
            },
            myMonsterIndex: 0,
            //我的怪兽
            myMonster: [
                {
                    id: 0,
                    lv: 1,
                    // exp: 0
                    exp: 0,
                    pic_min: 100,
                    pic_max: 100
                    // lvDB : {}
                },
                {
                    id: 1,
                    lv: 1,
                    exp: 0,
                    pic_min: 100,
                    pic_max: 100
                },
                {
                    id: 2,
                    lv: 1,
                    exp: 0,
                    pic_min: 0,
                    pic_max: 150
                }
            ],
            //等级保护 不存在失败 10级 20级
            myMonsterlvDBMin: [10, 20],
            // 第一次 50% 第二次 10% 第三次 成功
            myMonsterlvChance: [50, 10, 0],


            myMonsterlvDBLv: [
                // {
                //     id : 0,
                //     dbLv : {}
                // },
                // {
                //     id : 1,
                //     dbLv : {}
                // },
                // {
                //     id : 2,
                //     dbLv : {}
                // }
            ],


            otherMonster: [
                // {
                //     id: 9000,
                //     lv: 1,
                //     exp: 0
                // },
                {
                    id: 9001,
                    lv: 1,
                    exp: 0
                },
                {
                    id: 9002,
                    lv: 2,
                    exp: 0
                },
                {
                    id: 9003,
                    lv: 3,
                    exp: 0
                },
                {
                    id: 9004,
                    lv: 4,
                    exp: 0
                },
                {
                    id: 9005,
                    lv: 5,
                    exp: 0
                },
                {
                    id: 9006,
                    lv: 6,
                    exp: 0
                },
                {
                    id: 9007,
                    lv: 7,
                    exp: 0
                },
                {
                    id: 9008,
                    lv: 8,
                    exp: 0
                },
                {
                    id: 9009,
                    lv: 9,
                    exp: 0
                },
                {
                    id: 9010,
                    lv: 10,
                    exp: 0
                },
            ],

            //现在上场的玩家
            myMonsterNow: [
                {
                    id: 0,
                    // //等级
                    lv: 1,
                    // exp : 99999
                },
                // {
                //     id: 1,
                //     // lv: 1,
                //     // exp: 0
                // }
            ],
            //现在上场的对手
            otherMonsterNow: [
                [
                    {
                        id: 9000,
                        lv: 1,
                        // exp : 0
                    },
                    {
                        id: 9001,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9002,
                        // lv : 1,
                        // exp : 0
                    },

                ],
                [
                    {
                        id: 9003,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9004,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9005,
                        // lv : 1,
                        // exp : 0
                    },
                ],
                [
                    {
                        id: 9006,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9007,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9000,
                        // lv : 1,
                        // exp : 0
                    },
                ],

            ],
            //本局回合
            currentRound: 0,
            //游戏总回合
            // currentRoundGame: 1,
            currentRoundGame: 0,

            roundSettlement: {
                exp: 0,
                gold: 0,
                gem: 0
            },
            //在场怪物最多个数
            countMonsterMax: 10,
            //抓壮丁间隔
            countMonsterTime: 20,
            //出龙蛋几率
            egg: 20

        })
    }

    // static setCurrent() {
    //     let player = this.getPlayer();
    //     this.setPlayer(player)
    // }
    /**
     * 加钱或者减钱
     * @param count 增加或者减少
     * @param callback_donthave
     * @param callback_addbefore
     * @param callback_addsucceed
     * @param callback_subsucceed
     */
    // UtilsDB.addLuck(gold)
    static addLuck(count: number, callback_donthave, callback_addbefore, callback_addsucceed, callback_subsucceed) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let luckCount = player.assets.luckCount
        if (count < 0) {
            if (luckCount + count < 0) {
                // 次数不够
                if (callback_donthave) {
                    callback_donthave()
                }
            } else {
                // 扣之前
                if (callback_addbefore) {
                    callback_addbefore()
                    return
                }

                luckCount += count
                player.assets.luckCount = luckCount
                this.setJson("player", player)
                //扣结束
                if (callback_subsucceed) {
                    callback_subsucceed(luckCount)
                }
            }
        } else {
            //加结束
            luckCount += count
            player.assets.luckCount = luckCount
            this.setJson("player", player)
            if (callback_addsucceed) {
                callback_addsucceed(luckCount)
            }
        }

    }

    // UtilsDB.getLuck()
    static getLuck() {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        // cc.log("转盘 获取player ",player)
        let luckCount = player.assets.luckCount

        // cc.log("转盘 获取次数 ",luckCount)
        return luckCount
    }

    static initGame() {
        this.setJson("game", {
            gameState: GameState.RUN
        })
    }

    // UtilsDB.getGame()
    static getGame() {
        if (this.getJson("game") == null) {
            this.initGame()
        }
        return this.getJson("game")
    }

    // UtilsDB.setGame(game)
    static setGame(game) {

        return this.setJson("game", game)
    }

    // UtilsDB.initGameSkill()
    static initGameSkill() {
        this.setJson("gameSkill", {
            list: []
        })
    }

    // UtilsDB.getGameSkill()
    static getGameSkill() {
        if (this.getJson("gameSkill") == null) {
            this.initGameSkill()
        }
        return this.getJson("gameSkill")
    }

    // UtilsDB.setGame(game)
    static setGameSkill(gameSkill) {
        // cc.log("设置了什么", gameSkill)
        return this.setJson("gameSkill", gameSkill)
    }

    //存储 id 对应的技能
    static saveGameSkillByID(id, gameSkill) {

        let skill = UtilsDB.getGameSkill();
        ccLog.log("原本有什么  ", " skill ", skill, "要去设置什么", " gameSkill ", gameSkill)
        for (let i = 0; i < skill.list.length; i++) {
            if (id == skill.list[i].id) {


                skill.list[i] = {
                    id: id,
                    gameSkill: gameSkill
                }
                this.setJson("gameSkill", skill)
                return
            }
        }
        skill.list.push({
            id: id,
            gameSkill: gameSkill
        })


        return this.setJson("gameSkill", skill)
    }

    //获取id 对应的技能
    //
    static getGameSkillByID(id) {

        let skill = UtilsDB.getGameSkill();
        ccLog.log("设置了什么", skill)
        for (let i = 0; i < skill.list.length; i++) {
            if (id == skill.list[i].id) {
                return skill.list[i].gameSkill
            }
        }
        return null
    }

    // UtilsDB.againGame()
    static againGame() {
        // Emitter.fire("onAddNode", index, data)
        // UtilsDB.saveGameSkillByID(UtilsDB.getPlayer().myMonster[UtilsDB.getPlayer().myMonsterIndex].id,temps)
        let gameSkill = UtilsDB.getGameSkillByID(UtilsDB.getPlayer().myMonster[UtilsDB.getPlayer().myMonsterIndex].id)
        // cc.log("保存回显 1", " gameSkill ", gameSkill);
        ccLog.log("切换 更换了数据 gameSkill ", gameSkill)
        if (gameSkill != null) {
            for (let i = 0; i < gameSkill.length; i++) {
                let item = gameSkill[i]
                ccLog.log("保存回显", " index ", i, " item ", item);
                // indexItem : i,
                // item : itemss
                Emitter.fire("onAddNodeInit", item.indexItem, item.item)
            }
        }
    }


    // UtilsDB.setOtherMonsterMaxLv(maxLv)
    static setOtherMonsterMaxLv(maxLv) {
        if (UtilsDB.getPlayer() == null) {
            UtilsDB.initPlayer()
        }
        let player = UtilsDB.getPlayer()
        for (let i = 0; i < player.otherMonster.length; i++) {
            let otherMonster = player.otherMonster[i]
            otherMonster.lv = maxLv
        }
        this.setJson("player", player)
    }

    static initPicture() {
        this.setJson("Picture", {
            list: []
        })
    }

    //图鉴 得到这个name 相关的次数
    //UtilsDB.getPicture(name)
    static getPicture(name) {
        if (this.getJson("Picture") == null) {
            this.initPicture()
        }
        let picture = this.getJson("Picture")
        for (let i = 0; i < picture.list.length; i++) {
            let temp = picture.list[i]
            if (temp.name == name) {
                return temp.count
            }
        }
        //没找到
        // this.setPicture(name)

        return 0
    }

    //图鉴 得到这个name 相关的次数
    //UtilsDB.setPicture(name)
    static setPicture(name) {
        if (this.getJson("Picture") == null) {
            this.initPicture()
        }
        let picture = this.getJson("Picture")
        for (let i = 0; i < picture.list.length; i++) {
            let temp = picture.list[i]
            if (temp.name == name) {

                picture.list[i].count += 1
                this.setJson("Picture", picture)

                return
            }
        }


        let saveData = {
            name: name,
            count: 1
        }
        picture.list.push(saveData)
        this.setJson("Picture", picture)
    }

    // UtilsDB.getPlayer().myMonster
    static getPlayer() {
        if (this.getJson("player") == null) {
            this.initPlayer()
        }
        return this.getJson("player")
    }

    //UtilsDB.setPlayer(player)
    static setPlayer(player) {
        return this.setJson("player", player)
    }

    static removePlayer() {

        this.remove("player")
    }

    //得到未解锁的下一个恐龙碎片数字
    // UtilsDB.getCard()
    static getCard() {
        let player = this.getPlayer()
        let item = -1
        for (let i = 0; i < player.myMonster.length; i++) {
            let monster = player.myMonster[i]
            if (monster.pic_min < monster.pic_max) {
                item = i
                break
            }
        }
        return item
    }

    //根据类型加碎片
    //UtilsDB.setCard(type,count)
    static setCard(type, count) {
        let player = this.getPlayer()
        if (type) {

        }
        let monster = player.myMonster[type]
        if (monster.pic_min < monster.pic_max) {

            if (monster.pic_min + count >= monster.pic_max) {
                monster.pic_min = monster.pic_max
            } else {
                monster.pic_min += count
            }

        }
        return this.setJson("player", player)
    }


    //增加结算经验
    // let data = {
    //     exp : m.attributes.sendOutExp,
    //     gold : m.attributes.sendOutGold
    // }
    // UtilsDB.updatePlayerMonsterRoundSettlement(addexp)
    static updatePlayerMonsterRoundSettlement(addData: any) {
        let player = this.getPlayer();
        if (player != null) {
            if (addData != null) {
                if (addData.exp != null) {
                    player.roundSettlement.exp += addData.exp
                }
                if (addData.gold != null) {
                    player.roundSettlement.gold += addData.gold
                }
                if (addData.gem != null) {
                    player.roundSettlement.gem += addData.gem
                }
                this.setJson("player", player)
            }


        }
    }

    //等级奖励礼包
    // UtilsDB.getUpLvGift(lv)
    static getUpLvGift(lv: number) {
        // 奖励物品	    奖励数量
        let getData = {}
        //
        // Emitter.fire('onOpenGetItemDialog',{
        //     type : PrizeType.Gold,
        //     value : value,
        //     valueStr : Utils.valueparseInt(value)
        // })

        let data = []
        // 10级	少量经验	500
        data.push({
            lv: 10,
            type: PrizeType.Exp,
            value: 500,
            valueStr: Utils.valueparseInt(500)
        })
        // 20级	少量金币	10000
        data.push({
            lv: 20,
            type: PrizeType.Gold,
            value: 10000,
            valueStr: Utils.valueparseInt(10000)
        })
        // 30级	少量灵石	200
        data.push({
            lv: 30,
            type: PrizeType.Hp,
            value: 200,
            valueStr: Utils.valueparseInt(200)
        })
        // 40级	大量经验	2000
        data.push({
            lv: 40,
            type: PrizeType.Exp,
            value: 2000,
            valueStr: Utils.valueparseInt(2000)
        })
        // 50 级	大量金币	5000000
        data.push({
            lv: 50,
            type: PrizeType.Gold,
            value: 5000000,
            valueStr: Utils.valueparseInt(5000000)
        })
        // 60级	大量灵石	300
        data.push({
            lv: 60,
            type: PrizeType.Hp,
            value: 300,
            valueStr: Utils.valueparseInt(300)
        })
        // 70 级	大量经验	300
        data.push({
            lv: 70,
            type: PrizeType.Exp,
            value: 300,
            valueStr: Utils.valueparseInt(300)
        })
        // 80 级	大量金币	50000000
        data.push({
            lv: 80,
            type: PrizeType.Gold,
            value: 50000000,
            valueStr: Utils.valueparseInt(50000000)
        })
        // 90 级	大量灵石	400
        data.push({
            lv: 90,
            type: PrizeType.Hp,
            value: 400,
            valueStr: Utils.valueparseInt(400)
        })
        // 100 级	大量经验	4000
        data.push({
            lv: 100,
            type: PrizeType.Exp,
            value: 4000,
            valueStr: Utils.valueparseInt(4000)
        })
        // 110 级	大量金币	70000000
        data.push({
            lv: 110,
            type: PrizeType.Gold,
            value: 70000000,
            valueStr: Utils.valueparseInt(70000000)
        })
        // 120 级	大量灵石	400
        data.push({
            lv: 120,
            type: PrizeType.Hp,
            value: 400,
            valueStr: Utils.valueparseInt(400)
        })
        // 130 级	大量经验	6000
        data.push({
            lv: 130,
            type: PrizeType.Exp,
            value: 6000,
            valueStr: Utils.valueparseInt(6000)
        })
        // 140 级	大量金币	80000000
        data.push({
            lv: 140,
            type: PrizeType.Gold,
            value: 80000000,
            valueStr: Utils.valueparseInt(80000000)
        })
        // 150 级	大量灵石	400
        data.push({
            lv: 150,
            type: PrizeType.Hp,
            value: 400,
            valueStr: Utils.valueparseInt(400)
        })

        for (let i = 0; i < data.length; i++) {
            if (data[i].lv == lv) {

                return data[i]
            }
        }
        return null


    }

    //增加经验值根据id
    // UtilsDB.updatePlayerMonsterExpUpByID(id,exp,lvUp,succeed,failure,upCallback)
    static updatePlayerMonsterExpUpByID(id, exp, lvUp, succeed, failure, upCallback) {
        let player = this.getPlayer();

        let tag = true

        let myExp = exp
        let newExp = 0
        while (tag) {
            let lvdata = MonsterAttr.getMonsterLvJsonByID(id)
            ccLog.log("增加经验值的数据 ", lvdata)


            for (let i = 0; i < player.myMonster.length; i++) {
                let myMonster = player.myMonster[i]
                if (id == myMonster.id) {
                    let tempExp = myMonster.exp
                    if (tempExp + myExp >= lvdata.monsterLv.needExp) {
                        if (lvdata.deformation != null) {
                            ccLog.log("我现在等级  ", lvdata.monster.lvdata.lv, " 满级是 ", lvdata.monster.maxLv)
                            if (lvdata.monster.lvdata.lv >= lvdata.monster.maxLv) {
                                player.myMonster[i].exp = lvdata.monsterLv.needExp
                                tag = false
                                this.setJson("player", player)
                                if (failure) {
                                    failure()
                                }
                                tag = false
                                return
                            }

                            // Emitter.fire('onOpenDeformationDialog',lvJsonByID)
                            player.myMonster[i].exp = lvdata.monsterLv.needExp
                            ccLog.log("升级的 去进化没办法获得更多经验值了 ", lvdata)
                            tag = false
                            this.setJson("player", player)
                            if (upCallback) {
                                upCallback()
                            }
                            break
                        } else {
                            //每相隔多少级给与奖励
                            // this.getGift("",lvJsonByID)
                            // Emitter.fire('onGetGift',reData)
                        }
                        myExp -= lvdata.monsterLv.needExp
                        ccLog.log("升级的 过程计算  ", "我当前的", myExp, " 减去的 ", lvdata.monsterLv.needExp)
                        //    升级
                        // player.myMonster[i].exp += myExp
                        player.myMonster[i].lv += 1
                        this.setJson("player", player)
                        if (lvUp) {
                            lvUp()
                            ccLog.log("升级的 过程  ", player.myMonster)
                        }
                    } else {
                        // newExp = exp
                        player.myMonster[i].exp += myExp
                        this.setJson("player", player)
                        if (succeed) {
                            succeed()
                            ccLog.log("升级的 结束  ", player.myMonster)
                        }
                        tag = false
                    }

                }
            }
            // this.setJson("player", player)


        }
        // ccLog.log("结果是什么 22 ",222)


    }

    //直接升级
    // UtilsDB.updatePlayerMonsterUpLvByID(id,lv)
    static updatePlayerMonsterUpLvByID(id, lv) {
        let player = this.getPlayer();
        // let lvdata = MonsterAttr.getMonsterLvJsonByID(id)
        player.myMonster[this.getPlayer().myMonsterIndex].exp = 0
        player.myMonster[this.getPlayer().myMonsterIndex].lv += 1
        this.setJson("player", player)
    }

    //减少经验值
    // UtilsDB.updatePlayerMonsterUpLvByID_jian(id,lv)
    static updatePlayerMonsterUpLvByID_jian(id, lv) {
        let player = this.getPlayer();
        // let lvdata = MonsterAttr.getMonsterLvJsonByID(id)
        let exp = player.myMonster[this.getPlayer().myMonsterIndex].exp
        player.myMonster[this.getPlayer().myMonsterIndex].exp -= exp * 0.05
        // player.myMonster[this.getPlayer().myMonsterIndex].lv += 1
        this.setJson("player", player)
    }


    static updatePlayerMonsterExpUp() {
        let player = this.getPlayer();
        if (player != null) {


            let exp = player.roundSettlement.exp / player.myMonsterNow.length


            for (let i = 0; i < player.myMonster.length; i++) {
                let myMonster = player.myMonster[i]
                for (let y = 0; y < player.myMonsterNow.length; y++) {
                    let monsterNow = player.myMonsterNow[y]
                    if (monsterNow.id == myMonster.id) {
                        player.myMonster[i].exp += exp
                    }

                }
            }
            player.currentRound = 0
            player.roundSettlement.exp = 0


            let tempGold = player.roundSettlement.gold
            let tempGem = player.roundSettlement.gem

            player.roundSettlement.gold = 0
            player.roundSettlement.gem = 0
            // cc.log("增加经验之后", player)
            this.setJson("player", player)

            // cc.log("准备加钱和钻石", " 钱 ", tempGold, " 钻石 ", tempGem)
            if (tempGold > 0) {
                Emitter.fire("onAddGold", tempGold)
            }
            if (tempGem > 0) {
                Emitter.fire("onAddGem", tempGem)
            }


        }
    }

    //怪物经验升级
    // UtilsDB.updatePlayerMonsterExpUp(0,addexp,team)
    // static updatePlayerMonsterExpUp(id : number ,addexp : number, team :number){
    //     let player = this.getPlayer();
    //     if (player!=null) {
    //         if (team == MonsterTeam.PLAYER) {
    //             for (let i = 0; i <player.myMonster.length ; i++) {
    //                 if (player.myMonster[i].id == id) {
    //                     player.myMonster[i].exp+=addexp
    //                     this.setJson("player",player)
    //                 }
    //             }
    //         }
    //         if (team == MonsterTeam.MONSTER) {
    //             for (let i = 0; i <player.otherMonster.length ; i++) {
    //                 if (player.otherMonster[i].id == id) {
    //                     player.otherMonster[i].exp+=addexp
    //                     this.setJson("player",player)
    //                 }
    //             }
    //         }
    //     }
    // }
    //UtilsDB.setCurrentRoundZero()
    static setCurrentRoundZero() {
        let player = this.getPlayer();
        player.currentRound = 0
        //增加游戏回合
        player.currentRoundGame += 1
        this.setJson("player", player)

    }

    //UtilsDB.setPlayerMonsterRoundSettlementZero()
    static setPlayerMonsterRoundSettlementZero() {
        let player = this.getPlayer();
        if (player != null) {
            player.roundSettlement.exp = 0
            this.setJson("player", player)
        }
    }


    //UtilsDB.updateCurrentRound()
    static updateCurrentRound() {
        let player = this.getPlayer();
        let data = {}
        if (player != null) {
            if (player.currentRound < player.otherMonsterNow.length - 1) {
                player.currentRound += 1
                this.setJson("player", player)
                data.currentRound = player.currentRound
                data.maxRound = player.otherMonsterNow.length
                data.tag = GameCurrentRound.CURRENTROUNDRUN
                return data
            } else {
                player.currentRound = 0
                player.currentRoundGame += 1
                this.setJson("player", player)
                data.currentRound = player.currentRound
                data.maxRound = player.otherMonsterNow.length
                data.tag = GameCurrentRound.CURRENTROUNDEND
                return data
            }
        }
        return null

    }

    // UtilsDB.getFightingCapacity(data)
    static getFightingCapacity(data) {
        // this.lifeNum.string = data.monster.lvdata.maxLife
        //
        // this.defNum.string = data.monster.lvdata.defense
        //
        // this.trueDamageNum.string = data.monster.lvdata.trueDamage
        //
        // this.attackNum.string = data.monster.lvdata.attack
        //
        // this.throughNum.string = data.monster.lvdata.through
        //
        // // 暴击伤害率=暴击✖0.01
        // // 暴击率=暴击率的数值✖0.001
        //
        // this.critNum.string = parseFloat((data.monster.lvdata.crit*0.01).toFixed(2))+"倍"
        //
        // this.criticalChanceNum.string =parseInt(parseFloat((data.monster.lvdata.criticalChance*0.001).toFixed(2))*100+"") +"%"
        //
        // cc.log("需求 宝石",data.monsterLv.needGold)
        // if (data.monsterLv.needGold == 0) {
        //     this.needGold.active = false
        //     cc.log("需求 金币 应该隐藏",data.monsterLv.needGold)
        // }else{
        //     this.needGold.getComponentInChildren(cc.Label).string = data.monsterLv.needGold
        // }
        // cc.log("需求 金币",data.monsterLv.needGem)
        // if (data.monsterLv.needGem == 0) {
        //     this.needGem.active = false
        //     cc.log("需求 宝石 应该隐藏",data.monsterLv.needGem)
        // }else{
        //     this.needGem.getComponentInChildren(cc.Label).string = data.monsterLv.needGem
        // }

        // 1生命值=1战斗力
        // 1防御力=25战斗力
        // 1攻击力=3.33战斗力
        // 1真实伤害=100战斗力
        // 1穿透=100战斗力
        // 1暴击=100战斗力
        // 1暴击率=100战斗力

        // parseInt(parseFloat((data.monster.lvdata.criticalChance*0.001).toFixed(2))*100+"") +"%"
        let lifeNum = data.monster.lvdata.maxLife * 1
        let defNum = data.monster.lvdata.defense * 25
        let attackNum = parseFloat((data.monster.lvdata.attack * 3.33).toFixed(2))
        let trueDamageNum = data.monster.lvdata.trueDamage * 100
        let throughNum = data.monster.lvdata.through * 100
        let critNum = data.monster.lvdata.crit * 100
        let criticalChanceNum = data.monster.lvdata.criticalChance * 100

        // cc.log("战斗力 ",
        //     " 生命战斗力 ",lifeNum,
        //     " 防御战斗力 ",defNum,
        //     " 攻击战斗力 ",attackNum,
        //     " 真实伤害战斗力 ",trueDamageNum,
        //     "穿透战斗力",throughNum,
        //     "暴击战斗力",critNum,
        //     "暴击率战斗力",criticalChanceNum,
        //
        // )
        let sum = lifeNum + defNum + attackNum + trueDamageNum + throughNum + critNum + criticalChanceNum

        return Math.round(sum)
    }


    //格式化大数
    // UtilsDB.formatNum(num)
    static formatNum(num: number) {
        // num.

    }

    //UtilsDB.valueparseInt(value)
    static valueparseInt(value) {
        if (value >= 1000000000000) {
            //1000000000000 万亿
            value = Math.round(value / 10000000000) / 100 + "T"
        } else if (value >= 1000000000) {
            //1000000000  十亿
            value = Math.round(value / 10000000) / 100 + "B"
        } else if (value >= 1000000) {
            //1000000 百万
            value = Math.round(value / 10000) / 100 + "M"
        } else if (value >= 1000) {
            //1000 千
            value = Math.round(value / 10) / 100 + "K"
        }
        return value;
    }

    //获得格式化 小数点后几位的小数
    //UtilsDB.getFormatByIndex(format,index)
    static getFormatByIndex(format, index) {
        return parseFloat(format + "").toFixed(index);
    }

    // UtilsDB.initRecording()
    static initRecording() {
        this.setJson("Recording", {
            lvData: []
        })
    }

    // UtilsDB.getRecording()
    static getRecording() {
        if (this.getJson("Recording") == null) {
            this.initRecording()
        }

        return this.getJson("Recording")
    }

    // UtilsDB.getRecordingByLv(lv)
    static getRecordingByLv(lv: number) {
        if (this.getJson("Recording") == null) {
            this.initRecording()
        }
        let recording = this.getJson("Recording")
        for (let i = 0; i < recording.lvData.length; i++) {
            if (lv == i) {
                return recording.lvData[i]
            }
        }

        return null
    }

    // UtilsDB.setRecordingByLv(lv,itemrecording)
    static setRecordingByLv(lv, itemrecording) {
        let temp = itemrecording
        if (this.getJson("Recording") == null) {
            this.initRecording()
        }
        let recording = this.getJson("Recording")

        recording.lvData[lv] = temp

        this.setJson("Recording", recording)
    }

    static initRandom() {
        this.setJson("random", {
            //快速战斗的随机值
            // UtilsDB.getRandom().fastGameRandom
            fastGameRandom: {
                // 意思是 范围1 - 10 小于8 的都是满足结果
                min: 0,
                max: 100,
                //这个是当前概率
                pointer: 80
            }
        })
        return this.getJson("random")
    }

    // UtilsDB.getRandom().fastGameRandom
    static getRandom() {
        if (this.getJson("random") == null) {
            this.initRandom()
        }
        return this.getJson("random")
    }

    //UtilsDB.setPlayer(player)
    static setRandom(random) {
        return this.setJson("random", random)
    }

    static removeRandom() {

        this.remove("random")
    }

    //初始化背包
    static initBackPack() {
        this.setJson("backPack", {
            //快速战斗的随机值
            // UtilsDB.getRandom().fastGameRandom
            pic: [
                {
                    id: 1,
                    min: 0,
                    max: 100
                },
                {
                    id: 2,
                    min: 0,
                    max: 150
                }

            ]
        })
        return this.getJson("backPack")
    }

    // UtilsDB.getBackPack()
    static getBackPack() {
        if (this.getJson("random") == null) {
            this.initRandom()
        }
        return this.getJson("backPack")
    }

    //UtilsDB.setBackPack(player)
    static setBackPack(backPack) {
        return this.setJson("backPack", backPack)
    }

    static removeBackPack() {

        this.remove("backPack")
    }

    static initUseRubber() {
        this.setJson("useRubber", {
            //快速战斗的随机值
            // UtilsDB.getRandom().fastGameRandom
            //默认橡皮
            rubber: "mr_1"
        })
        return this.getJson("useRubber")
    }

    // UtilsDB.getUseRubber()
    static getUseRubber() {
        if (this.getJson("useRubber") == null) {
            this.initUseRubber()
        }
        return this.getJson("useRubber")
    }

    // UtilsDB.setUseRubber(rubber)
    static setUseRubber(rubber) {
        let useRubber = UtilsDB.getUseRubber()
        useRubber.rubber = rubber
        this.setJson("useRubber", useRubber)
    }


    //购买的橡皮
    static initMyRubber() {
        this.setJson("myRubber", {
            //快速战斗的随机值
            // UtilsDB.getRandom().fastGameRandom
            //默认橡皮
            list: {"mr_1": 1}
        })
        return this.getJson("myRubber")
    }

    // UtilsDB.getMyRubber()
    static getMyRubber() {
        if (this.getJson("myRubber") == null) {
            this.initMyRubber()
        }
        return this.getJson("myRubber")
    }

    // static getMyRubberByName(){
    //
    // }


    //购买橡皮
    // UtilsDB.addMyRubber(rubber)
    static addMyRubber(rubber) {
        let myRubber = UtilsDB.getMyRubber()
        myRubber.list[rubber] = 1
        this.setJson("myRubber", myRubber)
    }

    //获取购买过每购买过的都有的橡皮
    // UtilsDB.getMyRubberByAllRubber()
    static getMyRubberByAllRubber() {
        let list = JsonManager.getRubbers()
        let myRubber = UtilsDB.getMyRubber()
        let returnList = []

        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let isCheck = false
            for (let o in myRubber.list) {

                // ccLog.log('index:', o, 'value:', myRubber.list[o])

                if (o == item.name) {
                    isCheck = true
                }
            }

            returnList.push({item: item, isCheck: isCheck})

        }


        ccLog.log("什么呢", list)


        return returnList
    }

    // UtilsDB.getMyRubberByAllRubberByList(list)
    static getMyRubberByAllRubberByList(list) {
        let myRubber = UtilsDB.getMyRubber()
        let returnList = []

        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let isCheck = false
            let count = 0
            for (let o in myRubber.list) {

                // ccLog.log('index:', o, 'value:', myRubber.list[o])

                if (o == item.name) {
                    isCheck = true
                    count = 0
                }
            }
            if (item.isPass == false) {
                returnList.push({item: item, isCheck: isCheck})
            } else {
                if (isCheck == true) {
                    returnList.push({item: item, isCheck: isCheck})
                }
            }


        }


        ccLog.log("什么呢", list)


        return returnList
    }


    //获取购买过的橡皮
    // UtilsDB.getMyRubberByBuyRubber()
    static getMyRubberByBuyRubber(): [] {
        let list = JsonManager.getRubbers()
        let myRubber = UtilsDB.getMyRubber()
        let returnList = []

        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let isCheck = false
            for (let o in myRubber.list) {

                // ccLog.log('index:', o, 'value:', myRubber.list[o])

                if (o == item.name) {
                    isCheck = true
                    returnList.push({item: item, isCheck: isCheck})
                }
            }


        }


        ccLog.log("什么呢", list)


        return returnList
    }

    //获取没买过的橡皮
    // UtilsDB.getMyRubberByNotBuyRubber()
    static getMyRubberByNotBuyRubber(): [] {
        let list = JsonManager.getRubbers()
        let myRubber = UtilsDB.getMyRubber()
        let returnList = []

        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let isCheck = false
            let count = 0
            for (let o in myRubber.list) {

                // ccLog.log('index:', o, 'value:', myRubber.list[o])

                if (o == item.name) {
                    count = 1
                }
            }
            if (count == 1) {
                returnList.push({item: item, isCheck: isCheck})
            }


        }


        ccLog.log("什么呢", list)


        return returnList
    }

    //获取没买过的橡皮 排除不是关卡的
    // UtilsDB.getMyRubberByNotBuyRubberNotPass()
    static getMyRubberByNotBuyRubberNotPass(): [] {
        let list = JsonManager.getRubbers()
        let myRubber = UtilsDB.getMyRubber()
        let returnList = []

        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let isCheck = false
            let count = 0
            for (let o in myRubber.list) {

                // ccLog.log('index:', o, 'value:', myRubber.list[o])

                if (o == item.name) {
                    count = 1
                }
            }
            if (count == 0 && item.isPass == false) {
                returnList.push({item: item, isCheck: isCheck})
            }


        }


        ccLog.log("什么呢", list)


        return returnList
    }

    //获取玩家有没有的橡皮限定 关卡赠送
    static getMyRubberByNotBuyRubberPass(): [] {
        let list = JsonManager.getRubbers()
        let myRubber = UtilsDB.getMyRubber()
        let returnList = []

        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let isCheck = false
            let count = 0
            for (let o in myRubber.list) {

                // ccLog.log('index:', o, 'value:', myRubber.list[o])

                if (o == item.name) {
                    count = 1
                }
            }
            if (count == 0 && item.isPass == true) {
                returnList.push({item: item, isCheck: isCheck})
            }


        }


        ccLog.log("什么呢", list)


        return returnList
    }


    // UtilsDB.getMyRubberByName(name)
    static getMyRubberByName(name) {
        let myRubber = UtilsDB.getMyRubber()
        let MyRubber
        for (let o in myRubber.list) {

            // ccLog.log('index:', o, 'value:', myRubber.list[o])

            if (o == name) {
                MyRubber = name
            }
        }


        ccLog.log("什么呢", MyRubber)


        return MyRubber
    }

    //
    //资产
    // assets: {
    //     // 金币
    //     // gold: 1990,
    //     gold: 10000,
    //     //钻石
    //     gem: 100,
    //     //快速游戏 次数
    //     fastCount: 5,
    //     //转盘次数
    //     luckCount: 5,
    // },

    //资产
    // UtilsDB.initAssets()
    static initAssets() {
        this.setJson("assets", {
            // 钻石
            gem: 100,
            //放大镜
            magnifying: 0,
            //跳过
            jump: 0,
        })
        return this.getJson("assets")
    }

    // UtilsDB.getAssets()
    static getAssets() {
        if (this.getJson("assets") == null) {
            this.initAssets()
        }
        let assets = this.getJson("assets")
        if (assets.magnifying == null) {
            assets.magnifying = 0
        }
        if (assets.jump == null) {
            assets.jump = 0
        }
        UtilsDB.setAssets(assets)


        return this.getJson("assets")
    }

    // UtilsDB.addAssets(assets)
    static setAssets(assets) {
        this.setJson("assets", assets)
    }

    /**
     * 加钻石或者减钻石
     // let addGemData = {
        //     self : this,
        //     count : -this.gem,
        //     type : AssetsType.钻石,
        //     callback_donthave : this.callback_donthave,
        // }
     // UtilsDB.checkAssets(addGemData)

     */
    //检查扣钱能不能减少
    static checkAssets(addData) {
        let assets = UtilsDB.getAssets()
        let myAssets
        switch (addData.type) {
            case AssetsType.钻石:
                myAssets = assets.gem
                break;
            case AssetsType.放大镜:
                myAssets = assets.magnifying
                break;
            case AssetsType.跳过:
                myAssets = assets.jump
                break;
            default:
                myAssets = assets.gem
                break

        }
        if (addData.count < 0) {
            if (myAssets + addData.count < 0) {
                // 钱不够
                if (addData.callback_donthave) {
                    addData.callback_donthave(addData)
                }
            }
        }
    }

    /**
     * 加钻石或者减钻石
     // let addGemData = {
        //     self : this,
        //     count : -this.gem,
        //     type : AssetsType.钻石,
        //     callback_donthave : this.callback_donthave,
        //     // callback_addsucceed : this.callback_addsucceed,
        //     callback_subsucceed : this.callback_subsucceed,
        //     callback_meet : this.callback_meet
        // }
     // UtilsDB.addAssets(addGemData)

     */
    // UtilsDB.addAssets(addData)
    static addAssets(addData) {


        ccLog.log("加钱进来的是什么", addData)

        // return
        let assets = UtilsDB.getAssets()
        let myAssets
        switch (addData.type) {
            case AssetsType.钻石:
                myAssets = assets.gem
                break;
            case AssetsType.放大镜:
                myAssets = assets.magnifying
                break;
            case AssetsType.跳过:
                myAssets = assets.jump
                break;
            default:
                myAssets = assets.gem
                break

        }
        if (addData.count < 0) {
            if (myAssets + addData.count < 0) {
                ccLog.log("要去展示不够的", addData)
                // 钱不够
                if (addData.callback_donthave) {
                    addData.callback_donthave(addData)
                }
            } else {
                //仅仅是试探性判断是否满足 判断是否满足不消费
                ccLog.log("我满足减少条件 0 ", myAssets, addData)
                if (addData.callback_meet) {
                    addData.callback_meet(addData)
                    return
                }
                ccLog.log("我满足减少条件 1 ", myAssets, addData)
                myAssets += addData.count
                switch (addData.type) {
                    case AssetsType.钻石:
                        assets.gem = myAssets
                        UtilsDB.setAssets(assets)
                        Emitter.fire("onAssetsRefresh")
                        break;
                    case AssetsType.放大镜:
                        assets.magnifying = myAssets
                        UtilsDB.setAssets(assets)
                        Emitter.fire("onAssetsRefresh")
                        break;
                    case AssetsType.跳过:
                        assets.jump = myAssets
                        UtilsDB.setAssets(assets)
                        Emitter.fire("onAssetsRefresh")
                        break;
                    default:
                        assets.gem = myAssets
                        UtilsDB.setAssets(assets)
                        Emitter.fire("onAssetsRefresh")
                        break

                }

                //扣钱结束
                if (addData.callback_subsucceed) {
                    addData.callback_subsucceed(addData)
                }
            }
        } else {
            //加钱结束
            myAssets += addData.count
            switch (addData.type) {
                case AssetsType.钻石:
                    assets.gem = myAssets
                    UtilsDB.setAssets(assets)
                    Emitter.fire("onAssetsRefresh")
                    break;
                case AssetsType.放大镜:
                    assets.magnifying = myAssets
                    UtilsDB.setAssets(assets)
                    Emitter.fire("onAssetsRefresh")
                    break;
                case AssetsType.跳过:
                    assets.jump = myAssets
                    UtilsDB.setAssets(assets)
                    Emitter.fire("onAssetsRefresh")
                    break;
                default:
                    assets.gem = myAssets
                    UtilsDB.setAssets(assets)
                    Emitter.fire("onAssetsRefresh")
                    break

            }
            if (addData.callback_addsucceed) {
                addData.callback_addsucceed(addData)
            }
        }
    }

    // UtilsDB.initJump()
    static initJump() {
        this.setJson("jump", {
            // 钻石
            jump: 0
        })
        return this.getJson("jump")
    }

    // UtilsDB.getAssets()
    static getJump() {
        if (this.getJson("jump") == null) {
            this.initJump()
        }
        return this.getJson("jump")
    }

    // UtilsDB.addJump(jump)
    static addJump(jump) {
        this.setJson("jump", jump)
    }


    //资产
    // UtilsDB.initSexAD()
    static initSexAD() {
        this.setJson("sexAD", {
            // 看广告次数
            min: 0
        })
        return this.getJson("sexAD")
    }

    // UtilsDB.getSexAD()
    static getSexAD() {
        if (this.getJson("sexAD") == null) {
            this.initSexAD()
        }
        return this.getJson("sexAD")
    }

    // UtilsDB.addSexADMin(data)
    static addSexADMin(data) {
        let sexAD = UtilsDB.getSexAD()
        if (sexAD.min < JsonManager.passSettingjson.lookADSexMax) {
            sexAD.min++
            this.setJson("sexAD", sexAD)

            data.min = UtilsDB.getSexAD().min

            if (data.lookADCallBack) {
                data.lookADCallBack(data)
            }
            if (sexAD.min >= JsonManager.passSettingjson.lookADSexMax) {
                sexAD.min = 0
                this.setJson("sexAD", sexAD)

                data.min = UtilsDB.getSexAD().min
                if (data.lookADEnd) {
                    data.lookADEnd(data)
                }
                return
            }

        }
        if (sexAD.min >= JsonManager.passSettingjson.lookADSexMax) {
            sexAD.min = 0
            this.setJson("sexAD", sexAD)

            data.min = UtilsDB.getSexAD().min
            if (data.lookADEnd) {
                data.lookADEnd(data)
            }
        }
    }

    static setSexAD(sexAD) {
        this.setJson("sexAD", sexAD)
    }


    //当前关卡送的橡皮
    // UtilsDB.initNowPassRubber()
    static initNowPassRubber() {
        this.setJson("nowPassRubber", {
            // 看广告次数
            // {name : ""}
            rubber: {name: "", index: 0},
            // {"mr_1" : 1}
            // list: {}
        })
        return this.getJson("nowPassRubber")
    }

    // UtilsDB.getNowPassRubber()
    static getNowPassRubber() {
        if (this.getJson("nowPassRubber") == null) {
            this.initNowPassRubber()
        }
        return this.getJson("nowPassRubber")
    }

    //设置当前 通关送橡皮
    // UtilsDB.setNowPassRubber(nowPassRubber)
    static setNowPassRubber(nowPassRubber) {
        this.setJson("nowPassRubber", nowPassRubber)
    }


    //获取一个当前关卡的橡皮
    // UtilsDB.getMyNowPassRubber()
    static getMyNowPassRubber() {
        let nowPassRubber = UtilsDB.getNowPassRubber()
        //现在没有当前的橡皮
        if (nowPassRubber.rubber.name == "") {
            let rubberPass = this.getMyRubberByNotBuyRubberPass()
            // nowPassRubber.rubber.name =
            let nowPassRubberIndex = JsonManager.passSettingjson.nowPassRubberIndex
            let nowPassRubberNumMax = JsonManager.passSettingjson.nowPassRubberNumMax
            ccLog.log("我没买过的关卡橡皮", rubberPass)
            // isCheck: false
            // item:
            //     index: 0
            //     isPass: true
            //     name: "sj_1"
            if (rubberPass.length > 0) {

                let list = UtilsDB.getMyRubberByNotBuyRubberPassCheck(rubberPass)
                ccLog.log("排除之后的数据是", list)
                if (list.length > 0) {
                    nowPassRubber.rubber.name = list[0].item.name
                    nowPassRubber.rubber.index = 0
                    UtilsDB.setNowPassRubber(nowPassRubber)
                }

            }

        } else {
            //现在有橡皮有进度

        }
        return UtilsDB.getNowPassRubber()

        // this.setJson("nowPassRubber", nowPassRubber)
    }

    // UtilsDB.setMyNowPassRubber(MyNowPassRubber)
    static setMyNowPassRubber(MyNowPassRubber) {
        let nowPassRubber = UtilsDB.getNowPassRubber()
        //现在没有当前的橡皮
        // if (nowPassRubber.rubber.name == "") {
        //     // let rubberPass = this.getMyRubberByNotBuyRubberPass()
        //     // // nowPassRubber.rubber.name =
        //     // let nowPassRubberIndex = JsonManager.passSettingjson.json.nowPassRubberIndex
        //     // let nowPassRubberNumMax = JsonManager.passSettingjson.json.nowPassRubberNumMax
        //     // ccLog.log("我没买过的关卡橡皮",rubberPass)
        //     // // isCheck: false
        //     // // item:
        //     // //     index: 0
        //     // //     isPass: true
        //     // //     name: "sj_1"
        //     // if (rubberPass.length > 0) {
        //     //     nowPassRubber.rubber.name = rubberPass[0].item.name
        //     //     nowPassRubber.rubber.index = 0
        //     //     UtilsDB.setNowPassRubber(nowPassRubber)
        //     // }
        // }else{
        //     //现在有橡皮有进度
        //     // MyNowPassRubber
        //     // rubber:
        //     //     index: 0
        //     //     name: "sj_1"
        //     // MyNowPassRubber.rubber.index
        //     // nowPassRubber.rubber.name = rubberPass[0].item.name
        //     // nowPassRubber.rubber.index = 0
        //     // UtilsDB.setNowPassRubber(nowPassRubber)
        // }

        // {rubber: {…}, list: {…}}
        // list: {}
        // rubber:
        //     index: 20
        //     name: "sj_1"
        if (MyNowPassRubber.rubber.index >= JsonManager.passSettingjson.nowPassRubberIndexMax) {
            UtilsDB.addMyNotRubber(MyNowPassRubber.rubber.name)
            UtilsDB.initNowPassRubber()
        } else {
            UtilsDB.setNowPassRubber(MyNowPassRubber)
        }
        // this.setJson("nowPassRubber", nowPassRubber)
    }

    //购买的橡皮
    // UtilsDB.initMyNotRubber()
    static initMyNotRubber() {
        this.setJson("myNotRubber", {
            //快速战斗的随机值
            // UtilsDB.getRandom().fastGameRandom
            //默认橡皮
            list: {}
        })
        return this.getJson("myNotRubber")
    }

    // UtilsDB.getMyNotRubber()
    static getMyNotRubber() {
        if (this.getJson("myNotRubber") == null) {
            this.initMyNotRubber()
        }
        return this.getJson("myNotRubber")
    }

    // UtilsDB.addMyNotRubber(rubber)
    static addMyNotRubber(rubber) {
        let myRubber = UtilsDB.getMyNotRubber()
        myRubber.list[rubber] = 1
        this.setJson("myNotRubber", myRubber)
    }

    //获取玩家需要展示的关卡送的橡皮初始点排除出现过的
    static getMyRubberByNotBuyRubberPassCheck(inList): [] {
        let list = inList
        let myRubber = UtilsDB.getMyNotRubber()
        let returnList = []

        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            // let isCheck = false
            let count = 0
            for (let o in myRubber.list) {

                // ccLog.log('开始排除 index:', o, 'value:', myRubber.list[o])
                ccLog.log('开始排除 对比 ', o, 'name:', item.name)
                if (o == item.item.name) {
                    count = 1
                }
            }
            if (count == 0) {
                returnList.push(item)
                ccLog.log('开始排除 index:', item)
            }


        }


        ccLog.log("开始排除 所有的", list)


        return returnList
    }

    //从所有的橡皮里面获取 通过名字
    static getRubberByName(name) {
        let list = JsonManager.getRubbers()
        let MyRubber
        for (let o in list) {

            // ccLog.log('index:', o, 'value:', list[o])
            // index: 19
            // isPass: false
            // name: "eg_10"
            if (list[o].name == name) {
                MyRubber = list[o]
            }
        }


        ccLog.log("什么呢", MyRubber)


        return MyRubber
    }

    //设置关卡进度
    // UtilsDB.initMyPassSave()
    static initMyPassSave() {
        ccLog.log("这里重置了关卡")
        this.setJson("myPassSave", {
            //快速战斗的随机值
            // UtilsDB.getRandom().fastGameRandom
            //默认橡皮
            index: 0,
            passName: ""
        })
        return this.getJson("myPassSave")
    }

    // UtilsDB.getMyPassSave()
    static getMyPassSave() {
        if (this.getJson("myPassSave") == null) {
            this.initMyPassSave()
        }
        return this.getJson("myPassSave")
    }

    // UtilsDB.setMyPassSave(myPassSave)
    static setMyPassSave(myPassSave) {
        ccLog.log("这里重置了关卡 保存", myPassSave)
        this.setJson("myPassSave", myPassSave)
    }

    //玩家是不是新用户 还是老用户
    static initRecordPlayer() {
        this.setJson("recordPlayer", {
            count: 0
        })
        return this.getJson("recordPlayer")
    }

    // UtilsDB.getRecordPlayer()
    static getRecordPlayer() {
        if (this.getJson("recordPlayer") == null) {
            this.initRecordPlayer()
        }
        return this.getJson("recordPlayer")
    }

    // UtilsDB.addRecordPlayer()
    static addRecordPlayer() {
        let recordPlayer = this.getJson("recordPlayer")
        if (recordPlayer == null) {
            this.setJson("recordPlayer", {
                count: 0
            })
        } else {
            recordPlayer.count++
            this.setJson("recordPlayer", recordPlayer)
        }


    }

    //UtilsDB.setBackPack(player)
    static setRecordPlayer(recordPlayer) {
        return this.setJson("recordPlayer", recordPlayer)
    }


    //关卡记录 会记录玩过的关卡的记录
    //未解锁
    //已解锁未通关
    //通关
    //UtilsDB.initCheckpointRecords()
    static initCheckpointRecords() {
        this.setJson("CheckpointRecords", {
            list: {}
        })
        return this.getJson("CheckpointRecords")
    }

    //UtilsDB.removeCheckpointRecords()
    static removeCheckpointRecords() {
        this.setJson("CheckpointRecords", null)
    }

    //第一次开始游戏
    // UtilsDB.getfirstGame()
    static getfirstGame() {
        if (this.getJson("CheckpointRecords") == null) {
            return true
        } else {
            return false
        }
    }

    // UtilsDB.getCheckpointRecords(key)
    // static getCheckpointRecords(key: string) {
    //     if (this.getJson("CheckpointRecords") == null) {
    //         this.initCheckpointRecords()
    //     }
    //
    //     let checkpointRecords = this.getJson("CheckpointRecords")
    //
    //     if (checkpointRecords.list[key] == null) {
    //
    //         checkpointRecords.list[key] = {
    //             type: SelectCheckPointViewPagerType.未解锁,
    //             count: 0
    //         }
    //         this.setJson("CheckpointRecords", checkpointRecords)
    //     }
    //
    //     return this.getJson("CheckpointRecords").list[key]
    // }

    // UtilsDB.addCheckpointRecords(key,type)
    // 不带type 的 是会顺序设置状态 已解锁未通关->通关
    // 带type 强制设置 目前的状态 已解锁未通关 或者 通关 或者 未解锁
    // static addCheckpointRecords(key: string, type ?: string) {
    //     let myType = SelectCheckPointViewPagerType.已解锁未通关
    //     if (type != null) {
    //         myType = type
    //     }
    //     let recordPlayer = this.getJson("CheckpointRecords")
    //     if (recordPlayer == null) {
    //         recordPlayer = this.initCheckpointRecords()
    //     }
    //
    //     let item = recordPlayer.list[key]
    //     if (item == null) {
    //         recordPlayer.list[key] = {
    //             type: myType,
    //             count: 0
    //         }
    //         this.setJson("CheckpointRecords", recordPlayer)
    //     } else {
    //
    //         if (type == null) {
    //
    //             //如果是 已解锁未通关 那就 通关 并设置次数
    //             if (item.type == SelectCheckPointViewPagerType.已解锁未通关 ||
    //                 item.type == SelectCheckPointViewPagerType.未解锁) {
    //                 recordPlayer.list[key] = {
    //                     type: SelectCheckPointViewPagerType.通关,
    //                     count: 1
    //                 }
    //                 this.setJson("CheckpointRecords", recordPlayer)
    //                 //如果是 已解锁未通关 那就 通关 并设置次数
    //             } else if (item.type == SelectCheckPointViewPagerType.通关) {
    //                 recordPlayer.list[key].count++
    //                 this.setJson("CheckpointRecords", recordPlayer)
    //             }
    //         } else {
    //             if (item.type != SelectCheckPointViewPagerType.通关) {
    //                 recordPlayer.list[key] = {
    //                     type: type,
    //                     count: 0
    //                 }
    //                 this.setJson("CheckpointRecords", recordPlayer)
    //             }
    //
    //
    //         }
    //
    //
    //     }
    // }


    // //购买的橡皮
    // // UtilsDB.initMyNotRubber()
    // static initMyNotRubber() {
    //     this.setJson("myNotRubber", {
    //         //快速战斗的随机值
    //         // UtilsDB.getRandom().fastGameRandom
    //         //默认橡皮
    //         list: {}
    //     })
    //     return this.getJson("myNotRubber")
    // }
    // // UtilsDB.getMyNotRubber()
    // static getMyNotRubber() {
    //     if (this.getJson("myNotRubber") == null) {
    //         this.initMyNotRubber()
    //     }
    //     return this.getJson("myNotRubber")
    // }
    // // UtilsDB.addMyNotRubber(rubber)
    // static addMyNotRubber(rubber){
    //     let myRubber = UtilsDB.getMyNotRubber()
    //     myRubber.list[rubber] = 1
    //     this.setJson("myNotRubber", myRubber)
    // }

    // UtilsDB.initJump()
    static initADDialogCD() {
        this.setJson("ADDialogCD", {
            // 钻石
            time: UtilsTime.getTime()
        })
        return this.getJson("ADDialogCD")
    }

    // UtilsDB.isADDialogCD()
    static isADDialogCD(toastCallback, noCallback, okCallback) {
        if (this.getJson("ADDialogCD") == null) {
            this.initADDialogCD()
            if (okCallback) {
                okCallback()
            }
            return
        }
        let sum = UtilsTime.getTime() - this.getJson("ADDialogCD").time
        ccLog.log("相差多少", sum)

        if (sum >= 3000) {
            this.initADDialogCD()
            if (okCallback) {
                okCallback()
            }
            return
        } else if (sum < 3000 && sum >= 2500) {
            this.initADDialogCD()
            if (toastCallback) {
                toastCallback()
            }
            return
        } else if (sum < 2500) {
            if (noCallback) {
                noCallback()
            }
            return
        } else {
            return
        }


    }

    //在线礼包这块
    static initOnlineGiftBag() {
        this.setJson("OnlineGiftBag", {
            //索引
            index: 0,
            time: UtilsTime.setTimeTomorrow()
        })
        return this.getJson("OnlineGiftBag")
    }
// UtilsDB.testOnlineGiftBag()
    static testOnlineGiftBag() {
        this.setJson("OnlineGiftBag", {
            //索引
            index: 0,
            time: 0
        })
        return this.getJson("OnlineGiftBag")
    }

    // UtilsDB.getOnlineGiftBag()
    static getOnlineGiftBag() {
        if (this.getJson("OnlineGiftBag") == null) {
            this.initOnlineGiftBag()
        }
        let  OnlineGiftBag = this.getJson("OnlineGiftBag")

        //过了一天 或者是初始值
        if (UtilsTime.getTime() >OnlineGiftBag.time ) {
            OnlineGiftBag.time = UtilsTime.setTimeTomorrow()
            OnlineGiftBag.index = 0
            UtilsDB.setOnlineGiftBag(OnlineGiftBag)
        }
        return this.getJson("OnlineGiftBag")
    }

    // UtilsDB.setOnlineGiftBag(onlineGiftBag)
    static setOnlineGiftBag(onlineGiftBag) {
        this.setJson("OnlineGiftBag", onlineGiftBag)
    }

    // UtilsDB.checkOnlineGiftBag()
    static checkOnlineGiftBag() {
        let onlineGiftBag = UtilsDB.getOnlineGiftBag();
        if (onlineGiftBag.index != -1){
            return true
        }else{
            return false
        }
    }


    //
    // UtilsDB.addOnlineGiftBag()
    static addOnlineGiftBag() {
        let onlineGiftBag = UtilsDB.getOnlineGiftBag();
        // 如果是明天他应该就是 index == -1 了

        let itemOnlineGiftBagList = JsonManager.passSettingjson.itemOnlineGiftBagList


        //今天没有玩完
        if (onlineGiftBag.index != -1) {
            //今天还可以玩
            if (onlineGiftBag.index + 1 < itemOnlineGiftBagList.length) {
                onlineGiftBag.index++
                this.setJson("OnlineGiftBag", onlineGiftBag)
                return true
            }else{
                //今天不能玩了
                onlineGiftBag.index = -1
                this.setJson("OnlineGiftBag", onlineGiftBag)
                return false
            }
        } else {
            return false
        }
    }


    //开始 初始化次数
    // UtilsDB.initADtimeTips()
    static initADtimeTips() {
        this.setJson("ADtimeTips", {
            //索引
            index: 0,
            indexMax : 3
        })
        return this.getJson("ADtimeTips")
    }
    // UtilsDB.getADtimeTips()
    static getADtimeTips() {
        if (this.getJson("ADtimeTips") == null) {
            this.initADtimeTips()
        }
        return this.getJson("ADtimeTips")
    }
    //增加次数
    // UtilsDB.addADtimeTips()
    static addADtimeTips() {
        let ADtimeTips = UtilsDB.getADtimeTips()
        if (ADtimeTips.index + 1 <=ADtimeTips.indexMax) {
            ADtimeTips.index+=1
            this.setJson("ADtimeTips", ADtimeTips)
            ccLog.log("结算关闭增加次数",ADtimeTips.index)
            return true
        }else{
            return false
        }
    }

    // UtilsDB.isADtimeTips()
    static isADtimeTips() {
        let ADtimeTips = UtilsDB.getADtimeTips()
        if (ADtimeTips.index  <ADtimeTips.indexMax) {
            return true
        }else{
            return false
        }
    }


}