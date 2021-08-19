// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsDB from "../Utils/UtilsDB";
import Utils from "../Utils/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class  BaseComponent extends cc.Component {

    timeOutTask : {} = {}

    timeID : number = -1

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    startTime(id,time,data){

        this.timeOutTask[id] = {
            time : Utils.getTime()+time,
            data : data
        }

        // this.timeOutTask[id] =
        //     Utils.getTime()+time
    }

    public setTimer(d){

         if (this.timeID != -1) {
             clearTimeout(this.timeID)
         }

        return new Promise <any>((resolve, reject) => {
           this.timeID =  setTimeout(()=>{
                resolve()
            },d)

        })

    }
    public setTimerOnce(d){


        return new Promise <any>((resolve, reject) => {
            this.scheduleOnce(()=>{
                resolve()
            },d)
        })
    }


    abstract callBackTimeOut(id,data)
    // callBackTimeOut(id){
    //     cc.log("现在id 为",id," 的 计时器到期了")
    // }

    readyCallBackTimeOut(){
        let time = Utils.getTime()
        for (let key in this.timeOutTask) {
            // cc.log("现在id 为",key," 的 计时器准备")
            if (this.timeOutTask[key]) {
                if (time>=this.timeOutTask[key].time) {
                    this.callBackTimeOut(key,this.timeOutTask[key].data)
                    delete this.timeOutTask[key]
                    return
                }
            }
            // cc.log('index:', key, 'value:', this.timeOutTask[key])
        }
    }
    start () {

    }

    update (dt) {
        this.readyCallBackTimeOut()
    }
}
