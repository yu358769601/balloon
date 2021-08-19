// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import ActivityPool from "./ActivityPool";
import Activity from "./Activity";
import ActivityStack from "../Stack/ActivityStack";
import {ActivityType} from "../Type/enums";
import LoadManage from "../Load/LoadManage";
import ccLog from "../Log/ccLog";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIActivity {
    static activityPool: ActivityPool = new ActivityPool()
    static ActivityRoot: cc.Node;
    static Design: cc.Node;

    //在最开始 初始化 传入一个 根 activityRoot节点 以后都创建在这个上面
    static initView(ActivityRoot : cc.Node) {
        this.ActivityRoot = ActivityRoot
    }
    static getPool():any{
        return this.activityPool
    }
    static finsh(){

        let activity = ActivityStack.pop()
        if (ActivityStack.stack.peek()) {
            ActivityStack.stack.peek().active = true
            ccLog.log("activity 上一个 显示了")
        }
        activity.node.removeFromParent()
        ActivityStack.remove(activity.node.name)
        activity.node.destroy()
     // this.activityPool.take(GameMain.activityPres[2])
    }


    //打开 acitity
    //UIActivity.startToActivity(GameMain.activityPres[2])
    static async startToActivity(activityName: string,viewData : any) {
        // cc.log("真的没有?2",LoadManage._loadResNamePath)
        let nameActivity = ActivityStack.find(activityName)
        if (nameActivity == null) {
            let pre = await LoadManage.initLoadForName(activityName);

            // cc.log("我猜没有",pre )
            if (pre != null) {
                let node = cc.instantiate(pre)
                // this.activityPool.put(path,node.13getComponent(Activity))
                // cc.log("我猜没有1",node )
                nameActivity = node.getComponent(Activity)

                //如果现在打开的类型是 activity 那么 就让上一个 隐藏返回什么11
                ccLog.log("activity 数量",ActivityStack.stack.count )
                if (ActivityStack.stack.count >= 1) {
                    if (nameActivity.activityType ==ActivityType.activity ) {
                        if (ActivityStack.stack.peek()) {
                            ActivityStack.stack.peek().active = false
                            ccLog.log("activity 上一个 隐藏了")
                        }
                    }
                }


                ActivityStack.push(node.getComponent(Activity))
                this.ActivityRoot.addChild(node)


            }
        }else{
            //如果现在打开的类型是 activity 那么 就让上一个 隐藏
            if (ActivityStack.stack.count >= 1) {
                if (nameActivity.activityType ==ActivityType.activity ) {
                    if (ActivityStack.stack.peek()) {
                        ActivityStack.stack.peek().active = false
                    }
                }
            }
            this.ActivityRoot.addChild(nameActivity.node)


        }

        // cc.log("这个是什么1111",nameActivity)

        ccLog.log("这个是什么 ",viewData)
        nameActivity.node.active = true
        if (viewData !=null ) {
            nameActivity.onCreate(JSON.parse(JSON.stringify(viewData)))
        }else{
            nameActivity.onCreate()
        }


    }

    // update (dt) {}
}
