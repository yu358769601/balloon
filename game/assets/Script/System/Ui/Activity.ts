// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import View from "./View";
import Direction = cc.PageView.Direction;
import ViewStack from "../Stack/ViewStack";
import {ActivityType} from "../Type/enums";
import UIActivity from "./UIActivity";
import ActivityStack from "../Stack/ActivityStack";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class Activity extends View {
    @property({type: cc.Enum(ActivityType)})    // call cc.Enum
   public activityType = ActivityType.activity;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    abstract onCreate(data)
        // cc.log("创建的时候调用的",this.node.name,"前个页面 数据",data)


    start () {

    }

    /**
     * 打开一个Activity
     * @param activityName  名字
     * @param data          数据
     */
    public startActivity(activityName,data){
        UIActivity.startToActivity(activityName,data)
    }


    //关闭的时候主动调用
    public  finsh(){
        UIActivity.finsh()
    }
    // update (dt) {}
}
