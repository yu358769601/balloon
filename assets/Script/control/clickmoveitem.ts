// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseClickItem from "./BaseClickItem";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

export enum ClickType {
    抬起 = 0,
    按下 = 1,
    移动 = 2,
    // 取消 = 3,
}


//抽卡类型
export enum ClickmoveitemType {
    移动抬起会返回 = 0,
    移动抬起不会返回 = 1,
    移动抬起会到一个节点位置 = 2,
    抬起放对了会到一个地方 = 3,
}
export enum ClickmoveitemMoveType {
    抬起回到原位 = 0,
    抬起不回到原位 = 1,
}


@ccclass
export default class Clickmoveitem extends BaseClickItem {
    @property(
        {
            type: cc.Enum(ClickmoveitemType),
            displayName: "按钮类型"
        }
    )    // call cc.Enum
    public clickType = ClickmoveitemType.移动抬起会返回;


    @property(
        {
            type: cc.Enum(ClickmoveitemMoveType),
            displayName: "抬起之后"
        }
    )    // call cc.Enum
    public clickMoveType = ClickmoveitemMoveType.抬起回到原位;


    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property({
        displayName :"返回位置的节点",
        tooltip: "返回位置的节点",
        type : cc.Node
    })
    TOUCH_START_NODE_P: cc.Node = null;

    @property({
        displayName :"放下位置的节点",
        tooltip: "放下位置的节点",
        type : cc.Node
    })
    TOUCH_END_NODE_P: cc.Node = null;


    TOUCH_START_P : cc.Vec2 = null
    TOUCH_END_P : cc.Vec2 = null

    //检查落点范围
    checkTheDropPointRangeNode : cc.Node = null

    //移动范围
    moveRange : any = null


    _clickType : ClickType = ClickType.抬起

    onLoad () {
        super.onLoad()

    }

    start () {
        super.start()
    }



    initView() {
        this.node.on(cc.Node.EventType.TOUCH_START,(t)=>{
            // ccLog.log("测试按钮 按下回调调用之前 0 ",this)
            this._clickType = ClickType.按下
            this.TOUCH_START(t)

        },this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(t)=>{
            this._clickType = ClickType.移动
            this.TOUCH_MOVE(t)

        },this)
        this.node.on(cc.Node.EventType.TOUCH_END,(t)=>{
            this._clickType = ClickType.抬起
            this.TOUCH_END(t)

        },this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,(t)=>{
            this._clickType = ClickType.抬起
            this.TOUCH_END(t)

        },this)
    }
    TOUCH_START(t){
        if (this.clickTag == true){
            if (this.clickType == ClickmoveitemType.移动抬起会返回) {
                if (this.TOUCH_START_NODE_P != null) {
                    this.TOUCH_START_P = this.TOUCH_START_NODE_P.getPosition()
                }
            }
            //设定落下跳转到的节点位置
            if (this.TOUCH_END_NODE_P != null) {
                this.TOUCH_END_P = this.TOUCH_END_NODE_P.getPosition()
            }

            if (this.clickmoveitemListener && this.clickmoveitemListener.onClickmoveTOUCH_STARTListener) {
                this.clickmoveitemListener.onClickmoveTOUCH_STARTListener({
                    selfCall : this.selfCall,
                    self : this,
                    data : this.clickmoveitemListener.data,
                    t
                })
            }
        }
    }
    TOUCH_MOVE(t){
        if (this.clickTag == true){
            //定义一个n_pos变量存储当前触摸点的位置
            let n_pos = t.getLocation();
            let delta = t.getDelta();


            // this.moveRange = range
            // {
            //     xMin : 0,
            //     xMax: 0,
            //     yMin: 0,
            //     yMax: 0,
            // }

            if (this.moveRange) {
                if (this.moveRange.xMin && this.moveRange.xMax) {
                    if (this.node.x + delta.x < this.moveRange.xMin) {
                        this.node.x = this.moveRange.xMin
                        return
                    }
                    if (this.node.x + delta.x > this.moveRange.xMax) {
                        this.node.x = this.moveRange.xMax
                        return
                    }
                    this.node.x += delta.x;
                }

                if (this.moveRange.yMin && this.moveRange.yMax){
                    if (this.node.y + delta.y < this.moveRange.yMin) {
                        this.node.y = this.moveRange.yMin
                        return
                    }
                    if (this.node.y + delta.y > this.moveRange.yMax) {
                        this.node.y = this.moveRange.yMax
                        return
                    }
                    this.node.y += delta.y;
                }

            }else{
                this.node.x += delta.x;
                this.node.y += delta.y;
            }

            if (this.clickmoveitemListener && this.clickmoveitemListener.onClickmoveTOUCH_MOVEListener) {
                this.clickmoveitemListener.onClickmoveTOUCH_MOVEListener({
                    selfCall : this.selfCall,
                    self : this,
                    data : this.clickmoveitemListener.data,
                    t
                })
            }

        }

    }

