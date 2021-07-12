// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import LoadManage from "../Load/LoadManage";
import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;

//获取json控制类
@ccclass
export default class JsonManager extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    //关卡json
    static passjson: cc.JsonAsset = null
    //关卡奖励部分
    static passSettingjson: cc.JsonAsset = null
    static rubberjson: cc.JsonAsset = null
    static passpager: cc.JsonAsset = null
    static passGameOver: cc.JsonAsset = null
    static passData: cc.JsonAsset = null
    onLoad () {}

    start () {

    }
    //JsonManager.initJson()
    static async initJson() {
        // JsonManager.talkList.json
        this.passjson = await LoadManage.getJsonForName("passjson");
        this.passSettingjson = await LoadManage.getJsonForName("passSettingjson");
        this.passData = await LoadManage.getJsonForName("passData");
        // this.rubberjson = await LoadManage.getJsonForName("rubberjson");
        // this.passpager = await LoadManage.getJsonForName("passpager");
        // this.passGameOver = await LoadManage.getJsonForName("passGameOver");


        ccLog.log("有沒有",this.rubberjson)
        // this.setting = await LoadManage.getJsonForName("setting");
        // ccLog.log("返回来的是什么 setting", this.setting)
    }
    //根据 关卡名字找到是不是要显示 特殊标题 和 图片
    //JsonManager.getPassGameOverDataByPassName(passName)
    static  getPassGameOverDataByPassName(passName ){
        if (this.passGameOver.json.list.length > 0) {
            for (let i = 0; i <this.passGameOver.json.list.length ; i++) {
                let item = this.passGameOver.json.list[i]
                if (item.passName == passName) {
                    return item
                }
            }
        }

        return  null
    }


    //获得所有关卡列表
    // JsonManager.getPasslists()
    static getPasslists(){
        // for (let i = 0; i < this.pass.json.list.length; i++) {
        //     let item = this.pass.json.list[i]
        //     if (item.passName == passName) {
        //         return item
        //     }
        // }
        let list = []
        if (this.passjson.json.list.length > 0) {
            for (let i = 0; i <this.passjson.json.list.length ; i++) {
               let item = this.passjson.json.list[i]
                item.index = i+1
                list.push(item)
            }
        }

        return list
    }
    static getPassDatalists(){
        // for (let i = 0; i < this.pass.json.list.length; i++) {
        //     let item = this.pass.json.list[i]
        //     if (item.passName == passName) {
        //         return item
        //     }
        // }
        let list = []
        if (this.passData.json.list.length > 0) {
            for (let i = 0; i <this.passData.json.list.length ; i++) {
                let item = this.passData.json.list[i]
                // item.index = i+1
                list.push(item)
            }
        }

        return list
    }



    static getPassPagerlists(){
        // for (let i = 0; i < this.pass.json.list.length; i++) {
        //     let item = this.pass.json.list[i]
        //     if (item.passName == passName) {
        //         return item
        //     }
        // }

        if (this.passpager.json.list.length > 0) {
            return this.passpager.json.list
        }

        return null
    }


    //获取 这个数之后 max 数的 数组数组内容
    // JsonManager.getPasslistsByAfterIndex(index,max)
    static getPasslistsByAfterIndex(index,max){
        let list = []
        for (let i = index+1; i < index+max; i++) {
            let item = JsonManager.getPassByIndex(i)
            if (item) {
                list.push(item)
            }
        }
        return list
    }

    //获取关卡通过名字
    // JsonManager.getPassByName(passName)
    static getPassByName(passName){
        let list = JsonManager.getPasslists()
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            if (item.passName == passName) {
                // item.index = i
                return item
            }
        }
        return null
    }

    //获取关卡数据通过名字
    // JsonManager.getPassDataByName(passName)
    static getPassDataByName(passName){
        let list = JsonManager.getPassDatalists()
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            if (item.passName == passName) {
                // item.index = i
                return item
            }
        }
        return null
    }



    //获取关卡通过页号
    // JsonManager.getPassByPager(pager)
    static getPassByPager(pager){
        let newlist = []
        let list = JsonManager.getPasslists()
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            if (item.pager == pager) {
                newlist.push(item)
            }
        }
        return newlist
    }
    //根据页号 把相关页号得数据带回去
    static getPassPagerByPager(pager){
        let list = []
        for (let i = 0; i < this.passpager.json.list.length; i++) {
            let item = this.passpager.json.list[i]
            if (item.pager == pager) {
                return item
            }
        }
        return null
    }
    // //获取当前关卡是否玩过
    // static getPassCurrentIsPass(passName) {
    //     let passItem
    //     // cc.log("不是最好的吗",passName)
    //     passItem = JsonManager.getPassByName(passName)
    //     let list = JsonManager.getPasslists()
    //
    //     let startI = 0
    //     for (let i = 0; i < list.length; i++) {
    //         let item = list[i]
    //         if (item.passName == passName) {
    //             // item.index = i
    //             startI = i
    //         }
    //     }
    // }


    //获取 当前这个名字的关卡和下一个章节的关卡相距多少关
    // JsonManager.getPassChapterByPassName(passName)
    static getPassChapterByPassName(passName){
        let passItem
        // cc.log("不是最好的吗",passName)
        passItem =  JsonManager.getPassByName(passName)
        let list = JsonManager.getPasslists()

        let startI = 0
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            if (item.passName == passName) {
                // item.index = i
                startI = i
            }
        }

        ccLog.log("不是最好的吗 0",passItem)

        let passCount = 0
        let pagerData = JsonManager.getPassPagerByPager(0)
        for (let i = startI; i < list.length; i++) {
            let item = list[i]
            if (item.pager == passItem.pager) {
                // item.index = i
                passCount++
            }else{
                ccLog.log("不是最好的吗 1",item)
                pagerData = JsonManager.getPassPagerByPager(item.pager)
                ccLog.log("不是最好的吗 2",pagerData)
                break
            }
        }
        let data = {
            count : passCount,
            pagerData : pagerData,
        }


        return data
    }

    //获取关卡一共有多少页
    // JsonManager.getPassPagers()
    static getPassPagers(){
        let list = []
        for (let i = 0; i < this.passjson.json.list.length; i++) {
            let item = this.passjson.json.list[i]
            if (item.pager != null) {
                list.push(item.pager)
            }
        }
        //去重
         list = this.unique(list)
        //升序
        list = list.sort(this.sortUp)
        return list
    }
    static sortUp(a,b){
        return a-b;
    }

    static unique(arr){
        //Set数据结构，它类似于数组，其成员的值都是唯一的
        return Array.from(new Set(arr)); // 利用Array.from将Set结构转换成数组
    }
    //获取关卡通过索引
    // JsonManager.getPassByIndex(index)
    static getPassByIndex(index){
        let list = JsonManager.getPasslists()

        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            if (item.index == index) {
                return item
            }
        }
        return list[0]
    }
    //JsonManager.getTalkListItem(name)
    static getTalkListItem(name){
        ccLog.log("有嗎",JsonManager.talkList.json,"名字",name)
        for (let i = 0; i < JsonManager.talkList.json.list.length; i++) {
           let item = JsonManager.talkList.json.list[i]
            if (item.itemAddComponent == name) {
                return item
            }
        }

        return null
    }
    //获取那个类型的橡皮
    //JsonManager.getRubbersByType(type)
    static getRubbersByType(type){
        // ccLog.log("有嗎",JsonManager.rubber.json,"名字",name)
        let list = []
        for (let i = 0; i < JsonManager.rubberjson.json.list.length; i++) {
           let item = JsonManager.rubberjson.json.list[i]
            if (item.type == type) {
              list.push(item)
            }
        }

        return list
    }
    //获取所有的橡皮
    // JsonManager.getRubbers()
    static getRubbers(){
        // ccLog.log("有嗎",JsonManager.rubber.json,"名字",name)
        let list = []
        for (let i = 0; i < JsonManager.rubberjson.json.list.length; i++) {
            let item = JsonManager.rubberjson.json.list[i]
                list.push(item)
        }

        return list
    }


    //拆解关卡数据  锚点
    static getPassDatas(data){
        // ccLog.log("有嗎",JsonManager.rubber.json,"名字",name)
        let list = []



        return list
    }


    // update (dt) {}
}
