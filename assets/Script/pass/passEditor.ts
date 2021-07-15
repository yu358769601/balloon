// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BasePass from "./basePass";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import {DialogType, ItemPreType} from "../System/Type/enums";
import UtilsNode from "../System/Utils/UtilsNode";
import JsonManager from "../System/manage/JsonManager";
import DrawLine from "../System/Utils/drawLine";
import ItemMaterialBtn from "../item/itemMaterialBtn";
import Vec2 = cc.Vec2;
import Tools from "../System/Utils/Tools";

const {ccclass, property} = cc._decorator;

enum PassEnum {
    关卡 = "pass"

}

// enum PassItemEnum {
//     点= "itemPoint",
//     线= "itemLineBG",
//     钥匙= "itemLuckKey",
//
// }
@ccclass
export default class PassEditor extends BasePass {

    // LIFE-CYCLE CALLBACKS:

    //当前选择的工具箱条目按钮
    selectItemMaterialBtn : any = null

    itemEditTios : cc.Node;


    data: any = null

    重新开始: cc.Node = null
    游乐场: cc.Node = null

    lineNode: cc.Node = null
    getitemNames: string[] = []
    private 编辑器_画线格子 : DrawLine;
    private 编辑器_功能: cc.Node;
    private 编辑器_功能UI: cc.Node;
    private 编辑器_关闭功能UI: cc.Node;

    private 编辑器_保存关卡: cc.Node;
    private 编辑器_保存导出关卡: cc.Node;

    private 编辑器_线格子设置宽高: cc.Node;
    private 编辑器_线格子设置显示隐藏: cc.Node;

    private 编辑器_宪格子宽: cc.EditBox;
    private 编辑器_宪格子高: cc.EditBox;

    private 编辑器_工具箱: cc.Node;
    private 编辑器_清除选择: cc.Node;

    onDestroy() {
        super.onDestroy();
    }

    onLoad() {
        super.onLoad()
    }

    start() {



    }


    removeEmitter() {
        Emitter.remove('onSetSelectItemMaterialBtn', this.onSetSelectItemMaterialBtn, this)
        Emitter.remove('onSetEditData', this.onSetEditData, this)
    }

    registerEmitter() {
        Emitter.register('onSetSelectItemMaterialBtn', this.onSetSelectItemMaterialBtn, this)
        Emitter.register('onSetEditData', this.onSetEditData, this)
    }

  async  onSetEditData(selfName,editData){
        ccLog.log("现在要去具体设置了", editData)


      if (UtilsNode.isComponent(editData.node,"itemEditTip") == false ) {
         this.itemEditTios = await UtilsNode.getNode(ItemPreType.具体编辑条目提示, editData.node)
          this. itemEditTios.getComponent(ItemPreType.具体编辑条目提示).setData(editData)


          let cllbacks = {
              // self : this,
              successfulCallback: this.successfulCallback,
              failureCallback: this.failureCallback
          }
          // myNowPassRubber : UtilsDB.getMyNowPassRubber(),
          let data = {
              self : this,
              editData : editData
          }
          Emitter.fire("onOpenDialog", {name: DialogType.详细设置, zIndex: 100,data : data}, cllbacks)


          // let detailedSettingDialog = await UtilsNode.getNode(DialogType.详细设置, this.node)
          // detailedSettingDialog.getComponent(DialogType.详细设置).setData(editData)
      }




    }

    successfulCallback(data){
        ccLog.log("关闭回来的",data," this ",this)

        data.data.self.itemEditTios.destroy()

        // itemEditTios

    }
    failureCallback(){

    }

    startGame() {
        this.startGameView()

    }

    endGame() {
        this.endGameView()

    }

