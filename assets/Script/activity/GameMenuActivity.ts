// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Activity from "../System/Ui/Activity";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import Utils from "../System/Utils/Utils";
import UtilsNode from "../System/Utils/UtilsNode";
import UtilsDB from "../System/Utils/UtilsDB";
import LoadManage from "../System/Load/LoadManage";
import JsonManager from "../System/manage/JsonManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMenuActivity extends Activity {


    passRoot : cc.Node

    currentNode : cc.Node = null
    private 菜单_功能:  cc.Node = null
    private 菜单_功能UI: cc.Node = null
    private 菜单_关闭功能UI:cc.Node = null

    private 菜单_关卡输入名字: cc.EditBox  = null

    private 菜单_网络地址: cc.EditBox  = null

    private 菜单_制作 :cc.Node = null
    private 菜单_游玩:cc.Node = null

    private 菜单_测试设置:cc.Node = null

   async onCreate(data: any) {
        ccLog.log("执行顺序 ","onCreate",data)

        this.initView()

       this.initOnClick()


       // let pass = JsonManager.getPassByIndex(UtilsDB.getMyPassSave().index)
       // ccLog.log("什么数据呢", pass)
       // let passData = JsonManager.getPassDataByName(pass.passName)
       //
       //  await this.onSetPassByName("",passData)
    }






    private initView() {

        let  data
        data = {
            type: GetNodeType.纯查找,
            otherData: "关卡总结点",
            parentNode: this.node,
        }
        this.passRoot = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_功能",
            parentNode: this.node,
        }
        this.菜单_功能 = GetNode.getNode(data)

        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "菜单_功能UI",
            parentNode: this.node,
        }
        this.菜单_功能UI = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_关闭功能UI",
            parentNode: this.node,
        }
        this.菜单_关闭功能UI = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_输入名字",
            parentNode: this.node,
        }
        this.菜单_关卡输入名字 = GetNode.getNode(data).getComponent(cc.EditBox)

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_网络地址",
            parentNode: this.node,
        }
        this.菜单_网络地址 = GetNode.getNode(data).getComponent(cc.EditBox)

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_制作",
            parentNode: this.node,
        }
        this.菜单_制作 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_游玩",
            parentNode: this.node,
        }
        this.菜单_游玩 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "菜单_测试设置",
            parentNode: this.node,
        }
        this.菜单_测试设置 = GetNode.getNode(data)

    }


    initOnClick(){

        this.菜单_功能.on(cc.Node.EventType.TOUCH_END,()=>{
            this.菜单_功能UI.active = true
        },this)
        this.菜单_关闭功能UI.on(cc.Node.EventType.TOUCH_END,()=>{
            this.菜单_功能UI.active = false
        },this)

        this.菜单_制作.on(cc.Node.EventType.TOUCH_END,async()=>{
           let passName =  this.菜单_关卡输入名字.string
            ccLog.log("输入的名字关卡 制作",passName)
            let passData = JsonManager.getPassDataByName(passName)
            await this.onSetEditPassByName("",passData)
        },this)


        this.菜单_游玩.on(cc.Node.EventType.TOUCH_END,async ()=>{
            let passName =  this.菜单_关卡输入名字.string
            ccLog.log("输入的名字关卡 游玩",passName)

            ccLog.log("什么数据呢", passName)
            let passData = JsonManager.getPassDataByName(passName)

             await this.onSetPassByName("",passData)
        },this)


        this.菜单_测试设置.on(cc.Node.EventType.TOUCH_END,async ()=>{
            let urlName =  this.菜单_网络地址.string

            ccLog.log("测试和设置网络", urlName)

        },this)




    }


    // LIFE-CYCLE CALLBACKS:

    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onEndNodeShow', this.onEndNodeShow,this)
        Emitter.remove('onSetPassByName', this.onSetPassByName,this)
        Emitter.remove('onSetEditPassByName', this.onSetEditPassByName,this)
    }
    registerEmitter(){
        Emitter.register('onEndNodeShow', this.onEndNodeShow,this)
        Emitter.register('onSetPassByName', this.onSetPassByName,this)
        Emitter.register('onSetEditPassByName', this.onSetEditPassByName,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
        ccLog.log("执行顺序 ","onLoad")



    }
    //设置关卡通过名字
    // Emitter.fire("onSetPassByName",data)
    async onSetPassByName(selfName,data){
        ccLog.log("当前设置关卡 本关所有内容",data)
        if (data !=null) {
            if (this.currentNode != null) {
                this.currentNode.destroy()
                await Utils.setTimerOnce(this,0.05)
            }
            this.currentNode = await UtilsNode.getNode("pass",this.passRoot)
            // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
            ccLog.log("有东西么",this.currentNode)
            this.currentNode.getComponent("basePass").setData(data)
            // Emitter.fire("onInitTipsBtn", data)
            Emitter.fire("onInitPass", data)



            //多少关之后走这个弹出提示的部分
            // if (data.pass.index >= JsonManager.passSettingjson.json.passADTipsTimeIndex) {
            //     Emitter.fire("onPassADTipsTimeStart",true)
            //     Emitter.fire("onPassADTipsTime")
            // }

            // pass:
            //     gameData: {title: "帮他取得游戏机"}
            //     index: 0
            //     itemName: "pass_101"
            //     passName: "pass_101"
            //     tip: "pass_101_tip"

            // let myPassSave = UtilsDB.getMyPassSave()
            // myPassSave.index =data.pass.index
            // let passName = data.pass.passName
            //
            // myPassSave.index =data.pass.index
            // myPassSave.passName =data.pass.passName
            // UtilsDB.setMyPassSave(myPassSave)

            // this.loadPass(data.pass.index)
            // UtilsDB.addCheckpointRecords(passName,SelectCheckPointType.已解锁未通关)
        }else{
            ccLog.log("没了")
            // let index = 0
            // let pass = JsonManager.getPassByIndex(index)
            // Emitter.fire("onSetPassByName", {pass: pass})
        }



        // onGetGameMenuActivity
    }
    //设置关卡通过名字
    // Emitter.fire("onSetPassByName",data)
    async onSetEditPassByName(selfName,data){
        ccLog.log("当前设置关卡 本关所有内容",data)

        if (this.currentNode != null) {
            this.currentNode.destroy()
            await Utils.setTimerOnce(this,0.05)
        }
        this.currentNode = await UtilsNode.getNode("passEditor",this.passRoot)
        // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
        ccLog.log("有东西么",this.currentNode)
        this.currentNode.getComponent("basePass").setData(data)



        // onGetGameMenuActivity
    }

    async loadPass(index){
        ccLog.log("现在都预加载什么了 前面",index)
        let list = JsonManager.getPasslistsByAfterIndex(index,3)
        ccLog.log("现在都预加载什么了",list)
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                await LoadManage.starLoadByName(list[i].passName,{
                    schedule : (name)=>{
                        // cc.log("回调进度",currentCount,"/",count);
                        // this.loadbar.progress = currentCount/count

                    },
                    scheduleEnd : ()=>{

                    },
                });
            }
            // for (let i = 0; i < pass.length; i++) {
            //     await LoadManage.starLoadByName(this.initPass(  pass[i]),{
            //         schedule : (currentCount,count)=>{
            //             // cc.log("回调进度",currentCount,"/",count);
            //             // this.loadbar.progress = currentCount/count
            //
            //         },
            //         itemCallback : ()=>{
            //
            //         },
            //         scheduleEnd : ()=>{
            //
            //         },
            //     });
            // }

        }


    }


    onEndNodeShow(selfName,data) {

        ccLog.log("进来的数据是",data)

        if (data.index1 != null) {
            //让本次的 下面的棍子亮起来
            let newData = {
                index1: data.index1,
                index2: data.index2,
                component: "itemLineBG",
                parentNode: this.node
            }
            let tempItem = GetNode.getNodeByComponent(newData).getComponent("itemLineBG")


            Emitter.fire("onAddGroup",- tempItem.group)
            // showNode
            ccLog.log("现在的有没有这个  tempItem ", tempItem)
            tempItem.showNode()
        }

    }


    start () {




    }

    // update (dt) {}
}
