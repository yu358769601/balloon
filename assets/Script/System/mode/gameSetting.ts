import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;


export enum gameModeType {
    测试 = 0,
    正式 = 1,
}

export enum passModeType {
    正常 = 0,
    结束 = 1,
    暂停 = 2,
    恢复 = 3,
}

@ccclass
/**
 * 事件
 */
export default class GameSetting {

    //游戏模式 GameSetting.mode
    static mode :number = gameModeType.正式

    static passMode :number = passModeType.正常
    //过关中
    static passModeEnd :boolean = false

    // GameSetting.setPassMode(passModeType.正常)
    static setPassMode(passMode){
        ccLog.log("本次设置结果是 0",this.passMode ,"要设置的",passMode ,"小提示 ","正常 = 0","结束 = 1","暂停 = 2","恢复 = 3" )
        if (passMode == passModeType.恢复 && this.passMode==passModeType.暂停 ) {
            this.passMode =  passModeType.正常
        }else if (passMode == passModeType.正常 && this.passMode==passModeType.结束) {
            this.passMode =  passMode
        }else if (passMode == passModeType.暂停 && this.passMode==passModeType.正常) {
            this.passMode =  passMode
        }else if (passMode == passModeType.恢复 ) {
            this.passMode =  passModeType.正常
        }
        else {
            this.passMode = passMode
        }




        // 正常 = 0,
        //     结束 = 1,
        //     暂停 = 2,
        //     恢复 = 3,
        ccLog.log("本次设置结果是 1 ",this.passMode  ,"小提示 ","正常 = 0","结束 = 1","暂停 = 2","恢复 = 3" )
    }
// GameSetting.setPassModeEnd(b)
    static setPassModeEnd(b){
        this.passModeEnd = b
    }
    // GameSetting.getPassModeEnd()
    static getPassModeEnd(){
      return   this.passModeEnd
    }


    // GameSetting.getPassMode()
    static getPassMode(){
        return this.passMode
    }

    // GameSetting.isPassModeByRun()
    static isPassModeByRun(){
        return this.passMode == passModeType.正常
    }

}