    async setData(data) {
        this.getitemNames = [
            ItemPreType.点, ItemPreType.线, ItemPreType.钥匙,ItemPreType.操作棍
        ]
        this.data = data
        ccLog.log("本关所有内容", data)
        this.initView()

        this.initOnclick()


        if (data) {

            data.getitemNames = this.getitemNames
            let passData = JsonManager.getPassDatas(data)
            //初始化游乐场
            await this.initPlayBackground(passData)
            // ItemPreType.条目棍子

            await this.addLine(passData)
        }

        this.initTools()



    }
    async initTools(){

        for (let i = 0; i <this.getitemNames.length ; i++) {
            let getitemName = this.getitemNames[i];
            let data = {
                name : getitemName
            }
            let node = await UtilsNode.getNode(ItemPreType.工具箱材料按钮, this.编辑器_工具箱)
            // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
            node.getComponent(ItemPreType.工具箱材料按钮).setData(data)

        }


    }

    async addLine(passData) {
        let itemLine = passData[ItemPreType.操作棍][0]

        this.data.itemLine = itemLine

        this.lineNode = await UtilsNode.getNode(ItemPreType.操作棍, this.游乐场)
        // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
        this.lineNode.getComponent(ItemPreType.操作棍).setData(this.data)


        let itemStart = this.getComponentInChildren("itemStart")

        Emitter.fire("onStartGame", itemStart.node)
        let itemLineBGs = this.getComponentsInChildren("itemLineBG")




        let group = 0
        for (let i = 0; i < itemLineBGs.length; i++) {
            group += itemLineBGs[i].group
        }
        Emitter.fire("onSetGroup", group)
    }

    async initPlayBackground(passData) {
        ccLog.log("游乐场数据", passData)


        for (let i = 0; i < passData[ItemPreType.点].length; i++) {
            let itemPoint = passData[ItemPreType.点][i]

            let itemPointNode = await UtilsNode.getNode(itemPoint.typeName,this.游乐场)

            itemPointNode.getComponent(itemPoint.typeName).setData(itemPoint)

            // // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
            // ccLog.log("有东西么",this.currentNode)
            // this.currentNode.getComponent("basePass").setData(data)
        }
        for (let i = 0; i < passData[ItemPreType.线].length; i++) {
            let itemPoint = passData[ItemPreType.线][i]

            let itemPointNode = await UtilsNode.getNode(itemPoint.typeName,this.游乐场)

            itemPointNode.getComponent(itemPoint.typeName).setData(itemPoint)

            // // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
            // ccLog.log("有东西么",this.currentNode)
            // this.currentNode.getComponent("basePass").setData(data)
        }
        for (let i = 0; i < passData[ItemPreType.钥匙].length; i++) {
            let itemPoint = passData[ItemPreType.钥匙][i]

            let itemPointNode = await UtilsNode.getNode(itemPoint.typeName,this.游乐场)

            itemPointNode.getComponent(itemPoint.typeName).setData(itemPoint)

            // // this.currentNode.getComponent("BaseCheckPoint").setData(data.pass)
            // ccLog.log("有东西么",this.currentNode)
            // this.currentNode.getComponent("basePass").setData(data)
        }


    }

