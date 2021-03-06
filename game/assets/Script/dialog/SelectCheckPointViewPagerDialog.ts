// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import BaseComponent from "../System/Base/BaseComponent";
import BaseDialog from "./BaseDialog";
import Utils from "../System/Utils/Utils";
import UtilsDB from "../System/Utils/UtilsDB";
import UtilsNode from "../System/Utils/UtilsNode";
import {ItemName, ItemPreType} from "../System/Type/enums";
import ChannelSelectCheckPointViewPagerDialog
    from "../channel/channelSelectCheckPointViewPagerDialog";
import GameSetting, {passModeType} from "../System/mode/gameSetting";
import GetNode, {GetNodeType} from "../System/Utils/getNode";

const {ccclass, property} = cc._decorator;

//未解锁
//已解锁未通关
//通关
export enum SelectCheckPointViewPagerType {
    未解锁 = "未解锁",
    已解锁未通关 = "已解锁未通关",
    通关 = "通关",
    已解锁 = "已解锁",

}

@ccclass
export default class SelectCheckPointViewPagerDialog extends BaseDialog {

    // @property(cc.Node)
    // closeButton: cc.Node = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    data = null
    private 关卡条目父节点: cc.Node;
    private 专属渠道: ChannelSelectCheckPointViewPagerDialog;

    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
        //
        // this.closeButton.on(cc.Node.EventType.TOUCH_END,()=>{
        //
        //     this.finshNo()
        // },this)

    }
     onDestroy(): void {
        this.removeEmitter()
         GameSetting.setPassMode(passModeType.恢复)
    }
    removeEmitter(){
        Emitter.remove('onToSelectRole', this.onToSelectRole,this)
    }
    registerEmitter(){
        Emitter.register('onToSelectRole', this.onToSelectRole,this)
    }

    onCreate(data) {
        this.data = data
        // this.scrollViewtest.
    }
    onToSelectRole(selfName,newData){
        ccLog.log("现在的是什么11",newData,this.data)
        // Emitter.fire("onToSelectRole",this.msg)
        // Emitter.fire("onSelectRole",   {type : this.data.type,mapName : newData.name})
        //当前关卡
        let myPassSave = UtilsDB.getMyPassSave()
        ccLog.log("当前关卡数据",myPassSave,"要去的数据",newData)
        if (myPassSave.passName == newData.itemData.itemName) {
            this.finshNo()
            return
        }

        //测试内容
        // UtilsDB.addCheckpointRecords(newData.itemData.passName,SelectCheckPointViewPagerType.已解锁未通关)

        // let pass = JsonManager.getPassByName(newData.itemData.passName)
        // Emitter.fire("onSetPassByName",{pass : pass})
        // Emitter.fire("onNextInPass")

        this.finshNo()
    }



    start () {

    }

    callBackTimeOut(id, data) {
    }

    initCallback(callbacks) {

    }

    listNode : cc.Node [] = []

    async setData(data) {
        this.data = data
        this.initView()
        // GameSetting.setPassMode(passModeType.暂停)
        ccLog.log("设置选关信息 ",data)
        // let passName = data.data.list[0].passName
        // UtilsDB.addCheckpointRecords(passName,SelectCheckPointViewPagerType.已解锁未通关)
        //
        //



        this.setPagerView(0)


        // this.scrollViewtest.setData(data)
        // Emitter.fire("onRemoveAllPages")
        // await Utils.setTimerOnce(this,0.1)
        // await Utils.setTimerOnce(this,0.5)
        // this.scrollViewtest.crollter.ToIndex(11);
        // let pagers = JsonManager.getPassPagers()
        // for (let i = 0; i <pagers.length ; i++) {
        //    let pager = pagers[i]
        //    let item = JsonManager.getPassByPager(pager)
        //    let itemPassPager = JsonManager.getPassPagerByPager(pager)
        //     let itemPager = await UtilsNode.getNodeNoParent(ItemPreType.关卡页);
        //
        //     itemPager.getComponent(ItemPreType.关卡页).setData({
        //      item : item,
        //         itemPassPager : itemPassPager
        //     })
        //     Emitter.fire("onAddPageView",itemPager)
        // }
        // await Utils.setTimerOnce(this,0.1)

        // Emitter.fire("onJumpIndex",data.data.pass.pass.pager)
    }

    async setPagerView(index){

        ccLog.log("原始数据是此时用来设置接下来显示的状态  ",this.data.list[index])





        Emitter.fire("onRemoveAllPages")
      await  Utils.setTimerOnce(this,0.01)


        ccLog.log("切换类型的数组 ","现在类型",index,"切换数组的 所有类型",this.data)

        let arr1to2 = Utils.arr1to2(this.data.list[index],6)
        ccLog.log("切换类型的数组 ","调整之后的",arr1to2)




        for (let i = 0; i < arr1to2.length; i++) {
            let itemPager = await UtilsNode.getNodeNoParent(ItemPreType.商品页布局);

            itemPager.getComponent(ItemPreType.商品页布局).setData({
                list : arr1to2[i],
                itemPassPager : i
            })
            Emitter.fire("onAddPageView",itemPager)
        }
    }



    initView(){
        // let data
        // data = {
        //     type: GetNodeType.纯查找,
        //     otherData: "商店_条目类型0",
        //     parentNode: this.node
        // }
        // this.商店_条目类型0 = GetNode.getNode(data)
        //
        // data = {
        //     type: GetNodeType.纯查找,
        //     otherData: "商店_条目类型1",
        //     parentNode: this.node
        // }
        // this.商店_条目类型1 = GetNode.getNode(data)
        //
        //
        // this.listNode.push(this.商店_条目类型0)
        // this.listNode.push(this.商店_条目类型1)
      // this.专属渠道 = this.getComponent("channelSelectCheckPointViewPagerDialog")
      // this.专属渠道.init(this)

    }
    subclassCall(): any {
        return this
    }

}
