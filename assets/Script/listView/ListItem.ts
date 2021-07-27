import ccLog from "../System/Log/ccLog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import LoadManage from "../System/Load/LoadManage";
import {balloonName, ItemPreType} from "../System/Type/enums";
import UtilsNode from "../System/Utils/UtilsNode";
import {ItemShopItemType} from "../item/itemShopItem";
import UtilsDB from "../System/Utils/UtilsDB";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;
export enum ListItemType {
    可使用的 = 0,
    不能使用的 = 1,
    使用中的 = 2,
}
/**
 * 自定义的Item显示控制类.按需求随意设计
 */
@ccclass
export default class ListItem extends cc.Component {

    private label: cc.Label = null;
    data : any = null

    protected onLoad() {
        this.removeEmitter()
        this.registerEmitter()
        this.initView();
        this.initOnClick()
    }

    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter() {
        Emitter.remove('onDefultListItem', this.onDefultListItem, this)

    }

    registerEmitter() {
        Emitter.register('onDefultListItem', this.onDefultListItem, this)
    }

    public async  setData(data: string) {
        this.data = data
        // console.log("....data", data);
        // this.label.string = data;
        ccLog.log("游戏中 更换气球的数据",data)
        this.type = ListItemType.可使用的
        // gold: 200
        // isAd: false
        // name: "ma_1"
        let  useRubber = UtilsDB.getUseRubber()
        if (useRubber.rubber == data.name) {
            this.type = ListItemType.使用中的
            ccLog.log("listView 当前是使用的", data.name)
            Emitter.fire("onSetSkinLine", data.name)
        }


        let balloonSkin =  await  LoadManage.getSpriteForName("lineSkinItem_"+data.name)
        this.listViewItem_气球.spriteFrame = balloonSkin

        this.setType(this.type)



    }
    listViewItem_气球 : cc.Sprite
    listViewItem_锁头 : cc.Node
    listViewItem_对号 : cc.Node
    initView(){
        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "listViewItem_气球",
            parentNode: this.node
        }
        this.listViewItem_气球 = GetNode.getNode(data).getComponent(cc.Sprite)
        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "listViewItem_锁头",
            parentNode: this.node
        }
        this.listViewItem_锁头 = GetNode.getNode(data)

        data = {
            type: GetNodeType.开始隐藏通过参数显示,
            otherData: "listViewItem_对号",
            parentNode: this.node
        }
        this.listViewItem_对号 = GetNode.getNode(data)




    }
    initOnClick(){
        this.listViewItem_气球.node.on(cc.Node.EventType.TOUCH_END,()=>{
            ccLog.log("点了什么数据 ", this.data);
            let b =  this.checkGet(this.data.name)
            if (b){
                //买过
                this.setType(ListItemType.可使用的)
                Emitter.fire("onDefultListItem",this.data.name)
                UtilsDB.setUseRubber(this.data.name)
                Emitter.fire("onSetSkinLine", this.data.name)
            }else{
                //没买过
                let  data = {
                    txt : "你还没有得到这个气球哦"
                }
                // let cllbacks = {
                //     successfulCallback: this.newSkinDialogsuccessfulCallback,
                //     failureCallback: this.newSkinDialogfailureCallback
                // }
                Emitter.fire("onOpenToast",{name : ItemPreType.打印吐司,zIndex : 100,data:data},null)

            }


        },this)
    }
    type : ListItemType = ListItemType.可使用的


    setType(type){
        this.type = type

        ccLog.log("商品条目容易什么呢 我是商品条目",this.data)

        // item:
        //     gold: 200
        //     isAd: false
        //     name: "ma_1"
        //     shopPingType: 1
        //     type: 0

        //如果我买了
        let b =  this.checkGet(this.data.name)
        if (b) {
            //我买了 此时此刻是设置可使用的



            if (this.type != ListItemType.使用中的 ) {
                this.type =  ListItemType.可使用的
            }
        }else{
            //如果我没买
            // if (this.data.item.isAd == true) {
            //     this.type = ItemShopItemType.需要看广告的
            //     ccLog.log("这条我没买我设置看广告 按钮",this.data)
            // }else{
            //
            // }
            this.type = ListItemType.不能使用的
        }







        switch (this.type){
            case ListItemType.不能使用的:
                UtilsNode.show(this.listViewItem_对号,false)

                UtilsNode.show(this.listViewItem_锁头,true)
                break
            case ListItemType.可使用的:
                UtilsNode.show(this.listViewItem_锁头,false)
                UtilsNode.show(this.listViewItem_对号,false)

                break
            case ListItemType.使用中的:
                UtilsNode.show(this.listViewItem_锁头,false)

                UtilsNode.show(this.listViewItem_对号,true)
                break
        }
        ccLog.log("现在设置的类型是",type , this)
    }
    checkGet(name){
        let list =  UtilsDB.getMyRubberByAllRubber()
        ccLog.log("所有买过的",list)
        for (let i = 0; i < list.length; i++) {
            if (name ==  list[i].item.name) {
                if (list[i].isCheck == true) {
                    return true
                }
            }
        }
        return false
    }

    onDefultListItem(selfName,name){
        if (name == this.data.name) {
            this.setType(ListItemType.使用中的)
        }else{
            this.setType(ListItemType.可使用的)
        }

    }
    public unuse() {
        cc.log("unuse...")
    }

    public reuse() {
        cc.log("reuse...")
    }
}