    initView() {
        let data

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_功能",
            parentNode: this.node
        }
        this.编辑器_功能 = GetNode.getNode(data)


        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "编辑器_功能UI",
            parentNode: this.node
        }
        this.编辑器_功能UI = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_关闭功能UI",
            parentNode: this.node
        }
        this.编辑器_关闭功能UI = GetNode.getNode(data)



        data = {
            type: GetNodeType.纯查找,
            otherData: "游乐场",
            parentNode: this.node
        }
        this.游乐场 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_保存关卡",
            parentNode: this.node
        }
        this.编辑器_保存关卡 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_保存导出关卡",
            parentNode: this.node
        }
        this.编辑器_保存导出关卡 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_线格子设置宽高",
            parentNode: this.node
        }
        this.编辑器_线格子设置宽高 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_线格子设置显示隐藏",
            parentNode: this.node
        }
        this.编辑器_线格子设置显示隐藏 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_画线格子",
            parentNode: this.node
        }
        this.编辑器_画线格子 = GetNode.getNode(data).getComponent("drawLine")

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_宪格子宽",
            parentNode: this.node
        }
        this.编辑器_宪格子宽 = GetNode.getNode(data).getComponent(cc.EditBox)
        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_宪格子高",
            parentNode: this.node
        }
        this.编辑器_宪格子高 = GetNode.getNode(data).getComponent(cc.EditBox)

        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_工具箱",
            parentNode: this.node
        }
        this.编辑器_工具箱 = GetNode.getNode(data)


        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_工具箱",
            parentNode: this.node
        }
        this.编辑器_工具箱 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "编辑器_清除选择",
            parentNode: this.node
        }
        this.编辑器_清除选择 = GetNode.getNode(data)
    }

    // update (dt) {}
    private initOnclick() {
        this.编辑器_功能.on(cc.Node.EventType.TOUCH_START, () => {
            this.编辑器_功能UI.active = true
        }, this)
        this.编辑器_关闭功能UI .on(cc.Node.EventType.TOUCH_START, () => {
                this.编辑器_功能UI.active = false
        }, this)
        this.编辑器_保存关卡 .on(cc.Node.EventType.TOUCH_START, () => {
                ccLog.log("保存关卡")
        }, this)
        this.编辑器_保存导出关卡 .on(cc.Node.EventType.TOUCH_START, () => {
            ccLog.log("保存导出关卡")
        }, this)

        this.编辑器_线格子设置宽高 .on(cc.Node.EventType.TOUCH_START, () => {
            ccLog.log("编辑器_线格子设置宽高")

            if (this.编辑器_宪格子宽.string != "" && this.编辑器_宪格子高.string != "") {
                let data = {
                    drawWidth : Number(this.编辑器_宪格子宽.string),
                    drawHeight : Number(this.编辑器_宪格子高.string),
                }
                Emitter.fire("onSetDrawLineWidthHeight", data)
            }else{
                let  data = {
                    txt : "有一个是空的"
                }
                // let cllbacks = {
                //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                //     failureCallback: this.newSkinDialogfailureCallback
                // }
                Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)
            }


        }, this)
        // this.编辑器_线格子设置宽高 .on(cc.Node.EventType.TOUCH_START, () => {
        //     ccLog.log("编辑器_线格子设置宽高")
        //
        // }, this)
        this.编辑器_线格子设置显示隐藏 .on(cc.Node.EventType.TOUCH_START, () => {
            ccLog.log("编辑器_线格子设置显示隐藏")
            Emitter.fire("onSetShowDrawLine", null)
        }, this)


        this.游乐场.on(cc.Node.EventType.TOUCH_START, (t) => {
            if (this.selectItemMaterialBtn != null) {


                let n_pos = t.getLocation();
                let delta = t.getDelta();

               let newPos =  this.游乐场.convertToNodeSpaceAR(n_pos);

                ccLog.log("奇怪的点击地点"," n_pos ",n_pos," delta ",delta)
                let data = {
                    position : new Vec2(newPos.x,newPos.y),
                    itemName : this.selectItemMaterialBtn.name
                }

                    this.onCreateItemMaterial(null,data)
                ccLog.log("编辑器游乐场创建",data)
            }else{

            }

        }, this)
        this.编辑器_清除选择.on(cc.Node.EventType.TOUCH_START, () => {
            this.selectItemMaterialBtn = null
            Emitter.fire("onNoSwitchItemMaterialBtn", null)

            let  data = {
                txt : "清除了现在的建造物"
            }
            // let cllbacks = {
            //     successfulCallback: this.newSkinDialogsuccessfulCallback,
            //     failureCallback: this.newSkinDialogfailureCallback
            // }
            Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)

        }, this)



    }

    //创建条目在游乐场
    async onCreateItemMaterial(selfName,data){
        // let data = {
        //     position : new Vec2(delta.x,delta.y),
        //     itemName : this.selectItemMaterialBtn.name
        // }
        let itemPointNode = await UtilsNode.getNode(data.itemName,this.游乐场)

        itemPointNode.getComponent(data.itemName).setEditData(data)

        itemPointNode.setPosition(data.position)
    }




    //设置当前你选择的工具箱条目
    onSetSelectItemMaterialBtn(selfName,data){
        this.selectItemMaterialBtn = data

        // ccLog.log("编辑器游乐场创建",this.selectItemMaterialBtn)
    }




}
