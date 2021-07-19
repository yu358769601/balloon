// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import ccLog from "../Log/ccLog";
import SpecialAdControl from "./SpecialAdControl";
import GameSetting, {gameModeType} from "../mode/gameSetting";
import ChannelManger from "../qudao/channelManger";
import Net from "./Net";

const {ccclass, property} = cc._decorator;
//进入类型


@ccclass
export default class Api  {

    static adCode = 1
    static adCodeTest = 1


    static baseUrl : string = "http://192.168.0.250:10086"


    // Api.getAdControlInfo(callback ?)
    static async getAdControlInfo(callback ?) {

       let data = ChannelManger.getInstance().getMyChannelData()

        if (data != null) {
            let paramData = {
                appid: data.appid,   // 小游戏ID zqkl
                cnid: data.cnid,    //渠道ID tt
                postid: data.postid,  //广告位ID 12d3erkpl5u3d5jai9
                sookie: {} //第一次只传空对象就可了,服务端缓存在客户端的内容，下次请求带过来
            };
            ccLog.log("请求版本控制数据 参数",paramData);
            // console.log(paramData);
            let result = await SpecialAdControl.httpADType('post', paramData);
            ccLog.log("请求版本控制数据 结果",result);

            // data:
            //     code: 3
            //     sookie:
            //     location: {province: "浙江省", city: "温州市", src: "ip", ip: "183.131.181.74"}
            //     uid: "822fc5bd7eb0b886b8"
            // status:
            //     code: "0"
            //     msg: "success"

            // 注：增加参数控制 服务器下发三种状态：code 1 是审核状态；code 2 是上线状态；code 3 是特殊状态
            // 1 审核状态：游戏正常页面展示
            // 2 上线状态：隐藏所有激励视频广告图标
            // 3 特殊状态：在上线状态的情况下（所有激励广告和营销页的激励广告），用户点击返回或者关闭都会播放视频并给予奖励，如果玩家没有播放完视频则不给奖励并且关闭此页面


            if (result) {
                if (callback) {
                    callback(result.data.code)
                    // callback(1)
                    this.adCode = result.data.code
                }
                //游戏模式
                // this.gameMode = result.data.code

            }else{
                if (callback) {
                    callback(1)
                    this.adCode = 1
                }
            }


        }else{
            if (callback) {
                callback(1)
                this.adCode = 1
            }
        }

    }


   static getAdCode() : number{
        if (GameSetting.mode ==gameModeType.测试){
            Api.adCode = Api.adCodeTest
        }
        return Api.adCode
    }



    static async go(data,callback) {

        return  new Promise<any>(async (resolve, reject) => {
            let result = await Net.go(data);
            ccLog.log("网络请求 过程 0 ",result)
            if (result) {
                if (callback) {
                    if (callback.successful) {
                        ccLog.log("网络请求 成功",result)
                        callback.successful(result)
                    }
                }
                ccLog.log("网络请求 过程 1 ",result)
                resolve(result)
            }else{
                if (callback) {
                    if (callback.failure) {
                        ccLog.log("网络请求 失败",result)
                        callback.failure(result)
                    }
                }
                ccLog.log("网络请求 过程 2 ",result)
                resolve(null)

            }


            return result
        })
    }


}