    TOUCH_END(t){
        if (this.clickTag == true){


            //先走回调后走设置位置要不然位置就是不会变
            if (this.clickmoveitemListener && this.clickmoveitemListener.onClickmoveTOUCH_ENDListener) {
                this.clickmoveitemListener.onClickmoveTOUCH_ENDListener({
                    selfCall : this.selfCall,
                    self : this,
                    data : this.clickmoveitemListener.data,
                    t
                })
            }

            if(this.checkDropPointListener){
                // ccLog.log("是否相交 0 ",this.checkTheDropPointRangeNode.getBoundingBoxToWorld())
                // ccLog.log("是否相交 1 ",this.node.getBoundingBoxToWorld())
                if (this.checkDropPointListener && this.checkTheDropPointRangeNode.getBoundingBoxToWorld().intersects(this.node.getBoundingBoxToWorld())) {
                    if (this.clickmoveitemListener && this.checkDropPointListener.onCheckDropPointTOUCH_ENDListener) {
                        this.checkDropPointListener.onCheckDropPointTOUCH_ENDListener({
                            selfCall : this.selfCall,
                            self : this,
                            data : this.checkDropPointListener.data,
                            t
                        })
                    }
                }else{
                    if (this.clickmoveitemListener && this.checkDropPointListener.onCheckDropPointNotTOUCH_ENDListener) {
                        this.checkDropPointListener.onCheckDropPointNotTOUCH_ENDListener({
                            selfCall : this.selfCall,
                            self : this,
                            data : this.checkDropPointListener.data,
                            t
                        })
                    }
                }
            }
            if (this.clickType == ClickmoveitemType.移动抬起会返回) {
                if (this.TOUCH_START_NODE_P != null) {
                    this.node.setPosition(this.TOUCH_START_P)
                }
            }else   if (this.clickType == ClickmoveitemType.移动抬起会到一个节点位置) {
                if (this.TOUCH_END_NODE_P != null) {
                    this.node.setPosition(this.TOUCH_END_P)
                }
            }


        }

    }


    //得到组件
    onGetClickmoveitem(selfName,data,callBack){
        // Emitter.fire("onGetClickmoveitem",{
        //     otherData : "help"
        // },(clickitem : Clickmoveitem)=>{
        //     this.help = clickitem
        //     clickitem.setListener({
        //         selfCall : this,
        //
        //         // onClickmoveTOUCH_STARTListener : this.onClickmoveTOUCH_STARTListener,
        //         // onClickmoveTOUCH_MOVEListener : this.onClickmoveTOUCH_MOVEListener,
        //         // onClickmoveTOUCH_ENDListener:this.onClickmoveTOUCH_ENDListener,
        //     })
        // })

        //
        // type
        // otherData
        if (data.otherData == this.otherData){
            if (callBack) {
                callBack(this)
            }
        }
    }


    onDestroy(): void {
        super.onDestroy()
    }
    registerEmitter() {
        Emitter.register('onGetClickmoveitem', this.onGetClickmoveitem,this)
    }

    removeEmitter() {
        Emitter.remove('onGetClickmoveitem', this.onGetClickmoveitem,this)
    }


    subclassCall(): any {
        return this
    }

    initData(data) {

    }
    //设定一个移动范围
    setMoveRange(range){
        this.moveRange = range
        // {
        //     xMin : 0,
        //     xMax: 0,
        //     yMin: 0,
        //     yMax: 0,
        // }



    }

    clickmoveitemListener : ClickmoveitemListener = null


    setListener(listener : ClickmoveitemListener) {
        //调用者
        if (listener.selfCall) {
            this.selfCall = listener.selfCall
        }
        this.clickmoveitemListener = listener
        // //按下回调
        // if (listener.onClickTOUCH_STARTListener) {
        //     this.onClickTOUCH_STARTListener = listener.onClickTOUCH_STARTListener
        // }
        // //按下移动回调
        // if (listener.onClickTOUCH_MOVEListener) {
        //     this.onClickTOUCH_MOVEListener = listener.onClickTOUCH_MOVEListener
        // }
        // //抬起回调
        // if (listener.onClickTOUCH_ENDListener) {
        //     this.onClickTOUCH_ENDListener = listener.onClickTOUCH_ENDListener
        // }
    }


    checkDropPointListener : CheckDropPointListener = null
    //检查落点监听
    setCheckDropPointListener(listener : CheckDropPointListener) {
        //调用者
        this.checkDropPointListener = listener

        this.checkTheDropPointRangeNode = listener.checkTheDropPointRangeNode

        // //按下回调
        // if (listener.onClickTOUCH_STARTListener) {
        //     this.onClickTOUCH_STARTListener = listener.onClickTOUCH_STARTListener
        // }
        // //按下移动回调
        // if (listener.onClickTOUCH_MOVEListener) {
        //     this.onClickTOUCH_MOVEListener = listener.onClickTOUCH_MOVEListener
        // }
        // //抬起回调
        // if (listener.onClickTOUCH_ENDListener) {
        //     this.onClickTOUCH_ENDListener = listener.onClickTOUCH_ENDListener
        // }
    }

    setData(data) {

    }

    // update (dt) {}
}
interface ClickmoveitemCallBackData {
    selfCall : any,
    self: any,
    t : any
}
interface ClickmoveitemListener {
    selfCall: any,

    data ?: any,

    // 按下
    onClickmoveTOUCH_STARTListener ?:(callBackData)=>{}
    // 移动
    onClickmoveTOUCH_MOVEListener ?:(callBackData)=>{}
    // 抬起
    onClickmoveTOUCH_ENDListener ?:(callBackData)=>{}
}

interface CheckDropPointListener {
    data ?: any,
    //检查抬起是否包含的节点
    checkTheDropPointRangeNode ?: any
    //检查抬起是否包含的回调
    onCheckDropPointTOUCH_ENDListener ?:(callBackData)=>{}
    //不在
    onCheckDropPointNotTOUCH_ENDListener ?:(callBackData)=>{}
}