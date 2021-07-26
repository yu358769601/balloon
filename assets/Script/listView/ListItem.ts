import ccLog from "../System/Log/ccLog";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import LoadManage from "../System/Load/LoadManage";
import {balloonName} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

/**
 * 自定义的Item显示控制类.按需求随意设计
 */
@ccclass
export default class ListItem extends cc.Component {

    private label: cc.Label = null;
    data : any = null

    protected onLoad() {
        this.initView();
        this.initOnClick()
    }


    public async  setData(data: string) {
        this.data = data
        // console.log("....data", data);
        // this.label.string = data;



        let balloonSkin =  await  LoadManage.getSpriteForName("lineSkinItem_"+data.name)
        this.listViewItem_气球.spriteFrame = balloonSkin

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
            type: GetNodeType.纯查找,
            otherData: "listViewItem_锁头",
            parentNode: this.node
        }
        this.listViewItem_锁头 = GetNode.getNode(data)

        data = {
            type: GetNodeType.纯查找,
            otherData: "listViewItem_对号",
            parentNode: this.node
        }
        this.listViewItem_对号 = GetNode.getNode(data)




    }
    initOnClick(){
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{
            ccLog.log("点了什么数据 ", this.data);
        },this)
    }


    public unuse() {
        cc.log("unuse...")
    }

    public reuse() {
        cc.log("reuse...")
    }
}
